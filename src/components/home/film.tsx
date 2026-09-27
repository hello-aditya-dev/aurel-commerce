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
  const yText = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[80vh] md:h-[100vh] overflow-hidden bg-foreground"
    >
      <motion.div
        style={reduce ? {} : { scale }}
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

      {/* Subtle film grain */}
      <div className="absolute inset-0 pointer-events-none grain opacity-30" />
    </section>
  );
}
