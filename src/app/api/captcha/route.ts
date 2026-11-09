import { NextResponse } from "next/server";
import { generateCaptchaCode, issueCaptchaToken, renderCaptchaSvg } from "@/lib/captcha";

export const dynamic = "force-dynamic";

/**
 * GET /api/captcha
 * Returns a fresh SVG challenge + signed verification token.
 * The token contains only sha256(code|secret) — the answer itself never
 * leaves the server, so the SVG cannot be "read back" from the token.
 */
export async function GET() {
  const code = generateCaptchaCode();
  const { token, expiresAt } = issueCaptchaToken(code);

  return NextResponse.json(
    {
      svg: renderCaptchaSvg(code),
      token,
      expiresAt,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
