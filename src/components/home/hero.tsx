"use client";

import Link from "next/link";
import { img } from "@/lib/img";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { RevealText } from "@/components/motion/reveal";

export function HeroSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-bone-deep">
      {/* Background image with subtle parallax */}
      <motion.div
        style={reduce ? {} : { y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <Image
          src={img("/images/hero-campaign.png")}
          alt="AUREL serum bottle on warm stone, soft morning light"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={85}
        />
      </motion.div>
      {/* Soft scrim for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />

      {/* Top-left brand metadata strip */}
      <motion.div
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-24 md:top-28 left-0 right-0"
      >
        <div className="container-aurel flex items-center justify-between text-[0.6875rem] text-foreground/70 font-mono uppercase tracking-[0.14em]">
          <span>AR · 01</span>
          <span className="hidden md:block">Clinical actives · Botanical intelligence</span>
          <span>SS · 26</span>
        </div>
      </motion.div>

      {/* Side vertical accents — editorial frame */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-6 h-24 w-px bg-foreground/20" />
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-6 h-24 w-px bg-foreground/20" />

      {/* Center copy */}
      <motion.div
        style={reduce ? {} : { y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-end md:justify-center pb-28 md:pb-0 text-center px-6"
      >
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-eyebrow text-foreground/70 mb-5 md:mb-7"
        >
          AUREL · Clinical skincare
        </motion.p>
        <h1 className="font-serif font-light text-display text-foreground leading-[0.92]">
          <RevealText text="Skin, restored." delay={0.5} />
        </h1>
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 md:mt-8 max-w-md text-sm md:text-base text-foreground/80 leading-relaxed"
        >
          Clinical actives. Botanical intelligence. Barrier-first formulation for stressed modern skin.
        </motion.p>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 md:mt-10 flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center justify-center h-12 px-7 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-all"
          >
            Shop the system
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/diagnostic"
            className="group inline-flex items-center justify-center h-12 px-7 border border-foreground/40 text-foreground text-xs uppercase tracking-[0.16em] hover:border-foreground hover:bg-foreground/5 transition-all"
          >
            Take the skin diagnostic
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/60"
      >
        <span className="text-[0.625rem] font-mono uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
