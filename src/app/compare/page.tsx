"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCompare, COMPARE_MAX } from "@/lib/commerce/compare-store";
import { getProductsBySlugs, formatPrice } from "@/lib/commerce/provider";
import { useCart } from "@/lib/commerce/cart-store";
import { track } from "@/lib/analytics";
import { Check, X, Plus, ArrowRight, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const hasHydrated = useCompare((s) => s.hasHydrated);
  const slugs = useCompare((s) => s.slugs);
  const remove = useCompare((s) => s.remove);
  const clear = useCompare((s) => s.clear);
  const addToCart = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);

  const products = hasHydrated ? getProductsBySlugs(slugs) : [];

  // Specs rows to compare
  const rows: { key: string; label: string; render: (p: typeof products[number]) => React.ReactNode }[] = [
    { key: "price", label: "Price", render: (p) => formatPrice(p.price) },
    { key: "size", label: "Size", render: (p) => p.size },
    { key: "category", label: "Category", render: (p) => <span className="capitalize">{p.category}</span> },
    { key: "concerns", label: "Concerns", render: (p) => (
      <ul className="space-y-1">
        {p.concerns.map((c) => (
          <li key={c} className="text-xs text-muted-foreground capitalize flex items-center gap-1.5">
            <Check className="h-3 w-3 shrink-0" />
            {c.replace("-", " ")}
          </li>
        ))}
      </ul>
    ) },
    { key: "skinTypes", label: "Skin types", render: (p) => (
      <ul className="space-y-1">
        {p.skinTypes.map((s) => (
          <li key={s} className="text-xs text-muted-foreground capitalize flex items-center gap-1.5">
            <Check className="h-3 w-3 shrink-0" />
            {s}
          </li>
        ))}
      </ul>
    ) },
    { key: "keyIngredients", label: "Key actives", render: (p) => (
      <ul className="space-y-1">
        {p.keyIngredients.map((i) => (
          <li key={i} className="text-xs text-muted-foreground capitalize flex items-center gap-1.5">
            <Check className="h-3 w-3 shrink-0" />
            {i}
          </li>
        ))}
      </ul>
    ) },
    { key: "routineStep", label: "Routine step", render: (p) => <span className="capitalize">{p.routineStep}</span> },
    { key: "timeOfDay", label: "AM / PM", render: (p) => {
      if (p.timeOfDay === "AM") return "AM";
      if (p.timeOfDay === "PM") return "PM";
      return "AM + PM";
    } },
    { key: "subscription", label: "Subscription", render: (p) => p.subscriptionEligible ? <Check className="h-4 w-4" /> : <X className="h-4 w-4 opacity-40" /> },
    { key: "rating", label: "Rating", render: (p) => (
      <span className="tabular-nums">{p.rating.toFixed(1)} <span className="text-xs text-muted-foreground">({p.reviewCount})</span></span>
    ) },
    { key: "texture", label: "Texture", render: (p) => <span className="text-xs text-muted-foreground leading-relaxed">{p.texture}</span> },
  ];

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">Compare</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Side by side.
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <p className="text-base text-muted-foreground leading-relaxed">
                Compare up to {COMPARE_MAX} AUREL products across price, concerns, ingredients, routine placement and texture.
              </p>
              {products.length > 0 && (
                <button
                  onClick={clear}
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors link-underline"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear all
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
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="font-serif text-3xl mb-3">Nothing to compare.</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
              Use the compare icon on any product card or PDP to add products here. You can compare up to {COMPARE_MAX} products at a time.
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
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 scroll-aurel">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="w-32 sm:w-44 sticky left-0 bg-background z-10 align-bottom text-left border-b border-border pb-4">
                    <span className="text-eyebrow text-muted-foreground">Specification</span>
                  </th>
                  {products.map((p) => (
                    <th key={p.id} className="align-bottom border-b border-border pb-4 px-3 min-w-[200px]">
                      <div className="relative aspect-square overflow-hidden bg-muted mb-3">
                        <Image src={p.media[0].src} alt={p.media[0].alt} fill sizes="200px" className="object-cover" />
                        <button
                          onClick={() => remove(p.slug)}
                          aria-label={`Remove ${p.name} from compare`}
                          className="absolute top-2 right-2 h-6 w-6 bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <Link
                        href={`/products/${p.slug}`}
                        className="font-serif text-base leading-tight hover:underline underline-offset-4 block"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">{p.subtitle.slice(0, 60)}{p.subtitle.length > 60 ? "…" : ""}</p>
                    </th>
                  ))}
                  {products.length < COMPARE_MAX && (
                    <th className="align-bottom border-b border-border pb-4 px-3 min-w-[200px]">
                      <Link
                        href="/shop"
                        className="block aspect-square border border-dashed border-border hover:border-foreground/50 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <div className="text-center">
                          <Plus className="h-5 w-5 mx-auto mb-2" />
                          <span className="text-xs uppercase tracking-[0.14em]">Add product</span>
                        </div>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={row.key} className={cn(ri % 2 === 1 && "bg-muted/30")}>
                    <td className="sticky left-0 bg-background z-10 align-top py-4 px-1 text-xs uppercase tracking-[0.14em] text-muted-foreground border-b border-border">
                      {row.label}
                    </td>
                    {products.map((p) => (
                      <td key={p.id} className="align-top py-4 px-3 border-b border-border text-sm">
                        {row.render(p)}
                      </td>
                    ))}
                    {products.length < COMPARE_MAX && <td className="border-b border-border" />}
                  </tr>
                ))}
                {/* Add to bag row */}
                <tr>
                  <td className="sticky left-0 bg-background z-10 py-4 px-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Buy
                  </td>
                  {products.map((p) => (
                    <td key={p.id} className="py-4 px-3">
                      <button
                        onClick={() => {
                          track("add_to_cart", { slug: p.slug, source: "compare_page" });
                          addToCart(p, { variant: "one-time" });
                          openCart();
                        }}
                        className="w-full h-10 bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
                      >
                        Add — {formatPrice(p.price)}
                      </button>
                    </td>
                  ))}
                  {products.length < COMPARE_MAX && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
