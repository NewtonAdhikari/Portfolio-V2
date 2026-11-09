"use client";

/**
 * Per-route SEO. In the SPA all pages share the document, so titles, meta
 * descriptions, Open Graph / Twitter tags and the canonical URL are kept in
 * sync on every navigation. When migrating to real Next.js routes each page
 * component can simply `export const metadata` instead (see
 * docs/DEPLOYMENT.md).
 */

import { siteUrl, ogImage } from "@/lib/site";

export type SeoInput = {
  title: string;
  description?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]`
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function applySeo({ title, description }: SeoInput) {
  if (typeof document === "undefined") return;

  document.title = title;

  // All hash routes share the canonical root URL ( crawlers ignore
  // URL fragments ), so deep links never create duplicate content.
  const canonical = `${siteUrl}/`;

  if (description) {
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:description", description);
  }

  upsertMeta("property", "og:title", title);
  upsertMeta("name", "twitter:title", title);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", "Aarav Sharma — Portfolio");
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:image", `${siteUrl}${ogImage.url}`);
  upsertMeta("property", "og:image:width", String(ogImage.width));
  upsertMeta("property", "og:image:height", String(ogImage.height));
  upsertMeta("property", "og:image:alt", ogImage.alt);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:image", `${siteUrl}${ogImage.url}`);

  upsertLink("canonical", canonical);
}
