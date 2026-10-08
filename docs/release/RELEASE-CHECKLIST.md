# AUREL — Release Checklist

Status markers: **[x]** done · **[~]** partial · **[ ]** pending

This checklist reflects the actual state of the AUREL build as documented in [docs/qa/QA-REPORT.md](../qa/QA-REPORT.md), [docs/release/KNOWN-LIMITATIONS.md](../release/KNOWN-LIMITATIONS.md), [docs/architecture/ARCHITECTURE.md](../architecture/ARCHITECTURE.md), [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md), [docs/design/DESIGN-SYSTEM.md](../design/DESIGN-SYSTEM.md) and [docs/assets/ASSET-INVENTORY.md](../assets/ASSET-INVENTORY.md).

---

## 1. Creative quality

- [x] Brand platform defined ("The Formulation Atelier", "Care, considered.")
- [x] Editorial art direction established (Fraunces serif, warm bone background, near-black ink, muted sage accent)
- [x] AUREL Formula Index signature device implemented (`src/components/editorial/formula-index.tsx`)
- [x] Homepage with 13 editorial sections (hero, bestsellers, recently-viewed rail, brand statement, diagnostic intro, ingredient story, method, film, results, bundle, social proof, journal, newsletter)
- [x] Hero copy refined to brand platform
- [x] Announcement bar with honest demo messaging (no fabricated urgency)
- [x] Editorial section rhythm with hairline dividers and generous vertical spacing
- [x] Cohesive AI-generated imagery across hero, packshots, textures, ingredient macros and editorial still-life
- [x] Packaging identity consistent per product across the catalogue (see [docs/assets/ASSET-INVENTORY.md](../assets/ASSET-INVENTORY.md) §4)
- [x] Case-study page with real screenshots and tracked CTA

## 2. Functional commerce

- [x] Catalogue: 8 products, 4 bundles, 4 collections, 8 ingredients, 6 journal articles
- [x] Shop with filters (concern, skin type, category, ingredient, price) and sort
- [x] Product detail pages (PDP) with gallery, variants, ingredient storytelling, FAQ, reviews, Q&A, complete-the-routine upsell
- [x] Cart drawer with free-shipping progress, quantity controls, upsell, share-cart
- [x] Dedicated `/cart` page with full line-item review
- [x] `/checkout` demo preview page with honest "Demonstration only" disclosure
- [x] Honest subscription labelling ("Subscribe & save 15% (demo)" + illustrative-pricing note)
- [x] Skin diagnostic quiz with deterministic AM/PM routine compute
- [x] Routine results with editable protocol, add-all-to-cart, save-as-PDF
- [x] Routine builder (`/build-routine`) with routine score and save-to-account
- [x] Wishlist, compare (max 3), recently-viewed (cap 8), share-wishlist, share-routine
- [x] Quick-view modal, predictive search overlay (Cmd+K), keyboard shortcuts help (?)
- [x] Account page with local demo tabs (Profile, Wishlist, Reviews, Recently viewed, Orders, Settings, Saved routines)
- [x] Ingredient compatibility checker
- [x] Two-mode commerce config (`src/lib/commerce/config.ts`): DEMO default, SHOPIFY optional
- [~] Shopify Storefront API provider implemented against the provider contract — **interface specified, real-store verification PENDING credentials** (see [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md) §15)
- [ ] Real Shopify checkout hand-off verified end-to-end
- [ ] Real Shopify selling plans (subscriptions) verified

## 3. Supporting experience

- [x] About page, Approach page, Method section
- [x] Journal index + 6 long-form articles with related products
- [x] FAQ page
- [x] Contact page (frontend demonstration form)
- [x] Case study page (prospective clients, not in consumer nav)
- [x] Privacy, Terms, Accessibility legal pages
- [x] Sitemap (`src/app/sitemap.ts`) and robots (`src/app/robots.ts`)
- [x] 404 page (`src/app/not-found.tsx`)
- [x] OpenGraph cards (`og-default.jpg`, `og-case-study.jpg`) with AUREL wordmark + tagline
- [x] Favicon set (SVG, 16×16, 32×32, apple-touch-icon, 192, 512) + manifest
- [x] Brand identity assets (`public/brand/` wordmark + monogram, light variants)
- [x] Mobile nav, mobile sticky purchase bar, mobile-optimized quick view
- [x] Back-to-top floating button, scroll progress indicator
- [x] Rotating announcement bar (6s cycle, reduced-motion aware)
- [x] Customer review submission (browser-local, with photo upload)
- [x] Product Q&A with helpful/not-helpful voting
- [ ] Real reviews backend (currently seeded + browser-local)
- [ ] Real contact/newsletter form backend (currently frontend demonstration)
- [ ] Real account/auth backend (currently local demo)

## 4. Engineering

- [x] Next.js 16 App Router + React 19 + TypeScript 5 (strict)
- [x] Tailwind CSS 4 with shadcn/ui (New York)
- [x] Zustand + `persist` for all client state (cart, wishlist, compare, quiz, recently-viewed, reviews, Q&A, saved routines)
- [x] Framer Motion (reduced-motion aware throughout)
- [x] `reactStrictMode: true` in `next.config.ts`
- [x] No `typescript.ignoreBuildErrors`, no `eslint.ignoreDuringBuilds`
- [x] Server components for catalogue/editorial; client components for interactive commerce
- [x] `generateStaticParams` on every dynamic route (static-export compatible)
- [x] `<Suspense>` wrapping for routes that read `useSearchParams`
- [x] `img()` helper for basePath-aware image URLs (GitHub Pages compatible)
- [x] Two build modes in `next.config.ts`: standalone (Vercel) + static export (GitHub Pages)
- [x] `.env` removed from git tracking; `.env.example` documents every variable
- [x] Repository organized (96 QA screenshots relocated to `docs/qa/`)
- [~] ESLint clean — **1 pre-existing error in `cart-drawer.tsx`** (see [docs/qa/QA-REPORT.md](../qa/QA-REPORT.md) §2.1)
- [~] TypeScript clean — **2 pre-existing errors in `cart-view.tsx`** (see [docs/qa/QA-REPORT.md](../qa/QA-REPORT.md) §2.2)
- [ ] Unit tests (no test runner configured)
- [ ] E2E tests (Playwright not configured)

## 5. Accessibility & performance

- [x] Semantic HTML throughout (`main`, `header`, `nav`, `section`, `article`, `footer`)
- [x] Keyboard navigation with vim-style `g`-prefix shortcuts + `Cmd+K` / `Cmd+.` / `?` / `Esc`
- [x] Visible `:focus-visible` outline (1px solid foreground, 2px offset)
- [x] Dialog focus trapping and Escape-to-close (Radix Dialog/Sheet)
- [x] ARIA labels on every icon-only button
- [x] `sr-only` descriptions on every Radix Dialog/Sheet (no `Missing aria-describedby` warnings)
- [x] `prefers-reduced-motion` honored globally + per Framer Motion component
- [x] 44px+ touch targets on mobile
- [x] Safe-area insets (`.pb-safe`, `.pt-safe`) on sticky bars
- [x] Print stylesheet for routine-results Save-as-PDF
- [x] WCAG 2.2 AA targeted where practical
- [x] `next/image` with `qualities: [75, 80, 85, 90]`, `formats: ["image/avif", "image/webp"]`
- [x] `next/font` with `display: "swap"` and Latin subsetting (no layout shift)
- [ ] axe automated audit (not configured)
- [ ] Lighthouse performance budget (not configured)
- [ ] AVIF/WebP derivatives for static export (currently unoptimized PNGs on GitHub Pages)

## 6. Commercial integrity

- [x] DEMO mode default — no real payments, no real orders, no real subscriptions
- [x] `/checkout` page renders explicit "Demonstration only" disclosure
- [x] Honest completion screen with no fabricated order ID
- [x] Subscription labelled "(demo)" with "illustrative demo pricing — not a real recurring plan" note
- [x] Free-shipping $75 threshold documented as `// illustrative` in `config.ts`
- [x] Reviews labelled as seeded + browser-local (not verified purchases)
- [x] Newsletter/contact forms documented as frontend demonstrations
- [x] Account features documented as local demo
- [x] "Dermatologist tested" and similar claims documented as fictional demonstration content
- [x] Pricing documented as illustrative
- [x] Bundle savings documented as illustrative
- [x] Return policy documented as illustrative
- [x] Inventory always "in stock" in DEMO mode (documented)
- [x] Taxes shown as "Calculated at checkout" (documented)
- [x] Full known-limitations list in [docs/release/KNOWN-LIMITATIONS.md](../release/KNOWN-LIMITATIONS.md)

## 7. Delivery items

- [x] Source code in repository (synced from prior `aurel-commerce` GitHub repo)
- [x] `docs/README.md` — project README with demo vs Shopify section
- [x] `docs/architecture/ARCHITECTURE.md` — modules, data flow, server/client boundary, provider contract
- [x] `docs/commerce/SHOPIFY-SETUP.md` — full Shopify integration runbook
- [x] `docs/design/DESIGN-SYSTEM.md` — visual philosophy, tokens, type scale, components, accessibility
- [x] `docs/assets/ASSET-INVENTORY.md` — AI asset art direction + categories + packaging consistency
- [x] `docs/qa/QA-REPORT.md` — executed verification + defects + outstanding items
- [x] `docs/release/KNOWN-LIMITATIONS.md` — explicit honest limitation list
- [x] `docs/release/RELEASE-CHECKLIST.md` — this checklist
- [x] `docs/case-study/CASE-STUDY.md` — portable case-study copy
- [x] `docs/marketing/WALKTHROUGH-PLAN.md` — 75–120s screen-recording plan
- [x] Root `README.md` updated as concise overview pointing to `docs/`
- [x] Worklog appended with Task ID 2 entry
- [~] Lint clean — 1 pre-existing error to fix
- [~] Type check clean — 2 pre-existing errors to fix
- [ ] Git push to feature branch (deferred to orchestrator)
- [ ] Playwright / Lighthouse / axe automated test suites
- [ ] Real Shopify store verification with merchant credentials

---

## Summary

| Section | Done | Partial | Pending |
| --- | --- | --- | --- |
| 1. Creative quality | 10 | 0 | 0 |
| 2. Functional commerce | 17 | 1 | 2 |
| 3. Supporting experience | 18 | 0 | 3 |
| 4. Engineering | 16 | 2 | 2 |
| 5. Accessibility & performance | 12 | 0 | 3 |
| 6. Commercial integrity | 14 | 0 | 0 |
| 7. Delivery items | 12 | 2 | 4 |
| **Total** | **99** | **5** | **14** |

The AUREL concept showcase is delivery-ready as a DEMO-mode storefront. The outstanding work is concentrated in three areas: (1) the two pre-existing lint/type errors, (2) the automated test suites (Playwright / Lighthouse / axe), and (3) the real Shopify Storefront API provider implementation and verification against merchant credentials.
