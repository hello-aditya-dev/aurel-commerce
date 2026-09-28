"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Review } from "@/types/commerce";

interface UserReviewsState {
  // Keyed by product slug
  byProduct: Record<string, Review[]>;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  add: (productSlug: string, review: Review) => void;
  getForProduct: (productSlug: string) => Review[];
  clear: () => void;
}

export const useUserReviews = create<UserReviewsState>()(
  persist(
    (set, get) => ({
      byProduct: {},
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      add: (productSlug, review) =>
        set((s) => ({
          byProduct: {
            ...s.byProduct,
            [productSlug]: [review, ...(s.byProduct[productSlug] ?? [])],
          },
        })),
      getForProduct: (productSlug) => get().byProduct[productSlug] ?? [],
      clear: () => set({ byProduct: {} }),
    }),
    {
      name: "aurel-user-reviews",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (s) => ({ byProduct: s.byProduct }),
    }
  )
);
