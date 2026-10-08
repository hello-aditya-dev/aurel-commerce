# AUREL — Case Study

A flagship demonstration of the studio's premium ecommerce offering, positioned at the $3,995+ tier for international DTC beauty clients.

> AUREL is a fictional concept brand. Product names, reviews, statistics and clinical claims shown on the storefront are demonstration content for design and development purposes only. This case study describes the build, not a real merchant's results.

---

## Objective

The objective was to transform a skincare concept — barrier-first, evidence-led, ritual-driven — into a storefront that feels both editorially distinctive and technically credible. The brief was not "build a Shopify theme." It was "show what a $3,995+ custom commerce engagement looks like end-to-end": art direction, brand platform, ecommerce UX, product detail design, cart and checkout thinking, personalised discovery, supporting editorial surfaces, and the engineering discipline to make it all deployable as either a static showcase or a live Shopify-backed store.

The audience for this case study is the prospective client — a skincare founder or brand team evaluating studio capability. The audience for the storefront itself is the brand's customer: a buyer who expects the same level of consideration from the website that they expect from the formulation.

## Approach

The approach paired three deliberate moves.

**1. Editorial art direction.** AUREL was given the visual language of an editorial atelier rather than a typical DTC beauty site. Fraunces serif carries the headlines; Inter carries the body; JetBrains Mono carries the technical metadata. The palette is narrow and mineral — a warm bone off-white background (`oklch(0.975 0.008 75)`), near-black ink, a muted sage accent. There are no decorative gradients, no shadow effects, no pulsing animations. Whitespace is part of the voice.

**2. A formulation-atelier brand platform.** The site is organised like a chemist's reference. Numbered sections (`01 / RESTORE`), mono labels (`FORM / CREAM · RITUAL / AM + PM`), tabular numerals. A signature identity device — the **AUREL Formula Index** — appears on product labels, information panels, routine recommendations and editorial chapter transitions. It is a small graphic organisational system rendered in JetBrains Mono, used selectively to reinforce hierarchy rather than pasted decoratively into every component. The homepage hero carries the brand platform line "Care, considered." / "The Formulation Atelier."

**3. A two-mode commerce architecture.** Rather than ship either a fake demo or a half-wired Shopify integration, AUREL ships both — explicitly. The commerce configuration (`src/lib/commerce/config.ts`) defines a `COMMERCE_MODE` of `demo` or `shopify`. In DEMO mode (the default), the catalogue is local typed data, the checkout is a clearly-labelled preview, no payment is processed, no order is created, and the subscription label reads "Subscribe & save 15% (demo) — illustrative demo pricing, not a real recurring plan." In SHOPIFY mode, the same UI surfaces map to live Shopify Storefront API reads and a Shopify-hosted checkout. The provider interface in `src/lib/commerce/provider.ts` is the contract a Shopify implementation must satisfy; the local provider is that contract's reference implementation.

## What was delivered

**Homepage.** Thirteen editorial sections composed as a single brand narrative: hero with parallax, bestsellers rail, recently-viewed rail, brand statement, diagnostic intro, ingredient story, the AUREL method, brand film strip, results, bundle, social proof, journal index, newsletter. Each section uses the hairline-divider + generous-vertical-rhythm pattern that defines the site's editorial voice.

**Shop.** Filtering by concern, skin type, category, ingredient and price; sort by relevance, price, rating; responsive 2/3/4-column grid; mobile filter drawer; product cards with hover overlay (Quick Add + View), wishlist heart and compare icon. A bottom-anchored compare bar with thumbnails and clear/compare CTAs appears when products are queued for comparison.

**Product detail page.** Media gallery with thumbnails (hover scale 95→100, active thumbnail gets a 2px left-edge accent bar), sticky desktop purchase panel, mobile sticky purchase bar, ingredient storytelling, texture macro, how-to-use, complete-the-routine upsell, reviews section with live-recomputed distribution and average rating, product Q&A with helpful/not-helpful voting, FAQ, recently-viewed rail. The subscription / one-time selector is honestly labelled: one-time is the default; subscription is marked "(demo)" with an explicit "illustrative demo pricing — not a real recurring plan" note.

**Cart and checkout.** A polished cart drawer with free-shipping progress, quantity controls, upsell and share-cart; a dedicated `/cart` page for full line-item review; and a `/checkout` demo preview that renders an explicit "Demonstration only — no payment or order will be processed" disclosure banner. The completion screen honestly states: "No order was created. This was a checkout demonstration. No payment was processed, no order ID exists, no confirmation email was sent." No fabricated order IDs, no fake confirmation emails.

**Skin diagnostic and routine builder.** A five-question quiz returns a deterministic AM/PM routine from the catalogue; results are editable and exportable as PDF via a print stylesheet. A separate routine builder (`/build-routine`) lets the user compose a routine from scratch with a live routine score that rewards full coverage of cleanse/treat/restore/protect, AM+PM balance, and multiple barrier actives, and penalises incompatible ingredient pairs (e.g. vitamin C + retinal).

**Supporting editorial.** Ingredient library with compatibility checker, journal index with six long-form articles and related products, about page, approach page, FAQ, contact, case-study page (not linked from consumer nav — prospective-client surface only), privacy, terms, accessibility. Personal surfaces — wishlist, compare, recently-viewed, account — are all functional against browser-local persisted state.

## Engineering decisions

**Explicit demo/shopify split.** `src/lib/commerce/config.ts` is the single source of truth. UI components branch on `IS_DEMO` / `IS_SHOPIFY` flags rather than on ad-hoc env-var reads. In DEMO mode the UI must never claim a real transaction occurred; in SHOPIFY mode a missing critical configuration must surface a clear setup error rather than silently reverting to simulation. Private tokens are read server-side only and must never be prefixed with `NEXT_PUBLIC_`.

**Honest demo labelling.** Every demo-only affordance is labelled as such in the UI. The subscription is "(demo)". The free-shipping threshold is commented `// illustrative` in config. The completion screen states no order was created. Reviews are seeded illustrative content + browser-local submissions, not verified purchases. "Dermatologist tested" and similar claims are fictional demonstration content, not certifications. This honesty is a delivery feature, not a limitation to hide.

**AUREL Formula Index as signature device.** Rather than reach for a logo lockup or a decorative motif, the build invests in a small monospaced editorial mark — `A / 03 — RESTORE / FORM / CREAM · RITUAL / AM + PM` — that visually connects storytelling and commerce. It is the single most identifiable AUREL signature in the UI, used selectively across product labels, information panels, routine recommendations and editorial chapter transitions.

**Server/client boundary discipline.** Server components carry the editorial weight (homepage sections, PDP storytelling, ingredient copy, FAQ, journal articles, case study). Client components are reserved for genuinely interactive surfaces (cart, search, quiz, gallery, reviews, Q&A, wishlist, compare). This keeps the interactive JS surface small on long-form pages.

**Static export compatibility.** Every dynamic route exports `generateStaticParams`; routes that read `useSearchParams` are wrapped in `<Suspense>`; `next/image` is configured to fall back to `unoptimized` in static-export mode so the same codebase deploys to either Vercel (Node standalone) or GitHub Pages (static export).

## Results and standards

The build passes the engineering standards the studio commits to for paying engagements: `reactStrictMode: true`, no `typescript.ignoreBuildErrors`, no `eslint.ignoreDuringBuilds`, semantic HTML, keyboard navigation across every interactive surface, `prefers-reduced-motion` honored globally, `:focus-visible` outlines preserved, ARIA labels on every icon-only button, `sr-only` descriptions on every dialog. All key routes (`/`, `/shop`, `/cart`, `/checkout`, `/diagnostic`, `/about`, `/journal`, PDPs, collections, ingredients, routine builder, compare, wishlist, case study) return HTTP 200 in dev. The 404 returns 404.

Two pre-existing lint/type errors are recorded honestly in [docs/qa/QA-REPORT.md](../qa/QA-REPORT.md) and flagged for the next engineering pass. Automated Playwright, Lighthouse and axe suites were not executed in this build environment and are listed as outstanding items in [docs/release/RELEASE-CHECKLIST.md](../release/RELEASE-CHECKLIST.md).

## Studio capabilities demonstrated

- Editorial art direction for a premium beauty brand (type system, palette, signature device)
- Brand platform development ("The Formulation Atelier", "Care, considered.")
- End-to-end ecommerce UX: shop → PDP → cart → checkout
- Personalised discovery (skin diagnostic, routine builder, ingredient compatibility)
- Cart and checkout thinking (drawer + dedicated page + demo preview with honest disclosure)
- Two-mode commerce architecture (DEMO default + Shopify-ready)
- Frontend engineering discipline (server/client boundary, static-export compatibility, accessibility commitments)
- Documentation rigour (architecture, Shopify setup runbook, design system, asset inventory, QA report, known limitations, release checklist, case study, walkthrough plan)
- Honest demo labelling as a delivery feature

## Closing note

AUREL is a concept showcase. The Shopify provider interface and configuration scaffolding are in place; the next step is real Shopify Storefront API verification against merchant credentials. The complete runbook — development store setup, headless channel configuration, Storefront API access (public token for browser, private token server-side only), required scopes, product publishing, variant mapping, selling plan setup for subscriptions, shipping and discount configuration, environment variables, checkout testing, customer account API, live launch checklist — is documented in [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md). With merchant credentials in hand, that runbook is the path from this concept showcase to a live, transacting storefront.

**Contact:** hello-aditya.dev@gmail.com
