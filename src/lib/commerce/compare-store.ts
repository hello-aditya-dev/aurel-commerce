"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CompareState {
  slugs: string[];
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  toggle: (slug: string) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  isFull: () => boolean;
}

const MAX_COMPARE = 3;

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      slugs: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      toggle: (slug) =>
        set((s) => {
          const exists = s.slugs.includes(slug);
          if (exists) {
            return { slugs: s.slugs.filter((x) => x !== slug) };
          }
          if (s.slugs.length >= MAX_COMPARE) return s; // ignore when full
          return { slugs: [...s.slugs, slug] };
        }),
      add: (slug) =>
        set((s) =>
          s.slugs.includes(slug) || s.slugs.length >= MAX_COMPARE
            ? s
            : { slugs: [...s.slugs, slug] }
        ),
      remove: (slug) =>
        set((s) => ({ slugs: s.slugs.filter((x) => x !== slug) })),
      clear: () => set({ slugs: [] }),
      has: (slug) => get().slugs.includes(slug),
      isFull: () => get().slugs.length >= MAX_COMPARE,
    }),
    {
      name: "aurel-compare",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (s) => ({ slugs: s.slugs }),
    }
  )
);

export const COMPARE_MAX = MAX_COMPARE;
