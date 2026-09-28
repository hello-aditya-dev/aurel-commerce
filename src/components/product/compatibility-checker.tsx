"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, X, AlertCircle, Plus, RefreshCw } from "lucide-react";
import { getAllProducts, getIngredientsForProduct } from "@/lib/commerce/provider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Compatibility matrix: ingredient slug pairs that should NOT be layered in the same step.
// Anything not listed here is considered compatible.
const INCOMPATIBLE_PAIRS: [string, string, string][] = [
  // [ingredientA, ingredientB, reason]
  ["vitamin-c", "retinal", "Use vitamin C in the AM and retinal in the PM. Layering them in the same step destabilises both and increases irritation."],
  ["vitamin-c", "niacinamide", "Generally well-tolerated together, but the low pH of L-ascorbic acid can convert niacinamide to nicotinic acid in some formulations, causing flushing. Safe to layer but consider AM/PM separation if you have reactive skin."],
  // Note: this is a soft warning — they CAN be used together but worth knowing
];

interface CompatibilityResult {
  verdict: "compatible" | "caution" | "incompatible";
  reason?: string;
  ingredientPair?: [string, string];
}

function checkCompatibility(slugA: string, slugB: string): CompatibilityResult {
  if (slugA === slugB) return { verdict: "compatible" };
  const ingA = getIngredientsForProduct(slugA);
  const ingB = getIngredientsForProduct(slugB);
  const slugsA = new Set(ingA.map((i) => i.slug));
  const slugsB = new Set(ingB.map((i) => i.slug));

  for (const [a, b, reason] of INCOMPATIBLE_PAIRS) {
    if ((slugsA.has(a) && slugsB.has(b)) || (slugsA.has(b) && slugsB.has(a))) {
      // Soft warning for vitamin-c + niacinamide (still usable, just informative)
      if (a === "vitamin-c" && b === "niacinamide") {
        return { verdict: "caution", reason, ingredientPair: [a, b] };
      }
      return { verdict: "incompatible", reason, ingredientPair: [a, b] };
    }
  }

  return { verdict: "compatible" };
}

export function CompatibilityChecker() {
  const products = getAllProducts().filter((p) => p.category !== "system");
  const [selectedA, setSelectedA] = React.useState<string | null>(null);
  const [selectedB, setSelectedB] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<CompatibilityResult | null>(null);

  const productA = products.find((p) => p.slug === selectedA);
  const productB = products.find((p) => p.slug === selectedB);

  const check = () => {
    if (!selectedA || !selectedB) return;
    const r = checkCompatibility(selectedA, selectedB);
    setResult(r);
    track("compatibility_check", { a: selectedA, b: selectedB, verdict: r.verdict });
  };

  const reset = () => {
    setSelectedA(null);
    setSelectedB(null);
    setResult(null);
  };

  return (
    <section className="bg-bone-deep py-16 md:py-24">
      <div className="container-aurel">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <p className="text-eyebrow text-muted-foreground mb-5">Layering check</p>
            <h2
              className="font-serif font-light leading-[1] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              Do these
              <br />
              <span className="italic text-muted-foreground">layer?</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-2">
            <p className="text-base text-muted-foreground leading-relaxed">
              Select two AUREL products to see if they can be layered in the same routine step. Our compatibility checker cross-references the key actives in each formula.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* Product A selector */}
          <ProductSelectCard
            label="Product A"
            selected={selectedA}
            onChange={setSelectedA}
            products={products}
            excludeSlug={selectedB}
          />

          {/* Center: result */}
          <div className="flex flex-col items-center justify-center min-h-[200px] md:min-w-[180px]">
            {result ? (
              <ResultDisplay result={result} onReset={reset} />
            ) : (
              <button
                onClick={check}
                disabled={!selectedA || !selectedB}
                className={cn(
                  "h-12 px-6 text-xs uppercase tracking-[0.16em] transition-all flex items-center gap-2",
                  selectedA && selectedB
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <Plus className="h-3.5 w-3.5" />
                Check
              </button>
            )}
          </div>

          {/* Product B selector */}
          <ProductSelectCard
            label="Product B"
            selected={selectedB}
            onChange={setSelectedB}
            products={products}
            excludeSlug={selectedA}
          />
        </div>

        {/* Educational footer */}
        <p className="mt-12 text-xs text-muted-foreground font-mono uppercase tracking-wider max-w-2xl leading-relaxed">
          Educational guidance only · AUREL is a fictional concept brand · Always patch test new actives and consult a dermatologist for personalised advice
        </p>
      </div>
    </section>
  );
}

function ProductSelectCard({
  label,
  selected,
  onChange,
  products,
  excludeSlug,
}: {
  label: string;
  selected: string | null;
  onChange: (slug: string | null) => void;
  products: ReturnType<typeof getAllProducts>;
  excludeSlug: string | null;
}) {
  const product = products.find((p) => p.slug === selected);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  return (
    <div className="bg-background border border-border p-5">
      <p className="text-eyebrow text-muted-foreground mb-4">{label}</p>
      {product ? (
        <div className="flex items-center gap-4">
          <Link
            href={`/products/${product.slug}`}
            className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted"
          >
            <Image src={product.media[0].src} alt={product.media[0].alt} fill sizes="64px" className="object-cover" />
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/products/${product.slug}`} className="font-serif text-base leading-tight hover:underline underline-offset-4 block">
              {product.name}
            </Link>
            <p className="text-xs text-muted-foreground mt-1">{product.size}</p>
            <button
              onClick={() => { onChange(null); setPickerOpen(false); }}
              className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              Change
            </button>
          </div>
        </div>
      ) : pickerOpen ? (
        <div className="space-y-1.5 max-h-64 overflow-y-auto scroll-aurel">
          {products.filter((p) => p.slug !== excludeSlug).map((p) => (
            <button
              key={p.id}
              onClick={() => { onChange(p.slug); setPickerOpen(false); }}
              className="w-full flex items-center gap-3 p-2 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="relative h-10 w-8 shrink-0 overflow-hidden bg-muted">
                <Image src={p.media[0].src} alt={p.media[0].alt} fill sizes="32px" className="object-cover" />
              </div>
              <span className="font-serif text-sm truncate">{p.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setPickerOpen(true)}
          className="w-full h-20 border border-dashed border-border hover:border-foreground/50 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="text-xs uppercase tracking-[0.14em]">Select product</span>
        </button>
      )}
    </div>
  );
}

function ResultDisplay({
  result,
  onReset,
}: {
  result: CompatibilityResult;
  onReset: () => void;
}) {
  const config = {
    compatible: {
      icon: <Check className="h-6 w-6" />,
      label: "Layer freely",
      color: "text-foreground",
      bg: "bg-foreground/5",
      border: "border-foreground/20",
    },
    caution: {
      icon: <AlertCircle className="h-6 w-6" />,
      label: "Layer with care",
      color: "text-foreground",
      bg: "bg-foreground/5",
      border: "border-foreground/30",
    },
    incompatible: {
      icon: <X className="h-6 w-6" />,
      label: "Separate steps",
      color: "text-foreground",
      bg: "bg-foreground/[0.08]",
      border: "border-foreground/40",
    },
  }[result.verdict];

  return (
    <div className={cn("border p-5 text-center w-full", config.bg, config.border)}>
      <div className={cn("inline-flex h-12 w-12 rounded-full items-center justify-center mb-3", config.bg, config.color)}>
        {config.icon}
      </div>
      <p className="font-serif text-xl leading-tight">{config.label}</p>
      {result.reason && (
        <p className="text-xs text-muted-foreground mt-3 leading-relaxed text-left">
          {result.reason}
        </p>
      )}
      <button
        onClick={onReset}
        className="mt-4 inline-flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
      >
        <RefreshCw className="h-3 w-3" />
        Reset
      </button>
    </div>
  );
}
