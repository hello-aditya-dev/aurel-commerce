"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/commerce/cart-store";
import { formatPrice } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";
import type { Product } from "@/types/commerce";
import { Reveal } from "@/components/motion/reveal";

export function CompleteRoutine({
  mainProduct,
  pairings,
}: {
  mainProduct: Product;
  pairings: Product[];
}) {
  const all = [mainProduct, ...pairings];
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const addMany = useCart((s) => s.addMany);
  const openCart = useCart((s) => s.open);

  const included = all.filter((p) => !excluded.has(p.slug));
  const total = included.reduce((sum, p) => sum + p.price, 0);
  const savings = Math.round(total * 0.12);

  const toggle = (slug: string) => {
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const handleAddAll = () => {
    track("add_bundle", {
      slug: "pdp_complete_routine",
      value: total - savings,
      source: "pdp_complete_routine",
    });
    addMany(
      included.map((p) => p.slug),
      "one-time"
    );
    openCart();
  };

  return (
    <section className="mt-20 md:mt-32 bg-bone-deep py-12 md:py-16 px-5 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className="md:col-span-4">
          <p className="text-eyebrow text-muted-foreground mb-5">Complete the routine</p>
          <h2 className="font-serif text-editorial">A coherent sequence.</h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-2">
          <p className="text-base text-muted-foreground leading-relaxed">
            These products are formulated to layer together. Add the full routine and save 12%.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
        {all.map((p, i) => {
          const isExcluded = excluded.has(p.slug);
          return (
            <Reveal key={p.id} delay={0.05 * i}>
              <div
                className={`bg-background p-5 h-full transition-opacity ${isExcluded ? "opacity-40" : "opacity-100"}`}
              >
                <button
                  onClick={() => toggle(p.slug)}
                  className="block w-full text-left"
                  aria-pressed={!isExcluded}
                >
                  <div className="relative aspect-square overflow-hidden bg-muted mb-3">
                    <Image
                      src={p.media[0].src}
                      alt={p.media[0].alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-background flex items-center justify-center">
                      {isExcluded ? (
                        <Plus className="h-3 w-3" />
                      ) : (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                  <p className="font-serif text-sm leading-tight">
                    {i === 0 ? <span className="font-mono text-[0.625rem] text-muted-foreground uppercase tracking-wider block mb-1">Your pick</span> : null}
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{formatPrice(p.price)}</p>
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <span className="text-sm text-muted-foreground">Routine total ({included.length})</span>
          <span className="font-serif text-2xl">{formatPrice(total - savings)}</span>
          <span className="text-sm text-muted-foreground line-through tabular-nums">
            {formatPrice(total)}
          </span>
          <span className="text-xs uppercase tracking-[0.14em] text-foreground">
            Save {formatPrice(savings)}
          </span>
        </div>
        <button
          onClick={handleAddAll}
          className="h-12 px-8 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
        >
          Add complete routine — {formatPrice(total - savings)}
        </button>
      </div>
    </section>
  );
}
