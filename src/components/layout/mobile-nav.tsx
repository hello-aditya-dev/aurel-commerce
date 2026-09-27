"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Wordmark } from "./wordmark";

const PRIMARY = [
  { label: "Shop", href: "/shop" },
  { label: "Skin Diagnostic", href: "/diagnostic" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Our Approach", href: "/approach" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

const SECONDARY = [
  { label: "Wishlist", href: "/wishlist" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Case study", href: "/case-study" },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("aurel:mobilenav:open", onOpen);
    return () => window.removeEventListener("aurel:mobilenav:open", onOpen);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-background lg:hidden flex flex-col"
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-border">
            <Wordmark />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 -mr-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pt-8 pb-12">
            <p className="text-eyebrow text-muted-foreground mb-6">Menu</p>
            <nav className="space-y-1">
              {PRIMARY.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 font-serif text-[2rem] leading-[1.1] tracking-[-0.02em] hover:italic transition-all"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10 pt-6 border-t border-border">
              <p className="text-eyebrow text-muted-foreground mb-4">More</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {SECONDARY.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-border">
              <Link
                href="/diagnostic"
                className="block w-full h-12 bg-foreground text-background text-sm uppercase tracking-[0.14em] flex items-center justify-center"
              >
                Take the skin diagnostic
              </Link>
            </div>
          </div>

          <div className="px-5 py-4 border-t border-border text-mono text-muted-foreground flex items-center justify-between">
            <span>EN / USD $</span>
            <span>AUREL · {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
