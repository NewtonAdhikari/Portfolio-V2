import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Generated /sitemap.xml. The site ships as a single-page application with
 * hash URLs (crawlers ignore fragments), so the canonical entry is the root.
 * When migrating to native App Router routes (docs/DEPLOYMENT.md), add one
 * entry per route here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
