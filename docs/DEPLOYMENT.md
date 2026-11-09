# Deployment Guide

The site is a standard Next.js 16 (App Router, TypeScript) application and
deploys anywhere Next.js runs — **Vercel is recommended**.

## Option A — Vercel (recommended)

1. Push the project to a GitHub/GitLab repository.
2. Go to <https://vercel.com> → **Add New Project** → import the repository.
3. Framework preset is detected automatically (Next.js). No build overrides
   are needed: `next build` + default settings.
4. Add environment variables (Project → Settings → Environment Variables):

   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_GS_WEBAPP_URL` | your Apps Script `/exec` URL (see GOOGLE_SHEETS_SETUP.md) |
   | `NEXT_PUBLIC_GS_FORM_TOKEN` | same value as `CONFIG.TOKEN` in Code.gs |
   | `NEXT_PUBLIC_SITE_URL` | your final domain, e.g. `https://aarav.dev` |

5. Deploy. Every push to `main` creates a production deployment; other
   branches get preview URLs.

> **Important:** after changing `NEXT_PUBLIC_*` variables, redeploy — they
> are inlined into the client bundle at build time.

## Option B — Self-hosted (Node)

```bash
bun install         # or npm ci
bun run build       # npm run build
bun run start       # starts .next/standalone server on :3000
```

Put the process behind nginx/Caddy with TLS, set the same env variables, and
point `NEXT_PUBLIC_SITE_URL` at the public origin.

## Option C — Static-friendly hosting note

The portfolio ships as a single-page application using hash-based routing
(`#/research/slug`) so it works on **any** static host (GitHub Pages, S3,
Netlify) with zero server config. Deep links, back/forward and refresh all
work because the fragment never reaches the server.

### Migrating to real routes (optional, recommended long-term)

The content architecture is already route-ready: every page is a component in
`src/components/pages/` and all content lives in `src/data/`. To switch from
hash routing to native Next.js routes on Vercel:

1. For each entry in the route table in
   `src/components/PortfolioApp.tsx`, create the matching App Router page:

   ```
   src/app/page.tsx                        → already exists (renders <HomePage/>)
   src/app/about/page.tsx                  → renders <AboutPage/>
   src/app/research/page.tsx               → renders <ResearchPage/>
   src/app/research/[slug]/page.tsx        → params.slug → <ResearchDetailPage/>
   src/app/publications/[slug]/page.tsx    → ...same pattern
   src/app/projects/[slug]/page.tsx
   src/app/education/[slug]/page.tsx
   src/app/experience/[slug]/page.tsx
   src/app/achievements/[slug]/page.tsx
   src/app/skills/page.tsx
   src/app/contact/page.tsx
   src/app/privacy/page.tsx
   ```

2. In each new page, `export const metadata` from the SEO strings already
   defined in `PortfolioApp.tsx` (replaces the per-route `applySeo` calls).
3. Replace the `useRoute().navigate()` calls with `<Link href="…">` — the
   hrefs are identical (`/research/causal-llm-evaluation` works as-is).
4. Add `export function generateStaticParams()` to `[slug]` pages using the
   data arrays (`researchItems`, `publications`, …) for full SSG.

Because list/detail rendering, filters and content are already componentized,
this migration is mechanical and does not touch the data layer.

## Post-deployment checklist

- [ ] Contact form submits → row appears in the Google Sheet
- [ ] Wrong URL shows the 404 page
- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain (correct OG tags)
- [ ] Resume link (`/resume.pdf`) works — replace `public/resume.pdf`
      with your real resume (the current one is generated sample content)
- [ ] Favicon (`src/app/icon.svg`) — replace with a personal monogram
- [ ] Light/dark theme toggle works on the deployed domain
