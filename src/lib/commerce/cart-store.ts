"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, Product } from "@/types/commerce";
import { subscriptionPrice, getProductBySlug } from "@/lib/commerce/provider";

export interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (
    product: Product,
    opts?: { quantity?: number; variant?: "one-time" | "subscription" }
  ) => void;
  addBundle: (
    slug: string,
    name: string,
    price: number,
    image: string,
    productSlugs: string[]
  ) => void;
  addMany: (slugs: string[], variant?: "one-time" | "subscription") => void;
  remove: (lineId: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  setVariant: (lineId: string, variant: "one-time" | "subscription") => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

function lineIdFor(slug: string, variant: string, isBundle?: boolean) {
  return `${isBundle ? "bundle" : "item"}-${slug}-${variant}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      add: (product, opts = {}) => {
        const variant = opts.variant ?? "one-time";
        const quantity = opts.quantity ?? 1;
        const price =
          variant === "subscription" ? subscriptionPrice(product.price) : product.price;
        const id = lineIdFor(product.slug, variant, false);
        const image = product.media[0]?.src ?? "";
        set((s) => {
          const existing = s.lines.find((l) => l.id === id);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.id === id ? { ...l, quantity: l.quantity + quantity } : l
              ),
              isOpen: true,
            };
          }
          const line: CartLine = {
            id,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price,
            image,
            quantity,
            size: product.size,
            variant,
          };
          return { lines: [...s.lines, line], isOpen: true };
        });
      },

      addBundle: (slug, name, price, image, _productSlugs) => {
        const id = lineIdFor(slug, "one-time", true);
        set((s) => {
          const existing = s.lines.find((l) => l.id === id);
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                l.id === id ? { ...l, quantity: l.quantity + 1 } : l
              ),
              isOpen: true,
            };
          }
          const line: CartLine = {
            id,
            productId: slug,
            slug,
            name,
            price,
            image,
            quantity: 1,
            size: "System",
            variant: "one-time",
            isBundle: true,
            bundleSlug: slug,
          };
          return { lines: [...s.lines, line], isOpen: true };
        });
      },

      addMany: (slugs, variant = "one-time") => {
        slugs.forEach((slug) => {
          const p = getProductBySlug(slug);
          if (p) get().add(p, { variant });
        });
      },

      remove: (lineId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.id !== lineId) })),

      updateQty: (lineId, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.id === lineId ? { ...l, quantity: Math.max(0, qty) } : l))
            .filter((l) => l.quantity > 0),
        })),

      setVariant: (lineId, variant) =>
        set((s) => ({
          lines: s.lines.map((l) => {
            if (l.id !== lineId) return l;
            const basePrice = l.isBundle
              ? l.price / (l.variant === "subscription" ? 0.85 : 1)
              : l.price / (l.variant === "subscription" ? 0.85 : 1);
            const newPrice =
              variant === "subscription" ? subscriptionPrice(basePrice) : basePrice;
            const newId = lineIdFor(l.slug, variant, l.isBundle);
            return { ...l, variant, price: newPrice, id: newId };
          }),
        })),

      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    }),
    {
      name: "aurel-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (s) => ({ lines: s.lines }),
    }
  )
);

// Derived helpers usable outside React
export const FREE_SHIPPING_THRESHOLD = 75;
