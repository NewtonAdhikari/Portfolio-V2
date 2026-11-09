import { NextRequest, NextResponse } from "next/server";
import { verifyCaptchaSolution } from "@/lib/captcha";
import {
  sanitizeContactForm,
  validateContactForm,
  type ContactFormData,
} from "@/lib/contactValidation";

export const dynamic = "force-dynamic";

/**
 * POST /api/contact — single verification gateway for the contact form.
 *
 * Pipeline:
 *   1. Honeypot check (hidden field must stay empty).
 *   2. Time-trap check (form must have been open ≥ 2.5 s).
 *   3. CAPTCHA verification (stateless signed token — see src/lib/captcha.ts).
 *   4. Field validation + sanitization (shared rules with the browser).
 *   5. Per-IP rate limit (in-memory, best effort).
 *   6. Forward to the Google Apps Script Web App → Google Sheets.
 *
 * The Apps Script URL is read from SERVER env vars, so it is never bundled
 * into client JavaScript. Success is reported ONLY on a confirmed {status:
 * "success"} response from Apps Script.
 */

const MIN_FILL_MS = 2500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function reject(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return reject("Invalid request body.");
  }

  /* 1. Honeypot — real users never see this field. */
  const honeypot = String(body.honeypot ?? "");
  if (honeypot.trim() !== "") {
    return reject(
      "Submission could not be verified. Please refresh the page and try again."
    );
  }

  /* 2. Time trap. */
  const openedAt = Number(body.openedAt);
  if (!Number.isFinite(openedAt) || Date.now() - openedAt < MIN_FILL_MS) {
    return reject(
      "The form was submitted too quickly. Please take a moment to write your message, then try again."
    );
  }

  /* 3. CAPTCHA. */
  const captchaToken = String(body.captchaToken ?? "");
  const captchaAnswer = String(body.captchaAnswer ?? "");
  if (!captchaToken || !captchaAnswer.trim()) {
    return reject("Please complete the security check before sending.");
  }
  if (!verifyCaptchaSolution(captchaToken, captchaAnswer)) {
    return reject(
      "The security code didn't match. A new code has been generated — please try again."
    );
  }

  /* 4. Validation + sanitization (shared with the client). */
  const data: ContactFormData = {
    fullName: String(body.fullName ?? ""),
    email: String(body.email ?? ""),
    phone: body.phone ? String(body.phone) : "",
    subject: String(body.subject ?? ""),
    category: body.category as ContactFormData["category"],
    message: String(body.message ?? ""),
  };
  const errors = validateContactForm(data);
  if (Object.values(errors).some(Boolean) || !data.category) {
    return reject(
      "Some fields need attention before the message can be sent. Please review the form and try again."
    );
  }
  const payload = sanitizeContactForm(data);

  /* 5. Rate limit per IP. */
  const ip = clientIp(req);
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    return reject(
      "Too many messages from this connection. Please wait a few minutes and try again.",
      429
    );
  }
  recent.push(now);
  hits.set(ip, recent);

  /* 6. Forward to Google Apps Script → Google Sheets. */
  const endpoint =
    process.env.GS_WEBAPP_URL ?? process.env.NEXT_PUBLIC_GS_WEBAPP_URL;
  if (!endpoint) {
    return reject(
      "The form backend is not configured yet. The site owner needs to set GS_WEBAPP_URL — see docs/GOOGLE_SHEETS_SETUP.md.",
      503
    );
  }

  const gasPayload = JSON.stringify({
    token:
      process.env.GS_FORM_TOKEN ??
      process.env.NEXT_PUBLIC_GS_FORM_TOKEN ??
      "portfolio-contact",
    ...payload,
  });

  try {
    // text/plain avoids the Apps Script CORS preflight; this call is
    // server-to-server anyway, but keep parity with the documented setup.
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: gasPayload,
      redirect: "follow",
    });

    if (!res.ok) {
      return reject(
        `Submission failed (HTTP ${res.status}). Please try again or reach out via email.`,
        502
      );
    }

    const text = await res.text();
    let json: { status?: string; message?: string } | null = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (json?.status === "success") {
      return NextResponse.json({ ok: true });
    }
    if (json?.status === "error") {
      return reject(json.message ?? "Submission rejected by the backend.", 502);
    }
    return reject(
      "The form backend responded unexpectedly. Please verify the Apps Script deployment or contact me directly by email.",
      502
    );
  } catch {
    return reject(
      "Network error while submitting the form. Please check your connection and try again, or reach out via email.",
      502
    );
  }
}
