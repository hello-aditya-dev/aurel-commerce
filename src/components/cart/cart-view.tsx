"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/commerce/cart-store";
import { formatPrice, getProductBySlug } from "@/lib/commerce/provider";
import { IS_DEMO, DEMO_CONFIG } from "@/lib/commerce/config";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  X,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Lock,
  Info,
} from "lucide-react";
import { img } from "@/lib/img";

export function CartView() {
  return (
    <main className="container-aurel py-12 md:py-20">
      <CartBreadcrumb />
      <CartHeader />
      <CartContent />
    </main>
  );
}

function CartBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="text-mono text-muted-foreground mb-8">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        <li className="opacity-40">/</li>
        <li>
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
        </li>
        <li className="opacity-40">/</li>
        <li className="text-foreground" aria-current="page">
          Your bag
        </li>
      </ol>
    </nav>
  );
}

function CartHeader() {
  return (
    <header className="mb-10 md:mb-14 flex flex-col gap-2">
      <p className="text-eyebrow text-muted-foreground">AUREL · Checkout</p>
      <h1 className="font-serif font-light text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] tracking-tight">
        Your bag
      </h1>
      <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
        Review your selections, adjust quantities, and proceed when you are ready.
        {IS_DEMO && (
          <span className="block mt-1">
            This is a concept showcase — the checkout is a clearly labelled preview
            and no payment will be processed.
          </span>
        )}
      </p>
    </header>
  );
}

function CartContent() {
  const { lines, hasHydrated, remove, updateQty, subtotal, clear } = useCart();
  const sub = subtotal();
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
  const progress = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);

  if (!hasHydrated) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border border-foreground/30 border-t-foreground" />
      </div>
    );
  }

  if (lines.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
      {/* Line items */}
      <section aria-label="Cart items" className="order-2 lg:order-1">
        {/* Free-shipping progress */}
        <div className="mb-8 border border-border p-5 bg-bone-deep/50">
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <p className="text-foreground">
              {remaining > 0 ? (
                <>
                  You&apos;re <span className="font-medium">{formatPrice(remaining)}</span> away from
                  complimentary shipping.
                </>
              ) : (
                <>Complimentary shipping unlocked.</>
              )}
            </p>
          </div>
          <div className="mt-3 h-[2px] bg-muted overflow-hidden rounded-full">
            <div
              className="h-full bg-foreground transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          {IS_DEMO && (
            <p className="mt-2 text-[0.6875rem] text-muted-foreground font-mono uppercase tracking-[0.1em]">
              Illustrative demo threshold · {DEMO_CONFIG.currency}{" "}
              {formatPrice(FREE_SHIPPING_THRESHOLD)}
            </p>
          )}
        </div>

        <div className="hidden md:grid grid-cols-[1fr_auto] gap-4 pb-3 border-b border-border text-mono text-muted-foreground">
          <span>Product</span>
          <span className="text-right pr-2">Quantity · Total</span>
        </div>

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

        <div className="mt-6 flex items-center justify-between">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Continue shopping
          </Link>
          <button
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                window.confirm("Remove all items from your bag?")
              ) {
                clear();
                toast("Bag cleared");
              }
            }}
            className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear bag
          </button>
        </div>
      </section>

      {/* Summary + checkout */}
      <aside aria-label="Order summary" className="order-1 lg:order-2 lg:sticky lg:top-24">
        <div className="border border-border p-6 md:p-8 bg-background">
          <h2 className="font-serif text-xl mb-6">Order summary</h2>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Subtotal{" "}
                <span className="text-muted-foreground/70">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              </dt>
              <dd className="font-medium">{formatPrice(sub)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="text-muted-foreground">
                {remaining > 0 ? "Calculated at checkout" : "Complimentary"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="text-muted-foreground">Calculated at checkout</dd>
            </div>
          </dl>

          <div className="my-5 h-px bg-border" />

          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Estimated total</span>
            <span className="font-serif text-2xl">{formatPrice(sub)}</span>
          </div>

          {IS_DEMO ? (
            <DemoCheckoutButton subtotal={sub} />
          ) : (
            <ShopifyCheckoutButton subtotal={sub} />
          )}

          <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              {IS_DEMO ? "Concept showcase — no payment processed" : "Secure Shopify-hosted checkout"}
            </li>
            <li className="flex items-center gap-2">
              <RotateCcw className="h-3.5 w-3.5 shrink-0" />
              {IS_DEMO ? "Illustrative 30-day return policy" : "30-day returns"}
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 shrink-0" />
              {IS_DEMO ? "Illustrative shipping thresholds" : "Complimentary over $75"}
            </li>
          </ul>
        </div>

        {/* Reassurance */}
        <div className="mt-6 border border-border p-5 bg-bone-deep/30">
          <p className="text-eyebrow text-muted-foreground mb-2">Need help?</p>
          <p className="text-sm leading-relaxed">
            Questions about a product or routine? Read the{" "}
            <Link href="/faq" className="link-underline">
              FAQ
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="link-underline">
              get in touch
            </Link>
            .
          </p>
        </div>
      </aside>
    </div>
  );
}

function DemoCheckoutButton({ subtotal }: { subtotal: number }) {
  return (
    <>
      <Link
        href="/checkout"
        onClick={() => track("begin_checkout", { stage: "cart_page", value: subtotal })}
        className="mt-6 w-full h-12 inline-flex items-center justify-center gap-2 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
      >
        <Lock className="h-3.5 w-3.5" />
        Preview checkout — {formatPrice(subtotal)}
      </Link>
      <div className="mt-4 flex items-start gap-2 p-3 border border-foreground/15 bg-bone-deep/40">
        <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-muted-foreground" />
        <p className="text-[0.6875rem] text-muted-foreground leading-relaxed font-mono uppercase tracking-[0.08em]">
          Demonstration only. No payment or order will be processed.
        </p>
      </div>
    </>
  );
}

function ShopifyCheckoutButton({ subtotal }: { subtotal: number }) {
  return (
    <Button
      size="lg"
      className="mt-6 w-full h-12 rounded-none bg-foreground hover:bg-foreground/90"
      onClick={() => {
        track("begin_checkout", { stage: "cart_page", value: subtotal });
        toast("Redirecting to Shopify checkout", {
          description: "You will be handed off to Shopify-hosted checkout.",
        });
      }}
    >
      Checkout — {formatPrice(subtotal)}
    </Button>
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
  const product = getProductBySlug(line.slug);
  return (
    <li className="py-6 grid md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-start">
      <div className="flex gap-4 md:gap-6">
        <Link
          href={`/products/${line.slug}`}
          className="block relative h-28 w-24 md:h-32 md:w-28 shrink-0 overflow-hidden bg-muted"
        >
          <Image
            src={line.image || img("/images/hero-campaign.png")}
            alt={line.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${line.slug}`}
            className="font-serif text-lg md:text-xl leading-tight hover:underline underline-offset-4 block"
          >
            {line.name}
          </Link>
          <p className="text-xs text-muted-foreground mt-1">{line.size}</p>
          <p className="text-[0.6875rem] text-muted-foreground mt-1 font-mono uppercase tracking-[0.1em]">
            {line.variant === "subscription"
              ? "Illustrative subscribe-and-save · 15% demo"
              : "One-time purchase"}
          </p>
          {product && (
            <p className="text-xs text-muted-foreground mt-2 max-w-sm leading-relaxed line-clamp-2">
              {product.subtitle}
            </p>
          )}
          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
              Remove
            </button>
            <Link
              href={`/products/${line.slug}`}
              className="text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
            >
              View product
            </Link>
          </div>
        </div>
      </div>

      <div className="flex md:flex-col md:items-end justify-between md:justify-start gap-4 md:gap-3 md:min-w-[160px]">
        <QtyStepper value={line.quantity} onChange={(v) => onQty(v)} min={1} />
        <div className="text-right">
          <p className="font-serif text-lg">{formatPrice(line.price * line.quantity)}</p>
          {line.quantity > 1 && (
            <p className="text-[0.6875rem] text-muted-foreground font-mono">
              {formatPrice(line.price)} each
            </p>
          )}
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
    <div
      className="inline-flex items-center border border-border"
      role="group"
      aria-label="Quantity"
    >
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
        className="h-9 w-9 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        disabled={value <= min}
      >
        <Minus className="h-3 w-3" />
      </button>
      <span
        className="w-10 text-center text-sm tabular-nums"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
        className="h-9 w-9 inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        disabled={value >= max}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="py-16 md:py-24 flex flex-col items-center text-center max-w-md mx-auto">
      <div className="h-16 w-16 rounded-full border border-border flex items-center justify-center mb-8">
        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="font-serif text-2xl md:text-3xl mb-3">Your bag is empty</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-8">
        AUREL routines are designed as coherent systems. Start with the diagnostic
        to find your routine, or browse the catalogue.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link
          href="/diagnostic"
          className="w-full h-12 inline-flex items-center justify-center gap-2 bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
        >
          Find your routine
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/shop"
          className="w-full h-12 inline-flex items-center justify-center text-xs uppercase tracking-[0.14em] border border-foreground/30 hover:border-foreground transition-colors"
        >
          Shop all
        </Link>
      </div>
    </div>
  );
}
