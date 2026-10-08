# AUREL

AUREL is a fictional premium skincare commerce concept — a flagship demonstration project built to show what a deliberate, editorially-led DTC storefront looks like end-to-end. It runs in one of two explicit commerce modes: **DEMO mode** (default, no credentials, local catalogue, clearly-labelled demo checkout, no payment) or **SHOPIFY mode** (live Storefront API, Shopify-hosted checkout).

> **Disclaimer.** AUREL is a fictional concept brand. Product names, reviews, statistics and clinical claims shown on this website are demonstration content for design and development purposes only and do not represent real medical advice or endorsements.

**Author:** hello-aditya.dev@gmail.com

---

## Demo mode vs Shopify mode

| Concern | DEMO mode (default) | SHOPIFY mode |
| --- | --- | --- |
| Catalogue | Local typed data in `src/data/catalog.ts` | Live Shopify Storefront API |
| Credentials | None required | `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_ACCESS_TOKEN` |
| Cart | Zustand + `localStorage` | Zustand UI state mapping to Shopify merchandise IDs |
| Checkout | `/checkout` demo preview — no payment, no order | Hand-off to Shopify-hosted checkout |
| Subscriptions | Illustrative 15% label — no recurring billing | Shopify selling plans |
| Reviews | Seeded illustrative content + browser-local | Requires reviews backend |

The active mode is resolved from `src/lib/commerce/config.ts` and exposed as `IS_DEMO` / `IS_SHOPIFY`. UI components branch on these flags.

---

## Quick start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment configuration is required to run the site in DEMO mode.

---

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript 5 (strict; `reactStrictMode` enabled; no `ignoreBuildErrors`)
- **Styling:** Tailwind CSS 4 with shadcn/ui (New York)
- **Motion:** Framer Motion (reduced-motion aware throughout)
- **State:** Zustand with `persist` middleware (cart, wishlist, compare, quiz, recently-viewed, reviews, Q&A, saved routines — all browser-persisted)
- **Fonts:** Fraunces (editorial serif), Inter (sans), JetBrains Mono (technical) via `next/font`
- **Image:** AI-generated via `z-ai-web-dev-sdk`, served through `next/image`
- **Package manager:** Bun

---

## Commands

```bash
bun run dev       # Local dev server on port 3000 (logs to dev.log)
bun run build     # Production build (standalone)
bun run lint      # ESLint
bun run db:push   # Prisma schema push (only if Prisma is used)
```

Static export for GitHub Pages:

```bash
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/aurel-commerce bun run build
# Output: ./out/
```

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `COMMERCE_MODE` | No (defaults to `demo`) | `demo` or `shopify` |
| `SHOPIFY_STORE_DOMAIN` | Shopify mode only | e.g. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify mode only | Public Storefront API token (browser-safe) |
| `SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN` | Optional | Server-side-only token. **Never** expose under `NEXT_PUBLIC_`. |
| `SHOPIFY_API_VERSION` | No (defaults to `2025-07`) | Storefront API version |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for SEO/sitemap/OG |
| `NEXT_PUBLIC_BASE_PATH` | Optional | GitHub Pages project-site basePath (e.g. `/aurel-commerce`) |
| `STATIC_EXPORT` | Optional | `true` produces a static export for GitHub Pages |

Full reference: `.env.example`.

---

## Deployment

- **Vercel (Shopify mode):** `next build` produces a standalone Node server. Configure Shopify env vars in the Vercel project settings.
- **GitHub Pages (DEMO mode):** `STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/aurel-commerce bun run build`, then push `out/` to a `gh-pages` branch. `scripts/deploy-gh-pages.sh` automates this.

---

## Documentation

Full documentation lives in [`docs/`](docs/):

- [docs/README.md](docs/README.md) — Project README (setup, env, commands, deployment)
- [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md) — Modules, data flow, server/client boundary, provider contract
- [docs/commerce/SHOPIFY-SETUP.md](docs/commerce/SHOPIFY-SETUP.md) — Full Shopify integration runbook
- [docs/design/DESIGN-SYSTEM.md](docs/design/DESIGN-SYSTEM.md) — Visual philosophy, tokens, type scale, accessibility
- [docs/assets/ASSET-INVENTORY.md](docs/assets/ASSET-INVENTORY.md) — AI asset art direction + categories
- [docs/qa/QA-REPORT.md](docs/qa/QA-REPORT.md) — Executed verification + defects + outstanding items
- [docs/release/KNOWN-LIMITATIONS.md](docs/release/KNOWN-LIMITATIONS.md) — Explicit honest limitation list
- [docs/release/RELEASE-CHECKLIST.md](docs/release/RELEASE-CHECKLIST.md) — Release readiness checklist
- [docs/case-study/CASE-STUDY.md](docs/case-study/CASE-STUDY.md) — Portable case-study copy
- [docs/marketing/WALKTHROUGH-PLAN.md](docs/marketing/WALKTHROUGH-PLAN.md) — 75–120s screen-recording plan

Legacy docs from earlier build phases: [`docs/BRAND-SYSTEM.md`](docs/BRAND-SYSTEM.md), [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md), [`docs/COMMERCE-ARCHITECTURE.md`](docs/COMMERCE-ARCHITECTURE.md), [`docs/ASSET-CREDITS.md`](docs/ASSET-CREDITS.md).

---

## Project structure

```
src/
├── app/                     # App Router pages
│   ├── products/[slug]/     # PDP
│   ├── shop/                # All products + filters + sort
│   ├── collections/[slug]/  # Collection detail
│   ├── cart/                # Dedicated /cart page
│   ├── checkout/            # Demo checkout preview
│   ├── diagnostic/          # Skin quiz + results
│   ├── ingredients/[slug]/  # Ingredient library
│   ├── concerns/ systems/   # Taxonomy surfaces
│   ├── journal/[slug]/      # Editorial articles
│   ├── about/ approach/     # Brand pages
│   ├── faq/ contact/        # Help pages
│   ├── case-study/          # Prospective-client page (not in consumer nav)
│   ├── account/ wishlist/ compare/ recently-viewed/  # Personal surfaces
│   ├── privacy/ terms/      # Legal
│   ├── sitemap.ts robots.ts # SEO
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   ├── home/                # Homepage editorial sections
│   ├── product/             # PDP components
│   ├── commerce/            # ProductCard, cart, filters, wishlist, compare
│   ├── cart/                # /cart + /checkout views
│   ├── layout/              # Header, Footer, CartDrawer, SearchOverlay, MobileNav
│   ├── editorial/           # Section, Eyebrow, FormulaIndex
│   ├── motion/              # Reveal, StaggerGroup
│   └── case-study/
├── data/catalog.ts          # Typed product/ingredient/bundle/collection/journal data
├── lib/
│   ├── commerce/            # config, provider, cart-store, quiz-store, etc.
│   ├── analytics/           # Commerce event tracking
│   ├── img.ts               # basePath-aware image URL helper
│   └── utils.ts
└── types/commerce.ts        # All commerce types
```

---

## Known limitations

A complete, honest list lives in [docs/release/KNOWN-LIMITATIONS.md](docs/release/KNOWN-LIMITATIONS.md). Highlights:

- Commerce is in DEMO mode by default — no real payments, orders or recurring subscriptions.
- The Shopify provider is architecturally specified but real-store verification is pending credentials.
- Reviews are seeded illustrative content + browser-local submissions, not verified purchases.
- Newsletter / contact forms are frontend demonstrations.
- Account features are local demo.
- Playwright / Lighthouse / axe automated suites were not executed in this build environment.
- "Dermatologist tested" and similar product attributes are fictional demonstration claims, not certifications.

---

## Author

**Aditya** — hello-aditya.dev@gmail.com

AUREL is a fictional concept brand. Product names, reviews, statistics and clinical claims shown are demonstration content unless explicitly identified otherwise.
