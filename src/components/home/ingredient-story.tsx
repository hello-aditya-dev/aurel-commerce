"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getAllIngredients } from "@/lib/commerce/provider";
import { img } from "@/lib/img";

const FEATURED = [
  { slug: "ceramides", visual: img("/images/ingredient-ceramides.png") },
  { slug: "peptides", visual: img("/images/ingredient-laboratory.png") },
  { slug: "ectoin", visual: img("/images/ingredient-botanical.png") },
  { slug: "retinal", visual: img("/images/ingredient-laboratory.png") },
];

export function IngredientStorySection() {
  const ingredients = getAllIngredients();
  const items = FEATURED.map((f) => ({
    ...f,
    ingredient: ingredients.find((i) => i.slug === f.slug)!,
  }));

  return (
    <section className="bg-bone-deep py-24 md:py-40">
      <div className="container-aurel">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-eyebrow text-muted-foreground mb-5">The formulation</p>
            <h2
              className="font-serif font-light leading-[1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
            >
              Four actives, <span className="italic">chosen carefully.</span>
            </h2>
          </div>
          <Link
            href="/ingredients"
            className="link-underline text-sm uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            All ingredients
          </Link>
        </div>
      </div>

      {/* Scroll-driven horizontal rail on desktop */}
      <div className="container-aurel">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-32">
          {items.map((item, i) => (
            <IngredientRow key={item.slug} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IngredientRow({
  item,
  index,
}: {
  item: { slug: string; visual: string; ingredient: ReturnType<typeof getAllIngredients>[number] };
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 0.98]);
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 gap-6 md:gap-10 ${index % 2 ? "md:mt-32" : ""}`}
    >
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 40 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] md:aspect-[5/6] overflow-hidden bg-muted"
      >
        <motion.div style={reduce ? {} : { scale: imgScale, y: imgY }} className="relative h-full w-full">
          <Image
            src={item.visual}
            alt={item.ingredient.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[0.6875rem] text-background/80 uppercase tracking-[0.14em] bg-foreground/30 backdrop-blur px-2 py-1">
            0{index + 1}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-mono text-muted-foreground uppercase tracking-wider mb-3">
          {item.ingredient.role}
        </p>
        <h3
          className="font-serif font-light tracking-tight"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1 }}
        >
          {item.ingredient.name}
        </h3>
        <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">
          {item.ingredient.description}
        </p>
        <Link
          href={`/ingredients/${item.slug}`}
          className="inline-flex items-center gap-2 mt-6 text-sm uppercase tracking-[0.14em] link-underline"
        >
          Read more
        </Link>
      </motion.div>
    </div>
  );
}
