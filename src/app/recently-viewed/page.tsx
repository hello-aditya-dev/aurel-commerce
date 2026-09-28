"use client";

import * as React from "react";
import Link from "next/link";
import { useRecentlyViewed } from "@/lib/commerce/recently-viewed-store";
import { getProductsBySlugs } from "@/lib/commerce/provider";
import { ProductCard } from "@/components/commerce/product-card";
import { Trash2, ArrowRight, Clock } from "lucide-react";

export default function RecentlyViewedPage() {
  const hasHydrated = useRecentlyViewed((s) => s.hasHydrated);
  const slugs = useRecentlyViewed((s) => s.slugs);
  const clear = useRecentlyViewed((s) => s.clear);
  const products = hasHydrated ? getProductsBySlugs(slugs) : [];

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">History</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Recently viewed.
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3 flex flex-col md:items-end justify-end">
              <p className="text-sm text-muted-foreground">
                {hasHydrated ? (
                  <>
                    {products.length} {products.length === 1 ? "product" : "products"} viewed recently
                  </>
                ) : (
                  <>Loading…</>
                )}
              </p>
              {products.length > 0 && (
                <button
                  onClick={clear}
                  className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear history
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-aurel py-12 md:py-20">
        {!hasHydrated ? (
          <div className="text-center py-24 text-muted-foreground">Loading…</div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="h-14 w-14 rounded-full border border-border flex items-center justify-center mx-auto mb-6">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="font-serif text-3xl mb-3">No history yet.</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
              Browse the catalogue — products you view will appear here for quick access. Your history syncs across this browser only.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-12 px-7 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
            >
              Browse the catalogue
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
