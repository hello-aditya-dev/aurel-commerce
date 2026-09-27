"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface QAItem {
  id: string;
  question: string;
  answer?: string;
  author: string;
  date: string;
  answered?: boolean;
}

interface ProductQAState {
  byProduct: Record<string, QAItem[]>;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  add: (productSlug: string, question: string, author: string) => void;
  getForProduct: (productSlug: string) => QAItem[];
  clear: () => void;
}

// Seed demo Q&A so the section looks populated on first visit
const SEED: Record<string, QAItem[]> = {
  "peptide-recovery-serum": [
    {
      id: "qa-seed-1",
      question: "Can I layer this under retinal in the evening?",
      answer:
        "Yes — Peptide Recovery Serum is an excellent buffering layer behind retinal. Apply peptide serum first, let it absorb for 30 seconds, then apply retinal.",
      author: "M. Vasquez",
      date: "2025-08-22",
      answered: true,
    },
    {
      id: "qa-seed-2",
      question: "Is this safe for reactive/rosacea-prone skin?",
      answer:
        "Most reactive skin tolerates it well due to the ectoin and panthenol buffer. We recommend patch testing first, as with any new active.",
      author: "J. Whitfield",
      date: "2025-07-30",
      answered: true,
    },
  ],
  "retinal-renewal-0-1": [
    {
      id: "qa-seed-3",
      question: "How does 0.1% retinal compare to 0.3% retinol?",
      answer:
        "Retinal is one metabolic step closer to retinoic acid, so 0.1% retinal is broadly equivalent in efficacy to roughly 0.5–1% retinol, with less irritation for most users.",
      author: "C. Larsen",
      date: "2025-08-15",
      answered: true,
    },
  ],
};

export const useProductQA = create<ProductQAState>()(
  persist(
    (set, get) => ({
      byProduct: SEED,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      add: (productSlug, question, author) =>
        set((s) => ({
          byProduct: {
            ...s.byProduct,
            [productSlug]: [
              {
                id: `qa-user-${Date.now()}`,
                question,
                author,
                date: new Date().toISOString().slice(0, 10),
                answered: false,
              },
              ...(s.byProduct[productSlug] ?? []),
            ],
          },
        })),
      getForProduct: (productSlug) => get().byProduct[productSlug] ?? [],
      clear: () => set({ byProduct: SEED }),
    }),
    {
      name: "aurel-product-qa",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (s) => ({ byProduct: s.byProduct }),
    }
  )
);
