"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/commerce/wishlist-store";
import { getProductBySlug } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function WishlistButton({
  slug,
  variant = "icon",
  className,
}: {
  slug: string;
  variant?: "icon" | "pill";
  className?: string;
}) {
  const hasHydrated = useWishlist((s) => s.hasHydrated);
  const slugs = useWishlist((s) => s.slugs);
  const toggle = useWishlist((s) => s.toggle);
  const isSaved = hasHydrated && slugs.includes(slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasSaved = isSaved;
    toggle(slug);
    const product = getProductBySlug(slug);
    if (!wasSaved) {
      track("add_to_wishlist", { slug });
      toast("Saved to wishlist", {
        description: product ? `${product.name} · ${product.size}` : undefined,
      });
    } else {
      track("remove_from_wishlist", { slug });
      toast("Removed from wishlist", {
        description: product ? product.name : undefined,
      });
    }
  };

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        aria-pressed={isSaved}
        aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
        className={cn(
          "inline-flex items-center gap-2 h-10 px-4 border text-xs uppercase tracking-[0.14em] transition-all",
          isSaved
            ? "border-foreground bg-foreground/5 text-foreground"
            : "border-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground/60",
          className
        )}
      >
        <Heart
          className={cn("h-3.5 w-3.5 transition-all", isSaved && "fill-current")}
        />
        {isSaved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
      className={cn(
        "inline-flex items-center justify-center h-9 w-9 rounded-full transition-all",
        isSaved
          ? "text-foreground bg-foreground/5"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
        className
      )}
    >
      <Heart
        className={cn("h-4 w-4 transition-all", isSaved && "fill-current")}
      />
    </button>
  );
}
