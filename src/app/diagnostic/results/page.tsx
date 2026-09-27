"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Plus, Minus, ArrowRight, RotateCcw } from "lucide-react";
import { useQuiz } from "@/lib/commerce/quiz-store";
import { useCart } from "@/lib/commerce/cart-store";
import { getProductBySlug, formatPrice } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
  const router = useRouter();
  const { result, answers, reset } = useQuiz();
  const addMany = useCart((s) => s.addMany);
  const openCart = useCart((s) => s.open);
  const reduce = useReducedMotion();
  const [excluded, setExcluded] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (!result) router.push("/diagnostic");
  }, [result, router]);

  if (!result) return null;

  const am = result.am.filter((s) => !excluded.has(s)).map(getProductBySlug).filter(Boolean);
  const pm = result.pm.filter((s) => !excluded.has(s)).map(getProductBySlug).filter(Boolean);
  const allSlugs = Array.from(new Set([...result.am, ...result.pm])).filter(
    (s) => !excluded.has(s)
  );
  const total = allSlugs.reduce((sum, s) => sum + (getProductBySlug(s)?.price ?? 0), 0);
  const finalTotal = total - Math.round(total * 0.12);

  const toggle = (slug: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const addAll = () => {
    track("add_bundle", { slug: "quiz_routine", value: finalTotal, source: "diagnostic" });
    addMany(allSlugs, "one-time");
    openCart();
  };

  return (
    <div className="container-aurel py-12 md:py-20">
      {/* Header */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-16"
      >
        <p className="text-eyebrow text-muted-foreground mb-5">Your AUREL Protocol</p>
        <h1
          className="font-serif font-light leading-[1] tracking-[-0.025em]"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
        >
          {result.protocolName}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
          Based on your answers, this routine targets{" "}
          <span className="text-foreground">{answers.concerns.join(", ").toLowerCase() || "balanced skin"}</span>{" "}
          with a{" "}
          <span className="text-foreground">{answers.routineTime}</span>{" "}
          routine for{" "}
          <span className="text-foreground">{answers.skinType.replace("-", " ")}</span> skin.
        </p>
      </motion.div>

      {/* Rationale */}
      <div className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.rationale.map((r, i) => (
          <motion.div
            key={i}
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            className="flex gap-4 items-start"
          >
            <span className="font-mono text-xs text-muted-foreground mt-1">
              0{i + 1}
            </span>
            <p className="text-sm md:text-base text-foreground/85 leading-relaxed">{r}</p>
          </motion.div>
        ))}
      </div>

      {/* AM / PM routine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <RoutineColumn label="AM" products={am!} excluded={excluded} onToggle={toggle} />
        <RoutineColumn label="PM" products={pm!} excluded={excluded} onToggle={toggle} />
      </div>

      {/* Footer with total + add all */}
      <div className="mt-16 md:mt-24 border-t border-border pt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-eyebrow text-muted-foreground mb-2">Total routine</p>
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-4xl md:text-5xl">{formatPrice(finalTotal)}</span>
              <span className="text-muted-foreground line-through tabular-nums">{formatPrice(total)}</span>
              <span className="text-xs uppercase tracking-[0.14em] text-foreground">
                Save 12%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {allSlugs.length} products · Free shipping over $75
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { reset(); router.push("/diagnostic"); }}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 border border-foreground/30 hover:border-foreground text-xs uppercase tracking-[0.14em] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake
            </button>
            <button
              onClick={addAll}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
            >
              Add complete routine — {formatPrice(finalTotal)}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-12 text-xs text-muted-foreground font-mono uppercase tracking-wider">
        Illustrative routine · AUREL is a fictional concept brand · Adjust as needed
      </p>
    </div>
  );
}

function RoutineColumn({
  label,
  products,
  excluded,
  onToggle,
}: {
  label: string;
  products: NonNullable<ReturnType<typeof getProductBySlug>>[];
  excluded: Set<string>;
  onToggle: (slug: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-border">
        <h2 className="font-serif text-3xl">{label}</h2>
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {products.length} steps
        </span>
      </div>
      <ol className="space-y-3">
        {products.map((p, i) => {
          if (!p) return null;
          const isExcluded = excluded.has(p.slug);
          return (
            <li key={p.id}>
              <div
                className={cn(
                  "flex items-center gap-4 p-3 border transition-all",
                  isExcluded
                    ? "border-border opacity-40"
                    : "border-border hover:border-foreground/40"
                )}
              >
                <button
                  onClick={() => onToggle(p.slug)}
                  className="font-mono text-xs text-muted-foreground w-6 shrink-0"
                  aria-label={isExcluded ? "Include" : "Exclude"}
                >
                  {isExcluded ? "+" : "0" + (i + 1)}
                </button>
                <Link
                  href={`/products/${p.slug}`}
                  className="relative h-16 w-14 shrink-0 overflow-hidden bg-muted"
                >
                  <Image
                    src={p.media[0].src}
                    alt={p.media[0].alt}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${p.slug}`}
                    className="font-serif text-base hover:underline underline-offset-4 truncate block"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{p.subtitle}</p>
                </div>
                <span className="text-sm tabular-nums shrink-0">{formatPrice(p.price)}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
