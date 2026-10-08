"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Star, Plus } from "lucide-react";
import { useCart } from "@/lib/commerce/cart-store";
import { getProductBySlug, formatPrice } from "@/lib/commerce/provider";
import { WishlistButton } from "@/components/commerce/wishlist-button";
import { CompareButton } from "@/components/commerce/compare-button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/commerce";

const Ctx = React.createContext<{ open: (slug: string) => void }>({ open: () => {} });

export function useQuickView() {
  return React.useContext(Ctx);
}

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = React.useState<string | null>(null);
  const reduce = useReducedMotion();

  const open = React.useCallback((s: string) => setSlug(s), []);
  const close = React.useCallback(() => setSlug(null), []);

  // Lock body scroll when open
  React.useEffect(() => {
    if (slug) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [slug]);

  // Escape to close
  React.useEffect(() => {
    if (!slug) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slug, close]);

  const product = slug ? getProductBySlug(slug) : null;

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {product && (
          <QuickViewContent product={product} onClose={close} reduce={reduce} />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function QuickViewContent({
  product,
  onClose,
  reduce,
}: {
  product: Product;
  onClose: () => void;
  reduce: boolean | null;
}) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const [active, setActive] = React.useState(0);
  const media = product.media.slice(0, 4);
  const featured = media[active] ?? media[0];

  const handleAdd = () => {
    track("add_to_cart", { slug: product.slug, source: "quick_view" });
    add(product, { variant: "one-time" });
    onClose();
    openCart();
  };

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={reduce ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl max-h-[92vh] md:max-h-[90vh] bg-background overflow-hidden flex flex-col md:grid md:grid-cols-2"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Gallery */}
        <div className="relative bg-muted shrink-0">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
            <img
              src={featured.src}
              alt={featured.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          {media.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 justify-center">
              {media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "relative h-12 w-10 overflow-hidden bg-background/80 border transition-all",
                    active === i ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={m.src} alt={m.alt} className="absolute inset-0 h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col p-6 md:p-8 overflow-y-auto scroll-aurel">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.14em]">
              {product.number}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground capitalize">
              {product.category}
            </span>
          </div>

          <h2 id="quick-view-title" className="font-serif font-light leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            {product.name}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {product.subtitle}
          </p>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-foreground">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="tabular-nums">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{product.reviewCount} reviews</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{product.size}</span>
          </div>

          <div className="mt-5 flex items-baseline gap-4">
            <span className="font-serif text-3xl">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through tabular-nums">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-6 space-y-2">
            {product.benefits.slice(0, 3).map((b) => (
              <div key={b.label} className="flex items-start gap-2 text-sm">
                <Plus className="h-3.5 w-3.5 mt-0.5 text-foreground shrink-0" />
                <span className="text-foreground/85">
                  <span className="font-medium">{b.label}</span>
                  <span className="text-muted-foreground"> — {b.detail}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Key actives */}
          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-eyebrow text-muted-foreground mb-3">Key actives</p>
            <div className="flex flex-wrap gap-1.5">
              {product.keyIngredients.map((i) => (
                <span
                  key={i}
                  className="text-xs uppercase tracking-[0.12em] px-2.5 py-1 border border-border capitalize"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-6 space-y-3">
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="flex-1 h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-3.5 w-3.5" />
                Add to bag — {formatPrice(product.price)}
              </button>
              <WishlistButton slug={product.slug} variant="pill" />
            </div>
            <div className="flex items-center justify-between">
              <CompareButton slug={product.slug} variant="pill" />
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                View full details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
