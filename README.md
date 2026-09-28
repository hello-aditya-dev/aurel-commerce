# AUREL

Premium fictional DTC skincare commerce concept.

AUREL is a fictional premium skincare ecommerce concept — a flagship demonstration project built to show prospective international DTC beauty clients what a $10k–$25k custom ecommerce website looks like: art direction, brand systems, ecommerce UX, merchandising, PDP design, cart optimization, personalised discovery and frontend engineering, end to end.

> **Disclaimer.** AUREL is a fictional concept brand. Product names, reviews, statistics and clinical claims shown on this website are demonstration content for design and development purposes only and do not represent real medical advice or endorsements.

---

## Overview

AUREL is positioned as **clinical skincare for stressed modern skin** — a barrier-first, evidence-led brand with eight primary products engineered to work as a single coherent routine. The site demonstrates:

- An editorial storefront with a brand-led homepage narrative
- A premium product detail page (PDP) with media gallery, ingredient storytelling, reviews, FAQ and complete-the-routine upsell
- Product discovery with filtering (concern, skin type, ingredient, type, price), sort and editorial collection headers
- A signature **skin diagnostic** — a five-question quiz that returns a deterministic AM/PM routine from the catalogue
- Routine results with editable protocol and add-all-to-cart
- A polished cart drawer with free-shipping progress, upsell and quantity controls
- Search with predictive results across products and ingredients
- A case-study page aimed at prospective clients (not linked from consumer nav)
- A working Shopify-compatible commerce abstraction with a mock provider fallback

## Experience

| Surface | What it demonstrates |
| --- | --- |
| Homepage | Editorial hero, bestsellers, brand statement, diagnostic intro, ingredient story, the AUREL method, brand film, results, bundle, social proof, journal, newsletter, dense footer |
| Product detail page | Media gallery, subscription / one-time selector, why-it-works, ingredient storytelling, texture, how-to-use, complete-the-routine, reviews, FAQ, mobile sticky purchase bar |
| Collection | Editorial header, sidebar filters (concern / skin type / category / price), sort, responsive grid, mobile filter drawer |
| Skin diagnostic | Five-step quiz with custom reactivity scale, deterministic routine computation |
| Routine results | AM/PM protocol, per-product rationale, editable routine, add-all-to-cart with 12% saving |
| Cart drawer | Free-shipping progress, line items, quantity, upsell, subtotal, demo checkout |
| Search | Predictive results across products + ingredients, suggested terms, empty state |
| Journal | Editorial index + long-form article with related products |
| Case study | For prospective clients — objective, design scope, engineering, metrics, tracked CTA |

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 with shadcn/ui (New York)
- **Motion:** Framer Motion (reduced-motion aware)
- **State:** Zustand (cart + quiz, with `persist` middleware)
- **Icons:** Lucide React
- **Fonts:** Fraunces (editorial serif), Inter (sans), JetBrains Mono (technical)
- **Commerce:** Shopify-compatible abstraction with mock/local provider
- **Package manager:** Bun

## Architecture

AUREL ships a clean commerce abstraction in `src/lib/commerce/`. The same application code works against either:

1. **Mock/local provider** (default) — typed catalog data in `src/data/catalog.ts`
2. **Shopify provider** (when `SHOPIFY_STORE_DOMAIN` + `SHOPIFY_STOREFRONT_ACCESS_TOKEN` env vars are set)

If Shopify credentials are unavailable, the site falls back to typed local demo data — the visible site remains fully functional. No external credential is ever required for the demo to run.

See [docs/COMMERCE-ARCHITECTURE.md](docs/COMMERCE-ARCHITECTURE.md) for the full provider contract and Shopify migration path.

## Getting Started

```bash
# Clone
git clone https://github.com/your-username/aurel-commerce.git
cd aurel-commerce

# Install
bun install

# Configure (optional — mock provider works with no env)
cp .env.example .env

# Run dev
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Mode

Without Shopify credentials, AUREL runs in demo mode against the typed local catalog. The cart, quiz, search, filtering and PDP all function normally. Checkout does not process real payments — it surfaces a clearly-labelled demo checkout state.

## Shopify Mode

To wire a real Shopify development store:

1. Create a Shopify development store with at least one product.
2. Create a Storefront API access token (Headless app).
3. Set in `.env`:
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
   ```
4. Implement the Shopify provider against the same surface as `src/lib/commerce/provider.ts`.
5. Restart `bun run dev`.

See [docs/COMMERCE-ARCHITECTURE.md](docs/COMMERCE-ARCHITECTURE.md) for the migration path.

## Asset Strategy

AUREL uses AI-generated original imagery for the entire visual universe — hero, product packshots, texture macros, ingredient macros and editorial moments. All images are generated as part of one cohesive art direction (warm bone background, soft natural studio lighting, museum-like composition).

In production, master assets would be 4K-quality source photographs with responsive AVIF / WebP derivatives served via `next/image`. The demo uses 1024×1024 PNGs optimized through `next/image` with `qualities: [75, 80, 85, 90]`.

External asset sources and licenses are documented in [docs/ASSET-CREDITS.md](docs/ASSET-CREDITS.md).

## Project Structure

```
src/
├── app/                     # App Router pages
│   ├── products/[slug]/     # PDP
│   ├── shop/                # All products + filtering
│   ├── collections/[slug]/  # Collection detail
│   ├── diagnostic/          # Skin quiz + results
│   ├── ingredients/[slug]/  # Ingredient library
│   ├── concerns/[slug]/     # Concern pages
│   ├── systems/[slug]/      # Bundle detail
│   ├── journal/[slug]/      # Editorial articles
│   ├── approach/ about/     # Brand pages
│   ├── faq/ contact/        # Help pages
│   ├── case-study/          # For prospective clients
│   ├── privacy/ terms/      # Legal
│   ├── account/ search/     # Misc
│   ├── sitemap.ts robots.ts # SEO
│   ├── layout.tsx           # Root layout (fonts, metadata, shell)
│   └── page.tsx             # Homepage
├── components/
│   ├── home/                # Homepage sections
│   ├── product/             # PDP components
│   ├── commerce/            # ProductCard, cart, filters, newsletter
│   ├── layout/              # Header, Footer, CartDrawer, SearchOverlay, MobileNav
│   ├── editorial/           # Section, Eyebrow
│   ├── motion/              # Reveal, StaggerGroup
│   └── case-study/
├── data/
│   └── catalog.ts           # Typed product/ingredient/bundle/collection/journal data
├── lib/
│   ├── commerce/            # Provider, cart-store, quiz-store
│   ├── analytics/           # Commerce event tracking
│   └── utils.ts
└── types/
    └── commerce.ts           # All commerce types
```

## Scripts

```bash
bun run dev       # Local dev server (port 3000)
bun run build     # Production build
bun run lint      # ESLint
bun run db:push   # Prisma schema push (if Prisma is used)
```

For GitHub Pages static export:

```bash
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/aurel-commerce bun run build
# Output: ./out/
```

## Performance

- Server Components for all catalog reads; client islands only for cart, search, quiz, PDP interactions
- `next/image` with AVIF/WebP, `qualities: [75, 80, 85, 90]`, lazy by default, `priority` only on critical above-fold media
- Framer Motion used selectively for hero, reveals, cart spring and gallery transitions — `prefers-reduced-motion` respected throughout
- Zustand `persist` with `localStorage` for cart and quiz — no server round-trips
- Fonts via `next/font` (subsetting, `display: swap`, no layout shift)

## Accessibility

- Semantic HTML throughout (`main`, `header`, `nav`, `section`, `article`, `footer`)
- Keyboard navigation across all interactive elements
- Visible focus states (`:focus-visible` with 1px outline)
- Dialog focus trapping and Escape-to-close (shadcn/ui Dialog/Sheet)
- ARIA labels on icon-only buttons
- `prefers-reduced-motion` honored by all Framer Motion components
- 44px+ touch targets on mobile
- Aimed at WCAG 2.2 AA where practical

## Deployment

AUREL is Vercel-ready (`next build` produces a standalone Node server). For GitHub Pages, use the static export mode (see Scripts above) and push `out/` to a `gh-pages` branch.

## Author

**Aditya** — independent ecommerce designer and senior frontend engineer.

---

AUREL is a fictional concept brand. Product names, reviews, statistics and clinical claims shown are demonstration content unless explicitly identified otherwise.
