import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from "crypto";

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SERVER-SIDE CAPTCHA (stateless, no external service)
 * ─────────────────────────────────────────────────────────────────────────
 *  Contact-form bot protection required by the spec ("spam protection").
 *
 *  Flow:
 *   1. GET /api/captcha → renders a distorted SVG code + issues a signed
 *      token. The token carries only sha256(code|secret) — never the code
 *      itself — so the answer cannot be extracted client-side.
 *   2. POST /api/contact → verifies the answer against the token
 *      (HMAC-signed, time-limited, constant-time compare), then forwards
 *      the sanitized payload to Google Apps Script.
 *
 *  No state is stored server-side: the token is self-verifying and expires
 *  after TTL_MS. Set CAPTCHA_SECRET in production to rotate the signing key.
 */

const SECRET =
  process.env.CAPTCHA_SECRET ?? "portfolio-captcha-local-dev-secret-change-me";
const TTL_MS = 10 * 60 * 1000; // 10 minutes per challenge

/** Unambiguous charset — no I/1/L, O/0 pairs. */
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function sha256(input: string): Buffer {
  return createHash("sha256").update(input).digest();
}

function hmac(input: string): Buffer {
  return createHmac("sha256", SECRET).update(input).digest();
}

export function generateCaptchaCode(length = 5): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CHARSET[bytes[i] % CHARSET.length];
  }
  return out;
}

function normalizeAnswer(answer: string): string {
  return answer.trim().toUpperCase().replace(/\s+/g, "");
}

/** Issue a signed, self-verifying token for a challenge code. */
export function issueCaptchaToken(code: string): {
  token: string;
  expiresAt: number;
} {
  const expiresAt = Date.now() + TTL_MS;
  const codeHash = b64url(sha256(`${normalizeAnswer(code)}|${SECRET}`));
  const sig = b64url(hmac(`${codeHash}.${expiresAt}`));
  return { token: `${codeHash}.${expiresAt}.${sig}`, expiresAt };
}

/** Constant-time verification of a submitted answer against its token. */
export function verifyCaptchaSolution(
  token: string,
  answer: string
): boolean {
  if (typeof token !== "string" || typeof answer !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [codeHash, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;

  // Signature must match (recompute — do not trust client).
  const expectedSig = b64url(hmac(`${codeHash}.${exp}`));
  const sigBuf = Buffer.from(sig);
  const expSigBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expSigBuf.length || !timingSafeEqual(sigBuf, expSigBuf)) {
    return false;
  }

  // Answer hash must match the challenge hash.
  const answerHash = Buffer.from(b64url(sha256(`${normalizeAnswer(answer)}|${SECRET}`)));
  const hashBuf = Buffer.from(codeHash);
  if (answerHash.length !== hashBuf.length) return false;
  return timingSafeEqual(answerHash, hashBuf);
}

/* ── SVG challenge renderer ────────────────────────────────────────────── */

const PALETTE = ["#21108F", "#3156C8", "#E52436", "#FF8A24"];

function rand(min: number, max: number): number {
  return randomInt(min, max + 1);
}

/** Render the challenge code as a distorted, noise-filled SVG. */
export function renderCaptchaSvg(code: string): string {
  const W = 240;
  const H = 88;

  // Per-character glyphs: position, rotation, size, colour.
  const glyphs = code
    .split("")
    .map((ch, i) => {
      const x = 28 + i * ((W - 56) / (code.length - 1 || 1));
      const y = 56 + rand(-7, 7);
      const rot = rand(-22, 22);
      const size = 36 + rand(0, 9);
      const color = PALETTE[rand(0, PALETTE.length - 1)];
      return `<text x="${x}" y="${y}" font-family="Verdana, Geneva, sans-serif" font-size="${size}" font-weight="800" fill="${color}" text-anchor="middle" transform="rotate(${rot} ${x} ${y})" letter-spacing="2">${ch}</text>`;
    })
    .join("");

  // Wavy strike-through lines.
  const waves = Array.from({ length: 3 }, (_, i) => {
    const y = 20 + i * 24 + rand(-6, 6);
    const c1y = y + rand(-26, 26);
    const c2y = y + rand(-26, 26);
    const color = PALETTE[rand(0, PALETTE.length - 1)];
    return `<path d="M -10 ${y} C ${W * 0.3} ${c1y}, ${W * 0.7} ${c2y}, ${W + 10} ${y}" stroke="${color}" stroke-width="${(rand(10, 22) / 10).toFixed(1)}" fill="none" opacity="0.45" stroke-linecap="round"/>`;
  }).join("");

  // Noise dots.
  const dots = Array.from({ length: 70 }, () => {
    const cx = rand(0, W);
    const cy = rand(0, H);
    const color = PALETTE[rand(0, PALETTE.length - 1)];
    return `<circle cx="${cx}" cy="${cy}" r="${(rand(6, 14) / 10).toFixed(1)}" fill="${color}" opacity="0.3"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Security code challenge">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8F9FC"/>
      <stop offset="100%" stop-color="#EEF1FB"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="12" fill="url(#bg)"/>
  <g opacity="0.14" stroke="#21108F" stroke-width="1">
    ${[1, 2, 3, 4, 5].map((i) => `<line x1="0" y1="${(H / 6) * i}" x2="${W}" y2="${(H / 6) * i}"/>`).join("")}
  </g>
  ${dots}
  ${waves}
  ${glyphs}
</svg>`;
}
