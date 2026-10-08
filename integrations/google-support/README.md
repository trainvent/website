# Google Workspace support backend

The existing support form switches to Google when `NEXT_PUBLIC_GOOGLE_SUPPORT_ENDPOINT` is set at build time. Until then it continues using Formspree without attachments. Google receives a normal browser POST containing JSON and base64 files; this avoids cross-origin fetch restrictions. The form posts into a hidden frame and Google returns a nonce-bound message to the website. Visitors stay on the page and see a localized success/error message. After 90 seconds without confirmation, the UI reports uncertainty and prevents duplicate retries; a late confirmation can still arrive. The website labels are translated in all five locales. JavaScript is required for Google submission.

## Deploy under your Workspace account

1. Open https://script.google.com/ and create a standalone project named Trainvent support.
2. Paste `Code.gs` from this directory into the editor.
3. Select `setup`, run it, and authorize Drive, Sheets and email access. This creates a private uploads folder and request spreadsheet.
4. Optionally set `WEBSITE_ORIGINS` to the exact comma-separated website origins (scheme, hostname, optional port; no trailing slash). Defaults: `https://trainvent.com,https://www.trainvent.com,https://next.trainvent.com,http://localhost:3000,http://localhost:3001`. Add your preview origin if using another host or port. This validates the response destination, not the authenticity of a submitted request.
5. Under Project Settings → Script properties, inspect `FOLDER_ID`, `SHEET_ID`, and `SUPPORT_EMAIL` (defaults to support@trainvent.com). Optionally set `DAILY_LIMIT` (defaults to 50 requests per UTC day).
6. Keep the folder and spreadsheet restricted. Grant access only to the support staff who need it; receiving an email link does not grant Drive access.
7. Deploy → New deployment → Web app. Execute as **Me**, access **Anyone** (including visitors without Google accounts). If your Workspace policy prevents this, the administrator must enable public web apps, or this approach cannot serve anonymous visitors.
8. Copy the deployment URL ending in `/exec`, not the editor-only `/dev` URL.
9. Set `NEXT_PUBLIC_GOOGLE_SUPPORT_ENDPOINT` to that URL in your local `.env` and in GitHub Settings → Secrets and variables → Actions → Variables. Rebuild/redeploy the site; the URL is public, not a secret.
10. Submit a request from an incognito window with a screenshot. Check the confirmation, spreadsheet row, private Drive file and notification email. Confirm that the file link does not open in an unrelated account. Repeat without attachments and with an invalid/oversized selection.

For future script edits: Deploy → Manage deployments → Edit → New version → Deploy. Editing the source alone does not update the active deployment.

## Behavior and operational limits

- Up to 3 files, 10 MiB total, enforced in browser and script. All file types are accepted as downloads; uploads are not scanned for malware.
- The sheet stores requests and tracks email notification success. A failed notification does not discard a saved request. Review failed rows manually.
- hCaptcha is verified in the script before attachments are decoded or data is saved. The honeypot and daily cap provide additional abuse limits. CAPTCHA failures and verification outages reject submissions; the public endpoint cannot bypass token verification.
- Counter updates and writes are serialized. Repeated submissions create separate requests; if confirmation is interrupted, check the sheet before retrying.
- Files and messages persist until deleted. Manage retention in the private folder and sheet, and update your site's privacy notice for Google processing and support uploads.
- Mail is sent by the deploying Workspace account, with Reply-To set to the visitor. `SUPPORT_EMAIL` controls the recipient, not the sender.

Google deployment documentation: https://developers.google.com/apps-script/guides/web
Google quotas: https://developers.google.com/apps-script/guides/services/quotas

## Update an existing deployment for inline confirmation

Replace the deployed source with this version of `Code.gs`, then Deploy → Manage deployments → Edit → New version → Deploy. Keep the existing `/exec` URL. Update the script before deploying the new website. The old website remains compatible with the updated script, but the updated website cannot receive inline confirmation from the old script. If a request is saved by an old script version, the UI times out rather than claiming success.

## Optional direct inbox notifications

This mode inserts an unread support notification into the deploying account's Gmail inbox instead of sending mail to an alias. It does not send a message to the visitor; Reply-To is the visitor's email so you can reply normally. Sheet status becomes `Added to inbox`. Existing rows are not replayed.

Requires owner approval for the new `gmail.insert` permission, which can add messages but cannot read existing mail. Do not use an automatically inferred, broader Gmail scope.

After approval, update `Code.gs` and enable the manifest in Project Settings. Merge `dependencies.enabledAdvancedServices` and `oauthScopes` from `appsscript.inbox.json` into the existing `appsscript.json`, preserving existing deployment configuration. If using a standard Google Cloud project, enable Gmail API in that project's Cloud console as well. Run `setup` from the editor to authorize the added scope, then set Script property `NOTIFICATION_MODE` to `inbox` and deploy a new version. To revert, remove that property or set it to `email`. Check the first real submission for `Added to inbox` and an unread Gmail message.

Google API reference: https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/insert


## Support CAPTCHA activation

The support form uses the same production hCaptcha sitekey as Contact. Set `HCAPTCHA_SECRET` privately in Script properties (from your hCaptcha account settings). Do not put it in frontend code, GitHub build variables or chat. Optionally set `HCAPTCHA_SITEKEY` if changing the public sitekey; keep it aligned with `NEXT_PUBLIC_HCAPTCHA_SITEKEY`.

Merge the `script.external_request` scope from `appsscript.inbox.json` into the deployed manifest. This lets Google send the challenge token to hCaptcha's verification endpoint. Run `setup` to authorize the added scope. Deploy the new script only after the secret is configured and the updated form is ready: older form versions without a token will be rejected. Ensure hCaptcha allows your production hostname, including next.trainvent.com; use its documented development hostname setup for local testing. CAPTCHA tokens are single-use; the widget resets after a rejected server response. Missing or invalid tokens must be tested without creating Drive files, sheet rows or inbox messages.
