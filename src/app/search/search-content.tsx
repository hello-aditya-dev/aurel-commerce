"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchAll } from "@/lib/commerce/provider";
import { ProductCard } from "@/components/commerce/product-card";

export function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [query, setQuery] = React.useState(q);
  const [debounced, setDebounced] = React.useState(q);

  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  React.useEffect(() => {
    setQuery(q);
  }, [q]);

  const results = React.useMemo(() => {
    if (debounced.trim().length < 2) return null;
    return searchAll(debounced);
  }, [debounced]);

  return (
    <div className="container-aurel py-12 md:py-20">
      <p className="text-eyebrow text-muted-foreground mb-5">Search</p>
      <h1
        className="font-serif font-light leading-[1] tracking-[-0.025em]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Search AUREL.
      </h1>

      <div className="mt-8 max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Products, concerns, ingredients…"
          autoFocus
          className="w-full bg-transparent border-b-2 border-border focus:border-foreground outline-none pb-3 text-xl md:text-2xl font-serif placeholder:text-muted-foreground/50 transition-colors"
        />
      </div>

      <div className="mt-12">
        {!results && (
          <p className="text-sm text-muted-foreground">
            Try searching for <span className="text-foreground">dry skin</span>,{" "}
            <span className="text-foreground">retinal</span>, or{" "}
            <span className="text-foreground">barrier routine</span>.
          </p>
        )}

        {results && results.products.length === 0 && results.ingredients.length === 0 && (
          <div className="text-center py-12">
            <p className="font-serif text-2xl mb-3">No results for &ldquo;{debounced}&rdquo;</p>
            <p className="text-sm text-muted-foreground">
              Try a different term, or{" "}
              <Link href="/shop" className="link-underline text-foreground">browse the full catalogue</Link>.
            </p>
          </div>
        )}

        {results && results.products.length > 0 && (
          <div className="mb-16">
            <p className="text-eyebrow text-muted-foreground mb-6">
              {results.products.length} {results.products.length === 1 ? "product" : "products"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {results.products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {results && results.ingredients.length > 0 && (
          <div>
            <p className="text-eyebrow text-muted-foreground mb-6">Ingredients</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.ingredients.map((ing) => (
                <Link
                  key={ing.slug}
                  href={`/ingredients/${ing.slug}`}
                  className="block p-5 border border-border hover:border-foreground transition-colors group"
                >
                  <p className="font-serif text-xl group-hover:italic transition-all">{ing.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{ing.role}</p>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                    {ing.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
