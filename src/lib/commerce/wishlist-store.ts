"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  slugs: string[];
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  toggle: (slug: string) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      toggle: (slug) =>
        set((s) => {
          const exists = s.slugs.includes(slug);
          return {
            slugs: exists
              ? s.slugs.filter((x) => x !== slug)
              : [...s.slugs, slug],
          };
        }),
      add: (slug) =>
        set((s) =>
          s.slugs.includes(slug)
            ? s
            : { slugs: [...s.slugs, slug] }
        ),
      remove: (slug) =>
        set((s) => ({ slugs: s.slugs.filter((x) => x !== slug) })),
      has: (slug) => get().slugs.includes(slug),
      clear: () => set({ slugs: [] }),
    }),
    {
      name: "aurel-wishlist",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (s) => ({ slugs: s.slugs }),
    }
  )
);
