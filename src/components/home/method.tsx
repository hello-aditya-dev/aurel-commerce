"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { img } from "@/lib/img";

const STEPS = [
  {
    n: "01",
    label: "Cleanse",
    productSlug: "barrier-reset-cleanser",
    productName: "Barrier Reset Cleanser",
    visual: img("/images/product-cleanser.png"),
  },
  {
    n: "02",
    label: "Treat",
    productSlug: "peptide-recovery-serum",
    productName: "Peptide Recovery Serum",
    visual: img("/images/product-peptide-serum.png"),
  },
  {
    n: "03",
    label: "Restore",
    productSlug: "ceramide-recovery-cream",
    productName: "Ceramide Recovery Cream",
    visual: img("/images/product-recovery-cream.png"),
  },
  {
    n: "04",
    label: "Protect",
    productSlug: "daily-mineral-spf-50",
    productName: "Daily Mineral SPF 50",
    visual: img("/images/product-spf.png"),
  },
];

export function MethodSection() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-background py-24 md:py-40">
      <div className="container-aurel">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16 md:mb-24">
          <div className="md:col-span-5">
            <p className="text-eyebrow text-muted-foreground mb-5">The AUREL Method</p>
            <h2
              className="font-serif font-light leading-[1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
            >
              Four steps.
              <br />
              <span className="italic text-muted-foreground">Two times of day.</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Every AUREL routine follows the same skeleton: cleanse, treat, restore, protect.
              The treat step is where the active lives — vitamin C in the morning, retinal at night,
              a peptide serum underneath both for barrier support.
            </p>
          </div>
        </div>

        {/* Steps rail */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background p-6 md:p-8 group"
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                <span className="text-xs uppercase tracking-[0.14em]">{s.label}</span>
              </div>
              <Link href={`/products/${s.productSlug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-muted mb-5">
                  <Image
                    src={s.visual}
                    alt={s.productName}
                    fill
                    sizes="(min-width: 768px) 25vw, 80vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="font-serif text-lg leading-tight group-hover:underline underline-offset-4">
                  {s.productName}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-[0.14em]">
                  View product
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
