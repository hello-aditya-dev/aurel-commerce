"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { Wordmark } from "./wordmark";
import { useCart } from "@/lib/commerce/cart-store";
import { useWishlist } from "@/lib/commerce/wishlist-store";
import { cn } from "@/lib/utils";
import { collections, getAllProducts } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";

const NAV = [
  { label: "Shop", href: "/shop", mega: true },
  { label: "Concerns", href: "/concerns", mega: true },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Our Approach", href: "/approach" },
  { label: "Journal", href: "/journal" },
];

const CONCERNS = [
  { slug: "barrier", label: "Barrier" },
  { slug: "dryness", label: "Dryness" },
  { slug: "sensitivity", label: "Sensitivity" },
  { slug: "dark-spots", label: "Dark spots" },
  { slug: "texture", label: "Texture" },
  { slug: "fine-lines", label: "Fine lines" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mega, setMega] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const openCart = useCart((s) => s.open);
  const count = useCart((s) => s.count());
  const hasHydrated = useCart((s) => s.hasHydrated);
  const wishSlugs = useWishlist((s) => s.slugs);
  const wishHydrated = useWishlist((s) => s.hasHydrated);
  const wishCount = wishHydrated ? wishSlugs.length : 0;
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMega(null);
    setMobileOpen(false);
  }, [pathname]);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("aurel:search:open"));
  };

  const openMobileNav = () => {
    window.dispatchEvent(new CustomEvent("aurel:mobilenav:open"));
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      )}
      onMouseLeave={() => setMega(null)}
    >
      {/* Announcement bar */}
      <div className="bg-foreground text-background text-center py-2 text-[0.6875rem] tracking-[0.14em] uppercase">
        <span className="font-mono">Complimentary shipping over $75 · Subscribe &amp; save 15%</span>
      </div>

      <div className="container-aurel">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 md:h-20">
          {/* Left nav (desktop) / mobile menu button */}
          <div className="flex items-center">
            <button
              className="lg:hidden -ml-2 p-2 text-foreground"
              aria-label="Open menu"
              onClick={openMobileNav}
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden lg:flex items-center gap-7 text-[0.78rem] tracking-[0.12em] uppercase font-medium">
              {NAV.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMega(item.mega ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "link-underline py-2 transition-colors",
                      pathname.startsWith(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Center wordmark */}
          <div className="flex justify-center">
            <Wordmark className="text-[1.15rem] md:text-[1.3rem]" />
          </div>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-1 md:gap-2">
            <button
              onClick={openSearch}
              aria-label="Search"
              className="p-2 hover:text-foreground text-muted-foreground transition-colors"
            >
              <Search className="h-[1.15rem] w-[1.15rem]" />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden sm:block p-2 hover:text-foreground text-muted-foreground transition-colors"
            >
              <User className="h-[1.15rem] w-[1.15rem]" />
            </Link>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishCount} saved`}
              className="relative hidden sm:block p-2 hover:text-foreground text-muted-foreground transition-colors"
            >
              <Heart className="h-[1.15rem] w-[1.15rem]" />
              {wishHydrated && wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-foreground text-background text-[0.625rem] font-mono leading-[1.05rem] text-center font-medium">
                  {wishCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => {
                track("checkout_click", { stage: "open_cart" });
                openCart();
              }}
              aria-label={`Open bag, ${hasHydrated ? count : 0} items`}
              className="relative p-2 hover:text-foreground text-muted-foreground transition-colors"
            >
              <ShoppingBag className="h-[1.15rem] w-[1.15rem]" />
              {hasHydrated && count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[1.05rem] h-[1.05rem] px-1 rounded-full bg-foreground text-background text-[0.625rem] font-mono leading-[1.05rem] text-center font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute left-0 right-0 top-full bg-background border-b border-border"
            onMouseEnter={() => setMega(mega)}
          >
            <div className="container-aurel py-10">
              {mega === "Shop" ? (
                <ShopMega />
              ) : mega === "Concerns" ? (
                <ConcernsMega />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ShopMega() {
  const products = getAllProducts();
  const featured = products.find((p) => p.hero) ?? products[2];
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-10">
      <div>
        <p className="text-eyebrow text-muted-foreground mb-4">By step</p>
        <ul className="space-y-2 text-sm">
          <MegaLink href="/shop?step=cleanse">01 Cleanse</MegaLink>
          <MegaLink href="/shop?step=treat">02 Treat</MegaLink>
          <MegaLink href="/shop?step=restore">03 Restore</MegaLink>
          <MegaLink href="/shop?step=protect">04 Protect</MegaLink>
        </ul>
      </div>
      <div>
        <p className="text-eyebrow text-muted-foreground mb-4">Collections</p>
        <ul className="space-y-2 text-sm">
          {collections.filter((c) => c.slug !== "all").map((c) => (
            <MegaLink key={c.slug} href={`/collections/${c.slug}`}>
              {c.name}
            </MegaLink>
          ))}
          <MegaLink href="/shop">All products</MegaLink>
        </ul>
      </div>
      <div>
        <p className="text-eyebrow text-muted-foreground mb-4">Systems</p>
        <ul className="space-y-2 text-sm">
          <MegaLink href="/systems/complete-barrier-system">Complete Barrier System</MegaLink>
          <MegaLink href="/systems/essential-barrier-routine">Essential Barrier Routine</MegaLink>
          <MegaLink href="/systems/brightening-protocol">Brightening Protocol</MegaLink>
          <MegaLink href="/systems/night-repair-protocol">Night Repair Protocol</MegaLink>
        </ul>
      </div>
      <Link
        href={`/products/${featured.slug}`}
        className="group relative w-[14rem] aspect-[3/4] overflow-hidden bg-muted"
      >
        <img
          src={featured.media[0].src}
          alt={featured.media[0].alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-background">
          <p className="text-eyebrow opacity-80">Featured</p>
          <p className="font-serif text-lg mt-1 leading-tight">{featured.name}</p>
        </div>
      </Link>
    </div>
  );
}

function ConcernsMega() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {CONCERNS.map((c) => (
        <Link
          key={c.slug}
          href={`/concerns/${c.slug}`}
          className="group border-t border-border pt-4 hover:border-foreground transition-colors"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-2xl group-hover:italic transition-all">
              {c.label}
            </span>
            <span className="text-mono text-muted-foreground group-hover:text-foreground transition-colors">
              →
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {concernBlurbs[c.slug as keyof typeof concernBlurbs]}
          </p>
        </Link>
      ))}
    </div>
  );
}

const concernBlurbs: Record<string, string> = {
  barrier: "Reinforce the protective lipid layer with ceramides, panthenol and ectoin.",
  dryness: "Layer humectants, emollients and overnight occlusion for visible plumpness.",
  sensitivity: "Calm reactivity with buffered actives, peptide support and barrier restoration.",
  "dark-spots": "Vitamin C, retinal and niacinamide for visibly even tone.",
  texture: "Overnight retinal and gentle exfoliation for a smoother surface.",
  "fine-lines": "Peptide and retinal protocol to visibly soften lines over time.",
};

function MegaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-foreground/85 hover:text-foreground transition-colors link-underline"
      >
        {children}
      </Link>
    </li>
  );
}
