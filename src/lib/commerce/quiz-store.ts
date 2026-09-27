"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { QuizAnswer, RoutineResult } from "@/types/commerce";
import { computeRoutine } from "@/lib/commerce/provider";

interface QuizState {
  step: number;
  answers: QuizAnswer;
  result: RoutineResult | null;
  setStep: (n: number) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  setAnswers: (a: Partial<QuizAnswer>) => void;
  complete: () => void;
}

const EMPTY: QuizAnswer = {
  concerns: [],
  skinType: "not-sure",
  reactivity: 3,
  routineTime: "balanced",
  budget: "100-150",
};

export const useQuiz = create<QuizState>()(
  persist(
    (set, get) => ({
      step: 0,
      answers: { ...EMPTY },
      result: null,
      setStep: (n) => set({ step: n }),
      next: () => set((s) => ({ step: s.step + 1 })),
      prev: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
      reset: () => set({ step: 0, answers: { ...EMPTY }, result: null }),
      setAnswers: (a) =>
        set((s) => ({ answers: { ...s.answers, ...a } as QuizAnswer })),
      complete: () =>
        set({ result: computeRoutine(get().answers) }),
    }),
    {
      name: "aurel-quiz",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ answers: s.answers, result: s.result }),
    }
  )
);
