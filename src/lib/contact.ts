"use client";

/**
 * Google Sheets contact-form integration — client side.
 *
 * Flow: validate → sanitize → POST /api/contact (which verifies the
 * CAPTCHA, honeypot and time-trap, then forwards to the Google Apps
 * Script Web App configured in SERVER env vars) → show success only on a
 * confirmed OK response.
 *
 * Nothing secret is embedded in the frontend. See docs/GOOGLE_SHEETS_SETUP.md.
 */

import {
  INQUIRY_CATEGORIES,
  sanitizeContactForm,
  validateContactForm,
  type ContactFormData,
  type InquiryCategory,
} from "@/lib/contactValidation";

// Re-exported so existing imports keep working.
export {
  INQUIRY_CATEGORIES,
  sanitizeContactForm,
  validateContactForm,
};
export type { ContactFormData, InquiryCategory };

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

/** CAPTCHA + anti-spam solution produced by the contact form UI. */
export type CaptchaSolution = {
  /** Signed challenge token from GET /api/captcha. */
  token: string;
  /** The characters the visitor typed. */
  answer: string;
  /** Hidden honeypot field value (must stay empty for humans). */
  honeypot: string;
  /** Epoch ms when the form was opened (server enforces a minimum). */
  openedAt: number;
};

/** Track recent submissions (in-memory) for basic duplicate protection. */
let lastSignature = "";
let lastSignatureAt = 0;

export function isSheetsIntegrationConfigured() {
  // The Next.js API route may be configured with either the private
  // GS_WEBAPP_URL or the legacy public NEXT_PUBLIC_GS_WEBAPP_URL.
  // The public variable doubles as the UI badge hint.
  return Boolean(
    process.env.NEXT_PUBLIC_GS_WEBAPP_URL || process.env.GS_WEBAPP_URL
  );
}

export async function submitContactForm(
  data: ContactFormData,
  captcha: CaptchaSolution
): Promise<SubmitResult> {
  const payload = sanitizeContactForm(data);

  // Basic duplicate / spam protection (client side; the server re-checks).
  const signature = JSON.stringify(payload);
  const now = Date.now();
  if (signature === lastSignature && now - lastSignatureAt < 60_000) {
    return {
      ok: false,
      error:
        "This message was just submitted. Please wait a minute before sending it again.",
    };
  }
  if (now - lastSignatureAt < 8_000) {
    return {
      ok: false,
      error: "Please wait a few seconds before sending another message.",
    };
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        captchaToken: captcha.token,
        captchaAnswer: captcha.answer,
        honeypot: captcha.honeypot,
        openedAt: captcha.openedAt,
      }),
    });

    let json: { ok?: boolean; error?: string } | null = null;
    try {
      json = await res.json();
    } catch {
      json = null;
    }

    if (res.ok && json?.ok) {
      lastSignature = signature;
      lastSignatureAt = now;
      return { ok: true };
    }

    return {
      ok: false,
      error:
        json?.error ??
        `Submission failed (HTTP ${res.status}). Please try again or reach out via email.`,
    };
  } catch {
    return {
      ok: false,
      error:
        "Network error while submitting the form. Please check your connection and try again, or reach out via email.",
    };
  }
}
