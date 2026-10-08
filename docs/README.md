# AUREL — The Formulation Atelier

AUREL is a fictional premium skincare commerce concept — a flagship demonstration project built to show what a deliberate, editorially-led DTC storefront looks like end-to-end: art direction, brand platform, ecommerce UX, product detail design, cart/checkout, personalised discovery and frontend engineering.

The site runs in one of two explicit commerce modes:

- **DEMO mode (default)** — no credentials required. The catalogue is local typed data, checkout is a clearly-labelled preview, no payment is processed, no order is created.
- **SHOPIFY mode** — live Shopify Storefront API for catalogue, pricing, cart and Shopify-hosted checkout. Requires valid `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

> **Disclaimer.** AUREL is a fictional concept brand. Product names, reviews, statistics and clinical claims shown on this website are demonstration content for design and development purposes only and do not represent real medical advice or endorsements.

**Author:** hello-aditya.dev@gmail.com

---

## Table of contents

- [Quick start](#quick-start)
- [Demo mode vs Shopify mode](#demo-mode-vs-shopify-mode)
- [Tech stack](#tech-stack)
- [Local setup](#local-setup)
- [Environment variables](#environment-variables)
- [Commands](#commands)
- [Deployment](#deployment)
- [Testing](#testing)
- [Project structure](#project-structure)
- [Documentation index](#documentation-index)
- [Known limitations](#known-limitations)
- [Author](#author)

---

## Quick start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment configuration is required to run the site in DEMO mode.

---

## Demo mode vs Shopify mode

| Concern | DEMO mode (default) | SHOPIFY mode |
| --- | --- | --- |
| Catalogue source | Local typed data in `src/data/catalog.ts` | Live Shopify Storefront API |
| Credentials required | None | `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_ACCESS_TOKEN` |
| Cart | Zustand store persisted to `localStorage` | Zustand UI state; cart lines map to Shopify merchandise IDs |
| Checkout | `/checkout` demo preview — no payment, no order | Hand-off to Shopify-hosted checkout |
| Pricing | Static prices in `catalog.ts` | Authoritative Shopify prices |
| Subscriptions | Illustrative 15% label — no real recurring billing | Shopify selling plans |
| Reviews | Seeded illustrative content + browser-local submissions | Would require Shopify product reviews or a reviews backend |
| Free-shipping threshold | Illustrative `$75` | Real Shopify shipping configuration |

The active mode is resolved at build time from `src/lib/commerce/config.ts` and exposed as the `IS_DEMO` / `IS_SHOPIFY` flags. UI components branch on these flags to surface the correct language (e.g. the demo checkout disclosure banner, the subscription "demo" label, the cart's "View full bag" routing).

---

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript 5 (strict; `reactStrictMode` enabled; no `ignoreBuildErrors`)
- **Styling:** Tailwind CSS 4 with shadcn/ui (New York)
- **Motion:** Framer Motion (reduced-motion aware throughout)
- **State:** Zustand with `persist` middleware (cart, wishlist, compare, quiz, recently-viewed, reviews, Q&A, saved routines — all browser-persisted)
- **Icons:** Lucide React
- **Fonts:** Fraunces (editorial serif), Inter (sans), JetBrains Mono (technical) via `next/font`
- **Image:** AI-generated via `z-ai-web-dev-sdk`, served through `next/image`
- **Package manager:** Bun

---

## Local setup

```bash
# 1. Install dependencies
bun install

# 2. (Optional) configure environment
cp .env.example .env

# 3. Run the dev server (port 3000)
bun run dev
```

The dev server is also logged to `dev.log` for diagnostics.

### Demo mode setup

No environment variables are required. The site boots immediately with the local catalogue and a clearly-labelled demo checkout. This is the default.

### Shopify mode setup

1. Provision a Shopify development store and publish at least one product to the Headless sales channel.
2. Create a Storefront API access token (see [docs/commerce/SHOPIFY-SETUP.md](commerce/SHOPIFY-SETUP.md) for the full guide, including scopes and the public/private token split).
3. Populate `.env`:

   ```ini
   COMMERCE_MODE=shopify
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-public-storefront-token
   SHOPIFY_API_VERSION=2025-07
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_BASE_PATH=
   ```

4. Implement the Shopify provider against the same read surface as `src/lib/commerce/provider.ts` (the local provider is the contract).
5. Restart `bun run dev`.

> **Verification status:** The Shopify provider interface and configuration scaffolding are in place. Real-store verification against live credentials is **PENDING** — no merchant credentials were available in this build. See [docs/release/KNOWN-LIMITATIONS.md](release/KNOWN-LIMITATIONS.md).

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `COMMERCE_MODE` | No (defaults to `demo`) | `demo` or `shopify` |
| `SHOPIFY_STORE_DOMAIN` | Shopify mode only | e.g. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify mode only | Public Storefront API token (browser-safe) |
| `SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN` | Optional | Server-side-only token for privileged reads. **Never** expose under `NEXT_PUBLIC_`. |
| `SHOPIFY_API_VERSION` | No (defaults to `2025-07`) | Storefront API version |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for SEO/sitemap/OG |
| `NEXT_PUBLIC_BASE_PATH` | Optional | GitHub Pages project-site basePath (e.g. `/aurel-commerce`) |
| `STATIC_EXPORT` | Optional | `true` produces a static export for GitHub Pages |
| `NEXT_PUBLIC_CONTACT_URL` | Optional | Where the `/case-study` CTA links (defaults to `/contact`) |

A complete reference lives in `.env.example`.

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

## Deployment

### Vercel (Shopify mode)

The default `next build` produces a standalone Node server suitable for Vercel. Configure the Shopify environment variables in the Vercel project settings and deploy. This is the recommended target for live commerce.

### GitHub Pages (DEMO mode)

The site is static-exportable. Run the static export command above and push `out/` to a `gh-pages` branch. The included `scripts/deploy-gh-pages.sh` automates this. Images are served unoptimized in this mode (the optimization server cannot run on a static host).

---

## Testing

- **Lint:** `bun run lint` — ESLint flat config (`eslint.config.mjs`). Expected: 0 errors, 0 warnings.
- **Type check:** `bunx tsc --noEmit` — TypeScript strict mode, no `ignoreBuildErrors`.
- **Manual route verification:** Key routes (`/`, `/shop`, `/cart`, `/checkout`, `/diagnostic`, `/about`, `/journal`) return HTTP 200 in dev. See [docs/qa/QA-REPORT.md](qa/QA-REPORT.md) for the executed verification log.
- **Automated E2E / Lighthouse / axe:** Not executed in this build environment. See [docs/release/KNOWN-LIMITATIONS.md](release/KNOWN-LIMITATIONS.md).

---

## Project structure

```
src/
├── app/                     # App Router pages
│   ├── products/[slug]/     # Product detail
│   ├── shop/                # All products + filters + sort
│   ├── collections/[slug]/  # Collection detail
│   ├── cart/                # Dedicated /cart page
│   ├── checkout/            # Demo checkout preview
│   ├── diagnostic/          # Skin quiz + results
│   ├── ingredients/[slug]/  # Ingredient library
│   ├── concerns/[slug]/     # Concern pages
│   ├── systems/[slug]/      # Bundle detail
│   ├── journal/[slug]/      # Editorial articles
│   ├── approach/ about/     # Brand pages
│   ├── faq/ contact/        # Help pages
│   ├── case-study/          # Prospective-client page (not in consumer nav)
│   ├── privacy/ terms/      # Legal
│   ├── account/ wishlist/ compare/ recently-viewed/  # Personal surfaces
│   ├── sitemap.ts robots.ts # SEO
│   ├── layout.tsx           # Root layout (fonts, metadata, shell)
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

## Documentation index

| Document | Purpose |
| --- | --- |
| [architecture/ARCHITECTURE.md](architecture/ARCHITECTURE.md) | Modules, data flow, server/client boundaries, state ownership, tradeoffs |
| [commerce/SHOPIFY-SETUP.md](commerce/SHOPIFY-SETUP.md) | Development store, headless channel, Storefront API, selling plans, launch checklist |
| [design/DESIGN-SYSTEM.md](design/DESIGN-SYSTEM.md) | Visual philosophy, colour tokens, type scale, components, accessibility |
| [assets/ASSET-INVENTORY.md](assets/ASSET-INVENTORY.md) | AI asset art direction, categories, packaging consistency |
| [qa/QA-REPORT.md](qa/QA-REPORT.md) | Test commands, executed verification, defects repaired, outstanding items |
| [release/KNOWN-LIMITATIONS.md](release/KNOWN-LIMITATIONS.md) | Explicit honest list of demo-only / unverified features |
| [release/RELEASE-CHECKLIST.md](release/RELEASE-CHECKLIST.md) | Release readiness checklist with status markers |
| [case-study/CASE-STUDY.md](case-study/CASE-STUDY.md) | Portable case-study copy positioning the project |
| [marketing/WALKTHROUGH-PLAN.md](marketing/WALKTHROUGH-PLAN.md) | 75–120s screen-recording plan |

Legacy docs from earlier build phases: `docs/BRAND-SYSTEM.md`, `docs/DESIGN-SYSTEM.md`, `docs/COMMERCE-ARCHITECTURE.md`, `docs/ASSET-CREDITS.md`.

---

## Known limitations

A complete, honest list lives in [docs/release/KNOWN-LIMITATIONS.md](release/KNOWN-LIMITATIONS.md). Highlights:

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
