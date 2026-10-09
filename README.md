# Emerg Technologies — website

Premium, motion-first website for Emerg Technologies (Liberia). Next.js 16 (App Router, Cache Components), TypeScript strict, Tailwind v4, Motion for React, Lucide.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck && npm test
npm run build && npm start
```
`npm run typecheck` needs route types; run `npx next typegen` (or a build) first on a fresh clone.

## Environment (`.env.example`)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production domain: canonicals, sitemap, OG URLs |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional mailto fallback shown if the form cannot send |
| `NEXT_PUBLIC_COPYRIGHT_YEAR` | Footer year (default 2026) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery via Resend |

Without the Resend variables the contact API returns `503 not_configured` and the form tells the visitor the message was **not sent**. It never fakes success.

## Deploy to Vercel
Import the repo, set the variables above, deploy. No paid services are required (Resend has a free tier).

## Editing content
- Products and their honest status: `src/data/products.ts` (live / early-access / prototype / in-development / concept). Only mark `live` after verifying the URL.
- Services, industries, process: `src/data/services.ts`. Company, nav, legal date: `src/data/company.ts`.
- Logo: `npm run brand` regenerates `public/brand/*.svg`, `src/app/icon.svg` and the geometry module.

## Notes
- The globe is a lightweight Canvas 2D render (no WebGL) with a server-rendered SVG fallback and a still frame for reduced motion.
- Privacy and Terms are plain-language drafts and need review by qualified counsel.
- Competitor research: `docs/competitor-research.md`.
