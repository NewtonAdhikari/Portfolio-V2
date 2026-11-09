/**
 * JSON-LD structured data (schema.org) injected once in the root layout.
 * Helps Google, Bing and other search engines understand who the author is
 * and how this site relates to their profiles.
 *
 * Social links containing placeholder markers (e.g. Google Scholar
 * "YOUR_ID") are filtered out so invalid URLs never reach crawlers.
 */
import { profile } from "@/data/profile";
import { siteUrl, ogImage } from "@/lib/site";

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;
const ogImageUrl = ogImage.url;

export function JsonLd() {
  const sameAs = profile.socials
    .map((s) => s.href)
    .filter((href) => !href.includes("YOUR_") && href.startsWith("http"));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: profile.name,
        url: siteUrl,
        email: `mailto:${profile.email}`,
        jobTitle: "Computer Science Engineering Student & Aspiring Researcher",
        description: profile.shortIntro,
        image: `${siteUrl}${ogImageUrl}`,
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "Large Language Models",
          "Causal Inference",
          "Trustworthy AI",
          "Software Development",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteUrl,
        name: `${profile.name} — Portfolio`,
        description: profile.headline,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        about: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        primaryImageOfPage: `${siteUrl}${ogImageUrl}`,
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // escape "<" so the payload can never break out of the script tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
