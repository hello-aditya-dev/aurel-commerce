"use client";

import * as React from "react";
import { Check, RefreshCw, Truck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function PurchasePanel({
  price,
  size,
  subscriptionEligible,
  rating,
  reviewCount,
  onAdd,
}: {
  price: number;
  size: string;
  subscriptionEligible: boolean;
  rating: number;
  reviewCount: number;
  onAdd: (variant: "one-time" | "subscription", qty: number) => void;
}) {
  const [variant, setVariant] = React.useState<"one-time" | "subscription">(
    subscriptionEligible ? "subscription" : "one-time"
  );
  const [qty, setQty] = React.useState(1);
  const [adding, setAdding] = React.useState(false);

  const finalPrice = variant === "subscription" ? price * 0.85 : price;
  const saveMonthly = price - finalPrice;

  const handleAdd = async () => {
    setAdding(true);
    onAdd(variant, qty);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="flex flex-col">
      {/* Price + reviews */}
      <div className="flex items-baseline gap-4 mb-1">
        <span className="font-serif text-3xl tracking-tight">
          ${finalPrice.toFixed(2)}
        </span>
        {variant === "subscription" && (
          <span className="text-sm text-muted-foreground line-through tabular-nums">
            ${price.toFixed(2)}
          </span>
        )}
        <span className="text-xs text-muted-foreground uppercase tracking-[0.14em] ml-auto">
          {size}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-3 mb-7">
        <div className="flex items-center gap-1 text-foreground text-sm">
          {"★".repeat(Math.round(rating))}
          <span className="text-muted-foreground/30">
            {"★".repeat(5 - Math.round(rating))}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {rating.toFixed(1)} · {reviewCount} reviews
        </span>
      </div>

      {/* Variant selector */}
      {subscriptionEligible && (
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => setVariant("one-time")}
            className={cn(
              "w-full text-left p-4 border transition-all flex items-start gap-4",
              variant === "one-time"
                ? "border-foreground bg-foreground/[0.03]"
                : "border-border hover:border-foreground/50"
            )}
          >
            <Radio checked={variant === "one-time"} />
            <div className="flex-1">
              <p className="text-sm font-medium">One-time purchase</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                ${price.toFixed(2)} · ships once
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setVariant("subscription")}
            className={cn(
              "w-full text-left p-4 border transition-all flex items-start gap-4",
              variant === "subscription"
                ? "border-foreground bg-foreground/[0.03]"
                : "border-border hover:border-foreground/50"
            )}
          >
            <Radio checked={variant === "subscription"} />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Subscribe &amp; save 15%</p>
                <span className="text-[0.625rem] bg-foreground text-background px-1.5 py-0.5 font-mono uppercase tracking-wider">
                  Save ${saveMonthly.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                ${(price * 0.85).toFixed(2)} · delivered every 8 weeks · cancel anytime
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Quantity + Add */}
      <div className="flex gap-3">
        <div className="inline-flex items-center border border-foreground/30 shrink-0">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-12 w-12 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(9, q + 1))}
            className="h-12 w-12 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAdd}
          disabled={adding}
          className={cn(
            "flex-1 h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-all flex items-center justify-center gap-2",
            adding && "opacity-70"
          )}
        >
          {adding ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>Add to bag — ${(finalPrice * qty).toFixed(2)}</>
          )}
        </button>
      </div>

      {/* Trust statements */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <Trust icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Dermatologist tested" />
        <Trust icon={<RefreshCw className="h-3.5 w-3.5" />} label="Fragrance free" />
        <Trust icon={<Truck className="h-3.5 w-3.5" />} label="Free shipping over $75 · 30-day returns" />
        <p className="text-[0.625rem] text-muted-foreground mt-4 font-mono uppercase tracking-wider">
          Fictional brand attributes for demonstration · not a certification
        </p>
      </div>
    </div>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
        checked ? "border-foreground" : "border-muted-foreground"
      )}
    >
      {checked && <span className="h-2 w-2 rounded-full bg-foreground" />}
    </span>
  );
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <span className="text-foreground">{icon}</span>
      {label}
    </div>
  );
}
