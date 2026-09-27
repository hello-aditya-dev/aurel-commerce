"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/commerce/cart-store";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice, getProductBySlug } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, close, lines, remove, updateQty, subtotal, count } = useCart();
  const hasHydrated = useCart((s) => s.hasHydrated);
  const sub = subtotal();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
  const progress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);

  // Upsell: pick a product not yet in cart
  const inCartSlugs = new Set(lines.map((l) => l.slug));
  const upsellProduct = getProductBySlug("ceramide-recovery-cream");

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col gap-0 bg-background"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-xl tracking-tight">
              Your bag{" "}
              <span className="text-muted-foreground text-base align-middle">
                ({hasHydrated ? count : 0})
              </span>
            </SheetTitle>
            <button
              onClick={close}
              aria-label="Close cart"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </SheetHeader>

        {hasHydrated && lines.length === 0 ? (
          <EmptyState onClose={close} />
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {remaining > 0 ? (
                  <>
                    You're <span className="text-foreground font-medium">{formatPrice(remaining)}</span> away from complimentary shipping.
                  </>
                ) : (
                  <>Complimentary shipping unlocked.</>
                )}
              </p>
              <div className="mt-2 h-[2px] bg-muted overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-foreground"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto scroll-aurel">
              <ul className="divide-y divide-border">
                {lines.map((line) => (
                  <CartLineRow
                    key={line.id}
                    line={line}
                    onRemove={() => {
                      track("remove_from_cart", { slug: line.slug });
                      remove(line.id);
                    }}
                    onQty={(q) => updateQty(line.id, q)}
                  />
                ))}
              </ul>

              {/* Upsell */}
              {upsellProduct && !inCartSlugs.has(upsellProduct.slug) && (
                <UpsellRow
                  name={upsellProduct.name}
                  price={upsellProduct.price}
                  image={upsellProduct.media[0].src}
                  onAdd={() => {
                    track("add_to_cart", { slug: upsellProduct.slug, source: "cart_upsell" });
                    useCart.getState().add(upsellProduct);
                  }}
                />
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-serif text-lg">{formatPrice(sub)}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Shipping and taxes calculated at checkout. Demo checkout will not collect payment.
              </p>
              <Button
                size="lg"
                className="w-full h-12 rounded-none bg-foreground hover:bg-foreground/90"
                onClick={() => {
                  track("checkout_click", { stage: "drawer_checkout", value: sub });
                  toastCheckout();
                }}
              >
                Checkout — {formatPrice(sub)}
              </Button>
              <Link
                href="/shop"
                onClick={close}
                className="block text-center text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartLineRow({
  line,
  onRemove,
  onQty,
}: {
  line: ReturnType<typeof useCart.getState>["lines"][number];
  onRemove: () => void;
  onQty: (q: number) => void;
}) {
  return (
    <li className="flex gap-4 px-6 py-5">
      <Link
        href={`/products/${line.slug}`}
        className="block relative h-24 w-20 shrink-0 overflow-hidden bg-muted"
      >
        <img src={line.image} alt={line.name} className="absolute inset-0 h-full w-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${line.slug}`}
              className="font-serif text-base leading-tight hover:underline underline-offset-4 truncate block"
            >
              {line.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">{line.size}</p>
            <p className="text-[0.6875rem] text-muted-foreground mt-1">
              {line.variant === "subscription" ? "Subscription · save 15%" : "One-time purchase"}
            </p>
          </div>
          <button
            onClick={onRemove}
            aria-label="Remove"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <QtyStepper
            value={line.quantity}
            onChange={(v) => onQty(v)}
            min={1}
          />
          <span className="font-serif text-base">{formatPrice(line.price * line.quantity)}</span>
        </div>
      </div>
    </li>
  );
}

function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-border">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
        className="h-8 w-8 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        disabled={value <= min}
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="w-7 text-center text-sm tabular-nums">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
        className="h-8 w-8 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        disabled={value >= max}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

function UpsellRow({
  name,
  price,
  image,
  onAdd,
}: {
  name: string;
  price: number;
  image: string;
  onAdd: () => void;
}) {
  const [added, setAdded] = React.useState(false);
  return (
    <div className="px-6 py-5 bg-muted/40 border-t border-border">
      <p className="text-eyebrow text-muted-foreground mb-3">Complete your routine</p>
      <div className="flex gap-4 items-center">
        <div className="h-16 w-14 shrink-0 overflow-hidden bg-muted relative">
          <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-sm truncate">{name}</p>
          <p className="text-xs text-muted-foreground">+ {formatPrice(price)}</p>
        </div>
        <button
          onClick={() => {
            if (added) return;
            onAdd();
            setAdded(true);
          }}
          className={cn(
            "text-xs uppercase tracking-[0.14em] px-3 py-2 border transition-all",
            added
              ? "border-foreground bg-foreground text-background"
              : "border-foreground/30 text-foreground hover:border-foreground"
          )}
        >
          {added ? "Added" : "Add"}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16">
      <div className="h-14 w-14 rounded-full border border-border flex items-center justify-center mb-6">
        <ShoppingBag className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="font-serif text-2xl mb-2">Your bag is empty</p>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-8">
        AUREL routines are designed as coherent systems. Start with the diagnostic, or browse the catalogue.
      </p>
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <Link
          href="/diagnostic"
          onClick={close}
          className="w-full h-11 inline-flex items-center justify-center bg-foreground text-background text-sm uppercase tracking-[0.14em] hover:opacity-90 transition-opacity"
        >
          Take the diagnostic
        </Link>
        <Link
          href="/shop"
          onClick={close}
          className="w-full h-11 inline-flex items-center justify-center text-sm uppercase tracking-[0.14em] border border-foreground/30 hover:border-foreground transition-colors"
        >
          Shop all
        </Link>
      </div>
    </div>
  );
}

function toastCheckout() {
  // Demo only — no real payment
  import("sonner").then(({ toast }) => {
    toast("Demo checkout", {
      description:
        "AUREL is a concept project. No payment was processed. Wire a Shopify checkout URL to enable real orders.",
    });
  });
}
