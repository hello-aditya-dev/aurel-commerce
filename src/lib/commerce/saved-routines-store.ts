"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SavedRoutine {
  id: string;
  name: string;
  slugs: string[];
  createdAt: string;
  total: number;
  savings: number;
}

interface SavedRoutinesState {
  routines: SavedRoutine[];
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  save: (name: string, slugs: string[], total: number, savings: number) => SavedRoutine;
  remove: (id: string) => void;
  clear: () => void;
}

export const useSavedRoutines = create<SavedRoutinesState>()(
  persist(
    (set, get) => ({
      routines: [],
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      save: (name, slugs, total, savings) => {
        const routine: SavedRoutine = {
          id: `routine-${Date.now()}`,
          name,
          slugs,
          total,
          savings,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ routines: [routine, ...s.routines] }));
        return routine;
      },
      remove: (id) =>
        set((s) => ({ routines: s.routines.filter((r) => r.id !== id) })),
      clear: () => set({ routines: [] }),
    }),
    {
      name: "aurel-saved-routines",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (s) => ({ routines: s.routines }),
    }
  )
);
