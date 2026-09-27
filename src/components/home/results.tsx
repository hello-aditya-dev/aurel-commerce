"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CONCERNS = [
  {
    label: "Barrier",
    slug: "barrier",
    description: "Reinforce the protective lipid matrix with ceramides, panthenol and ectoin.",
    visual: "/images/texture-cream.png",
    stats: "CERAMIDES 3:1:1 · ECTOIN 1%",
  },
  {
    label: "Texture",
    slug: "texture",
    description: "Overnight retinaldehyde refines surface texture and softens visible lines.",
    visual: "/images/texture-gel.png",
    stats: "RETINAL 0.1% · NIACINAMIDE 4%",
  },
  {
    label: "Pigmentation",
    slug: "dark-spots",
    description: "15% L-ascorbic acid visibly evens tone and brightens dullness.",
    visual: "/images/texture-water.png",
    stats: "L-AA 15% · FERULIC 0.5%",
  },
  {
    label: "Dryness",
    slug: "dryness",
    description: "Humectants, emollients and overnight occlusion for visible plumpness.",
    visual: "/images/texture-serum-droplet.png",
    stats: "SQUALANE · PANTHENOL · GLYCERIN",
  },
  {
    label: "Fine Lines",
    slug: "fine-lines",
    description: "Signal peptides and retinal support skin's own structural processes.",
    visual: "/images/ingredient-laboratory.png",
    stats: "PEPTIDE COMPLEX · RETINAL 0.1%",
  },
];

export function ResultsSection() {
  const [active, setActive] = React.useState(0);
  const reduce = useReducedMotion();

  return (
    <section className="bg-background py-24 md:py-40">
      <div className="container-aurel">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <p className="text-eyebrow text-muted-foreground mb-5">What AUREL targets</p>
            <h2
              className="font-serif font-light leading-[1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
            >
              Skin, mapped to its
              <br />
              <span className="italic text-muted-foreground">real concerns.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-2">
            <p className="text-base text-muted-foreground leading-relaxed">
              Most skin sits somewhere on these five axes. Select a concern to see the active
              system AUREL uses to address it.
            </p>
            <p className="text-xs text-muted-foreground mt-4 font-mono uppercase tracking-wider">
              Illustrative demo data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Concern selector */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {CONCERNS.map((c, i) => (
                <li key={c.slug}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group w-full text-left py-6 md:py-8 flex items-center gap-6"
                  >
                    <span className="font-mono text-xs text-muted-foreground w-8">
                      0{i + 1}
                    </span>
                    <span
                      className={`font-serif font-light transition-all flex-1 ${
                        active === i ? "text-foreground italic" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                      style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", lineHeight: 1 }}
                    >
                      {c.label}
                    </span>
                    <span
                      className={`hidden md:block text-xs font-mono uppercase tracking-wider transition-opacity ${
                        active === i ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                      }`}
                    >
                      {c.stats}
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 transition-all ${
                        active === i
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 group-hover:opacity-50 -translate-x-2"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
            <Link
              href={`/concerns/${CONCERNS[active].slug}`}
              className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-[0.14em] link-underline"
            >
              View products for {CONCERNS[active].label.toLowerCase()}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Active visual */}
          <div className="lg:col-span-5">
            <motion.div
              key={active}
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden bg-muted"
            >
              <img
                src={CONCERNS[active].visual}
                alt={CONCERNS[active].label}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <p className="text-eyebrow opacity-70">{CONCERNS[active].stats}</p>
                <p className="font-serif text-xl mt-2 leading-tight">
                  {CONCERNS[active].description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
