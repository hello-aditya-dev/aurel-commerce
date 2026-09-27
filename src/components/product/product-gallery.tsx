"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductMedia } from "@/types/commerce";

export function ProductGallery({
  media,
  name,
}: {
  media: ProductMedia[];
  name: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const total = media.length;

  const go = (dir: 1 | -1) => {
    setActive((cur) => (cur + dir + total) % total);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
    setTouchStart(null);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Desktop thumbnails */}
      <div className="hidden md:flex flex-col gap-2 w-20 shrink-0">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square overflow-hidden bg-muted border transition-colors",
              active === i ? "border-foreground" : "border-transparent hover:border-border"
            )}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        className="relative flex-1 aspect-[4/5] overflow-hidden bg-muted cursor-pointer md:aspect-[4/5]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={active}
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={media[active].src}
              alt={media[active].alt}
              fill
              priority={active === 0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile arrows */}
        <button
          onClick={() => go(-1)}
          className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/70 backdrop-blur flex items-center justify-center"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/70 backdrop-blur flex items-center justify-center"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Mobile pagination */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {media.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-all",
                active === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Expand / count */}
        <div className="absolute top-4 right-4 font-mono text-[0.625rem] text-background/80 uppercase tracking-wider bg-foreground/30 backdrop-blur px-2 py-1">
          {active + 1} / {total}
        </div>
      </div>
    </div>
  );
}
