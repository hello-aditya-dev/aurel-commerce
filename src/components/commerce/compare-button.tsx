"use client";

import * as React from "react";
import { GitCompare } from "lucide-react";
import { useCompare, COMPARE_MAX } from "@/lib/commerce/compare-store";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CompareButton({
  slug,
  variant = "icon",
  className,
}: {
  slug: string;
  variant?: "icon" | "pill";
  className?: string;
}) {
  const hasHydrated = useCompare((s) => s.hasHydrated);
  const slugs = useCompare((s) => s.slugs);
  const toggle = useCompare((s) => s.toggle);
  const isCompared = hasHydrated && slugs.includes(slug);
  const isFull = hasHydrated && slugs.length >= COMPARE_MAX;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasCompared = isCompared;
    if (!wasCompared && isFull) {
      toast(`Compare limit reached`, {
        description: `You can compare up to ${COMPARE_MAX} products at a time.`,
      });
      return;
    }
    toggle(slug);
    if (!wasCompared) {
      track("compare_add", { slug });
      toast("Added to compare", {
        description: `${slugs.length + 1} of ${COMPARE_MAX} selected.`,
      });
    } else {
      track("compare_remove", { slug });
      toast("Removed from compare");
    }
  };

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        aria-pressed={isCompared}
        aria-label={isCompared ? "Remove from compare" : "Add to compare"}
        className={cn(
          "inline-flex items-center gap-2 h-10 px-4 border text-xs uppercase tracking-[0.14em] transition-all",
          isCompared
            ? "border-foreground bg-foreground/5 text-foreground"
            : "border-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground/60",
          className
        )}
      >
        <GitCompare className="h-3.5 w-3.5" />
        {isCompared ? "Comparing" : "Compare"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={isCompared}
      aria-label={isCompared ? "Remove from compare" : "Add to compare"}
      className={cn(
        "inline-flex items-center justify-center h-9 w-9 rounded-full transition-all",
        isCompared
          ? "text-foreground bg-foreground/5"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
        className
      )}
    >
      <GitCompare className="h-4 w-4" />
    </button>
  );
}
