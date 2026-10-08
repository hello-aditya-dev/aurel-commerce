"use client";

import * as React from "react";
import Link from "next/link";
import { useWishlist } from "@/lib/commerce/wishlist-store";
import { getProductsBySlugs } from "@/lib/commerce/provider";
import { ProductCard } from "@/components/commerce/product-card";
import { Heart, ArrowRight, Share2, Check, Trash2 } from "lucide-react";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { encodeWishlistForShare } from "@/lib/commerce/share-wishlist";

export default function WishlistPage() {
  const hasHydrated = useWishlist((s) => s.hasHydrated);
  const slugs = useWishlist((s) => s.slugs);
  const clear = useWishlist((s) => s.clear);
  const [copied, setCopied] = React.useState(false);

  const products = hasHydrated ? getProductsBySlugs(slugs) : [];

  const handleShare = async () => {
    if (slugs.length === 0) return;
    const encoded = encodeWishlistForShare(slugs);
    const base = window.location.origin + (process.env.NEXT_PUBLIC_BASE_PATH || "");
    const url = `${base}/?wishlist=${encodeURIComponent(encoded)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("wishlist_share", { count: slugs.length });
      toast("Wishlist link copied", {
        description: "Share it anywhere. The recipient's wishlist will be merged.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">Saved</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Your wishlist.
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3 flex flex-col md:items-end justify-end">
              <p className="text-sm text-muted-foreground">
                {hasHydrated ? (
                  <>
                    {products.length} {products.length === 1 ? "product" : "products"} saved
                  </>
                ) : (
                  <>Loading…</>
                )}
              </p>
              <div className="mt-3 flex gap-2">
                {products.length > 0 && (
                  <>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors link-underline"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Link copied
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3.5 w-3.5" />
                          Share wishlist
                        </>
                      )}
                    </button>
                    <span className="text-muted-foreground/30">·</span>
                    <button
                      onClick={clear}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors link-underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-aurel py-12 md:py-20">
        {hasHydrated && products.length === 0 ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <div className="h-14 w-14 rounded-full border border-border flex items-center justify-center mx-auto mb-6">
              <Heart className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="font-serif text-3xl mb-3">Nothing saved yet.</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Tap the heart icon on any product to save it here. Your wishlist syncs across this browser.
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
