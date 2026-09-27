"use client";

import Image from "next/image";
import { img } from "@/lib/img";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FilmSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const x = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const yText = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[80vh] md:h-[100vh] overflow-hidden bg-foreground"
    >
      <motion.div
        style={reduce ? {} : { scale, x }}
        className="absolute inset-0"
      >
        <Image
          src={img("/images/method-film.png")}
          alt="AUREL serum bottle on wet stone — brand film still"
          fill
          sizes="100vw"
          className="object-cover"
          quality={80}
        />
      </motion.div>
      <div className="absolute inset-0 bg-foreground/35" />

      {/* Editorial corner marks — film framing */}
      <motion.div style={{ opacity }} className="absolute top-6 left-6 text-background/60 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        AR · 01 · Film
      </motion.div>
      <motion.div style={{ opacity }} className="absolute top-6 right-6 text-background/60 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        00:00:14:08
      </motion.div>

      <motion.div
        style={reduce ? {} : { y: yText }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <p className="text-eyebrow text-background/70 mb-5">AUREL · Brand film</p>
        <h2
          className="font-serif font-light text-background leading-[0.95] tracking-[-0.025em]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
        >
          Formulated
          <br />
          <span className="italic text-background/85">without compromise.</span>
        </h2>
        <p className="mt-7 text-sm md:text-base text-background/70 max-w-md leading-relaxed">
          Every active is chosen for a reason. Every concentration is meaningful. Every routine is
          engineered to layer, not to fight itself.
        </p>
      </motion.div>

      {/* Bottom metadata strip — film slate */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-background/60 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        <span>SCENE 01 · TAKE 04</span>
        <span className="hidden md:block">AUREL × ATELIER</span>
        <span>F · 5.6 · 1/125</span>
      </div>

      {/* Subtle film grain */}
      <div className="absolute inset-0 pointer-events-none grain opacity-30" />
    </section>
  );
}
