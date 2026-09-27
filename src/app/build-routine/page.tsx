"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Plus, X, ArrowRight, Trash2, Sparkles, Bookmark, FolderOpen } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getAllProducts, formatPrice, getProductsBySlugs } from "@/lib/commerce/provider";
import { useCart } from "@/lib/commerce/cart-store";
import { useSavedRoutines } from "@/lib/commerce/saved-routines-store";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { RoutineStep } from "@/types/commerce";

const STEPS: { key: RoutineStep; label: string; description: string }[] = [
  { key: "cleanse", label: "01 Cleanse", description: "Remove the day without stripping the barrier." },
  { key: "treat", label: "02 Treat", description: "The active step. AM vitamin C, PM retinal, peptide underneath both." },
  { key: "restore", label: "03 Restore", description: "Reinforce the lipid matrix." },
  { key: "protect", label: "04 Protect", description: "Non-negotiable morning SPF." },
];

export default function BuildRoutinePage() {
  const products = getAllProducts().filter((p) => p.category !== "system");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const reduce = useReducedMotion();
  const addMany = useCart((s) => s.addMany);
  const openCart = useCart((s) => s.open);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const selectedProducts = getProductsBySlugs(Array.from(selected));
  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = Math.round(total * 0.12);
  const finalTotal = total - savings;

  const handleAddAll = () => {
    if (selectedProducts.length === 0) return;
    track("routine_builder_save", { slugs: Array.from(selected), total: finalTotal });
    addMany(selectedProducts.map((p) => p.slug), "one-time");
    toast("Routine added to bag", {
      description: `${selectedProducts.length} products · ${formatPrice(finalTotal)} (save ${formatPrice(savings)})`,
    });
    openCart();
  };

  // Saved routines
  const saveRoutine = useSavedRoutines((s) => s.save);
  const savedRoutines = useSavedRoutines((s) => s.routines);
  const removeRoutine = useSavedRoutines((s) => s.remove);
  const [saveName, setSaveName] = React.useState("");

  const handleSave = () => {
    if (selectedProducts.length === 0) return;
    const name = saveName.trim() || `Routine ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    saveRoutine(name, Array.from(selected), finalTotal, savings);
    track("routine_save", { name, slugs: Array.from(selected), total: finalTotal });
    toast("Routine saved", {
      description: `"${name}" is now in your account under Saved Routines.`,
    });
    setSaveName("");
  };

  const loadRoutine = (id: string) => {
    const r = savedRoutines.find((x) => x.id === id);
    if (!r) return;
    setSelected(new Set(r.slugs));
    toast(`Loaded "${r.name}"`, {
      description: `${r.slugs.length} products loaded into the builder.`,
    });
  };

  const clearAll = () => {
    setSelected(new Set());
    toast("Routine cleared");
  };

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">Build your routine</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Compose your
                <br />
                <span className="italic text-muted-foreground">AUREL protocol.</span>
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <p className="text-base text-muted-foreground leading-relaxed">
                Pick one or more products for each routine step. We'll calculate your bundle saving (12% on the total) and add everything to your bag in one click.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Save 12% · No subscription required
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-aurel py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16">
          {/* Steps */}
          <div className="space-y-12">
            {STEPS.map((step) => {
              const stepProducts = products.filter((p) => p.routineStep === step.key);
              return (
                <div key={step.key}>
                  <div className="mb-6 pb-3 border-b border-border">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-serif text-2xl md:text-3xl">{step.label}</h2>
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        {stepProducts.length} options
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                    {stepProducts.map((p) => {
                      const isSelected = selected.has(p.slug);
                      return (
                        <button
                          key={p.id}
                          onClick={() => toggle(p.slug)}
                          className={cn(
                            "group text-left border p-3 transition-all relative",
                            isSelected
                              ? "border-foreground bg-foreground/[0.03]"
                              : "border-border hover:border-foreground/40"
                          )}
                        >
                          <div className="relative aspect-square overflow-hidden bg-muted mb-3">
                            <Image src={p.media[0].src} alt={p.media[0].alt} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                            <div className="absolute top-2 right-2 h-6 w-6 rounded-full flex items-center justify-center transition-all"
                              style={{ background: isSelected ? 'var(--foreground)' : 'rgba(255,255,255,0.85)' }}
                            >
                              {isSelected ? (
                                <Check className="h-3.5 w-3.5 text-background" />
                              ) : (
                                <Plus className="h-3.5 w-3.5 text-foreground" />
                              )}
                            </div>
                          </div>
                          <p className="font-serif text-sm leading-tight">{p.name}</p>
                          <p className="text-xs text-muted-foreground mt-1 tabular-nums">{formatPrice(p.price)}</p>
                          <p className="text-[0.625rem] uppercase tracking-wider text-muted-foreground mt-1">
                            {p.timeOfDay === "AM" && "AM only"}
                            {p.timeOfDay === "PM" && "PM only"}
                            {p.timeOfDay === "BOTH" && "AM + PM"}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky summary */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-border bg-bone-deep p-6">
              <p className="text-eyebrow text-muted-foreground mb-4">Your routine</p>
              <div className="space-y-3 mb-6 min-h-[100px]">
                <AnimatePresence>
                  {selectedProducts.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={reduce ? undefined : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      className="text-sm text-muted-foreground italic"
                    >
                      Select products to build your routine.
                    </motion.p>
                  ) : (
                    selectedProducts.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={reduce ? undefined : { opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -12 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-12 w-10 shrink-0 overflow-hidden bg-muted">
                          <Image src={p.media[0].src} alt={p.media[0].alt} fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground tabular-nums">{formatPrice(p.price)}</p>
                        </div>
                        <button
                          onClick={() => toggle(p.slug)}
                          aria-label={`Remove ${p.name}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {selectedProducts.length > 0 && (
                <>
                  <div className="space-y-2 py-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="tabular-nums">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bundle saving (12%)</span>
                      <span className="tabular-nums text-foreground">–{formatPrice(savings)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t border-border">
                    <span className="text-sm uppercase tracking-[0.14em]">Total</span>
                    <span className="font-serif text-2xl tabular-nums">{formatPrice(finalTotal)}</span>
                  </div>
                  <button
                    onClick={handleAddAll}
                    className="mt-6 w-full h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Add routine to bag
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={selectedProducts.length === 0}
                    className={cn(
                      "mt-3 w-full h-10 border text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors",
                      selectedProducts.length === 0
                        ? "border-border text-muted-foreground cursor-not-allowed"
                        : "border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5"
                    )}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    Save routine to account
                  </button>
                  <button
                    onClick={clearAll}
                    className="mt-3 w-full text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear routine
                  </button>
                </>
              )}

              {/* Saved routines list */}
              {savedRoutines.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-eyebrow text-muted-foreground mb-3 flex items-center gap-2">
                    <FolderOpen className="h-3.5 w-3.5" />
                    Saved routines ({savedRoutines.length})
                  </p>
                  <ul className="space-y-2">
                    {savedRoutines.map((r) => (
                      <li key={r.id} className="flex items-center gap-2 p-2 border border-border bg-background">
                        <button
                          onClick={() => loadRoutine(r.id)}
                          className="flex-1 text-left min-w-0"
                          aria-label={`Load ${r.name}`}
                        >
                          <p className="font-serif text-sm truncate">{r.name}</p>
                          <p className="text-[0.625rem] text-muted-foreground tabular-nums">
                            {r.slugs.length} products · {formatPrice(r.total)}
                          </p>
                        </button>
                        <button
                          onClick={() => { removeRoutine(r.id); toast("Routine removed"); }}
                          aria-label={`Remove ${r.name}`}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-eyebrow text-muted-foreground mb-3">Prefer the diagnostic?</p>
                <Link
                  href="/diagnostic"
                  className="block text-sm text-foreground link-underline"
                >
                  Take the 5-step skin diagnostic →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
