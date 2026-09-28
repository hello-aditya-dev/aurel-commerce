"use client";

import type { CartLine } from "@/types/commerce";

// Compact cart encoding for URL sharing.
// Format: <slug>:<qty>:<v>,<slug>:<qty>:<v>,...
// where v is "s" (subscription) or "o" (one-time)
// We only encode the slug + qty + variant — the price/name/image are looked up
// from the catalog when the share URL is opened. Bundle lines encode their
// bundleSlug instead of product slug.

export function encodeCartForShare(lines: CartLine[]): string {
  return lines
    .map((l) => {
      const v = l.variant === "subscription" ? "s" : "o";
      const slug = l.isBundle && l.bundleSlug ? l.bundleSlug : l.slug;
      const prefix = l.isBundle ? "b:" : "";
      return `${prefix}${slug}:${l.quantity}:${v}`;
    })
    .join(",");
}

export function decodeCartFromShare(s: string): {
  slug: string;
  quantity: number;
  variant: "one-time" | "subscription";
  isBundle: boolean;
}[] {
  if (!s) return [];
  return s
    .split(",")
    .map((part) => {
      const [slugRaw, qtyRaw, vRaw] = part.split(":");
      if (!slugRaw || !qtyRaw) return null;
      const qty = parseInt(qtyRaw, 10);
      if (!Number.isFinite(qty) || qty < 1 || qty > 99) return null;
      const isBundle = slugRaw.startsWith("b-");
      // We tolerate either 'b:' prefix or 'b-' prefix
      let slug = slugRaw;
      if (slugRaw.startsWith("b:")) {
        slug = slugRaw.slice(2);
        return { slug, quantity: qty, variant: vRaw === "s" ? "subscription" as const : "one-time" as const, isBundle: true };
      }
      return { slug, quantity: qty, variant: vRaw === "s" ? "subscription" as const : "one-time" as const, isBundle: false };
    })
    .filter(Boolean) as { slug: string; quantity: number; variant: "one-time" | "subscription"; isBundle: boolean }[];
}
