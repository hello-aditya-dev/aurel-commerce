"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/commerce/product-card";
import { FilterDrawer } from "@/components/commerce/filter-drawer";
import { Reveal } from "@/components/motion/reveal";
import { SlidersHorizontal, ChevronDown, X, ArrowUpDown } from "lucide-react";
import { getAllProducts, getCollectionBySlug } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";
import type { Product, Concern, SkinType, Category } from "@/types/commerce";
import { cn } from "@/lib/utils";

const CONCERN_OPTIONS: { value: Concern; label: string }[] = [
  { value: "barrier", label: "Barrier" },
  { value: "dryness", label: "Dryness" },
  { value: "sensitivity", label: "Sensitivity" },
  { value: "dark-spots", label: "Dark spots" },
  { value: "texture", label: "Texture" },
  { value: "fine-lines", label: "Fine lines" },
  { value: "dullness", label: "Dullness" },
];

const SKIN_OPTIONS: { value: SkinType; label: string }[] = [
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
  { value: "balanced", label: "Balanced" },
  { value: "sensitive", label: "Sensitive" },
];

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: "cleanser", label: "Cleansers" },
  { value: "serum", label: "Serums" },
  { value: "moisturizer", label: "Moisturisers" },
  { value: "spf", label: "SPF" },
  { value: "mask", label: "Masks" },
  { value: "system", label: "Systems" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "rating", label: "Highest rated" },
  { value: "newest", label: "Newest" },
];

export function CollectionGrid({ collectionSlug }: { collectionSlug?: string }) {
  const searchParams = useSearchParams();
  const allProducts = getAllProducts();
  const collection = collectionSlug ? getCollectionBySlug(collectionSlug) : null;
  const all = collection
    ? allProducts.filter((p) => collection.productSlugs.includes(p.slug))
    : allProducts;

  const initialConcern = searchParams.get("concern") as Concern | null;
  const step = searchParams.get("step");

  const [concerns, setConcerns] = React.useState<Set<Concern>>(
    initialConcern ? new Set([initialConcern]) : new Set()
  );
  const [skinTypes, setSkinTypes] = React.useState<Set<SkinType>>(new Set());
  const [categories, setCategories] = React.useState<Set<Category>>(
    step ? new Set([step as Category]) : new Set()
  );
  const [priceMax, setPriceMax] = React.useState(200);
  const [sort, setSort] = React.useState("featured");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    let list = [...all];
    if (concerns.size) list = list.filter((p) => p.concerns.some((c) => concerns.has(c)));
    if (skinTypes.size) list = list.filter((p) => p.skinTypes.some((t) => skinTypes.has(t)));
    if (categories.size) list = list.filter((p) => categories.has(p.category));
    list = list.filter((p) => p.price <= priceMax);

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      default:
        list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
    }
    return list;
  }, [all, concerns, skinTypes, categories, priceMax, sort]);

  const activeCount = concerns.size + skinTypes.size + categories.size;

  const toggle = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
    track("filter", { count: next.size });
  };

  const clearAll = () => {
    setConcerns(new Set());
    setSkinTypes(new Set());
    setCategories(new Set());
    setPriceMax(200);
  };

  return (
    <div className="container-aurel py-10 md:py-16">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </span>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
              Clear filters ({activeCount})
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile filter trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] border border-border px-3 py-2"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters {activeCount > 0 && <span className="text-foreground">({activeCount})</span>}
          </button>

          {/* Desktop sort */}
          <div className="hidden md:flex items-center gap-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm border-none outline-none cursor-pointer hover:text-foreground text-muted-foreground"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Mobile sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="md:hidden bg-transparent text-xs uppercase tracking-[0.14em] border-none outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
        {/* Desktop filters */}
        <aside className="hidden md:block sticky top-32 self-start space-y-8">
          <FilterGroup title="Concern">
            {CONCERN_OPTIONS.map((o) => (
              <FilterCheckbox
                key={o.value}
                checked={concerns.has(o.value)}
                onChange={() => toggle(concerns, o.value, setConcerns)}
                label={o.label}
              />
            ))}
          </FilterGroup>
          <FilterGroup title="Skin type">
            {SKIN_OPTIONS.map((o) => (
              <FilterCheckbox
                key={o.value}
                checked={skinTypes.has(o.value)}
                onChange={() => toggle(skinTypes, o.value, setSkinTypes)}
                label={o.label}
              />
            ))}
          </FilterGroup>
          <FilterGroup title="Product type">
            {CATEGORY_OPTIONS.map((o) => (
              <FilterCheckbox
                key={o.value}
                checked={categories.has(o.value)}
                onChange={() => toggle(categories, o.value, setCategories)}
                label={o.label}
              />
            ))}
          </FilterGroup>
          <FilterGroup title={`Max price · $${priceMax}`}>
            <input
              type="range"
              min={30}
              max={200}
              step={5}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-foreground"
              aria-label="Maximum price"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$30</span>
              <span>$200+</span>
            </div>
          </FilterGroup>
        </aside>

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-3xl mb-3">No products match these filters.</p>
              <p className="text-sm text-muted-foreground mb-6">
                Try removing a filter or browse the full catalogue.
              </p>
              <button
                onClick={clearAll}
                className="inline-flex items-center h-11 px-6 border border-foreground/30 hover:border-foreground text-xs uppercase tracking-[0.14em]"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        concerns={concerns}
        skinTypes={skinTypes}
        categories={categories}
        priceMax={priceMax}
        onConcernToggle={(v) => toggle(concerns, v, setConcerns)}
        onSkinToggle={(v) => toggle(skinTypes, v, setSkinTypes)}
        onCategoryToggle={(v) => toggle(categories, v, setCategories)}
        onPriceChange={setPriceMax}
        onClear={clearAll}
      />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-eyebrow text-muted-foreground mb-4">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <span
        className={cn(
          "h-4 w-4 border flex items-center justify-center transition-colors",
          checked ? "border-foreground bg-foreground" : "border-border group-hover:border-foreground/60"
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-background" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm text-foreground/85 group-hover:text-foreground transition-colors">{label}</span>
    </label>
  );
}
