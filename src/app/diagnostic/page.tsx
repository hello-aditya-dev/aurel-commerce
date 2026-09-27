"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useQuiz } from "@/lib/commerce/quiz-store";
import { track } from "@/lib/analytics";
import type { Concern, SkinType } from "@/types/commerce";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "What concerns you most?", eyebrow: "01 / Concerns" },
  { title: "How would you describe your skin?", eyebrow: "02 / Skin type" },
  { title: "How reactive is your skin?", eyebrow: "03 / Reactivity" },
  { title: "How much time for your routine?", eyebrow: "04 / Routine time" },
  { title: "What's your preferred budget?", eyebrow: "05 / Budget" },
];

const CONCERN_OPTIONS: { value: Concern; label: string; detail: string }[] = [
  { value: "dryness", label: "Dryness", detail: "Tightness, flaking, dehydration lines" },
  { value: "breakouts", label: "Breakouts", detail: "Congestion, blemishes, oiliness" },
  { value: "dark-spots", label: "Dark spots", detail: "Pigmentation, uneven tone" },
  { value: "texture", label: "Texture", detail: "Roughness, enlarged pores" },
  { value: "fine-lines", label: "Fine lines", detail: "Lines, loss of firmness" },
  { value: "sensitivity", label: "Sensitivity", detail: "Reactivity, redness, stinging" },
];

const SKIN_OPTIONS: { value: SkinType | "not-sure"; label: string; detail: string }[] = [
  { value: "dry", label: "Dry", detail: "Tight, especially after cleansing" },
  { value: "combination", label: "Combination", detail: "Oily T-zone, dry cheeks" },
  { value: "oily", label: "Oily", detail: "Shine across the face by midday" },
  { value: "balanced", label: "Balanced", detail: "Comfortable, neither oily nor dry" },
  { value: "sensitive", label: "Sensitive", detail: "Reacts to many products" },
  { value: "not-sure", label: "Not sure", detail: "We'll work it out together" },
];

const REACTIVITY_LABELS = ["Very calm", "Calm", "Average", "Reactive", "Very reactive"];

export default function DiagnosticPage() {
  const router = useRouter();
  const { step: rawStep, answers, next, prev, setAnswers, complete, reset } = useQuiz();
  const step = Math.min(rawStep, 4);
  const reduce = useReducedMotion();
  const [concerns, setConcerns] = React.useState<Set<Concern>>(new Set(answers.concerns));

  React.useEffect(() => {
    track("begin_quiz", { step });
  }, [step]);

  React.useEffect(() => {
    setConcerns(new Set(answers.concerns));
  }, [answers.concerns, step]);

  const toggleConcern = (c: Concern) => {
    const next = new Set(concerns);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    setConcerns(next);
    setAnswers({ concerns: Array.from(next) });
  };

  const canProceed = () => {
    if (step === 0) return concerns.size > 0;
    return true;
  };

  const handleNext = () => {
    if (step === 4) {
      complete();
      track("complete_quiz", { answers });
      router.push("/diagnostic/results");
    } else {
      next();
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Progress */}
      <div className="border-b border-border">
        <div className="container-aurel py-5 flex items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {STEPS[step].eyebrow}
          </span>
          <div className="flex-1 h-[2px] bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 5) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <button
            onClick={reset}
            className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center">
        <div className="container-aurel py-12 md:py-20 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={reduce ? undefined : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <h1
                className="font-serif font-light leading-[1.05] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                {STEPS[step].title}
              </h1>

              {step === 0 && (
                <p className="text-base text-muted-foreground mt-4 max-w-lg">
                  Select your primary concern. Add a secondary concern if you like — we'll prioritise the first.
                </p>
              )}

              {/* Step content */}
              <div className="mt-10">
                {step === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CONCERN_OPTIONS.map((o) => {
                      const checked = concerns.has(o.value);
                      const isFirst = Array.from(concerns)[0] === o.value;
                      return (
                        <button
                          key={o.value}
                          onClick={() => toggleConcern(o.value)}
                          className={cn(
                            "p-5 border text-left transition-all flex items-start gap-4",
                            checked
                              ? "border-foreground bg-foreground/[0.03]"
                              : "border-border hover:border-foreground/50"
                          )}
                        >
                          <span
                            className={cn(
                              "mt-0.5 h-5 w-5 rounded-full border flex items-center justify-center shrink-0",
                              checked ? "border-foreground" : "border-muted-foreground"
                            )}
                          >
                            {checked && (
                              <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                            )}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-serif text-lg">{o.label}</p>
                              {isFirst && concerns.size > 1 && (
                                <span className="text-[0.625rem] font-mono uppercase tracking-wider bg-foreground text-background px-1.5 py-0.5">
                                  Primary
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{o.detail}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SKIN_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setAnswers({ skinType: o.value as SkinType | "not-sure" })}
                        className={cn(
                          "p-5 border text-left transition-all",
                          answers.skinType === o.value
                            ? "border-foreground bg-foreground/[0.03]"
                            : "border-border hover:border-foreground/50"
                        )}
                      >
                        <p className="font-serif text-lg">{o.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{o.detail}</p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <ReactivityScale
                    value={answers.reactivity}
                    onChange={(v) => setAnswers({ reactivity: v })}
                  />
                )}

                {step === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "essential", label: "Essential", detail: "3 products · 2 minutes" },
                      { value: "balanced", label: "Balanced", detail: "4–5 products · 5 minutes" },
                      { value: "complete", label: "Complete", detail: "5+ products · 8+ minutes" },
                    ].map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setAnswers({ routineTime: o.value as any })}
                        className={cn(
                          "p-5 border text-left transition-all",
                          answers.routineTime === o.value
                            ? "border-foreground bg-foreground/[0.03]"
                            : "border-border hover:border-foreground/50"
                        )}
                      >
                        <p className="font-serif text-xl">{o.label}</p>
                        <p className="text-xs text-muted-foreground mt-2">{o.detail}</p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: "under-100", label: "Under $100", detail: "Essential routine" },
                      { value: "100-150", label: "$100–150", detail: "Balanced routine" },
                      { value: "150-plus", label: "$150+", detail: "Complete routine" },
                    ].map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setAnswers({ budget: o.value as any })}
                        className={cn(
                          "p-5 border text-left transition-all",
                          answers.budget === o.value
                            ? "border-foreground bg-foreground/[0.03]"
                            : "border-border hover:border-foreground/50"
                        )}
                      >
                        <p className="font-serif text-xl">{o.label}</p>
                        <p className="text-xs text-muted-foreground mt-2">{o.detail}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav */}
              <div className="mt-12 flex items-center justify-between">
                <button
                  onClick={step === 0 ? () => router.push("/") : prev}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {step === 0 ? "Home" : "Back"}
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={cn(
                    "inline-flex items-center gap-2 h-12 px-7 text-xs uppercase tracking-[0.16em] transition-all",
                    canProceed()
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {step === 4 ? "See your routine" : "Continue"}
                  {step === 4 ? <Check className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ReactivityScale({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-end gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n as 1 | 2 | 3 | 4 | 5)}
            className="flex-1 group"
            aria-label={REACTIVITY_LABELS[n - 1]}
          >
            <div
              className={cn(
                "border-2 transition-all",
                value >= n
                  ? "border-foreground bg-foreground"
                  : "border-border group-hover:border-foreground/50"
              )}
              style={{ height: `${40 + n * 24}px` }}
            />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-5 mt-4">
        {REACTIVITY_LABELS.map((l, i) => (
          <div
            key={l}
            className={cn(
              "text-[0.625rem] uppercase tracking-[0.14em] text-center transition-colors",
              value === i + 1 ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {l}
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-8 leading-relaxed">
        Reactivity describes how easily your skin stings, reddens or responds to active products.
        Most skin is more reactive than its owner thinks.
      </p>
    </div>
  );
}
