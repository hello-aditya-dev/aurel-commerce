# AUREL — Shopify Setup Guide

This document is the complete guide for moving AUREL from DEMO mode to a live Shopify Storefront API integration. It covers development store setup, headless channel configuration, Storefront API access tokens, required scopes, product publishing, variant mapping, selling plans (subscriptions), shipping and discount configuration, environment variables, checkout testing, the Customer Account API, and a live-launch checklist.

> **Verification status:** The Shopify provider interface and configuration scaffolding are in place in `src/lib/commerce/config.ts` and `src/lib/commerce/provider.ts`. **Real-store verification is PENDING** — no merchant credentials were available in this build. The steps below describe the intended production path; treat any unverified step as a checklist item to validate when credentials are available.

---

## 1. Prerequisites

- A Shopify Partner account (free) — https://partners.shopify.com
- Permission to create development stores under that Partner account
- AUREL running locally with `bun install` complete
- The Shopify CLI (optional, but recommended for theme and app scaffolding): `npm i -g @shopify/cli`
- A Vercel project (or equivalent Node host) for production deployment

---

## 2. Development store setup

1. From the Partner dashboard, **Stores → Add store → Development store**.
2. Choose **Build a new headless storefront** as the store purpose. This preconfigures the store for headless commerce rather than theme development.
3. Complete the wizard with a placeholder store name (e.g. `aurel-dev`). The store URL will be `aurel-dev.myshopify.com`.
4. From the store admin, set the store currency under **Settings → General → Store currency**. The demo uses USD; match it to keep the existing `formatPrice` helper correct.
5. Configure the store's physical location under **Settings → Locations** — this affects inventory and shipping origin.

Development stores have Shopify Plus-like features for free and can be transferred to a merchant's production account at launch.

---

## 3. Headless channel configuration

1. In the store admin, open **Apps → Shopify App Store → Headless** (or install the **Headless** channel directly: https://apps.shopify.com/headless).
2. Click **Add sales channel → Headless** if it is not already present.
3. From the Headless channel, click **Create a storefront** (or use the default `Headless` storefront that the channel provisions).
4. Note the storefront's published-product scope — only products explicitly published to this channel appear in the Storefront API. (See §7.)

---

## 4. Storefront API access tokens

Shopify issues two kinds of Storefront API tokens. AUREL is designed to use both safely:

### 4.1 Public Storefront API access token (browser-safe)

- Used for unauthenticated browser requests (product reads, cart creation, checkout URL fetch).
- **This is the token exposed under `NEXT_PUBLIC_`-prefixed env vars** — it is safe to ship to the browser because its scopes are restricted to unauthenticated operations.
- Create it from the Headless channel: **Storefronts → [your storefront] → Create storefront API token**.

### 4.2 Private Storefront API access token (server-side only)

- Used for server-side reads that require elevated scopes (e.g. customer account lookups, draft orders).
- **NEVER expose this token under `NEXT_PUBLIC_`.** Read it server-side only via `process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN`.
- Create it from the same storefront page: **Create private storefront API token**.
- Rotate periodically and store in your hosting provider's secret store (Vercel env vars, AWS Secrets Manager, etc.).

### 4.3 Critical rule

```
NEXT_PUBLIC_SHOPIFY_*  →  public token ONLY
SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN  →  server-only, NEVER in NEXT_PUBLIC_
```

AUREL's `config.ts` reads both, but only `publicToken` is ever safe to reference in client code. The build will not flag a misnamed private token — review env var names manually before every deploy.

---

## 5. Required Storefront API scopes

When creating the public token, select at minimum:

- `unauthenticated_read_products` — read products, variants, collections, pricing
- `unauthenticated_write_cart` — create and modify a server-side cart (cart `id` round-trips with Shopify)

For the private token (server-side only), additionally consider:

- `unauthenticated_read_customers` — Customer Account API reads
- `unauthenticated_read_product_listings` — product listings (alternative to `unauthenticated_read_products` for published-product-only reads)

> The demo's local provider has no notion of scopes; the Shopify provider must respect the scopes assigned to whichever token it uses.

---

## 6. Product publishing

Only products published to the Headless sales channel are visible to the Storefront API.

1. In the store admin, open **Products → [your product]**.
2. In the **Product status → Sales channels and apps** section, ensure **Headless** is checked.
3. Repeat for every product, including all variants.
4. Verify via the Storefront API explorer (or a quick `curl`) that `products` returns the expected set:

   ```bash
   curl -X POST https://{store}.myshopify.com/api/2025-07/graphql.json \
     -H "X-Shopify-Storefront-Access-Token: {public-token}" \
     -H "Content-Type: application/json" \
     -d '{"query":"{ products(first:10) { edges { node { id title handle } } } }"}'
   ```

---

## 7. Variant mapping

AUREL's demo `Product` type uses a simplified `size` field (e.g. `"30ml"`, `"50ml"`) rather than the full Shopify variant merchandise ID. When the Shopify provider is implemented:

1. Query the Storefront API for `product.variants.edges` and capture each variant's `id` (merchandise ID).
2. Map AUREL's `Product.media`, `Product.benefits`, `Product.howToUse`, `Product.faq`, `Product.reviews`, `Product.pairings` onto Shopify metafields (see §10). These long-form editorial fields do not have native Shopify fields.
3. Map `Product.size` to the variant's `selectedOptions` (e.g. `{ name: "Size", value: "30ml" }`). In demo mode the cart stores `slug + variant: "one-time"|"subscription"`; in Shopify mode the cart line must additionally carry the variant merchandise ID so a real Shopify cart can be created.
4. Update `cart-store.ts` so the `lineId` includes the variant merchandise ID (not just the slug) and the cart drawer's "checkout" action creates a Shopify cart via `cartCreate`/`cartLinesAdd` and redirects to the returned `checkoutUrl`.

> See [docs/release/KNOWN-LIMITATIONS.md](../release/KNOWN-LIMITATIONS.md) item (g) — the simplified variant model is a demo-only constraint.

---

## 8. Selling plan setup (subscriptions)

AUREL's demo labels subscription as "Subscribe & save 15% (demo)" — an illustrative discount, not a real recurring billing plan. In Shopify mode:

1. Install Shopify Subscriptions (native app) or a subscription app of choice (Recharge, Ordergroove, Skio, etc.).
2. Create a selling plan group per product with two selling plans (e.g. "Delivery every 30 days", "Delivery every 60 days").
3. Set the 15% discount on each selling plan's pricing policy.
4. Publish the selling plan group to the Headless channel.
5. The Storefront API now returns `product.sellingPlanGroups`; the Shopify provider should map eligible plans onto the `Product.subscriptionEligible` field.
6. Update `cart-store.ts` so a subscription cart line carries `sellingPlanId`; the Shopify cart mutation `cartLinesAdd` accepts `{ merchandiseId, quantity, sellingPlanId }`.

> See [docs/release/KNOWN-LIMITATIONS.md](../release/KNOWN-LIMITATIONS.md) item (a) — the 15% subscription is illustrative demo content.

---

## 9. Shipping configuration

1. **Settings → Shipping and delivery**.
2. Configure shipping zones and rates. AUREL's demo uses an illustrative `$75` free-shipping threshold (see `DEMO_CONFIG.freeShippingThreshold`).
3. To match the demo, create a free-shipping rate that triggers at `$75` subtotal for the relevant zones.
4. The cart drawer and `/cart` page read `FREE_SHIPPING_THRESHOLD` from `cart-store.ts` for the progress bar. When the Shopify provider is live, replace this constant with a runtime value sourced from Shopify's shipping scenarios (or continue to use the illustrative threshold if your real merchant promotion differs).

---

## 10. Discount configuration

1. **Discounts → Create discount**.
2. AUREL's demo surfaces an illustrative 12% bundle saving on the routine builder and 15% subscription discount. To replicate:
   - Bundle: create an automatic discount of `12% off` applicable to specific collections (one per bundle).
   - Subscription: handled via the selling plan pricing policy (§8), not the Discounts admin.
3. The Shopify provider must read active discounts via the Storefront API's `cartLinesAdd` → `cart.discountAllocations` to surface honest line-level savings in the cart.

---

## 11. Environment variables

Populate `.env` (or your hosting provider's secret store) with:

```ini
# ---- Commerce mode ----
COMMERCE_MODE=shopify

# ---- Shopify Storefront API ----
SHOPIFY_STORE_DOMAIN=aurel-dev.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_...            # PUBLIC token (browser-safe)
SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN=shpat_...    # PRIVATE token (server-only — NEVER in NEXT_PUBLIC_)
SHOPIFY_API_VERSION=2025-07

# ---- Site URL ----
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# ---- Static export / basePath ----
# Leave empty for Shopify mode (Vercel); set for GitHub Pages demo only.
NEXT_PUBLIC_BASE_PATH=
```

Restart the dev server: `bun run dev`. AUREL will now read from `SHOPIFY_CONFIG` and `IS_SHOPIFY === true`.

Validate the configuration:

```ts
import { IS_SHOPIFY, SHOPIFY_READY, shopifyMissingConfig } from "@/lib/commerce/config";

if (IS_SHOPIFY && !SHOPIFY_READY) {
  console.error("Missing Shopify config:", shopifyMissingConfig());
}
```

---

## 12. Checkout testing

1. Add a product to the cart in AUREL.
2. From the cart drawer, click **Checkout**.
3. The Shopify provider should call `cartCreate` / `cartLinesAdd`, then redirect to the returned `checkoutUrl` (Shopify-hosted checkout).
4. Complete a test transaction using Shopify Bogus Gateway (`Settings → Payments → Use test payment provider`).
5. Verify the order appears in **Orders** in the Shopify admin.
6. Verify the customer receives a Shopify order-confirmation email.
7. Verify that AUREL's `/checkout` demo preview page is **not** reachable in Shopify mode — the cart drawer's `IS_DEMO` branch routes checkout straight to Shopify.

> In DEMO mode, by contrast, `/checkout` is reachable and renders the clearly-labelled "Demonstration only" preview. No order is created, no email is sent.

---

## 13. Customer Account API

For account features (wishlist sync, saved routines, order history), use the Shopify Customer Account API:

1. In the Headless channel, **Configure customer accounts** to enable the Customer Account API for your storefront.
2. Implement an OAuth-style flow: AUREL redirects to Shopify's customer account login, Shopify redirects back with an access token.
3. The customer access token is short-lived; refresh via the refresh token.
4. Map AUREL's `saved-routines-store`, `wishlist-store`, `recently-viewed-store` to customer metafields via the Customer Account API's `customerUpdate` mutation.

> AUREL's `/account` page is a local demo in this build (sign-in form is concept-only). Real account features require the Customer Account API flow above. See [docs/release/KNOWN-LIMITATIONS.md](../release/KNOWN-LIMITATIONS.md) item (e).

---

## 14. Live launch checklist

Before flipping a production domain to Shopify mode:

- [ ] `COMMERCE_MODE=shopify` set in production environment
- [ ] `SHOPIFY_STORE_DOMAIN` points to the **production** store (not the development store)
- [ ] Public Storefront API token issued for the production store
- [ ] Private Storefront API token stored in hosting secret store (NEVER under `NEXT_PUBLIC_`)
- [ ] All products published to the Headless sales channel
- [ ] All variants have valid pricing and inventory
- [ ] Selling plans (subscriptions) configured and published
- [ ] Shipping zones and the `$75` free-shipping rate (or your merchant's actual threshold) configured
- [ ] Discounts / automatic discounts for bundles configured
- [ ] Test order placed via the live checkout and confirmed in the Shopify admin
- [ ] Order-confirmation email received
- [ ] Customer Account API enabled (if account features are required)
- [ ] Webhooks registered for `products/update`, `inventory/update` (for cache invalidation)
- [ ] AUREL's `sitemap.ts` regenerated with `NEXT_PUBLIC_SITE_URL` pointing to the production domain
- [ ] `robots.ts` allows indexing of the production domain
- [ ] OpenGraph image resolves at the production URL
- [ ] Lighthouse / axe / Playwright suites run (currently PENDING in this build environment)
- [ ] Rollback plan documented: revert `COMMERCE_MODE=demo` and redeploy to restore the demo checkout

---

## 15. Outstanding verification items

The following steps from this guide have **not** been executed in this build environment because no merchant credentials were available:

- §4 — Token creation against a real Shopify Partner account
- §5 — Scope assignment on a real token
- §6 — Product publishing and Storefront API read verification
- §7 — Variant mapping from Shopify merchandise IDs to AUREL's `Product` type
- §8 — Selling plan configuration and Storefront API exposure
- §12 — Test checkout via Shopify Bogus Gateway
- §13 — Customer Account API OAuth flow

When merchant credentials are provided, work through §1–§14 in order, treating this document as the runbook. Update [docs/release/RELEASE-CHECKLIST.md](../release/RELEASE-CHECKLIST.md) item statuses as each step is verified.
