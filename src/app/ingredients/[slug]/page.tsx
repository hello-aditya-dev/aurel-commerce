import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllIngredients, getIngredientBySlug, getProductsForIngredient } from "@/lib/commerce/provider";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ing = getIngredientBySlug(slug);
  if (!ing) return { title: "Ingredient not found" };
  return {
    title: ing.name,
    description: ing.description,
  };
}

export function generateStaticParams() {
  return getAllIngredients().map((i) => ({ slug: i.slug }));
}

export default async function IngredientDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ingredient = getIngredientBySlug(slug);
  if (!ingredient) notFound();
  const products = getProductsForIngredient(slug);

  return (
    <>
      <div className="border-b border-border">
        <div className="container-aurel py-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/ingredients" className="hover:text-foreground">Ingredients</Link>
          <span>/</span>
          <span className="text-foreground">{ingredient.name}</span>
        </div>
      </div>

      <section className="container-aurel py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-mono text-muted-foreground uppercase tracking-wider mb-5">
                {ingredient.role}
              </p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
              >
                {ingredient.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-5 font-mono">
                INCI · {ingredient.inciName}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-3">
            <Reveal delay={0.15}>
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                {ingredient.description}
              </p>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-eyebrow text-muted-foreground mb-3">Why AUREL uses it</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {ingredient.whyWeUseIt}
                </p>
              </div>
              {ingredient.compatibility && (
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-eyebrow text-muted-foreground mb-3">Compatibility</p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {ingredient.compatibility}
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="bg-bone-deep py-16 md:py-24">
          <div className="container-aurel">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif text-editorial">Products containing {ingredient.name.toLowerCase()}</h2>
              <Link href="/shop" className="link-underline text-sm uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
                All products
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-aurel py-16">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
          Ingredient information is educational. AUREL is a fictional concept brand and this content
          does not constitute medical advice.
        </p>
      </section>
    </>
  );
}
