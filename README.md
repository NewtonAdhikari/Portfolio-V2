# Aarav Sharma — Premium 3D Animated CSE Portfolio

A production-ready personal portfolio for a Computer Science Engineering
student, researcher and technology enthusiast. Inspired by the visual language
of modern edu-tech sites (CampX): floating pill navigation, bold typography,
geometric grids, colorful 3D and elegant spacing — combined with a rigorous
academic content structure.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui ·
Framer Motion · Three.js / React Three Fiber · Lucide Icons · Google Apps
Script + Google Sheets (contact form backend)

---

## ✨ Features

| Area | Highlights |
|------|------------|
| **Home** | Animated hero with interactive 3D scene (metallic core, orbital rings, glowing particles, pointer parallax), floating badges, animated stat counters, featured research & projects, CTA band |
| **About** | Professional/personal introduction, academic journey timeline, "What Drives Me" interest grid, career objectives, philosophy, personal-info sidebar |
| **Research** | 8 research domains, live search, domain filters, detail pages with the full 16-section template (overview → abstract → methodology → architecture → datasets → results → references) |
| **Publications** | 7 categories, search + year + category filters, featured (golden) cards, DOI/citation blocks, copy-citation, per-publication detail pages |
| **Projects** | 8 categories, search + filter + sort, tech chips, per-project case study pages (overview → architecture → challenges → outcomes → future) |
| **Education** | Interactive animated timeline, clickable entries with dedicated detail pages, per-level coursework & achievements sections |
| **Experience** | Category-filtered timeline (internships, research, leadership, campus, volunteering) with detail pages |
| **Blog (DEV.to)** | Auto-synced from your DEV.to account via the public API — homepage "Insights, Ideas & My Learning Journey" section (3 latest), `/blog` with featured article, search, category/tag/date filters, popular topics, load-more, skeletons, empty/error states, last-updated indicator, auto-refresh, DEV.to profile & RSS links. Articles always open on DEV.to |
| **News & Updates** | Editable homepage newsroom section (`src/data/news.ts`) — milestones, publications, events with colored tags |
| **Skills** | 11 categorized skill cards with honest Beginner/Intermediate/Advanced labels and links to related projects/experience |
| **Achievements** | 7 categories, certificate gallery with modal viewer (styled certificate mock until real images are added), verification links |
| **Contact** | Split-screen layout, fully validated form, **self-hosted CAPTCHA** + honeypot + time-trap + rate limits, **Google Maps location embed** with Get Directions, Google Sheets + Apps Script storage, graceful error handling |
| **Global** | Announcement marquee, floating glass pill navbar with active-section pill, light/dark themes, loading screen, custom cursor glow (non-intrusive), back-to-top, scroll reveals, page transitions, per-route SEO + OG metadata, custom favicon, 404 page, privacy policy, sticky footer |

## 🚀 Getting started

```bash
bun install          # or npm install
cp .env.example .env.local   # fill values (see below)
bun run dev          # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|----------|---------|
| `GS_WEBAPP_URL` | **Server-side (preferred)** Google Apps Script Web App URL — never bundled into client JS |
| `GS_FORM_TOKEN` | Server-side shared origin token expected by the Apps Script backend |
| `CAPTCHA_SECRET` | Signing key for the self-hosted contact-form CAPTCHA (dev fallback exists) |
| `NEXT_PUBLIC_GS_WEBAPP_URL` | Optional public mirror of the Web App URL (drives the "SHEETS CONNECTED" badge) |
| `NEXT_PUBLIC_GS_FORM_TOKEN` | Legacy public token variable (kept for backward compatibility) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO/OG metadata |

**The site runs without them** — the contact form shows a clear
"SHEETS PENDING SETUP" state until configured. Full walkthrough:
[`docs/GOOGLE_SHEETS_SETUP.md`](docs/GOOGLE_SHEETS_SETUP.md).

## 📝 Blog (DEV.to) — configuration & publishing workflow

The blog is **frontend-only** and powered by the public DEV.to API. There is
no blog database, admin dashboard or custom backend — DEV.to is the single
source of truth.

1. Set your handle in **`src/data/profile.ts` → `devtoConfig.username`**
   (the only blog configuration there is).
2. Write and publish articles on <https://dev.to> as usual.
3. They appear automatically in the homepage section and on `/blog`:
   featured article, search, category/tag/date filters, load-more, reading
   time, reactions — all metadata from the API. "Read article" always opens
   the original DEV.to post; full content is never copied into this site.

Caching & refresh: fetched articles are cached for 3 minutes
(`cacheTtlMs`), the page re-fetches every 5 minutes while a visitor stays
(`refreshIntervalMs`), rate-limit/network failures fall back to the last
successful update with a visible notice, and a "Refresh now" button forces
a re-fetch. The News & Updates homepage section is separate and editable at
`src/data/news.ts`.

## 📍 Contact page location

The Google Maps embed on `/contact` is built from **`mapConfig.mapQuery`**
in `src/data/profile.ts` (keyless embed — no Maps API key needed). Change
that one string to your campus/city and both the map and the
"Get Directions" link update.

## 📁 Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts (Inter + Space Grotesk), global metadata, theme
│   ├── page.tsx              # SPA entry (sandbox preview exposes "/" only)
│   ├── icon.svg              # brand monogram (source for the favicon suite)
│   ├── robots.ts             # generated /robots.txt (follows NEXT_PUBLIC_SITE_URL)
│   ├── sitemap.ts            # generated /sitemap.xml
│   └── globals.css           # design system: brand tokens, grids, glass, utilities
├── components/
│   ├── PortfolioApp.tsx      # router + layout shell + route table + SEO
│   ├── layout/               # AnnouncementBar, Navbar, Footer, BackToTop,
│   │                         # LoadingScreen, CustomCursor, ThemeProvider
│   ├── three/                # React Three Fiber hero scene (+ lazy wrapper,
│   │                         # reduced-motion & WebGL fallbacks)
│   ├── shared/               # PageHero, Section, Timeline, StatCounter,
│   │                         # DetailShell, cards, badges, CoverArt, Reveal…
│   └── pages/                # 18 page components (home, about, research,
│                             # publications, projects, education, experience,
│                             # blog, skills, achievements, contact, privacy, 404)
├── data/                     # ★ ALL CONTENT LIVES HERE (the "CMS")
│   ├── profile.ts            # name, socials, stats, journey, philosophy,
│   │                         # DEV.to config (devtoConfig), map config
│   ├── news.ts               # homepage News & Updates entries
│   ├── research.ts           # research projects + 16-section details
│   ├── publications.ts       # publication records + detail sections
│   ├── projects.ts           # project records + case studies
│   ├── education.ts          # education entries + detail content
│   ├── experience.ts         # experience records + detail content
│   ├── skills.ts             # skill categories
│   └── achievements.ts       # achievements/certifications
├── app/api/                  # captcha (GET) + contact gateway (POST)
└── lib/                      # router, seo, contact, captcha, devto client

google-apps-script/Code.gs    # paste into Apps Script (Sheets backend)
docs/
├── GOOGLE_SHEETS_SETUP.md    # step-by-step form backend setup
└── DEPLOYMENT.md             # Vercel / self-host + route migration guide
public/                       # SEO & browser assets (see section below)
├── og-image.png               # 1200×630 Open Graph / Twitter share card
├── favicon.ico                # classic multi-size favicon (16/32/48)
├── favicon.svg / favicon-*.png # tab favicons
├── apple-touch-icon.png       # iOS home-screen icon (180×180)
├── icon-*.png / maskable-*    # Android / PWA icons (any + maskable)
├── mstile-*.png + browserconfig.xml # Microsoft tiles
├── safari-pinned-tab.svg      # Safari pinned-tab monochrome mark
└── site.webmanifest           # PWA manifest (name, theme, icons)
public/resume.pdf             # downloadable resume (generated sample)
```

### Adding content (no page code needed)

Every list and every detail page is generated from the data files. For
example, to add a research project: append an object to the array in
`src/data/research.ts` with its `slug`, meta and `sections` — the card on the
Research page and the full 16-section detail page are generated automatically.
The same is true for publications, projects, education, experience and
achievements.

> **Note on routing:** this sandbox preview exposes only the `/` route, so the
> site ships as a single-page application with hash URLs
> (`#/research/causal-llm-evaluation`). Deep links, refresh and browser
> back/forward all work. [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) documents
> the mechanical migration to native App Router routes when self-hosting.

## 🔍 SEO & cross-browser compatibility

The site ships with a complete, framework-level SEO layer:

- **Metadata** — title template, description, keywords, authors, canonical,
  Open Graph (with 1200×630 `og-image.png`), Twitter `summary_large_image`
  card, `robots` directives (`max-image-preview: large`, `max-snippet: -1`)
  and per-route syncing: every SPA navigation updates the title,
  description, OG/Twitter tags and canonical URL (`src/lib/seo.ts`).
- **Structured data** — schema.org JSON-LD `Person` + `WebSite` +
  `ProfilePage` graph injected in the root layout
  (`src/components/shared/JsonLd.tsx`). Placeholder social links (such as
  the Google Scholar `YOUR_ID` URL) are automatically excluded.
- **Icons for every browser/OS** — `favicon.ico` (16/32/48) for legacy
  browsers, PNG favicons for Chrome/Firefox/Edge, SVG for modern tabs,
  `apple-touch-icon` for iOS, `any` + `maskable` 192/512 icons for Android,
  `mstile-*` + `browserconfig.xml` for Windows tiles, and a monochrome
  `safari-pinned-tab.svg`.
- **PWA manifest** — `public/site.webmanifest` (install to home screen on
  Android/Chrome).
- **Crawlers** — generated `/robots.txt` and `/sitemap.xml`
  (`src/app/robots.ts`, `src/app/sitemap.ts`) that always follow
  `NEXT_PUBLIC_SITE_URL`.

**After deploying:** set `NEXT_PUBLIC_SITE_URL` to your real domain, then
validate at <https://search.google.com/test/rich-results>, the Facebook
Sharing Debugger and <https://cards-dev.twitter.com/validator>. To add
Search Console / Bing verification, extend the `metadata` object in
`src/app/layout.tsx` with a `verification` block.

The icon suite and share card are generated — edit `src/app/icon.svg` or
`scripts/make_og_assets.py`, then re-run:

```bash
node scripts/generate_seo_assets.mjs
python3 scripts/make_og_assets.py
```

## ⚠️ Sample content disclaimer

All personal data (name "Aarav Sharma", institutions, statistics,
publications, achievements, links) is **editable sample content** provided so
the template looks complete. Replace it with real records in `src/data/` —
nothing else needs to change. Research results that would normally come from
actual experiments are deliberately shown as "to be updated" placeholders
instead of fabricated numbers, and the same policy applies to any content you
add.

## 🎨 Design system

| Token | Value | Use |
|-------|-------|-----|
| Deep Blue `#21108F` | primary | headings, primary surfaces, active pills |
| Royal Blue `#3156C8` | secondary | links, secondary accents, gradients |
| Red `#E52436` | accent | CTAs, highlights, active states |
| Orange `#FF8A24` | accent | kickers, warm highlights |
| Golden `#D4AF37` | premium | featured publications, certificates |
| Black `#101014` | premium | hero bands, footer, dark sections |
| Mist `#F8F9FC` / White | base | content-heavy page backgrounds |
| Slate `#626779` | text | secondary copy |

Typography: **Space Grotesk** (display) + **Inter** (body). Grid backgrounds,
glassmorphism, gradient sheens and geometric blobs are provided as utilities
in `globals.css` (`.bg-grid`, `.glass`, `.text-gradient`, `.blob`, …).

## 🧩 Scripts

```bash
bun run dev      # development server (port 3000)
bun run lint     # eslint
bun run build    # production build (standalone output)
bun run start    # run the production build
```

## 🔒 Privacy & form security

See `src/lib/contact.ts` and `google-apps-script/Code.gs` — validation,
sanitization, origin token, rate limiting and duplicate detection on both the
client and the script, with honest error states (success is shown only after a
confirmed backend response). The privacy policy page reflects this behavior.
