# AUREL — Architecture

This document describes the major modules of AUREL, the data flow between them, the server/client rendering boundary, the commerce provider contract, state ownership, caching, error handling and the engineering tradeoffs that shaped the build.

For the Shopify migration path specifically, see [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md). For the type contract, see `src/types/commerce.ts`.

---

## 1. Module map

```
src/
├── app/                          # Next.js App Router — route definitions
│   ├── layout.tsx                # Root layout: fonts (Inter, Fraunces, JetBrains Mono),
│   │                             #   metadata, viewport, SiteShell, Toaster
│   ├── page.tsx                  # Homepage — composes 13 editorial sections
│   ├── products/[slug]/page.tsx  # PDP — server component reads provider
│   ├── shop/page.tsx             # Catalogue — server-side filter + sort
│   ├── collections/[slug]/       # Curated collections
│   ├── cart/page.tsx             # Dedicated /cart (client view)
│   ├── checkout/page.tsx         # Demo checkout preview (client view)
│   ├── diagnostic/               # Quiz (client) + /results (client + deterministic compute)
│   ├── ingredients/              # Ingredient library + detail
│   ├── concerns/ systems/        # Taxonomy surfaces
│   ├── journal/                  # Editorial index + long-form article
│   ├── about/ approach/ faq/ contact/  # Brand + help surfaces
│   ├── case-study/               # Prospective-client page (not in consumer nav)
│   ├── account/ wishlist/ compare/ recently-viewed/  # Personal surfaces
│   ├── privacy/ terms/ accessibility/  # Legal
│   ├── search/                   # Predictive search page
│   ├── sitemap.ts robots.ts      # SEO
│   └── not-found.tsx             # 404
│
├── components/
│   ├── home/         # 13 homepage sections (Hero, Bestsellers, BrandStatement, …)
│   ├── product/      # PDP: gallery, purchase-panel, reviews, Q&A, recently-viewed rail,
│   │                 #   compatibility-checker, complete-routine, mobile-sticky-purchase
│   ├── commerce/     # ProductCard, collection-grid, quick-view, wishlist/compare buttons,
│   │                 #   filter-drawer, bundle-add-button, newsletter-form, loaders
│   ├── cart/         # cart-view.tsx (/cart) + checkout-view.tsx (/checkout demo)
│   ├── layout/       # site-shell, header, footer, cart-drawer, search-overlay,
│   │                 #   mobile-nav, announcement-bar, keyboard-help, back-to-top,
│   │                 #   scroll-progress, wordmark
│   ├── editorial/    # section.tsx (Eyebrow/Section wrapper) + formula-index.tsx
│   ├── motion/       # reveal.tsx (Reveal, RevealText, StaggerGroup)
│   ├── case-study/   # cta-button.tsx (analytics-tracked client island)
│   └── ui/           # shadcn/ui primitives (button, dialog, sheet, drawer, …)
│
├── data/catalog.ts   # Typed local catalogue: 8 products, 4 bundles, 4 collections,
│                     #   8 ingredients, 6 journal articles
│
├── lib/
│   ├── commerce/
│   │   ├── config.ts         # COMMERCE_MODE, IS_DEMO, IS_SHOPIFY, SHOPIFY_CONFIG,
│   │   │                     #   DEMO_CONFIG, shopifyMissingConfig(), SHOPIFY_READY
│   │   ├── provider.ts       # Synchronous local read API (the provider contract)
│   │   ├── cart-store.ts     # Zustand + persist (cart lines, open/close, qty, variant)
│   │   ├── quiz-store.ts     # Zustand + persist (diagnostic answers + step)
│   │   ├── wishlist-store.ts # Zustand + persist
│   │   ├── compare-store.ts  # Zustand + persist (max 3)
│   │   ├── recently-viewed-store.ts  # Zustand + persist (cap 8)
│   │   ├── user-reviews-store.ts     # Zustand + persist (browser-local review submissions)
│   │   ├── product-qa-store.ts       # Zustand + persist (seeded + user Q&A)
│   │   ├── saved-routines-store.ts   # Zustand + persist (account-level saved routines)
│   │   ├── routine-score.ts          # Pure scoring helper for the routine builder
│   │   ├── share-cart.ts             # URL-encode/decode cart state (?cart=)
│   │   ├── share-wishlist.ts         # URL-encode/decode wishlist (?wishlist=)
│   │   └── share-routine.ts          # URL-encode/decode a saved routine (?routine=)
│   ├── analytics/index.ts    # track() dispatcher → window custom events
│   ├── img.ts                # basePath-aware image URL prefixer
│   ├── db.ts                 # Prisma client (used only if a Prisma schema is active)
│   └── utils.ts              # cn() classname merge
│
├── hooks/                    # use-mobile, use-toast
└── types/commerce.ts         # All commerce types (Product, Collection, Bundle,
                              #   Ingredient, CartLine, QuizAnswer, RoutineResult, …)
```

---

## 2. Data flow

### Catalogue reads (server)

1. A server component (PDP, collection, shop, ingredients, journal) imports `src/lib/commerce/provider.ts`.
2. The provider imports the typed catalogue from `src/data/catalog.ts` synchronously and returns `Product` / `Collection` / `Bundle` / `Ingredient` instances.
3. The server component renders the editorial chrome (hero, gallery, ingredient story, FAQ) as static HTML and hands only the interactive islands (purchase panel, gallery state, reviews, Q&A) to client components.

### Cart mutations (client)

1. A client component calls `useCart().add(product, { variant })`.
2. `cart-store.ts` updates the persisted Zustand store; `partialize` ensures only `lines` are persisted to `localStorage` under the key `aurel-cart`.
3. Subscribed components (cart-drawer count badge, `/cart` view, mobile sticky purchase bar) re-render from the same store.
4. The cart drawer routes the user to `/checkout` (demo) or `/cart` (shopify) per the active `COMMERCE_MODE`.

### Diagnostic → routine (client → pure compute → client)

1. The quiz step state lives in `quiz-store.ts`.
2. On completion, `/diagnostic/results` calls `computeRoutine(answers)` (pure function in `provider.ts`).
3. The routine is rendered as AM/PM protocol with rationale. The user may edit the routine and "Add all to bag" which calls `useCart().addMany(slugs, variant)`.

---

## 3. Server / client boundary

AUREL leans on the App Router's default of server components and isolates client JavaScript to genuinely interactive surfaces.

**Server components (default):**
- Homepage, PDP shell, shop, collections, ingredients, journal, about, approach, faq, contact, case-study, legal pages, sitemap, robots.
- All catalogue reads happen here — no client-side data fetching for catalogue content.

**Client components (`"use client"`):**
- All Zustand stores and their consumers (cart drawer, `/cart`, `/checkout`, wishlist, compare, recently-viewed, account).
- Interactive PDP islands: gallery, purchase panel, mobile sticky purchase, write-review dialog, product Q&A section, compatibility checker, complete-routine rail.
- Search overlay, command palette, mobile nav, keyboard-help overlay.
- Motion wrappers (`reveal.tsx`) that depend on `IntersectionObserver` / scroll position.
- `cta-button.tsx` on the case study (the only client island on that page — needed for analytics).

This split keeps the interactive JS surface small: a PDP ships the gallery, purchase panel, reviews and Q&A as client islands, while the editorial storytelling, ingredient copy, FAQ and how-to-use remain server-rendered HTML.

---

## 4. Commerce provider interface

`src/lib/commerce/provider.ts` is the single entry point for catalogue reads. It is **synchronous and local** — it returns from in-memory typed data. The contract a Shopify provider must implement:

```ts
// Products
getAllProducts(): Product[]
getProductBySlug(slug: string): Product | undefined
getProductsBySlugs(slugs: string[]): Product[]
getBestsellers(limit?: number): Product[]
getFeaturedProducts(limit?: number): Product[]

// Collections
getAllCollections(): Collection[]
getCollectionBySlug(slug: string): Collection | undefined
getProductsForCollection(slug: string): Product[]

// Bundles
getAllBundles(): Bundle[]
getBundleBySlug(slug: string): Bundle | undefined
getBundleByProductSlugs(slugs: string[]): Bundle | undefined

// Ingredients
getAllIngredients(): Ingredient[]
getIngredientBySlug(slug: string): Ingredient | undefined
getIngredientsForProduct(productSlug: string): Ingredient[]
getProductsForIngredient(ingredientSlug: string): Product[]

// Search
searchProducts(query: string): Product[]
searchAll(query: string): { products: Product[]; ingredients: Ingredient[] }

// Routine compute (pure)
computeRoutine(answers: QuizAnswer): RoutineResult

// Pricing
formatPrice(value: number, currency?: string): string
subscriptionPrice(price: number): number
```

A Shopify implementation would replace this module with async Storefront API calls (GraphQL), map the responses to the same `Product` / `Collection` / `Bundle` / `Ingredient` types from `src/types/commerce.ts`, and re-export the same function signatures. Server components would become `async` and `await` the provider; the client islands that consume the data would receive the same props and require no changes.

---

## 5. Commerce configuration

`src/lib/commerce/config.ts` is the single source of truth for the active mode.

```ts
export type CommerceMode = "demo" | "shopify";

export const COMMERCE_MODE: CommerceMode;       // from process.env.COMMERCE_MODE || "demo"
export const IS_DEMO: boolean;
export const IS_SHOPIFY: boolean;

export const SHOPIFY_CONFIG = {
  domain: string;           // SHOPIFY_STORE_DOMAIN
  publicToken: string;      // SHOPIFY_STOREFRONT_ACCESS_TOKEN  (browser-safe)
  privateToken: string;     // SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN (server-only, NEVER in NEXT_PUBLIC_)
  apiVersion: string;       // SHOPIFY_API_VERSION, default "2025-07"
};

export const DEMO_CONFIG = {
  freeShippingThreshold: 75,                  // illustrative
  subscriptionIllustrativeDiscount: 0.15,     // illustrative — NOT a real billing plan
  currency: "USD",
};

export function shopifyMissingConfig(): string[];   // returns missing required env names
export const SHOPIFY_READY: boolean;                // IS_SHOPIFY && no missing config
```

Key rules enforced by the file's comments and behaviour:

- **DEMO mode must never claim a real transaction occurred.** UI components use `IS_DEMO` to render the demo disclosure banner, the "Subscribe & save 15% (demo)" label, and the "No payment processed" copy on the completion screen.
- **SHOPIFY mode must surface a clear setup error** rather than silently reverting to simulation. `shopifyMissingConfig()` returns the list of missing required environment variables; consumers can render a setup screen instead of a fake checkout.
- **Private tokens must never be exposed to the browser.** `SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN` is read server-side only and must never be prefixed with `NEXT_PUBLIC_`.

---

## 6. State ownership

All persistent client state is Zustand + `persist` middleware, stored under namespaced keys in `localStorage`. There is no server-side session store in this build.

| Store | Key | Persisted shape | Notes |
| --- | --- | --- | --- |
| `cart-store.ts` | `aurel-cart` | `{ lines }` | Lines keyed by `${variant}-${slug}`; bundles use `bundle-` prefix |
| `quiz-store.ts` | `aurel-quiz` | answers + step | Defensive `Math.min(step, 4)` on read to handle stale state |
| `wishlist-store.ts` | `aurel-wishlist` | slugs | Header badge + red dot when populated |
| `compare-store.ts` | `aurel-compare` | slugs | Hard cap at 3 |
| `recently-viewed-store.ts` | `aurel-recently-viewed` | slugs | Cap 8, LIFO |
| `user-reviews-store.ts` | `aurel-user-reviews` | per-product review arrays | Merged with seeded catalog reviews at render time |
| `product-qa-store.ts` | `aurel-product-qa` | per-product Q&A | Seeded with illustrative Q&A + user submissions |
| `saved-routines-store.ts` | `aurel-saved-routines` | named routine presets | Used by the routine builder + account page |

`hasHydrated` flags guard against SSR/CSR mismatches: every consumer renders a skeleton until `onRehydrateStorage` fires, then renders the persisted state.

---

## 7. Rendering approach

- **Server components** carry the editorial weight — homepage sections, PDP storytelling, ingredient copy, FAQ, journal articles, case study. These render to static HTML and ship no client JS beyond the React runtime.
- **Client components** are reserved for genuinely interactive surfaces (see §3). Framer Motion is used selectively — hero parallax, scroll reveals, cart spring, gallery transitions, AnimatePresence for the compare bar — and every motion component respects `prefers-reduced-motion` via the global `@media (prefers-reduced-motion: reduce)` reset in `globals.css`.
- **Static export compatibility** — every dynamic route (`/products/[slug]`, `/collections/[slug]`, `/ingredients/[slug]`, `/journal/[slug]`, `/systems/[slug]`, `/concerns/[slug]`) exports `generateStaticParams` so the static-export build can pre-render them. Routes that read `useSearchParams` are wrapped in `<Suspense>` to satisfy the static-export constraint.

---

## 8. Caching

- Catalogue reads are synchronous in-memory lookups; there is no fetch cache to manage in demo mode.
- `next/image` is configured with `qualities: [75, 80, 85, 90]` and `formats: ["image/avif", "image/webp"]`. In static export mode `unoptimized: true` is set because the optimization server cannot run.
- Metadata uses `metadataBase` (origin only — `img()` adds the basePath separately to avoid a doubled prefix).
- Fonts are loaded via `next/font` with `display: "swap"` and subset to Latin; no layout shift.

A future Shopify provider would introduce `fetch` caching concerns. Recommended approach: tag-based revalidation against Shopify webhooks (product update, inventory change) with a sensible default `revalidate` window for catalogue reads.

---

## 9. Error handling

- **Server-side:** Missing required Shopify configuration is surfaced via `shopifyMissingConfig()` rather than swallowed. Consumers can render a setup screen with the missing variable names.
- **Client-side:** Hydration guards (`hasHydrated`) prevent flashes of empty state and `NaN` totals before persisted cart data is available.
- **Defensive reads:** `quiz-store` clamps `step` on read; `cart-store` filters zero-quantity lines; `compare-store` enforces the 3-item cap on every mutation.
- **Build hardening:** `reactStrictMode: true`, no `typescript.ignoreBuildErrors`, no `eslint.ignoreDuringBuilds`. Type errors fail the build.
- **Accessibility errors:** Radix Dialog/Sheet components are paired with `sr-only` `Description` elements to silence the `Missing aria-describedby` warning. Custom `showCloseButton={false}` prop on `SheetContent`/`DialogContent` prevents duplicate close controls.

---

## 10. AUREL Formula Index — signature identity device

`src/components/editorial/formula-index.tsx` is a small graphic organisational system that visually connects storytelling and commerce across the site. It renders a restrained, monospaced editorial mark:

```
A / 03 — RESTORE
FORM / CREAM · RITUAL / AM + PM
```

Three variants are exported:

- `<FormulaIndex variant="stacked">` (default) — index + label on the first line, form + ritual on the second; an `aria-label` describes the full mark for assistive tech.
- `<FormulaIndex variant="inline">` — single horizontal line, used inside dense information panels.
- `<FormulaIndex variant="minimal">` — index + label only, used in compact contexts.
- `<FormulaIndexRule>` — a chapter divider that places a minimal Formula Index between two hairlines, used between editorial sections.

This is a graphic system, not a decorative element pasted into every component. It is used selectively to reinforce hierarchy on product labels, information panels, routine recommendations and editorial chapter transitions. It is the single most identifiable "AUREL" signature device in the UI.

---

## 11. Engineering tradeoffs

| Decision | Rationale | Tradeoff |
| --- | --- | --- |
| Synchronous local provider in demo mode | Server components stay simple (no `async`/`await`); the catalogue is small enough to hold in memory | A Shopify provider will require an async rewrite — but only in `provider.ts`; consumers stay unchanged |
| Zustand + `localStorage` for all client state | Zero server round-trips, instant hydration, no auth backend required for the demo | State is per-browser only; cross-device sync requires a real account backend |
| Static export support (GitHub Pages) | Lets the demo deploy with no infrastructure | Forfeits server-side image optimization and Shopify server-only routes |
| `reactStrictMode: true` + no `ignoreBuildErrors` | Catches effect double-fires and type regressions in dev | Required fixing the quiz step-overrun bug and the cart `count` destructure bug found in earlier rounds |
| Editorial server components + small client islands | Keeps the JS budget low on long-form pages | Some prop drilling from server → client island; mitigated by co-locating island components with their pages |
| AI-generated imagery via `z-ai-web-dev-sdk` | A cohesive, license-clean visual universe for a fictional brand | Master assets are 1024×1024 PNGs; production would replace with 4K photography + AVIF/WebP derivatives |
| Two-mode commerce config (`config.ts`) | Honest separation of demo vs live; never silently simulates a real transaction | Adds branching to UI components; mitigated by centralizing the branches in `IS_DEMO`/`IS_SHOPIFY` flags |

---

## 12. Future architecture work

- Implement the Shopify Storefront API provider against the contract in §4, then flip `COMMERCE_MODE=shopify`.
- Introduce a server-side session/account backend for cross-device cart + wishlist sync.
- Add Shopify webhook-driven cache invalidation for catalogue reads.
- Replace the local seeded reviews/Q&A with a real reviews backend (Shopify product reviews or a dedicated service).
- Add AVIF/WebP derivative generation for the static export target (currently unoptimized PNGs).
- Introduce Playwright E2E + axe + Lighthouse CI to close the automated-test gap (see [docs/qa/QA-REPORT.md](../qa/QA-REPORT.md)).
