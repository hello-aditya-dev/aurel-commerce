"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { getBestsellers } from "@/lib/commerce/provider";
import { Section, Eyebrow } from "@/components/editorial/section";
import { Reveal } from "@/components/motion/reveal";

export function BestsellersSection() {
  const products = getBestsellers(4);
  return (
    <Section className="py-16 md:py-28">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div>
          <Eyebrow>Most loved</Eyebrow>
          <Reveal delay={0.05}>
            <h2 className="font-serif text-editorial mt-3">Bestsellers</h2>
          </Reveal>
        </div>
        <Link
          href="/shop"
          className="group hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Mobile: horizontal scroll. Desktop: grid */}
      <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 md:grid md:grid-cols-4 md:gap-6">
        {products.map((p, i) => (
          <div key={p.id} className="w-[78vw] sm:w-auto shrink-0 md:w-auto">
            <ProductCard product={p} index={i} priority={i < 2} />
          </div>
        ))}
      </div>

      <Link
        href="/shop"
        className="sm:hidden mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground"
      >
        View all products
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </Section>
  );
}
