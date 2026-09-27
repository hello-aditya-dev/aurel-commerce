"use client";

import * as React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { CartDrawer } from "./cart-drawer";
import { SearchOverlay } from "./search-overlay";
import { MobileNav } from "./mobile-nav";
import { useCart } from "@/lib/commerce/cart-store";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const openCart = useCart((s) => s.open);
  // Cmd/Ctrl+K opens search, Cmd/Ctrl+. opens cart — power-user shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("aurel:search:open"));
      }
      if (mod && e.key === ".") {
        e.preventDefault();
        openCart();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openCart]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <MobileNav />
    </div>
  );
}
