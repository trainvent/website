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
  try {
    if (!event || !event.parameter || !event.parameter.payload || event.contentLength > 15 * 1024 * 1024) throw new Error('Invalid request');
    const data = JSON.parse(event.parameter.payload);
    if (data._honey) throw new Error('Invalid request');
    for (const [key, limit] of [['email', 254], ['subject', 200], ['message', 20000]]) {
      if (typeof data[key] !== 'string' || !data[key].trim() || data[key].length > limit) throw new Error('Invalid fields');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || /[\r\n]/.test(data.email + data.subject)) throw new Error('Invalid email or subject');
    if (!APPS.includes(data.app) || !TYPES.includes(data.requestType)) throw new Error('Invalid selection');
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
    if (count >= limit || MailApp.getRemainingDailyQuota() < 1) throw new Error('Daily limit');
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
      MailApp.sendEmail({ to: recipient, replyTo: data.email, subject: '[Support] ' + data.subject,
        body: 'Request: ' + id + '\nApp: ' + data.app + '\nFrom: ' + data.email + '\nType: ' + data.requestType + '\n\n' + data.message + '\n\nPrivate files:\n' + (links.join('\n') || 'None') });
      sheet.getRange(row, 9).setValue('Sent');
    } catch (mailError) {
      // The request is already saved: do not encourage duplicate submissions.
      console.error('Notification failed for request ' + id);
      sheet.getRange(row, 9).setValue('Failed — review manually');
    }
    return resultPage(true, 'Your support request has been saved. Reference: ' + id);
  } catch (error) {
    console.error('Support submission failed: ' + error.message);
    if (folder && !saved) folder.setTrashed(true);
    return resultPage(saved, saved ? 'Your support request has been saved.' : 'Your request could not be saved. Please go back and try again, or email support@trainvent.com. Attach up to 3 files, totalling no more than 10 MB.');
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function resultPage(ok, message) {
  const escape = text => String(text).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  return HtmlService.createHtmlOutput('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Trainvent support</title></head><body style="font:18px system-ui;max-width:640px;margin:10vh auto;padding:24px"><h1>' + (ok ? 'Request received' : 'Support request') + '</h1><p>' + escape(message) + '</p><p><a href="https://trainvent.com/en/software-support/" target="_top">Return to Trainvent support</a></p></body></html>');
}
