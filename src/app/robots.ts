import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Generated /robots.txt — replaces the former static public/robots.txt so
 * the Sitemap URL always follows NEXT_PUBLIC_SITE_URL.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // Explicitly welcome the crawlers that render social/preview cards.
        userAgent: [
          "Googlebot",
          "Bingbot",
          "DuckDuckBot",
          "Twitterbot",
          "facebookexternalhit",
          "LinkedInBot",
          "Slackbot",
          "WhatsApp",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
