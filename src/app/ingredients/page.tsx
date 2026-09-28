import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllIngredients, getProductsForIngredient } from "@/lib/commerce/provider";
import { Reveal } from "@/components/motion/reveal";
import { CompatibilityChecker } from "@/components/product/compatibility-checker";

export const metadata: Metadata = {
  title: "Ingredients",
  description: "The AUREL ingredient library — what's in our formulations, and why.",
};

export default function IngredientsPage() {
  const ingredients = getAllIngredients();
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <p className="text-eyebrow text-muted-foreground mb-5">The ingredient library</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            What's in it,
            <br />
            <span className="italic text-muted-foreground">and why.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            Eight actives, chosen for meaningful concentrations and compatibility. No tokens,
            no marketing-only percentages, no filler.
          </p>
        </div>
      </section>

      <div className="container-aurel py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {ingredients.map((ing, i) => (
            <Reveal key={ing.slug} delay={0.04 * i}>
              <Link
                href={`/ingredients/${ing.slug}`}
                className="group block bg-background p-6 md:p-8 h-full hover:bg-muted/30 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-mono text-muted-foreground uppercase tracking-wider">
                  {ing.role}
                </p>
                <h2 className="font-serif text-2xl mt-2 leading-tight group-hover:italic transition-all">
                  {ing.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-3">
                  {ing.description}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] mt-5 text-foreground">
                  Read more →
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <CompatibilityChecker />
    </>
  );
}
