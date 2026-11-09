# Google Sheets Integration — Contact Form Setup

The contact form on `/contact` stores every submission as a row in a Google
Spreadsheet using a Google Apps Script Web App as the backend. **No API keys,
service accounts or credentials are exposed in the frontend** — the Web App is
authenticated by Google's own deployment model.

## Architecture

```
Browser form (validated + sanitized)
        │  POST /api/contact  (JSON)
        ▼
Next.js API route  ── honeypot + time-trap + CAPTCHA verification + per-IP rate limit
        │  POST (JSON, text/plain)
        ▼
Google Apps Script Web App  ── validates, sanitizes, rate-limits, dedupes
        │  appendRow()
        ▼
Google Spreadsheet "Submissions" sheet
```

The Apps Script URL is read from **server-side** environment variables, so it
is never bundled into client JavaScript. The CAPTCHA is fully self-hosted
(stateless signed tokens — see `src/lib/captcha.ts`); no third-party captcha
service, keys or cookies are involved.

## Step 1 — Create the Spreadsheet

1. Go to <https://sheets.google.com> and create a new spreadsheet named
   e.g. **Portfolio Contact Submissions**.
2. Rename the first tab to **Submissions**.
3. Add these headers in row 1 (the script also creates them automatically if
   the sheet is empty):

| Submission ID | Submission Date & Time | Full Name | Email Address | Phone Number | Subject | Inquiry Category | Message | Submission Status |
|---------------|------------------------|-----------|---------------|--------------|---------|------------------|---------|-------------------|

4. Note the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`

## Step 2 — Add the Apps Script

1. In the spreadsheet: **Extensions → Apps Script**.
2. Delete the default code and paste the entire contents of
   [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
3. In the script's `CONFIG`:
   - `SPREADSHEET_ID`: leave `""` (the script is bound to this spreadsheet), or
     paste the ID from Step 1 if you created the script standalone.
   - `SHEET_NAME`: `Submissions` (must match the tab name).
   - `TOKEN`: choose a value, e.g. `portfolio-contact`. You will reuse it in
     the website's `.env.local` as `NEXT_PUBLIC_GS_FORM_TOKEN`.
4. Save the project (💾 icon), name it `portfolio-contact-backend`.

## Step 3 — Deploy the Web App

1. Click **Deploy → New deployment**.
2. Select type **Web app**.
3. Configure:
   - **Description**: `portfolio contact form v1`
   - **Execute as**: **Me** (your account)
   - **Who has access**: **Anyone**  ← required so the public form can POST
4. Click **Deploy** and authorize the script (Google will show a
   "unverified app" warning — it is your own script; choose
   *Advanced → Go to project (unsafe)*).
5. Copy the **Web App URL** — it looks like
   `https://script.google.com/macros/s/AKfycb.../exec`.

## Step 4 — Configure the Website

Create `.env.local` in the project root (copy `.env.example`):

```bash
# Contact backend — SERVER-side, preferred (never shipped to the browser)
GS_WEBAPP_URL=https://script.google.com/macros/s/AKfycb.../exec
GS_FORM_TOKEN=portfolio-contact

# Optional public mirror — also drives the "SHEETS CONNECTED" badge
NEXT_PUBLIC_GS_WEBAPP_URL=https://script.google.com/macros/s/AKfycb.../exec
NEXT_PUBLIC_GS_FORM_TOKEN=portfolio-contact

# CAPTCHA signing key — any long random string (has a dev fallback)
CAPTCHA_SECRET=change-me-to-a-long-random-string

NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Restart the dev server after creating `.env.local`. The contact page badge
will switch from **"SHEETS PENDING SETUP"** to **"SHEETS CONNECTED"**.

## Step 5 — Verify

1. Open `/contact`, fill the form, submit.
2. Check the spreadsheet — a new row appears with a UUID, timestamp, your
   data and status **New**.
3. Submit the same message again immediately — the backend rejects it as a
   duplicate; the site shows the returned error honestly.

## Built-in protections

| Protection | Where |
|------------|-------|
| Required-field + email/phone format validation | Browser (`src/lib/contactValidation.ts`) **and** script |
| Control-character stripping, length caps, trimming | Both layers |
| **CAPTCHA challenge** (distorted SVG code, signed token, 10-min expiry) | `/api/captcha` + `/api/contact` |
| **Honeypot field** (hidden input must stay empty) | Browser + `/api/contact` |
| **Time-trap** (form must be open ≥ 2.5 s) | `/api/contact` |
| Per-IP rate limiting (5 submissions / 10 min) | Next.js API route |
| Shared origin token check | Apps Script `CONFIG.TOKEN` |
| Script lock (`LockService`) to serialize concurrent writes | Apps Script |
| Per-email rate limiting (30s) | Apps Script `PropertiesService` |
| Duplicate detection (signature of last 50 rows) | Apps Script |
| Success shown **only** on a confirmed `{"status":"success"}` response | Browser |
| Graceful failure messages for network/HTTP/validation errors | Browser |

### How the CAPTCHA works

1. `GET /api/captcha` renders a random 5-character code as a distorted SVG
   and returns a signed token. The token contains only
   `sha256(code | CAPTCHA_SECRET)` — the answer itself never leaves the
   server, so it cannot be read back from the token.
2. On submit, `/api/contact` recomputes the hash from the typed answer,
   verifies the HMAC signature and the 10-minute expiry
   (constant-time compare), and only then forwards the payload to Sheets.
3. Every failed attempt mints a fresh challenge automatically.

## Troubleshooting

- **"The form backend responded unexpectedly"** — the Web App URL is wrong or
  the deployment is not public. Re-check Step 3 access setting.
- **"The security code didn't match"** — the code is case-insensitive but
  must match exactly; every failed attempt generates a new code. If codes
  seem to fail persistently, make sure `CAPTCHA_SECRET` is identical across
  all running server instances.
- **CORS errors in console** — should not occur anymore: the browser only
  talks to the same-origin `/api/*` routes; the Apps Script call happens
  server-to-server.
- **Changed the script?** You must create a **new deployment** (or manage
  deployments → edit → new version) for changes to take effect.
- **Test quickly** — open the Web App URL in a browser: it should return
  `{"status":"success","message":"Portfolio contact backend is running."}`.
