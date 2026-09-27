"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchAll } from "@/lib/commerce/provider";
import { formatPrice } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";

const SUGGESTED = ["dry skin", "dark spots", "retinal", "barrier routine", "vitamin C", "SPF"];

export function SearchOverlay() {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [debounced, setDebounced] = React.useState("");
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setQ("");
      setDebounced("");
    };
    window.addEventListener("aurel:search:open", onOpen);
    return () => window.removeEventListener("aurel:search:open", onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 200);
    return () => clearTimeout(t);
  }, [q]);

  const results = React.useMemo(() => {
    if (debounced.trim().length < 2) return null;
    track("search", { query: debounced });
    return searchAll(debounced);
  }, [debounced]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl p-0 top-[12vh] translate-y-0 gap-0 overflow-hidden bg-background">
        <DialogTitle className="sr-only">Search AUREL</DialogTitle>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, concerns, ingredients…"
            className="flex-1 bg-transparent outline-none text-lg font-serif placeholder:text-muted-foreground/60"
          />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close search"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto scroll-aurel">
          {!results && (
            <div className="p-6">
              <p className="text-eyebrow text-muted-foreground mb-4">Suggested searches</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="text-sm px-3 py-1.5 border border-border rounded-full hover:border-foreground hover:bg-muted transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results && results.products.length === 0 && results.ingredients.length === 0 && (
            <div className="p-12 text-center">
              <p className="font-serif text-2xl mb-2">No results for &ldquo;{debounced}&rdquo;</p>
              <p className="text-sm text-muted-foreground">
                Try a different term, or browse the full catalogue.
              </p>
            </div>
          )}

          {results && results.products.length > 0 && (
            <div className="p-6">
              <p className="text-eyebrow text-muted-foreground mb-4">Products</p>
              <ul className="divide-y divide-border">
                {results.products.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => go(`/products/${p.slug}`)}
                      className="w-full flex items-center gap-4 py-3 text-left group"
                    >
                      <div className="h-14 w-12 shrink-0 overflow-hidden bg-muted relative">
                        <img
                          src={p.media[0].src}
                          alt={p.media[0].alt}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base leading-tight group-hover:underline underline-offset-4 truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{p.subtitle}</p>
                      </div>
                      <span className="text-sm tabular-nums">{formatPrice(p.price)}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results && results.ingredients.length > 0 && (
            <div className="p-6 border-t border-border">
              <p className="text-eyebrow text-muted-foreground mb-4">Ingredients</p>
              <ul className="grid grid-cols-2 gap-3">
                {results.ingredients.slice(0, 6).map((i) => (
                  <li key={i.slug}>
                    <button
                      onClick={() => go(`/ingredients/${i.slug}`)}
                      className="w-full text-left p-4 border border-border hover:border-foreground transition-colors group"
                    >
                      <p className="font-serif text-lg group-hover:italic transition-all">{i.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{i.role}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
