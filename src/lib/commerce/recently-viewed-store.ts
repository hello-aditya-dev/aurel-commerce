"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RecentlyViewedState {
  slugs: string[]; // most recent first, capped to 8
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  push: (slug: string) => void;
  clear: () => void;
}

const MAX = 8;

export const useRecentlyViewed = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      slugs: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      push: (slug) =>
        set((s) => {
          const filtered = s.slugs.filter((x) => x !== slug);
          return { slugs: [slug, ...filtered].slice(0, MAX) };
        }),
      clear: () => set({ slugs: [] }),
    }),
    {
      name: "aurel-recently-viewed",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (s) => ({ slugs: s.slugs }),
    }
  )
);
