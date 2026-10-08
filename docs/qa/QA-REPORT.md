# AUREL — QA Report

This report records the test commands available for AUREL, the verification that was actually executed in this build environment, the defects repaired during the project, and the outstanding items that remain unverified.

The report is deliberately honest about what was and was not run. AUREL is a concept showcase with a two-mode commerce architecture; the verification here covers the DEMO mode build that ships from this repository.

---

## 1. Test commands

| Command | Purpose | Expected |
| --- | --- | --- |
| `bun run lint` | ESLint flat config (`eslint.config.mjs`) | 0 errors, 0 warnings |
| `bunx tsc --noEmit` | TypeScript strict type check (no `ignoreBuildErrors`) | 0 errors |
| `bun run build` | Production build (standalone) | Successful build |
| `bun run dev` | Local dev server on port 3000 | Server ready, routes return 200 |
| Manual route checks | `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/<path>` | 200 for valid routes, 404 for unknown |

There is no Playwright, Vitest, Jest, Lighthouse, or axe configuration in the repository — those suites were not set up in this build environment. See §5.

---

## 2. Executed verification

### 2.1 Lint

Command: `bun run lint`

Result: **1 pre-existing error, 0 warnings.**

```
src/components/layout/cart-drawer.tsx
  127:19  error  Error: This value cannot be modified
  react-hooks/immutability

  125 |  track("checkout_click", { stage: "drawer_checkout", value: sub });
  126 |  close();
> 127 |  window.location.href = IS_DEMO ? "/checkout" : "/cart";
       |  ^^^^^^^^^^^^^^^ value cannot be modified
  128 | }}
```

This is a pre-existing issue introduced when the cart drawer was updated to route between the demo `/checkout` and Shopify `/cart` targets. The `react-hooks/immutability` rule flags the assignment to `window.location.href` because the assignment occurs inside an event handler but the rule treats `window` as a value defined outside the component. This was not introduced by the documentation work; it predates Task ID 2 and is recorded here for honesty. The fix is straightforward (replace `window.location.href = …` with `window.location.assign(…)` or a Next.js `useRouter().push(…)`) but the task brief restricts this agent to documentation, so the source change is deferred to a follow-up engineering task.

### 2.2 Type check

Command: `bunx tsc --noEmit`

Result: **2 pre-existing errors.**

```
src/components/cart/cart-view.tsx(258,30): error TS2345:
  Argument of type '"begin_checkout"' is not assignable to parameter of type 'CommerceEvent'.
src/components/cart/cart-view.tsx(280,15): error TS2345:
  Argument of type '"begin_checkout"' is not assignable to parameter of type 'CommerceEvent'.
```

The `/cart` view calls `track("begin_checkout", …)` but the `CommerceEvent` union in `src/lib/analytics/index.ts` does not include `"begin_checkout"`. Pre-existing issue, recorded here for honesty. Fix: add `"begin_checkout"` to the `CommerceEvent` union in `src/lib/analytics/index.ts`, or change the call site to use an existing event name. Not fixed by this documentation-only task.

### 2.3 Manual route verification

Dev server: `bun run dev` started cleanly on port 3000 in 666ms (`Next.js 16.1.3 (Turbopack)`).

All key routes return HTTP 200:

| Route | Status |
| --- | --- |
| `/` | 200 |
| `/shop` | 200 |
| `/cart` | 200 |
| `/checkout` | 200 |
| `/diagnostic` | 200 |
| `/diagnostic/results` | 200 |
| `/about` | 200 |
| `/journal` | 200 |
| `/products/barrier-reset-cleanser` | 200 |
| `/collections/barrier-repair` | 200 |
| `/ingredients/ceramides` | 200 |
| `/build-routine` | 200 |
| `/compare` | 200 |
| `/wishlist` | 200 |
| `/case-study` | 200 |
| `/contact` | 200 |
| `/faq` | 200 |
| `/approach` | 200 |
| `/not-a-real-route` | 404 (expected) |

### 2.4 Production build

Not executed in this session to keep the verification focused on the documentation deliverable. Historical record (worklog Task ID `final-polish`): production build was previously verified to pass with `reactStrictMode: true`, no `ignoreBuildErrors`, no `ignoreDuringBuilds`, and the static export (`STATIC_EXPORT=true`) was successfully deployed to GitHub Pages.

---

## 3. Defects repaired during the project

The following defects were repaired across the build phases recorded in `worklog.md` (rounds 1–8, `final-polish`, `brand-identity-pass`, and Task ID 1). They are summarised here for context; the detailed fix history lives in `worklog.md`.

### 3.1 Functional defects

- **Cart drawer count showing empty parens** — `count` was destructured as a function reference and rendered as a React child. Fixed by computing `lines.reduce((sum, l) => sum + l.quantity, 0)` directly in `CartDrawer`.
- **Quiz completion crash** — `complete()` set `step: 5` but `STEPS[5]` was undefined. Fixed by removing the `step: 5` increment from `complete()` in `quiz-store.ts` plus a defensive `Math.min(step, 4)` in the diagnostic page.
- **Radix `Missing aria-describedby` warnings** — search overlay, cart drawer, filter drawer logged warnings on every open. Fixed by adding `sr-only` `DialogDescription` / `SheetDescription` to every overlay.
- **ReviewsSection infinite re-render** — `useUserReviews` selector returned a fresh `[]` each render. Fixed by selecting `byProduct` and using `React.useMemo` for the per-product slice.
- **Quick-view LCP warning** — `next/image` with `priority` warned on the modal's primary image. Fixed by switching the modal gallery to plain `<img>` (small finite set, no responsive sizing needed inside the modal).
- **Mobile quick-view layout broken (3/10 → 9/10)** — switched layout from `grid-cols-1` to `flex flex-col md:grid md:grid-cols-2` and constrained the gallery aspect ratio to 4/3 on mobile.
- **Duplicate cart-drawer X icons** — `SheetContent` auto-rendered a `<SheetPrimitive.Close>` with `<XIcon>` and `CartDrawer` had its own custom close button. Fixed by adding a `showCloseButton?: boolean` prop to `SheetContent` / `DialogContent`; cart drawer, filter drawer, search overlay, keyboard help, write-review and ask-question all pass `showCloseButton={false}`.
- **TypeScript errors hidden** — `next.config.ts` had `typescript.ignoreBuildErrors: true`. Removed; fixed all 4 underlying TS errors (CartLine type import, toast import, Product[] type guard).
- **React Strict Mode disabled** — `reactStrictMode: false` in `next.config.ts`. Enabled.
- **Tracked `.env` in repository** — removed from git, kept locally.
- **Placeholder URLs in metadata** — `aurel.example.com` placeholders replaced with the real deployment URL in `layout.tsx`, `sitemap.ts`, `robots.ts`.
- **Doubled basePath in metadata** — `metadataBase` included `/aurel-commerce` and `img()` also added it. Fixed by setting `metadataBase` to origin-only.

### 3.2 Image quality defects

- `product-recovery-cream.png` — contained Chinese characters. Regenerated text-free.
- `product-peptide-serum.png` — text artifacts on packaging. Regenerated text-free.
- `texture-gel.png` — visible text. Regenerated text-free.
- Five per-product texture images generated to replace shared generic textures; `src/data/catalog.ts` updated so each PDP references its own unique texture.

### 3.3 Specification gaps closed in Task ID 1

- **Dedicated `/cart` page** — added (`src/app/cart/page.tsx` + `src/components/cart/cart-view.tsx`). Full line-item review, quantity steppers, free-shipping progress, demo/Shopify checkout split, empty state.
- **`/checkout` demo preview page** — added (`src/app/checkout/page.tsx` + `src/components/cart/checkout-view.tsx`). Honest 3-step flow (contact / shipping / payment-disabled), explicit "Demonstration only" disclosure, honest completion screen with no fabricated order ID.
- **Honest subscription labelling** — purchase panel now labels subscription as "Subscribe & save 15% (demo)" with an explicit "illustrative demo pricing — not a real recurring plan" note and an info note about Shopify selling plans. One-time purchase is the default selection.
- **Brand platform refresh** — homepage hero refined to "Care, considered." / "The Formulation Atelier"; announcement bar rewritten to honest demo messaging (removed fabricated urgency); layout metadata updated.
- **Explicit demo/shopify commerce mode split** — `src/lib/commerce/config.ts` added with `COMMERCE_MODE`, `IS_DEMO`, `IS_SHOPIFY`, `SHOPIFY_CONFIG`, `DEMO_CONFIG`, `shopifyMissingConfig()`, `SHOPIFY_READY`.
- **AUREL Formula Index signature device** — `src/components/editorial/formula-index.tsx` added with stacked / inline / minimal variants + `FormulaIndexRule` chapter divider.

---

## 4. Outstanding items

### 4.1 Pre-existing lint / type errors (not fixed by this documentation task)

- `src/components/layout/cart-drawer.tsx:127` — `react-hooks/immutability` error on `window.location.href = …` assignment.
- `src/components/cart/cart-view.tsx:258, 280` — `"begin_checkout"` not in the `CommerceEvent` union.

These are visible defects that should be fixed in a follow-up engineering task. They are recorded here for transparency.

### 4.2 Automated test suites not executed

- **Playwright E2E** — no Playwright config in the repository. End-to-end flows (add-to-cart, checkout hand-off, diagnostic → routine → add-all, wishlist round-trip, compare flow) have been verified only by manual browser inspection in prior rounds.
- **Lighthouse** — no Lighthouse CI configuration. Performance, accessibility, best-practices and SEO scores have not been measured in this build environment.
- **axe** — no axe automated audit. WCAG 2.2 AA is targeted where practical (see [docs/design/DESIGN-SYSTEM.md](../design/DESIGN-SYSTEM.md) §12) but not verified by automated tooling.

### 4.3 Real Shopify store verification PENDING

The Shopify provider interface and configuration scaffolding (`src/lib/commerce/config.ts`, `src/lib/commerce/provider.ts`) are in place, but real-store verification against live credentials is **PENDING** — no merchant credentials were available in this build. See [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md) §15 for the outstanding verification items.

### 4.4 Static-export image optimization

In static export mode `next/image` runs with `unoptimized: true` because the optimization server cannot run on a static host. AVIF/WebP derivatives are not generated for the GitHub Pages deployment. This is a known limitation, not a defect.

---

## 5. Verification coverage matrix

| Surface | Manual route check | Lint | Type check | E2E | Lighthouse | axe | Real Shopify |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage `/` | ✅ 200 | ⚠️ 1 pre-existing error | ⚠️ 0 errors on this file | ❌ not run | ❌ not run | ❌ not run | n/a |
| Shop `/shop` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| Cart `/cart` | ✅ 200 | — | ⚠️ 2 pre-existing errors | ❌ | ❌ | ❌ | ❌ pending |
| Checkout `/checkout` | ✅ 200 | — | — | ❌ | ❌ | ❌ | ❌ pending |
| Diagnostic `/diagnostic` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| About `/about` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| Journal `/journal` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| PDP `/products/[slug]` | ✅ 200 | — | — | ❌ | ❌ | ❌ | ❌ pending |
| Collections `/collections/[slug]` | ✅ 200 | — | — | ❌ | ❌ | ❌ | ❌ pending |
| Ingredients `/ingredients/[slug]` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| Diagnostic results `/diagnostic/results` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| Build routine `/build-routine` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| Compare `/compare` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| Wishlist `/wishlist` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| Case study `/case-study` | ✅ 200 | — | — | ❌ | ❌ | ❌ | n/a |
| 404 `/not-a-real-route` | ✅ 404 | — | — | ❌ | ❌ | ❌ | n/a |

Legend: ✅ verified · ⚠️ verified with caveat · ❌ not executed · n/a not applicable

---

## 6. Recommendations for the next engineering pass

1. Fix the two pre-existing lint/type errors (§4.1).
2. Introduce Playwright E2E with a smoke test per key route + a full add-to-cart → checkout flow.
3. Introduce Lighthouse CI in the build pipeline with budgets for LCP, CLS, TBT.
4. Introduce axe-core automated accessibility audits in CI.
5. Provision a Shopify development store and work through [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md) §1–§14.
6. Implement the Shopify provider against the contract in [docs/architecture/ARCHITECTURE.md](../architecture/ARCHITECTURE.md) §4.
7. Generate AVIF/WebP derivatives for the static export target.
