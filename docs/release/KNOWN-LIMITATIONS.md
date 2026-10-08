# AUREL — Known Limitations

This is the explicit, honest list of demo-only, illustrative, unverified and pending features in the AUREL build. It exists so that prospective clients, reviewers and the engineering team cannot accidentally mistake a demonstration for a live production capability.

AUREL is a concept showcase. The default mode is DEMO. Where a feature is marked **illustrative**, it is shown in the UI but does not represent a real merchant configuration. Where a feature is marked **PENDING**, the architectural scaffolding is in place but the live verification has not been performed.

---

## (a) Commerce is in DEMO mode by default

- **No real payments are processed.** The `/checkout` page renders a clearly-labelled "Demonstration only — no payment or order will be processed" disclosure banner.
- **No real orders are created.** The completion screen explicitly states: "No order was created. This was a checkout demonstration. AUREL is a concept showcase — no payment was processed, no order ID exists, no confirmation email was sent."
- **No real subscriptions.** The "Subscribe & save 15%" label on the purchase panel is followed by an explicit "(demo)" suffix and the note "illustrative demo pricing — not a real recurring plan." The 15% figure is illustrative; there is no recurring billing engine.
- **No real customer emails.** No transactional email is sent at any point in the demo flow.

The DEMO mode is enforced via `IS_DEMO` in `src/lib/commerce/config.ts`. UI components branch on this flag to render the demo disclosures.

---

## (b) Shopify provider is architecturally specified but real-store verification is PENDING

- The commerce configuration in `src/lib/commerce/config.ts` defines `COMMERCE_MODE`, `IS_SHOPIFY`, `SHOPIFY_CONFIG`, `shopifyMissingConfig()` and `SHOPIFY_READY`.
- The provider interface in `src/lib/commerce/provider.ts` is the contract a Shopify implementation must satisfy (see [docs/architecture/ARCHITECTURE.md](../architecture/ARCHITECTURE.md) §4).
- **No merchant credentials were available in this build.** The Shopify Storefront API provider has not been implemented and no real-store verification has been performed. The complete live-store runbook is in [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md).

---

## (c) Reviews are seeded illustrative content + browser-local submissions

- Reviews shown on each PDP come from two sources merged at render time:
  1. **Seeded catalog reviews** in `src/data/catalog.ts` — these are illustrative content written for the demonstration. They are **not** verified purchases and **not** real customer feedback.
  2. **User-submitted reviews** stored in `user-reviews-store.ts` (Zustand + `localStorage`). These persist per-browser only. They are **not** moderated, **not** verified, and **not** synced to any backend.
- The review distribution chart, average rating and review count are recomputed live from the merged set. The "verified" flag on seeded reviews is illustrative — it does not represent a real purchase-verification flow.
- Review photos (optional, base64 data URLs) are stored in `localStorage` only. There is no image upload backend.

---

## (d) Newsletter and contact forms are frontend demonstrations

- The newsletter form in the homepage footer and the contact form on `/contact` render and validate input client-side.
- On submit they fire analytics events and show a success toast, but they do not transmit data to any email service provider, CRM, or backend.
- A real deployment must wire these forms to a transactional email service (e.g. Resend, Postmark) or marketing platform (e.g. Klaviyo, Mailchimp).

---

## (e) Account features are local demo

- The `/account` page renders a tabbed interface (Profile, Wishlist, Reviews, Recently viewed, Orders, Settings, Saved routines).
- The sign-in form is concept-only — there is no authentication backend. The tab content is populated from the local Zustand stores (`wishlist-store`, `user-reviews-store`, `recently-viewed-store`, `saved-routines-store`).
- The Orders tab shows an empty state with a "Shopify backend note" — there is no order history because there are no real orders.
- The Settings tab shows disabled demo preferences (email notifications toggle, subscription cadence, currency).
- A real account experience requires the Shopify Customer Account API flow described in [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md) §13.

---

## (f) Free-shipping $75 threshold is illustrative demo configuration

- `DEMO_CONFIG.freeShippingThreshold = 75` in `src/lib/commerce/config.ts` is explicitly commented as `// illustrative`.
- The cart drawer and `/cart` page use this constant to render the free-shipping progress bar and the "You're $X away from complimentary shipping" message.
- It is **not** a real merchant promotion. In Shopify mode the threshold should be sourced from the store's actual shipping configuration.

---

## (g) Product variants use a simplified model in DEMO mode

- AUREL's `Product` type in `src/types/commerce.ts` has a single `size` field (e.g. `"30ml"`, `"50ml"`) rather than the full Shopify variant merchandise ID model.
- The cart stores `slug + variant: "one-time" | "subscription"` as the line identity, not `merchandiseId + sellingPlanId`.
- This is sufficient for the demo because the catalogue has one variant per product. A real Shopify integration must:
  1. Query `product.variants.edges` for each product and capture each variant's merchandise ID.
  2. Update `cart-store.ts` so the line identity includes the variant merchandise ID.
  3. Update the cart drawer's checkout action to call Shopify `cartCreate` / `cartLinesAdd` and redirect to the returned `checkoutUrl`.

See [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md) §7 for the variant mapping runbook.

---

## (h) Playwright / Lighthouse / axe automated suites not executed

- No Playwright configuration exists in the repository. End-to-end flows have been verified only by manual browser inspection in prior rounds.
- No Lighthouse CI configuration exists. Performance, accessibility, best-practices and SEO scores have not been measured in this build environment.
- No axe-core automated audit exists. WCAG 2.2 AA is targeted where practical (see [docs/design/DESIGN-SYSTEM.md](../design/DESIGN-SYSTEM.md) §12) but not verified by automated tooling.
- The verification that was performed is documented honestly in [docs/qa/QA-REPORT.md](../qa/QA-REPORT.md).

---

## (i) Product attribute claims are fictional demonstration content

- Attributes such as "Dermatologist tested", "Clinically inspired", "Barrier-first", "Fragrance-free", "Non-comedogenic" and similar claims shown on PDPs and product cards are **fictional demonstration claims**, not certifications.
- AUREL is a fictional brand. There is no dermatologist, no clinical trial, no regulatory filing.
- Ingredient descriptions in the ingredient library (`/ingredients/[slug]`) are educational copy written for the demonstration. They reference real cosmetic-chemistry concepts (ceramide 3:1:1 ratios, vitamin C + retinal AM/PM separation, ectoin extremolyte mechanism) but should not be read as medical advice.
- Any production deployment for a real brand must replace these claims with claims substantiated by the brand's regulatory and clinical evidence.

---

## Additional notes

- **Pricing** — All product prices in `src/data/catalog.ts` are illustrative. They are not sourced from a real merchant's pricing.
- **Bundle savings** — The 12% bundle saving shown on the routine builder and bundle pages is illustrative. In Shopify mode bundle discounts must be configured via the Shopify Discounts admin (see [docs/commerce/SHOPIFY-SETUP.md](../commerce/SHOPIFY-SETUP.md) §10).
- **Return policy** — The "Illustrative 30-day return policy" message on the checkout page is illustrative. A real return policy must be defined by the merchant.
- **Inventory** — There is no inventory tracking in DEMO mode. Every product is always "in stock."
- **Taxes** — Taxes are not calculated in DEMO mode. The checkout summary shows "Calculated at checkout" for tax. In Shopify mode Shopify computes taxes based on the store's tax configuration.
- **AI-generated imagery** — All imagery is AI-generated via `z-ai-web-dev-sdk` for the demonstration. See [docs/assets/ASSET-INVENTORY.md](../assets/ASSET-INVENTORY.md) for the full asset inventory and replacement guidance for production.
- **Static export image optimization** — In static export mode `next/image` runs with `unoptimized: true`. AVIF/WebP derivatives are not generated for the GitHub Pages deployment.
