import type { Product, Collection, Bundle, Ingredient } from "@/types/commerce";
import {
  products,
  collections,
  bundles,
  ingredients,
} from "@/data/catalog";

export { collections, products, bundles, ingredients };

// ============================================================================
// AUREL commerce abstraction
// ----------------------------------------------------------------------------
// This module is the single entry point for product/catalog reads.
// A real Shopify provider would implement the same surface against the
// Storefront API. See docs/COMMERCE-ARCHITECTURE.md for the migration path.
// ============================================================================

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  const map = new Map(products.map((p) => [p.slug, p]));
  return slugs.map((s) => map.get(s)).filter(Boolean) as Product[];
}

export function getBestsellers(limit = 4): Product[] {
  return products.filter((p) => p.bestseller && p.category !== "system").slice(0, limit);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.hero || p.bestseller).slice(0, limit);
}

export function getAllCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getProductsForCollection(slug: string): Product[] {
  const col = collections.find((c) => c.slug === slug);
  if (!col) return [];
  const map = new Map(products.map((p) => [p.slug, p]));
  return col.productSlugs.map((s) => map.get(s)).filter(Boolean) as Product[];
}

export function getAllBundles(): Bundle[] {
  return bundles;
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}

export function getBundleByProductSlugs(slugs: string[]): Bundle | undefined {
  return bundles.find(
    (b) =>
      b.productSlugs.length === slugs.length &&
      b.productSlugs.every((s) => slugs.includes(s))
  );
}

export function getAllIngredients(): Ingredient[] {
  return ingredients;
}

export function getIngredientBySlug(slug: string): Ingredient | undefined {
  return ingredients.find((i) => i.slug === slug);
}

export function getIngredientsForProduct(productSlug: string): Ingredient[] {
  const p = getProductBySlug(productSlug);
  if (!p) return [];
  return p.keyIngredients
    .map((s) => ingredients.find((i) => i.slug === s))
    .filter(Boolean) as Ingredient[];
}

export function getProductsForIngredient(ingredientSlug: string): Product[] {
  return products.filter((p) => p.keyIngredients.includes(ingredientSlug));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.subtitle,
      p.description,
      p.category,
      ...p.concerns,
      ...p.keyIngredients,
      ...p.skinTypes,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function searchAll(query: string): {
  products: Product[];
  ingredients: Ingredient[];
} {
  return {
    products: searchProducts(query),
    ingredients: ingredients.filter((i) =>
      `${i.name} ${i.inciName} ${i.role} ${i.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
    ),
  };
}

// ---- Quiz routine computation (deterministic) ----
import type { QuizAnswer, RoutineResult } from "@/types/commerce";

export function computeRoutine(answers: QuizAnswer): RoutineResult {
  const rationale: string[] = [];
  const am: string[] = [];
  const pm: string[] = [];

  // Always cleanse AM + PM
  am.push("barrier-reset-cleanser");
  pm.push("barrier-reset-cleanser");

  // AM treatment based on concerns
  const wantsBrightening =
    answers.concerns.includes("dark-spots") ||
    answers.concerns.includes("dullness");
  if (wantsBrightening || answers.routineTime !== "essential") {
    am.push("c15-antioxidant-serum");
    rationale.push("Vitamin C in the morning for antioxidant defence and visible brightness.");
  }

  // Peptide serum for everyone with sensitivity/barrier concern
  const wantsBarrier =
    answers.concerns.includes("barrier") ||
    answers.concerns.includes("sensitivity") ||
    answers.reactivity >= 4;
  am.push("peptide-recovery-serum");
  pm.push("peptide-recovery-serum");
  if (wantsBarrier) {
    rationale.push("Peptide Recovery Serum selected for visible barrier support and calm.");
  }

  // Retinal for texture / fine lines / complete routine
  const wantsRetinal =
    answers.concerns.includes("texture") ||
    answers.concerns.includes("fine-lines") ||
    answers.routineTime === "complete";
  if (wantsRetinal) {
    pm.push("retinal-renewal-0-1");
    rationale.push("Retinal Renewal 0.1 added for overnight texture refinement.");
  }

  // Restore: cream always
  am.push("ceramide-recovery-cream");
  pm.push("ceramide-recovery-cream");

  // Mask for dry/sensitive or complete
  if (
    answers.concerns.includes("dryness") ||
    answers.skinType === "dry" ||
    answers.routineTime === "complete"
  ) {
    pm.push("overnight-barrier-mask");
    rationale.push("Overnight Barrier Mask added for additional barrier recovery.");
  }

  // Protect: SPF always in AM
  am.push("daily-mineral-spf-50");

  const allSlugs = Array.from(new Set([...am, ...pm]));
  const prods = getProductsBySlugs(allSlugs);
  const total = prods.reduce((sum, p) => sum + p.price, 0);

  // Bundle savings if a matching bundle exists
  const bundle = getBundleByProductSlugs(allSlugs);
  const savings = bundle ? bundle.compareAt - bundle.price : Math.round(total * 0.12);

  const protocolName =
    answers.routineTime === "essential"
      ? "Essential Barrier Protocol"
      : answers.routineTime === "complete"
      ? "Complete Barrier Protocol"
      : "Balanced Barrier Protocol";

  return {
    am,
    pm,
    total,
    savings,
    protocolName,
    rationale: rationale.length ? rationale : ["A balanced routine selected for your skin profile."],
  };
}

// ---- Pricing ----
export function formatPrice(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function subscriptionPrice(price: number): number {
  return Number((price * 0.85).toFixed(2));
}
