"use client";

import { getIngredientsForProduct, getProductsBySlugs } from "@/lib/commerce/provider";
import { cn } from "@/lib/utils";

// Checks all selected products for incompatible ingredient pairs and returns
// a score + explanation
export function computeRoutineScore(slugs: string[]): {
  score: number;
  label: string;
  issues: string[];
  bonuses: string[];
} {
  const issues: string[] = [];
  const bonuses: string[] = [];
  let score = 50; // baseline

  if (slugs.length === 0) {
    return { score: 0, label: "Empty", issues: [], bonuses: [] };
  }

  const products = getProductsBySlugs(slugs);

  // Bonus: covers all 4 routine steps
  const steps = new Set(products.map((p) => p.routineStep));
  if (steps.has("cleanse")) { score += 10; bonuses.push("Cleansing step included"); }
  if (steps.has("treat")) { score += 15; bonuses.push("Treatment step included"); }
  if (steps.has("restore")) { score += 10; bonuses.push("Restore step included"); }
  if (steps.has("protect")) { score += 15; bonuses.push("SPF protection included"); }

  // Bonus: AM + PM coverage
  const hasAM = products.some((p) => p.timeOfDay === "AM" || p.timeOfDay === "BOTH");
  const hasPM = products.some((p) => p.timeOfDay === "PM" || p.timeOfDay === "BOTH");
  if (hasAM && hasPM) { score += 10; bonuses.push("AM + PM coverage"); }

  // Penalty: incompatible ingredient pairs
  const INCOMPATIBLE: [string, string, string][] = [
    ["vitamin-c", "retinal", "Vitamin C and retinal should be used at different times of day"],
  ];
  const allIngredientSlugs = products.flatMap((p) =>
    p.keyIngredients.map((i) => ({ ingredient: i, productSlug: p.slug }))
  );
  for (const [a, b, reason] of INCOMPATIBLE) {
    const hasA = allIngredientSlugs.find((x) => x.ingredient === a);
    const hasB = allIngredientSlugs.find((x) => x.ingredient === b);
    if (hasA && hasB) {
      score -= 20;
      issues.push(reason);
    }
  }

  // Bonus: multiple products with peptides/ceramides (barrier support)
  const barrierActives = allIngredientSlugs.filter((x) =>
    ["peptides", "ceramides", "ectoin", "panthenol"].includes(x.ingredient)
  );
  if (barrierActives.length >= 2) { score += 10; bonuses.push("Multiple barrier-support actives"); }

  score = Math.max(0, Math.min(100, score));

  let label = "Needs work";
  if (score >= 85) label = "Excellent";
  else if (score >= 70) label = "Good";
  else if (score >= 50) label = "Fair";

  return { score, label, issues, bonuses };
}
