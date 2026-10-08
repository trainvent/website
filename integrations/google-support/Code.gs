const MAX_BYTES = 10 * 1024 * 1024;
const APPS = ['stimmapp', 'calcrow', 'aperiodos'];
const TYPES = ['account-access', 'bug-report', 'billing-or-data', 'other'];

// Run once from the editor, under the Workspace account that will deploy this app.
function setup() {
  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty('FOLDER_ID')) {
    properties.setProperty('FOLDER_ID', DriveApp.createFolder('Trainvent support uploads').getId());
  }
  if (!properties.getProperty('SHEET_ID')) {
    const spreadsheet = SpreadsheetApp.create('Trainvent support requests');
    spreadsheet.getSheets()[0].appendRow(['Received', 'Request ID', 'App', 'Email', 'Type', 'Subject', 'Message', 'Files', 'Notification']);
    properties.setProperty('SHEET_ID', spreadsheet.getId());
  }
  if (!properties.getProperty('SUPPORT_EMAIL')) properties.setProperty('SUPPORT_EMAIL', 'support@trainvent.com');
}

function doGet() {
  return resultPage(false, 'Please send your request from the support form on trainvent.com.');
}

function doPost(event) {
  let lock;
  let folder;
  let saved = false;
  let responseContext;
  try {
    if (!event || !event.parameter || !event.parameter.payload || event.contentLength > 15 * 1024 * 1024) throw new Error('Invalid request');
    const data = JSON.parse(event.parameter.payload);
    if (data.nonce || data.returnOrigin) {
      const allowed = (PropertiesService.getScriptProperties().getProperty('WEBSITE_ORIGINS') || 'https://trainvent.com,https://www.trainvent.com,https://next.trainvent.com,http://localhost:3000,http://localhost:3001').split(',').map(value => value.trim());
      if (typeof data.nonce !== 'string' || !/^[a-f0-9-]{36}$/.test(data.nonce) || !allowed.includes(data.returnOrigin)) throw new Error('Invalid response origin');
      responseContext = { nonce: data.nonce, origin: data.returnOrigin };
    }
    if (data._honey) throw new Error('Invalid request');
    for (const [key, limit] of [['email', 254], ['subject', 200], ['message', 20000]]) {
      if (typeof data[key] !== 'string' || !data[key].trim() || data[key].length > limit) throw new Error('Invalid fields');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.email + data.subject)) throw new Error('Invalid email or subject');
    if (!APPS.includes(data.app) || !TYPES.includes(data.requestType)) throw new Error('Invalid selection');
    verifySupportCaptcha(data.captchaToken);
    if (!Array.isArray(data.files) || data.files.length > 3) throw new Error('Too many files');
    let total = 0;
    const blobs = data.files.map(file => {
      if (typeof file.name !== 'string' || !file.name || file.name.length > 200 || typeof file.data !== 'string' || !/^[A-Za-z0-9+/]*={0,2}$/.test(file.data)) throw new Error('Invalid file');
      const bytes = Utilities.base64Decode(file.data);
      total += bytes.length;
      if (total > MAX_BYTES) throw new Error('Files too large');
      const name = file.name.replace(/[\\/\x00-\x1f]/g, '_');
      // Treat all uploads as downloads; do not trust a browser-provided MIME type.
      return Utilities.newBlob(bytes, 'application/octet-stream', name);
    });
    const properties = PropertiesService.getScriptProperties();
    const folderId = properties.getProperty('FOLDER_ID');
    const sheetId = properties.getProperty('SHEET_ID');
    const recipient = properties.getProperty('SUPPORT_EMAIL');
    if (!folderId || !sheetId || !recipient) throw new Error('Setup missing');
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) throw new Error('Busy');
    // A global daily cap bounds storage and mail abuse. This is not a CAPTCHA.
    const day = Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM-dd');
    const count = properties.getProperty('COUNT_DAY') === day ? Number(properties.getProperty('COUNT') || 0) : 0;
    const limit = Number(properties.getProperty('DAILY_LIMIT') || 50);
    const inboxMode = properties.getProperty('NOTIFICATION_MODE') === 'inbox';
    if (count >= limit || (!inboxMode && MailApp.getRemainingDailyQuota() < 1)) throw new Error('Daily limit');
    properties.setProperties({ COUNT_DAY: day, COUNT: String(count + 1) });
    const id = Utilities.getUuid();
    const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
    // setup creates a private folder. Never enable link sharing on it.
    folder = DriveApp.getFolderById(folderId).createFolder(id);
    const links = blobs.map(blob => folder.createFile(blob).getUrl());
    const safeCell = value => /^[=+\-@\t\r]/.test(String(value)) ? "'" + value : String(value);
    sheet.appendRow([new Date(), id, data.app, safeCell(data.email), data.requestType, safeCell(data.subject), safeCell(data.message), links.join('\n'), 'Pending']);
    saved = true;
    const row = sheet.getLastRow();
    try {
      const notification = { to: recipient, replyTo: data.email, subject: '[Support] ' + data.subject,
        body: 'Request: ' + id + '\nApp: ' + data.app + '\nFrom: ' + data.email + '\nType: ' + data.requestType + '\n\n' + data.message + '\n\nPrivate files:\n' + (links.join('\n') || 'None') };
      if (inboxMode) insertSupportNotification(notification);
      else MailApp.sendEmail(notification);
      sheet.getRange(row, 9).setValue(inboxMode ? 'Added to inbox' : 'Sent');
    } catch (mailError) {
      // The request is already saved: do not encourage duplicate submissions.
      console.error('Notification failed for request ' + id);
      sheet.getRange(row, 9).setValue('Failed — review manually');
    }
    return resultPage(true, 'Your support request has been saved. Reference: ' + id, responseContext);
  } catch (error) {
    console.error('Support submission failed: ' + error.message);
    if (folder && !saved) folder.setTrashed(true);
    return resultPage(saved, saved ? 'Your support request has been saved.' : 'Your request could not be saved. Please go back and try again, or email support@trainvent.com. Attach up to 3 files, totalling no more than 10 MB.', responseContext);
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function resultPage(ok, message, context) {
  if (context) {
    // Never embed submitted messages/files in this bridge, only status and nonce.
    const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
    const status = json({ type: 'trainvent-support-result', nonce: context.nonce, ok: ok });
    const origin = json(context.origin);
    return HtmlService.createHtmlOutput('<!doctype html><html><body><script>window.top.postMessage(' + status + ',' + origin + ');</script></body></html>')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  const escape = text => String(text).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  return HtmlService.createHtmlOutput('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Trainvent support</title></head><body style="font:18px system-ui;max-width:640px;margin:10vh auto;padding:24px"><h1>' + (ok ? 'Request received' : 'Support request') + '</h1><p>' + escape(message) + '</p><p><a href="https://trainvent.com/en/software-support/" target="_top">Return to Trainvent support</a></p></body></html>');
}

// Optional: requires Gmail API advanced service and the gmail.insert scope.
// Inserts into the deploying account's mailbox; does not send outgoing mail.
function insertSupportNotification(notification) {
  const encodedSubject = Utilities.base64Encode(notification.subject, Utilities.Charset.UTF_8);
  const encodedBody = Utilities.base64Encode(notification.body, Utilities.Charset.UTF_8);
  const raw = [
    'From: Trainvent Support <' + notification.to + '>',
    'To: ' + notification.to,
    'Reply-To: ' + notification.replyTo,
    'Subject: =?UTF-8?B?' + encodedSubject + '?=',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '', encodedBody.match(/.{1,76}/g).join('\r\n')
  ].join('\r\n');
  const result = Gmail.Users.Messages.insert({
    raw: Utilities.base64EncodeWebSafe(raw, Utilities.Charset.UTF_8),
    labelIds: ['INBOX', 'UNREAD']
  }, 'me');
  if (!result || !result.id) throw new Error('Inbox insertion not confirmed');
}

// Run from the editor to verify the approved insert permission without sending mail.
function testInboxNotification() {
  const recipient = PropertiesService.getScriptProperties().getProperty('SUPPORT_EMAIL');
  if (!recipient) throw new Error('Run setup first');
  insertSupportNotification({ to: recipient, replyTo: recipient,
    subject: '[Support] Inbox notification test',
    body: 'Direct inbox notifications are working. New support requests will include the full message and private attachment links.' });
  console.log('Test notification added to the deploying account inbox.');
}


function verifySupportCaptcha(token) {
  const properties = PropertiesService.getScriptProperties();
  const secret = properties.getProperty('HCAPTCHA_SECRET');
  const sitekey = properties.getProperty('HCAPTCHA_SITEKEY') || '19c4f6ba-2b22-4014-a996-1dc2ea141098';
  if (!secret || typeof token !== 'string' || !token || token.length > 10000) throw new Error('CAPTCHA verification required');
  const response = UrlFetchApp.fetch('https://api.hcaptcha.com/siteverify', {
    method: 'post', payload: { secret: secret, response: token, sitekey: sitekey }, muteHttpExceptions: true
  });
  if (response.getResponseCode() !== 200 || JSON.parse(response.getContentText()).success !== true) throw new Error('CAPTCHA verification failed');
}
