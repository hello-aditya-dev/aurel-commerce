"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const DIMENSIONS = [
  { label: "Barrier", value: 78 },
  { label: "Hydration", value: 64 },
  { label: "Pigmentation", value: 41 },
  { label: "Texture", value: 56 },
  { label: "Sensitivity", value: 32 },
];

export function DiagnosticIntroSection() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-background py-24 md:py-40 overflow-hidden">
      <div className="container-aurel">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left: copy */}
          <div className="md:col-span-6">
            <p className="text-eyebrow text-muted-foreground mb-5">AUREL Diagnostic</p>
            <h2
              className="font-serif font-light leading-[1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              Your skin,
              <br />
              <span className="italic text-muted-foreground">decoded.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mt-7 max-w-md leading-relaxed">
              A five-question diagnostic that maps your concerns, skin type, reactivity, routine
              time and budget — then returns a coherent AM and PM protocol from the AUREL catalogue.
            </p>
            <Link
              href="/diagnostic"
              className="group mt-9 inline-flex items-center h-12 px-7 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-all"
            >
              Start diagnostic
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-xs text-muted-foreground mt-4 font-mono uppercase tracking-wider">
              90 seconds · No email required
            </p>
          </div>

          {/* Right: interactive diagnostic visual */}
          <div className="md:col-span-6">
            <div className="relative aspect-square md:aspect-[4/5] bg-muted/60 p-8 md:p-12 grain">
              {/* Concentric rings + dimension bars */}
              <div className="relative h-full w-full flex items-center justify-center">
                {/* Static rings */}
                <div className="absolute inset-0 rounded-full border border-foreground/10" />
                <div className="absolute inset-[12%] rounded-full border border-foreground/10" />
                <div className="absolute inset-[24%] rounded-full border border-foreground/10" />
                <div className="absolute inset-[36%] rounded-full border border-foreground/10" />

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-serif text-2xl md:text-3xl">Your skin profile</p>
                    <p className="text-mono text-muted-foreground mt-2">SAMPLE · DEMO DATA</p>
                  </div>
                </div>

                {/* Dimension bars radiating */}
                {DIMENSIONS.map((d, i) => {
                  const angle = (i / DIMENSIONS.length) * Math.PI * 2 - Math.PI / 2;
                  const radius = 38; // percent
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);
                  return (
                    <motion.div
                      key={d.label}
                      initial={reduce ? {} : { opacity: 0, scale: 0.6 }}
                      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <div className="w-14 md:w-20">
                        <div className="h-[2px] bg-foreground/15 relative overflow-hidden">
                          <motion.div
                            initial={reduce ? {} : { width: 0 }}
                            whileInView={reduce ? undefined : { width: `${d.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 top-0 h-full bg-foreground"
                          />
                        </div>
                        <p className="text-[0.625rem] mt-1.5 uppercase tracking-[0.14em] text-muted-foreground">
                          {d.label}
                        </p>
                        <p className="font-mono text-[0.6875rem] tabular-nums mt-0.5">{d.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
