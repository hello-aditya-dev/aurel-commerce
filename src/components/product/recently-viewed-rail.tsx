"use client";

import * as React from "react";
import { useRecentlyViewed } from "@/lib/commerce/recently-viewed-store";
import { getProductsBySlugs } from "@/lib/commerce/provider";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";

export function RecentlyViewedRail({
  excludeSlug,
  title = "Recently viewed",
}: {
  excludeSlug?: string;
  title?: string;
}) {
  const hasHydrated = useRecentlyViewed((s) => s.hasHydrated);
  const slugs = useRecentlyViewed((s) => s.slugs);

  const filtered = excludeSlug
    ? slugs.filter((s) => s !== excludeSlug)
    : slugs;

  const products = hasHydrated ? getProductsBySlugs(filtered) : [];

  if (!hasHydrated || products.length === 0) return null;

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="container-aurel">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-editorial">{title}</h2>
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Continue exploring
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-6 md:gap-y-10">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
