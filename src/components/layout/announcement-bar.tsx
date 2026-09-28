"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const MESSAGES = [
  "Complimentary shipping over $75 · Subscribe & save 15%",
  "Dermatologist tested · Fragrance free · Vegan",
  "New: Retinal Renewal 0.1 — overnight renewal without retinol's flaring",
  "Take the 5-step skin diagnostic · 90 seconds, no email required",
  "The Complete Barrier System — save $36 on the full routine",
];

export function AnnouncementBar() {
  const [idx, setIdx] = React.useState(0);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 6000);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="bg-foreground text-background text-center py-2 text-[0.6875rem] tracking-[0.14em] uppercase overflow-hidden relative h-9 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono"
        >
          {MESSAGES[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
