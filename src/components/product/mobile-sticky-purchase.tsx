"use client";

import * as React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/commerce/cart-store";
import { track } from "@/lib/analytics";
import { getProductBySlug } from "@/lib/commerce/provider";

export function MobileStickyPurchase({
  slug,
  name,
  price,
}: {
  slug: string;
  name: string;
  price: number;
}) {
  const [visible, setVisible] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const reduce = useReducedMotion();
  const openCart = useCart((s) => s.open);

  React.useEffect(() => {
    const target = document.getElementById("purchase-anchor");
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setVisible(!e.isIntersecting));
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleAdd = () => {
    const product = getProductBySlug(slug);
    if (!product) return;
    setAdding(true);
    track("add_to_cart", { slug, source: "mobile_sticky" });
    useCart.getState().add(product, { variant: "one-time" });
    setTimeout(() => {
      setAdding(false);
      openCart();
    }, 500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? undefined : { y: "100%" }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border pb-safe"
        >
          <div className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1">
              <p className="font-serif text-sm leading-tight truncate">{name}</p>
              <p className="text-sm tabular-nums">${price.toFixed(2)}</p>
            </div>
            <button
              onClick={handleAdd}
              disabled={adding}
              className="h-11 px-6 bg-foreground text-background text-xs uppercase tracking-[0.14em] flex items-center justify-center"
            >
              {adding ? "Adding…" : "Add to bag"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
