# AUREL — Commerce Architecture

AUREL ships a clean commerce abstraction that lets the same UI work against either a typed local mock provider or a real Shopify Storefront API. No external credential is required for the demo to function.

## Goals

1. The visible site must work with zero external configuration (no Shopify account needed).
2. The migration to Shopify must be a single-file swap, not a rewrite.
3. Product, collection, bundle, cart, search and quiz surfaces must be typed end-to-end.

## Structure

```
src/
├── types/commerce.ts             # All commerce types (Product, CartLine, QuizAnswer, etc.)
├── data/catalog.ts               # Typed local catalog data (8 products, 4 bundles, 8 ingredients)
├── lib/commerce/
│   ├── provider.ts               # Read API: products, collections, bundles, ingredients, search, routine
│   ├── cart-store.ts             # Zustand store with persist middleware
│   └── quiz-store.ts             # Zustand store for diagnostic state + computed routine
└── lib/analytics/index.ts        # Commerce event dispatcher
```

## Type system

All commerce data flows through types defined in `src/types/commerce.ts`. Key types:

- `Product` — full PDP data: media, benefits, how-to-use, FAQ, reviews, pairings, subscription eligibility
- `Collection` — curated product groupings (Barrier Repair, Brightening, Renewal, Systems)
- `Bundle` — pre-built routines with savings + step sequence
- `Ingredient` — ingredient library entries (slug, INCI, role, description, compatibility)
- `CartLine` — cart line item with variant (one-time / subscription)
- `QuizAnswer` — diagnostic answers (concerns, skinType, reactivity, routineTime, budget)
- `RoutineResult` — computed AM/PM protocol with rationale + total + savings

The mock provider's data (`src/data/catalog.ts`) is the source of truth for these types. A real Shopify provider would map Shopify Storefront API responses to the same types.

## Provider contract

`src/lib/commerce/provider.ts` exports the read API:

```typescript
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

// Ingredients
getAllIngredients(): Ingredient[]
getIngredientBySlug(slug: string): Ingredient | undefined
getIngredientsForProduct(productSlug: string): Ingredient[]
getProductsForIngredient(ingredientSlug: string): Product[]

// Search
searchProducts(query: string): Product[]
searchAll(query: string): { products: Product[]; ingredients: Ingredient[] }

// Quiz
computeRoutine(answers: QuizAnswer): RoutineResult

// Pricing
formatPrice(value: number, currency?: string): string
subscriptionPrice(price: number): number
```

A Shopify provider would implement the same surface against the Storefront API. The choice of provider can be made at module load time based on the presence of `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` env vars.

## Cart

`src/lib/commerce/cart-store.ts` is a Zustand store with `persist` middleware (localStorage). It supports:

- `add(product, { quantity, variant })` — add a product as one-time or subscription
- `addBundle(slug, name, price, image, productSlugs)` — add a pre-built bundle as a single line
- `addMany(slugs, variant)` — add multiple products (used by routine results + complete-the-routine)
- `updateQty(lineId, qty)` — quantity stepper
- `setVariant(lineId, variant)` — switch a line between one-time and subscription (re-prices)
- `remove(lineId)` — remove a line
- `clear()` — empty the cart
- Derived: `count()`, `subtotal()`

The cart drawer is opened automatically on add-to-cart via `set({ isOpen: true })` inside `add`. The free-shipping progress bar animates against `FREE_SHIPPING_THRESHOLD = 75`.

## Quiz routine computation

`computeRoutine(answers)` is deterministic — the same answers always produce the same routine. The algorithm:

1. Always include `barrier-reset-cleanser` in AM + PM
2. Add `c15-antioxidant-serum` to AM if user has dark-spots/dullness concerns OR routineTime ≠ "essential"
3. Always add `peptide-recovery-serum` to AM + PM (barrier support)
4. Add `retinal-renewal-0-1` to PM if user has texture/fine-lines concerns OR routineTime = "complete"
5. Always add `ceramide-recovery-cream` to AM + PM (restore)
6. Add `overnight-barrier-mask` to PM if user has dryness, dry skin type OR routineTime = "complete"
7. Always add `daily-mineral-spf-50` to AM (protect)
8. Total = sum of all included products
9. Savings = 12% (or the matching bundle's `compareAt - price` if a bundle exists for the exact set)
10. `protocolName` derived from `routineTime`

The result is stored in `quiz-store` (persisted) and the user lands on `/diagnostic/results` which reads from the store.

## Search

`searchAll(query)` does a case-insensitive match across product name, subtitle, description, category, concerns, key ingredients and skin types — plus ingredient name, INCI, role and description. Returns both product and ingredient results for the search overlay.

## Analytics

`src/lib/analytics/index.ts` exports a `track(event, payload)` function that dispatches a `CustomEvent` on `window`. Events:

- `product_view`, `add_to_cart`, `remove_from_cart`, `add_bundle`
- `begin_quiz`, `complete_quiz`
- `search`, `filter`
- `newsletter_signup`, `checkout_click`, `project_cta_click`

In demo mode these log to console in development and dispatch on `window` for any listener. Wire to GA4 / PostHog / etc. by listening for `aurel:analytics` events and forwarding.

## Shopify migration path

To migrate from the mock provider to Shopify:

1. Install `@shopify/storefront-api-client` (or use `fetch` directly).
2. Create `src/lib/commerce/shopify-provider.ts` implementing the same surface as `provider.ts`, mapping Storefront API responses to AUREL types.
3. In `provider.ts`, branch on env vars:

   ```typescript
   const useShopify = !!(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPPIFY_STOREFRONT_ACCESS_TOKEN);
   export const getProductBySlug = useShopify
     ? shopifyProvider.getProductBySlug
     : mockProvider.getProductBySlug;
   ```

4. For cart: Shopify Storefront `cartCreate` / `cartLinesAdd` / `cartLinesUpdate` / `cartLinesRemove`. Map to AUREL `CartLine` type. For demo, keep using the local store.
5. For checkout: redirect to Shopify's `cart.checkoutUrl` instead of the demo toast.

The UI does not change. The Zustand cart store can be replaced with Shopify cart calls inside the action creators without touching any component.

## Demo checkout

Because the demo has no Shopify backend, checkout surfaces a clearly-labelled demo state — a `sonner` toast informing the user that no payment was processed. No card details are ever collected. A real Shopify checkout URL would be wired in the `track("checkout_click")` handler.
