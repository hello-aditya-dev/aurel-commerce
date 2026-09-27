"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, GitCompare } from "lucide-react";
import { useCompare, COMPARE_MAX } from "@/lib/commerce/compare-store";
import { getProductsBySlugs, formatPrice } from "@/lib/commerce/provider";

export function CompareBar() {
  const hasHydrated = useCompare((s) => s.hasHydrated);
  const slugs = useCompare((s) => s.slugs);
  const remove = useCompare((s) => s.remove);
  const clear = useCompare((s) => s.clear);
  const reduce = useReducedMotion();
  const products = hasHydrated ? getProductsBySlugs(slugs) : [];
  const visible = hasHydrated && products.length > 0;

  // Hide on /compare page itself
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    setHidden(window.location.pathname.startsWith("/compare"));
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? undefined : { y: "110%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "110%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="bg-foreground text-background shadow-2xl">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-background/20">
                <GitCompare className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.14em] font-mono">
                  Compare
                </span>
                <span className="text-[0.625rem] font-mono opacity-60">
                  {products.length}/{COMPARE_MAX}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="relative shrink-0 h-12 w-10 overflow-hidden bg-background/10"
                  >
                    <Image
                      src={p.media[0].src}
                      alt={p.media[0].alt}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                    <button
                      onClick={() => remove(p.slug)}
                      aria-label={`Remove ${p.name} from compare`}
                      className="absolute top-0 right-0 bg-background/80 text-foreground h-4 w-4 flex items-center justify-center"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={clear}
                className="text-[0.625rem] uppercase tracking-[0.14em] opacity-60 hover:opacity-100 transition-opacity shrink-0 hidden sm:block"
              >
                Clear
              </button>

              <Link
                href="/compare"
                className="shrink-0 inline-flex items-center gap-2 h-9 px-4 bg-background text-foreground text-xs uppercase tracking-[0.14em] hover:bg-background/90 transition-colors"
              >
                Compare now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
