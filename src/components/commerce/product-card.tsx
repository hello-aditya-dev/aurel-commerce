"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/types/commerce";
import { useCart } from "@/lib/commerce/cart-store";
import { formatPrice } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { WishlistButton } from "@/components/commerce/wishlist-button";
import { CompareButton } from "@/components/commerce/compare-button";

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const add = useCart((s) => s.add);
  const reduce = useReducedMotion();
  const primary = product.media[0];
  const secondary = product.media[1] ?? product.media[0];

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.06 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link
          href={`/products/${product.slug}`}
          aria-label={product.name}
          className="block absolute inset-0"
        >
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 60vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            priority={priority}
          />
          {/* Hover image swap */}
          {secondary.src !== primary.src && (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 60vw"
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </Link>

        {/* Badges */}
        {(product.isNew || product.badge) && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-background/95 text-foreground text-[0.625rem] uppercase tracking-[0.14em] px-2.5 py-1 font-mono">
                New
              </span>
            )}
            {product.badge && (
              <span className="bg-foreground text-background text-[0.625rem] uppercase tracking-[0.14em] px-2.5 py-1 font-mono">
                {product.badge}
              </span>
            )}
          </div>
        )}

        {/* Wishlist + Compare heart (top right, desktop hover + always visible on mobile) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <WishlistButton slug={product.slug} variant="icon" />
          <CompareButton slug={product.slug} variant="icon" />
        </div>

        {/* Quick add (desktop hover) */}
        <div className="hidden md:block absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              track("add_to_cart", { slug: product.slug, source: "quick_add_card" });
              add(product, { variant: "one-time" });
            }}
            className="w-full h-10 bg-background/95 backdrop-blur text-foreground text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            Quick add
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="font-serif text-base leading-snug tracking-tight hover:underline underline-offset-4 truncate"
          >
            {product.name}
          </Link>
          <span className="text-sm tabular-nums shrink-0">{formatPrice(product.price)}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
          {product.subtitle}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[0.6875rem] text-muted-foreground">
          <RatingStars value={product.rating} />
          <span className="tabular-nums">{product.rating.toFixed(1)} · {product.reviewCount}</span>
        </div>

        {/* Mobile quick add — always visible */}
        <button
          onClick={() => {
            track("add_to_cart", { slug: product.slug, source: "quick_add_card_mobile" });
            add(product, { variant: "one-time" });
          }}
          className="md:hidden mt-3 w-full h-10 border border-foreground/30 text-foreground text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 hover:bg-foreground hover:text-background transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add to bag
        </button>
      </div>
    </motion.article>
  );
}

export function RatingStars({
  value,
  className,
  size = "sm",
}: {
  value: number;
  className?: string;
  size?: "sm" | "md";
}) {
  // Use Unicode star with partial fill via gradient
  const pct = (value / 5) * 100;
  return (
    <span
      className={cn("relative inline-block leading-none", className)}
      style={{ fontSize: size === "sm" ? "0.75rem" : "1rem" }}
      aria-label={`${value} out of 5`}
      role="img"
    >
      <span className="text-muted-foreground/30">★★★★★</span>
      <span
        className="absolute left-0 top-0 overflow-hidden text-foreground"
        style={{ width: `${pct}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}
