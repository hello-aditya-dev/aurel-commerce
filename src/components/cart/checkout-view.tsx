"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/commerce/cart-store";
import { formatPrice } from "@/lib/commerce/provider";
import { IS_DEMO } from "@/lib/commerce/config";
import { track } from "@/lib/analytics";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  Info,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { img } from "@/lib/img";

export function CheckoutView() {
  const { lines, hasHydrated, subtotal } = useCart();
  const sub = subtotal();
  const [stage, setStage] = React.useState<"review" | "complete">("review");

  // Snapshot the cart at the moment of "placing" the demo order, then clear.
  const [snapshot, setSnapshot] = React.useState<typeof lines>([]);

  if (!hasHydrated) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border border-foreground/30 border-t-foreground" />
      </div>
    );
  }

  if (lines.length === 0 && stage === "review") {
    return <EmptyCheckout />;
  }

  if (stage === "complete") {
    return (
      <CheckoutComplete
        lines={snapshot}
        subtotal={snapshot.reduce((s, l) => s + l.price * l.quantity, 0)}
      />
    );
  }

  return (
    <main className="container-aurel py-12 md:py-20">
      <nav aria-label="Breadcrumb" className="text-mono text-muted-foreground mb-8">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/cart" className="hover:text-foreground transition-colors">
              Your bag
            </Link>
          </li>
          <li className="opacity-40">/</li>
          <li className="text-foreground" aria-current="page">
            Preview checkout
          </li>
        </ol>
      </nav>

      {/* Demo disclosure banner */}
      <div
        role="alert"
        className="mb-8 flex items-start gap-3 border border-foreground/20 bg-bone-deep/60 p-4 md:p-5"
      >
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Demonstration only — no payment or order will be processed.
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            AUREL is a concept showcase. This checkout demonstrates the intended
            information architecture and flow. No payment credentials are
            collected, no order is created, and no confirmation email is sent.
            In Shopify mode this step hands off to Shopify-hosted checkout.
          </p>
        </div>
      </div>

      <header className="mb-10 md:mb-14">
        <p className="text-eyebrow text-muted-foreground mb-2">AUREL · Checkout</p>
        <h1 className="font-serif font-light text-[clamp(2rem,4.5vw,3.25rem)] leading-[1] tracking-tight">
          Preview checkout
        </h1>
      </header>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
        {/* Form (visually present, but disabled / illustrative) */}
        <section aria-label="Checkout form" className="order-2 lg:order-1 space-y-10">
          <CheckoutSection
            step="01"
            title="Contact"
            description="Where a confirmation would be sent in a live store."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <IllustrativeField label="Email address" placeholder="you@example.com" type="email" />
              <IllustrativeField label="Phone (optional)" placeholder="+1 (555) 000-0000" />
            </div>
          </CheckoutSection>

          <CheckoutSection
            step="02"
            title="Shipping address"
            description="Where your AUREL order would be delivered."
          >
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <IllustrativeField label="First name" placeholder="Ada" />
                <IllustrativeField label="Last name" placeholder="Lovelace" />
              </div>
              <IllustrativeField label="Address" placeholder="1 Atelier Street" />
              <div className="grid sm:grid-cols-3 gap-4">
                <IllustrativeField label="City" placeholder="Brooklyn" />
                <IllustrativeField label="State" placeholder="NY" />
                <IllustrativeField label="ZIP" placeholder="11201" />
              </div>
              <IllustrativeField label="Country" placeholder="United States" />
            </div>
          </CheckoutSection>

          <CheckoutSection
            step="03"
            title="Payment"
            description="Disabled in this demonstration. No card details are collected."
          >
            <div className="relative">
              <div
                aria-disabled="true"
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-border p-5 opacity-50 pointer-events-none select-none"
              >
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Card payment</p>
                  <p className="text-xs text-muted-foreground">
                    In Shopify mode, payment is collected by Shopify-hosted checkout.
                  </p>
                </div>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="sr-only">
                Payment fields are disabled in this demonstration.
              </span>
            </div>
          </CheckoutSection>

          <div className="pt-2">
            <button
              onClick={() => {
                // Snapshot then clear — honest "complete" state with no order ID fabricated.
                setSnapshot(lines);
                track("checkout_click", { stage: "demo_complete", value: sub });
                useCart.getState().clear();
                setStage("complete");
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="group inline-flex items-center justify-center gap-2 h-12 px-8 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
            >
              <Check className="h-3.5 w-3.5" />
              Complete preview
            </button>
            <p className="mt-3 text-[0.6875rem] text-muted-foreground font-mono uppercase tracking-[0.1em]">
              No charge · No order created · No email sent
            </p>
          </div>
        </section>

        {/* Summary */}
        <aside aria-label="Order summary" className="order-1 lg:order-2 lg:sticky lg:top-24">
          <div className="border border-border p-6 md:p-8 bg-background">
            <h2 className="font-serif text-xl mb-6">Order summary</h2>
            <ul className="divide-y divide-border mb-5">
              {lines.map((line) => (
                <li key={line.id} className="py-3 flex gap-3 items-center">
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-muted">
                    <Image
                      src={line.image || img("/images/hero-campaign.png")}
                      alt={line.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-foreground text-background text-[0.625rem] flex items-center justify-center font-mono">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm truncate">{line.name}</p>
                    <p className="text-[0.6875rem] text-muted-foreground">{line.size}</p>
                  </div>
                  <p className="font-serif text-sm">{formatPrice(line.price * line.quantity)}</p>
                </li>
              ))}
            </ul>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(sub)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-muted-foreground">
                  {sub >= 75 ? "Complimentary" : "Calculated at checkout"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="text-muted-foreground">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="my-4 h-px bg-border" />
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">Estimated total</span>
              <span className="font-serif text-2xl">{formatPrice(sub)}</span>
            </div>
          </div>

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
        </aside>
      </div>
    </main>
  );
}

function CheckoutSection({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-[0.6875rem] text-muted-foreground tracking-[0.14em]">
          {step}
        </span>
        <h2 className="font-serif text-xl">{title}</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-5 max-w-md leading-relaxed">{description}</p>
      {children}
    </section>
  );
}

function IllustrativeField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[0.6875rem] font-mono uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        aria-label={label}
        className="w-full h-11 px-3 border border-border bg-background text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground transition-colors"
      />
    </label>
  );
}

function EmptyCheckout() {
  return (
    <main className="container-aurel py-16 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <p className="font-serif text-2xl md:text-3xl mb-3">Nothing to check out</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          Your bag is empty. Browse the catalogue or find your routine first.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="h-12 px-6 inline-flex items-center justify-center bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
          >
            Shop all
          </Link>
          <Link
            href="/cart"
            className="h-12 px-6 inline-flex items-center justify-center text-xs uppercase tracking-[0.14em] border border-foreground/30 hover:border-foreground transition-colors"
          >
            Back to bag
          </Link>
        </div>
      </div>
    </main>
  );
}

function CheckoutComplete({
  lines,
  subtotal,
}: {
  lines: ReturnType<typeof useCart.getState>["lines"];
  subtotal: number;
}) {
  return (
    <main className="container-aurel py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="h-16 w-16 rounded-full border border-foreground/30 flex items-center justify-center">
            <CheckCircle2 className="h-7 w-7 text-foreground" />
          </div>
        </div>
        <p className="text-eyebrow text-muted-foreground text-center mb-3">Preview complete</p>
        <h1 className="font-serif font-light text-[clamp(2rem,5vw,3.25rem)] leading-[1] tracking-tight text-center mb-4">
          That concludes the preview.
        </h1>
        <div
          role="alert"
          className="mt-8 flex items-start gap-3 border border-foreground/20 bg-bone-deep/60 p-5"
        >
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-foreground" />
          <div>
            <p className="text-sm font-medium">No order was created.</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              This was a checkout demonstration. AUREL is a concept showcase — no
              payment was processed, no order ID exists, no confirmation email was
              sent. In Shopify mode this screen would be replaced by Shopify&apos;s
              genuine order confirmation.
            </p>
          </div>
        </div>

        {lines.length > 0 && (
          <div className="mt-8 border border-border p-6">
            <p className="text-eyebrow text-muted-foreground mb-4">Items reviewed</p>
            <ul className="divide-y divide-border">
              {lines.map((line) => (
                <li key={line.id} className="py-3 flex justify-between text-sm">
                  <span className="font-serif">
                    {line.name}{" "}
                    <span className="text-muted-foreground">× {line.quantity}</span>
                  </span>
                  <span>{formatPrice(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">Estimated total reviewed</span>
              <span className="font-serif text-xl">{formatPrice(subtotal)}</span>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="h-12 px-6 inline-flex items-center justify-center gap-2 bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
          >
            Continue browsing
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/"
            className="h-12 px-6 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.14em] border border-foreground/30 hover:border-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
