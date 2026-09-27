"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { getBundleBySlug, getProductsBySlugs, formatPrice } from "@/lib/commerce/provider";
import { useCart } from "@/lib/commerce/cart-store";
import { Reveal } from "@/components/motion/reveal";
import { track } from "@/lib/analytics";

export function BundleSection() {
  const bundle = getBundleBySlug("complete-barrier-system")!;
  const products = getProductsBySlugs(bundle.productSlugs);
  const addBundle = useCart((s) => s.addBundle);

  return (
    <section className="bg-bone-deep py-24 md:py-40">
      <div className="container-aurel">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[5/4] md:aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={bundle.image}
                  alt={bundle.name}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-foreground text-background text-[0.625rem] uppercase tracking-[0.14em] px-3 py-1.5 font-mono">
                    Save ${bundle.compareAt - bundle.price}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Details */}
          <div className="lg:col-span-5">
            <p className="text-eyebrow text-muted-foreground mb-5">The system</p>
            <h2
              className="font-serif font-light leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
            >
              The Complete
              <br />
              <span className="italic">Barrier System.</span>
            </h2>
            <p className="text-base text-muted-foreground mt-6 leading-relaxed">
              {bundle.description}
            </p>

            {/* Includes */}
            <ul className="mt-8 space-y-3">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={0.05 * i}>
                  <li className="flex items-center gap-3 text-sm border-b border-border pb-3">
                    <Check className="h-3.5 w-3.5 shrink-0 text-foreground" />
                    <span className="font-serif">{p.name}</span>
                    <span className="ml-auto text-muted-foreground tabular-nums">{formatPrice(p.price)}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-serif text-4xl">{formatPrice(bundle.price)}</span>
              <span className="text-muted-foreground line-through tabular-nums">{formatPrice(bundle.compareAt)}</span>
              <span className="ml-auto text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Save {Math.round((1 - bundle.price / bundle.compareAt) * 100)}%
              </span>
            </div>

            <button
              onClick={() => {
                track("add_bundle", { slug: bundle.slug, value: bundle.price });
                addBundle(bundle.slug, bundle.name, bundle.price, bundle.image, bundle.productSlugs);
              }}
              className="mt-8 w-full h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
            >
              Add complete system — {formatPrice(bundle.price)}
            </button>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Free shipping · Subscription eligible · 30-day returns
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
