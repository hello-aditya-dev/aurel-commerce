// ============================================================================
// AUREL — Commerce configuration
// ----------------------------------------------------------------------------
// Explicit two-mode commerce architecture.
//
//   COMMERCE_MODE=demo     → self-contained, no credentials, clearly labelled
//                            demonstration checkout. No payment, no real order.
//   COMMERCE_MODE=shopify  → live Shopify Storefront API. Authoritative product,
//                            variant, cart, pricing and checkout data. Requires
//                            valid SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_*.
//
// In demo mode the storefront must NEVER claim a real transaction occurred.
// In shopify mode a missing critical configuration must surface a clear setup
// error rather than silently reverting to simulation.
// ============================================================================

export type CommerceMode = "demo" | "shopify";

function readMode(): CommerceMode {
  const raw = (process.env.COMMERCE_MODE || "demo").trim().toLowerCase();
  return raw === "shopify" ? "shopify" : "demo";
}

export const COMMERCE_MODE: CommerceMode = readMode();
export const IS_DEMO: boolean = COMMERCE_MODE === "demo";
export const IS_SHOPIFY: boolean = COMMERCE_MODE === "shopify";

// Shopify Storefront API configuration (only meaningful in shopify mode)
export const SHOPIFY_CONFIG = {
  domain: process.env.SHOPIFY_STORE_DOMAIN || "",
  publicToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  privateToken: process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN || "",
  apiVersion: process.env.SHOPIFY_API_VERSION || "2025-07",
} as const;

// Demo-only illustration parameters. These are NOT real merchant promotions.
// They are clearly labelled in the UI as illustrative demo configuration.
export const DEMO_CONFIG = {
  freeShippingThreshold: 75, // illustrative
  subscriptionIllustrativeDiscount: 0.15, // illustrative — NOT a real billing plan
  currency: "USD",
} as const;

// Validate that shopify mode has the minimum required configuration.
// Returns a list of missing required environment variables.
export function shopifyMissingConfig(): string[] {
  if (!IS_SHOPIFY) return [];
  const missing: string[] = [];
  if (!SHOPIFY_CONFIG.domain) missing.push("SHOPIFY_STORE_DOMAIN");
  if (!SHOPIFY_CONFIG.publicToken) missing.push("SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  return missing;
}

// A single boolean for convenience — true when shopify mode is fully wired.
export const SHOPIFY_READY: boolean = IS_SHOPIFY && shopifyMissingConfig().length === 0;
