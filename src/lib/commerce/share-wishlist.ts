"use client";

// Encode wishlist slugs into a compact URL format
export function encodeWishlistForShare(slugs: string[]): string {
  return slugs.join(",");
}

export function decodeWishlistFromShare(s: string): string[] {
  if (!s) return [];
  return s
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
