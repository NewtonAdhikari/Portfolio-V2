/**
 * ═══════════════════════════════════════════════════════════════════════
 *  GOOGLE APPS SCRIPT BACKEND — Portfolio Contact Form → Google Sheets
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  HOW TO DEPLOY (full walkthrough in docs/GOOGLE_SHEETS_SETUP.md):
 *   1. Create a Google Spreadsheet with the columns below (row 1 headers).
 *   2. Extensions → Apps Script, paste this entire file, Save.
 *   3. Update CONFIG below (SPREADSHEET_ID optional if bound, TOKEN value).
 *   4. Deploy → New deployment → type "Web app":
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Copy the Web App URL into NEXT_PUBLIC_GS_WEBAPP_URL (.env.local) and
 *      set NEXT_PUBLIC_GS_FORM_TOKEN to the same TOKEN value below.
 *
 *  SECURITY MODEL
 *   - No secrets live in the frontend. The shared TOKEN is a lightweight
 *     origin check (not a secret credential) that stops naive spam bots.
 *   - The script validates, sanitizes, rate-limits and de-duplicates every
 *     submission before touching the sheet.
 */

var CONFIG = {
  // Leave blank if this script is BOUND to the spreadsheet (Extensions →
  // Apps Script from inside the sheet). Otherwise paste the spreadsheet ID
  // from its URL: https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
  SPREADSHEET_ID: "",
  SHEET_NAME: "Submissions",
  // Must match NEXT_PUBLIC_GS_FORM_TOKEN in the website's environment.
  TOKEN: "portfolio-contact",
  // Rate limiting: minimum seconds between submissions per email.
  MIN_INTERVAL_SECONDS: 30,
};

var HEADERS = [
  "Submission ID",
  "Submission Date & Time",
  "Full Name",
  "Email Address",
  "Phone Number",
  "Subject",
  "Inquiry Category",
  "Message",
  "Submission Status",
];

var CATEGORIES = [
  "Research Collaboration",
  "Project Collaboration",
  "Internship Opportunities",
  "Job Opportunities",
  "Academic Discussion",
  "General Inquiry",
];

/* ── POST handler ─────────────────────────────────────── */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000); // serialize concurrent writes
  } catch (err) {
    return json({ status: "error", message: "Server busy. Try again shortly." });
  }

  try {
    var data = parseBody(e);

    // 1. Shared token check (blocks naive off-site spam).
    if (data.token !== CONFIG.TOKEN) {
      return json({ status: "error", message: "Invalid request origin." });
    }

    // 2. Validate.
    var errors = validate(data);
    if (errors.length) {
      return json({ status: "error", message: errors.join(" ") });
    }

    // 3. Sanitize.
    var clean = sanitize(data);

    // 4. Spam protection: rate limit + duplicate detection.
    var sheet = getSheet();
    if (isRateLimited(sheet, clean.email)) {
      return json({ status: "error", message: "Too many submissions. Please wait a minute and try again." });
    }
    if (isDuplicate(sheet, clean)) {
      return json({ status: "error", message: "This exact message was already received." });
    }

    // 5. Append row.
    sheet.appendRow([
      Utilities.getUuid(),
      new Date(),
      clean.fullName,
      clean.email,
      clean.phone,
      clean.subject,
      clean.category,
      clean.message,
      "New",
    ]);

    // Keep the sheet tidy: bold header, frozen row, sensible widths.
    formatSheet_(sheet);

    // Record timestamp for per-email rate limiting.
    stamp(clean.email);

    return json({ status: "success", message: "Submission stored." });
  } catch (err) {
    return json({ status: "error", message: "Unexpected server error." });
  } finally {
    lock.releaseLock();
  }
}

/* Optional: GET health check — open the Web App URL in a browser. */
function doGet() {
  return json({ status: "success", message: "Portfolio contact backend is running." });
}

/* ── Helpers ──────────────────────────────────────────── */
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseBody(e) {
  if (!e || !e.postData) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return {};
  }
}

function validate(d) {
  var errors = [];
  if (!d.fullName || String(d.fullName).trim().length < 2 || String(d.fullName).length > 80) {
    errors.push("Invalid name.");
  }
  if (!d.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(d.email).trim())) {
    errors.push("Invalid email.");
  }
  if (d.phone && !/^[+()\-\s\d]{7,20}$/.test(String(d.phone).trim())) {
    errors.push("Invalid phone number.");
  }
  if (!d.subject || String(d.subject).trim().length < 2 || String(d.subject).length > 120) {
    errors.push("Invalid subject.");
  }
  if (CATEGORIES.indexOf(d.category) === -1) {
    errors.push("Invalid inquiry category.");
  }
  if (!d.message || String(d.message).trim().length < 20 || String(d.message).length > 3000) {
    errors.push("Message must be 20–3000 characters.");
  }
  return errors;
}

function sanitize(d) {
  function clean(s, max) {
    return String(s == null ? "" : s)
      .replace(/[\u0000-\u001F\u007F]/g, " ")
      .replace(/\s{3,}/g, "  ")
      .trim()
      .slice(0, max);
  }
  return {
    fullName: clean(d.fullName, 80),
    email: clean(d.email, 120).toLowerCase(),
    phone: clean(d.phone, 20),
    subject: clean(d.subject, 120),
    category: d.category,
    message: clean(d.message, 3000),
  };
}

function getSheet() {
  var ss = CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function isRateLimited(sheet, email) {
  var last = PropertiesService.getScriptProperties().getProperty("last:" + email);
  if (!last) return false;
  return (Date.now() - Number(last)) < CONFIG.MIN_INTERVAL_SECONDS * 1000;
}

function isDuplicate(sheet, clean) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var rows = sheet
    .getRange(2, 3, lastRow - 1, 6)
    .getValues(); // name, email, phone, subject, category, message
  var sig = clean.fullName + "|" + clean.email + "|" + clean.subject + "|" + clean.message;
  for (var i = rows.length - 1; i >= Math.max(0, rows.length - 50); i--) {
    var r = rows[i];
    var rowSig = r[0] + "|" + r[1] + "|" + r[3] + "|" + r[5];
    if (rowSig === sig) return true;
  }
  return false;
}

function formatSheet_(sheet) {
  if (sheet.getLastRow() === 1) {
    var header = sheet.getRange(1, 1, 1, HEADERS.length);
    header.setFontWeight("bold").setBackground("#21108F").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(8, 420);
  }
  // record timestamp for rate limiting
  // (called right after successful appendRow by doPost via this helper? keep simple:)
}

/* NOTE on rate limiting storage: mark the timestamp after a successful write.
   doPost calls stamp() right after appendRow. */
function stamp(email) {
  PropertiesService.getScriptProperties().setProperty("last:" + email, String(Date.now()));
}
