/**
 * Canonical site URL shared by metadata, robots, sitemap, JSON-LD and the
 * client-side per-route SEO updater. Set NEXT_PUBLIC_SITE_URL in .env.local
 * to your production domain (see docs/DEPLOYMENT.md).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.example.com"
).replace(/\/+$/, "");

/** The 1200×630 social share card (Open Graph / Twitter). */
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Aarav Sharma — CSE Student, Researcher & Technology Enthusiast",
} as const;
