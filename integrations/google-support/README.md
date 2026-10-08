# Google Workspace support backend

The existing support form switches to Google when `NEXT_PUBLIC_GOOGLE_SUPPORT_ENDPOINT` is set at build time. Until then it continues using Formspree without attachments. Google receives a normal browser POST containing JSON and base64 files; this avoids cross-origin fetch restrictions. The browser leaves the website and Google displays an English confirmation or error page. The website labels are translated in all five locales. JavaScript is required for Google submission.

## Deploy under your Workspace account

1. Open https://script.google.com/ and create a standalone project named Trainvent support.
2. Paste `Code.gs` from this directory into the editor.
3. Select `setup`, run it, and authorize Drive, Sheets and email access. This creates a private uploads folder and request spreadsheet.
4. Under Project Settings → Script properties, inspect `FOLDER_ID`, `SHEET_ID`, and `SUPPORT_EMAIL` (defaults to support@trainvent.com). Optionally set `DAILY_LIMIT` (defaults to 50 requests per UTC day).
5. Keep the folder and spreadsheet restricted. Grant access only to the support staff who need it; receiving an email link does not grant Drive access.
6. Deploy → New deployment → Web app. Execute as **Me**, access **Anyone** (including visitors without Google accounts). If your Workspace policy prevents this, the administrator must enable public web apps, or this approach cannot serve anonymous visitors.
7. Copy the deployment URL ending in `/exec`, not the editor-only `/dev` URL.
8. Set `NEXT_PUBLIC_GOOGLE_SUPPORT_ENDPOINT` to that URL in your local `.env` and in GitHub Settings → Secrets and variables → Actions → Variables. Rebuild/redeploy the site; the URL is public, not a secret.
9. Submit a request from an incognito window with a screenshot. Check the confirmation, spreadsheet row, private Drive file and notification email. Confirm that the file link does not open in an unrelated account. Repeat without attachments and with an invalid/oversized selection.

For future script edits: Deploy → Manage deployments → Edit → New version → Deploy. Editing the source alone does not update the active deployment.

## Behavior and operational limits

- Up to 3 files, 10 MiB total, enforced in browser and script. All file types are accepted as downloads; uploads are not scanned for malware.
- The sheet stores requests and tracks email notification success. A failed notification does not discard a saved request. Review failed rows manually.
- The honeypot and daily cap provide basic abuse limits, not strong bot protection. The public endpoint can be called outside this website. Add server-verified CAPTCHA before exposing it to substantial traffic; the daily cap can also be exhausted by an attacker.
- Counter updates and writes are serialized. Repeated submissions create separate requests; if confirmation is interrupted, check the sheet before retrying.
- Files and messages persist until deleted. Manage retention in the private folder and sheet, and update your site's privacy notice for Google processing and support uploads.
- Mail is sent by the deploying Workspace account, with Reply-To set to the visitor. `SUPPORT_EMAIL` controls the recipient, not the sender.

Google deployment documentation: https://developers.google.com/apps-script/guides/web
Google quotas: https://developers.google.com/apps-script/guides/services/quotas
