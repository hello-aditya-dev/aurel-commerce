"use client";

import * as React from "react";
import Link from "next/link";
import { useWishlist } from "@/lib/commerce/wishlist-store";
import { useUserReviews } from "@/lib/commerce/user-reviews-store";
import { useCart } from "@/lib/commerce/cart-store";
import { useRecentlyViewed } from "@/lib/commerce/recently-viewed-store";
import { useSavedRoutines } from "@/lib/commerce/saved-routines-store";
import { getProductsBySlugs, formatPrice } from "@/lib/commerce/provider";
import { AccountForm } from "@/components/commerce/account-form";
import { User, Heart, Clock, Star, Package, Settings, Bookmark, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "routines", label: "Saved routines", icon: Bookmark },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "reviews", label: "Your reviews", icon: Star },
  { id: "history", label: "Recently viewed", icon: Clock },
  { id: "orders", label: "Orders", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = typeof TABS[number]["id"];

export default function AccountPage() {
  const [tab, setTab] = React.useState<TabId>("profile");
  const wishSlugs = useWishlist((s) => s.slugs);
  const wishHydrated = useWishlist((s) => s.hasHydrated);
  const byProduct = useUserReviews((s) => s.byProduct);
  const reviewsHydrated = useUserReviews((s) => s.hasHydrated);
  const cartLines = useCart((s) => s.lines);
  const cartHydrated = useCart((s) => s.hasHydrated);
  const recentSlugs = useRecentlyViewed((s) => s.slugs);
  const recentHydrated = useRecentlyViewed((s) => s.hasHydrated);
  const savedRoutines = useSavedRoutines((s) => s.routines);
  const routinesHydrated = useSavedRoutines((s) => s.hasHydrated);
  const removeRoutine = useSavedRoutines((s) => s.remove);

  // Count user-submitted reviews
  const reviewCount = React.useMemo(() => {
    return Object.values(byProduct).reduce((sum, arr) => sum + arr.length, 0);
  }, [byProduct]);

  const wishlistCount = wishHydrated ? wishSlugs.length : 0;
  const historyCount = recentHydrated ? recentSlugs.length : 0;
  const cartCount = cartHydrated ? cartLines.reduce((s, l) => s + l.quantity, 0) : 0;
  const routinesCount = routinesHydrated ? savedRoutines.length : 0;

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <p className="text-eyebrow text-muted-foreground mb-5">Account</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Your account.
          </h1>
          <p className="text-base text-muted-foreground mt-5 leading-relaxed max-w-xl">
            Account functionality is a concept demonstration. Sign in, order history, saved routines and subscriptions are not connected to a real backend — but your wishlist, reviews and recently-viewed items are stored locally in your browser.
          </p>
        </div>
      </section>

      <div className="container-aurel py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
          {/* Sidebar */}
          <aside>
            <nav className="space-y-1">
              {TABS.map((t) => {
                const count = t.id === "wishlist" ? wishlistCount
                  : t.id === "reviews" ? reviewCount
                  : t.id === "history" ? historyCount
                  : t.id === "routines" ? routinesCount
                  : t.id === "orders" ? 0
                  : null;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left",
                      tab === t.id
                        ? "bg-foreground text-background"
                        : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <t.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{t.label}</span>
                    {count !== null && count > 0 && (
                      <span className={cn(
                        "text-xs font-mono tabular-nums px-1.5 py-0.5",
                        tab === t.id ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                      )}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div>
            {tab === "profile" && <ProfileTab cartCount={cartCount} wishCount={wishlistCount} reviewCount={reviewCount} historyCount={historyCount} routinesCount={routinesCount} />}
            {tab === "routines" && <RoutinesTab routines={savedRoutines} hydrated={routinesHydrated} onRemove={removeRoutine} />}
            {tab === "wishlist" && <WishlistTab slugs={wishSlugs} hydrated={wishHydrated} />}
            {tab === "reviews" && <ReviewsTab byProduct={byProduct} hydrated={reviewsHydrated} />}
            {tab === "history" && <HistoryTab slugs={recentSlugs} hydrated={recentHydrated} />}
            {tab === "orders" && <OrdersTab />}
            {tab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileTab({ cartCount, wishCount, reviewCount, historyCount, routinesCount }: { cartCount: number; wishCount: number; reviewCount: number; historyCount: number; routinesCount: number }) {
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-5">Overview</p>
      <h2 className="font-serif text-2xl mb-8">Welcome back.</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Cart items", value: cartCount },
          { label: "Saved routines", value: routinesCount },
          { label: "Wishlist", value: wishCount },
          { label: "Reviews written", value: reviewCount },
        ].map((s) => (
          <div key={s.label} className="border border-border p-4">
            <p className="font-serif text-3xl tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-[0.14em]">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6">
        <h3 className="font-serif text-lg mb-4">Sign in</h3>
        <AccountForm />
      </div>
    </div>
  );
}

function RoutinesTab({ routines, hydrated, onRemove }: { routines: ReturnType<typeof useSavedRoutines.getState>["routines"]; hydrated: boolean; onRemove: (id: string) => void }) {
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-5">Saved routines</p>
      <h2 className="font-serif text-2xl mb-6">{routines.length} {routines.length === 1 ? "routine" : "routines"}</h2>
      {!hydrated ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : routines.length === 0 ? (
        <div className="border border-border p-8 text-center">
          <Bookmark className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
          <p className="font-serif text-lg mb-2">No saved routines yet.</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Build a routine on the routine builder page and tap "Save routine to account".
          </p>
          <Link
            href="/build-routine"
            className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
          >
            Build a routine
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {routines.map((r) => {
            const products = getProductsBySlugs(r.slugs);
            return (
              <li key={r.id} className="border border-border p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg leading-tight">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(r.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {r.slugs.length} products
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-serif text-lg tabular-nums">{formatPrice(r.total)}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">save {formatPrice(r.savings)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
                  {products.slice(0, 6).map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className="relative h-10 w-8 shrink-0 overflow-hidden bg-muted"
                    >
                      <img src={p.media[0].src} alt={p.media[0].alt} className="absolute inset-0 h-full w-full object-cover" />
                    </Link>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/build-routine`}
                    className="flex-1 h-9 border border-foreground/30 text-foreground text-xs uppercase tracking-[0.14em] flex items-center justify-center hover:border-foreground transition-colors"
                  >
                    Open in builder
                  </Link>
                  <button
                    onClick={() => onRemove(r.id)}
                    className="h-9 px-4 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors border border-border"
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function WishlistTab({ slugs, hydrated }: { slugs: string[]; hydrated: boolean }) {
  const products = hydrated ? getProductsBySlugs(slugs) : [];
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-5">Wishlist</p>
      <h2 className="font-serif text-2xl mb-6">{products.length} saved</h2>
      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No saved products yet.{" "}
          <Link href="/shop" className="link-underline text-foreground">Browse the catalogue →</Link>
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {products.map((p) => (
            <li key={p.id} className="py-4 flex items-center gap-4">
              <Link href={`/products/${p.slug}`} className="relative h-16 w-14 shrink-0 overflow-hidden bg-muted">
                <img src={p.media[0].src} alt={p.media[0].alt} className="absolute inset-0 h-full w-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${p.slug}`} className="font-serif text-base hover:underline underline-offset-4 block">
                  {p.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">{p.size} · ${p.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewsTab({ byProduct, hydrated }: { byProduct: Record<string, any[]>; hydrated: boolean }) {
  const allReviews = React.useMemo(() => {
    const out: { productSlug: string; review: any }[] = [];
    for (const [slug, reviews] of Object.entries(byProduct)) {
      for (const r of reviews) out.push({ productSlug: slug, review: r });
    }
    return out;
  }, [byProduct]);

  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-5">Your reviews</p>
      <h2 className="font-serif text-2xl mb-6">{allReviews.length} reviews written</h2>
      {!hydrated ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : allReviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven't written any reviews yet. Visit any product page and tap "Write a review".
        </p>
      ) : (
        <ul className="space-y-4">
          {allReviews.map(({ productSlug, review }) => (
            <li key={review.id} className="border border-border p-4">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <Link href={`/products/${productSlug}`} className="font-serif text-base hover:underline underline-offset-4">
                  {productSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {"★".repeat(review.rating)}<span className="opacity-30">{"★".repeat(5 - review.rating)}</span>
                </span>
              </div>
              <p className="font-serif text-sm font-medium">{review.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{review.body}</p>
              {review.photo && (
                <img src={review.photo} alt="Review photo" className="mt-2 h-20 w-20 object-cover border border-border" />
              )}
              <p className="text-[0.6875rem] text-muted-foreground mt-2 font-mono uppercase tracking-wider">
                {review.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function HistoryTab({ slugs, hydrated }: { slugs: string[]; hydrated: boolean }) {
  const products = hydrated ? getProductsBySlugs(slugs) : [];
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-5">Recently viewed</p>
      <h2 className="font-serif text-2xl mb-6">{products.length} products</h2>
      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No history yet.{" "}
          <Link href="/shop" className="link-underline text-foreground">Browse the catalogue →</Link>
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <li key={p.id}>
              <Link href={`/products/${p.slug}`} className="block group">
                <div className="relative aspect-square overflow-hidden bg-muted mb-2">
                  <img src={p.media[0].src} alt={p.media[0].alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="font-serif text-sm leading-tight group-hover:italic transition-all">{p.name}</p>
                <p className="text-xs text-muted-foreground tabular-nums">${p.price.toFixed(2)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OrdersTab() {
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-5">Orders</p>
      <h2 className="font-serif text-2xl mb-6">Order history</h2>
      <div className="border border-border p-8 text-center">
        <Package className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
        <p className="font-serif text-lg mb-2">No orders yet.</p>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          Order history requires a real Shopify backend. In this demo, checkout doesn't process real payments.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 h-11 px-6 bg-foreground text-background text-xs uppercase tracking-[0.14em] hover:bg-foreground/90 transition-colors"
        >
          Start shopping
        </Link>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-5">Settings</p>
      <h2 className="font-serif text-2xl mb-6">Preferences</h2>
      <div className="space-y-4">
        <div className="border border-border p-4">
          <p className="text-sm font-medium mb-1">Email notifications</p>
          <p className="text-xs text-muted-foreground">Receive order updates, restock alerts and journal articles.</p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block h-4 w-7 rounded-full bg-muted relative">
              <span className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-foreground" />
            </span>
            Enabled (demo)
          </div>
        </div>
        <div className="border border-border p-4">
          <p className="text-sm font-medium mb-1">Subscription cadence</p>
          <p className="text-xs text-muted-foreground">Default delivery frequency for subscribe-and-save items.</p>
          <select className="mt-3 w-full bg-transparent border border-border p-2 text-sm" disabled>
            <option>Every 8 weeks (default)</option>
          </select>
        </div>
        <div className="border border-border p-4">
          <p className="text-sm font-medium mb-1">Currency</p>
          <p className="text-xs text-muted-foreground">Display prices in your preferred currency.</p>
          <select className="mt-3 w-full bg-transparent border border-border p-2 text-sm" disabled>
            <option>USD $ (default)</option>
          </select>
        </div>
      </div>
      <p className="mt-6 text-xs text-muted-foreground font-mono uppercase tracking-wider">
        Demo preferences · not persisted to a backend
      </p>
    </div>
  );
}
