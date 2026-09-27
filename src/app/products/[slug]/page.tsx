import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductBySlug, getProductsBySlugs, getIngredientsForProduct, formatPrice, getBestsellers } from "@/lib/commerce/provider";
import { ProductGallery } from "@/components/product/product-gallery";
import { AddToCartBridge } from "@/components/product/add-to-cart-bridge";
import { MobileStickyPurchase } from "@/components/product/mobile-sticky-purchase";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Truck, RefreshCw, ShieldCheck, Leaf, Beaker, Droplets } from "lucide-react";
import { CompleteRoutine } from "@/components/product/complete-routine";
import { ReviewsSection } from "@/components/product/reviews-section";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return {
    title: p.name,
    description: p.subtitle,
    openGraph: {
      title: `${p.name} — AUREL`,
      description: p.subtitle,
      images: [{ url: p.media[0].src, width: 1024, height: 1024, alt: p.media[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const ingredients = getIngredientsForProduct(slug);
  const pairings = getProductsBySlugs(product.pairings);
  const related = getBestsellers(4).filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <>
      <div className="border-b border-border">
        <div className="container-aurel py-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="container-aurel py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div id="purchase-anchor">
            <ProductGallery media={product.media} name={product.name} />
          </div>
          <div className="md:pt-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.14em]">
                  {product.number}
                </span>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {product.category}
                </span>
              </div>
              <h1 className="font-serif font-light leading-[1.05] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {product.name}
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-prose">
                {product.subtitle}
              </p>
            </div>

            <AddToCartBridge product={product} />
          </div>
        </div>

        <section className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-eyebrow text-muted-foreground mb-5">Overview</p>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-serif text-xl md:text-2xl leading-[1.4] tracking-tight">
                {product.longDescription}
              </p>
              {product.claimIllustrative && (
                <p className="mt-6 text-xs text-muted-foreground font-mono uppercase tracking-wider border-l-2 border-foreground/30 pl-4">
                  {product.claimIllustrative}
                </p>
              )}
            </Reveal>
          </div>
        </section>

        <section className="mt-20 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-4">
              <p className="text-eyebrow text-muted-foreground mb-5">Why it works</p>
              <h2 className="font-serif text-editorial">The thinking, briefly.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {product.benefits.map((b, i) => (
              <Reveal key={b.label} delay={0.05 * i}>
                <div className="bg-background p-6 md:p-8 h-full">
                  <div className="h-8 w-8 flex items-center justify-center text-foreground mb-5">
                    {benefitIcon(i)}
                  </div>
                  <p className="font-serif text-lg leading-tight">{b.label}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{b.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {ingredients.length > 0 && (
          <section className="mt-20 md:mt-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
              <div className="md:col-span-4">
                <p className="text-eyebrow text-muted-foreground mb-5">Key actives</p>
                <h2 className="font-serif text-editorial">What's in it.</h2>
              </div>
              <div className="md:col-span-6 md:col-start-7 md:pt-2">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Every active at a meaningful concentration. No filler, no token percentages, no marketing-only actives.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {ingredients.map((ing, i) => (
                <Reveal key={ing.slug} delay={0.05 * i}>
                  <Link
                    href={`/ingredients/${ing.slug}`}
                    className="group grid grid-cols-[80px_1fr] gap-5 bg-background p-6 md:p-8 h-full hover:bg-muted/30 transition-colors"
                  >
                    <div className="relative w-20 h-20 overflow-hidden bg-muted shrink-0">
                      <img src={ing.image} alt={ing.name} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-mono text-muted-foreground uppercase tracking-wider">{ing.role}</p>
                      <p className="font-serif text-xl mt-2 leading-tight group-hover:italic transition-all">{ing.name}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-2">{ing.description}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <section className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <Reveal>
              <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-muted">
                <img
                  src={product.media.find((m) => m.kind === "texture")?.src ?? product.media[0].src}
                  alt={`${product.name} texture`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 order-1 md:order-2">
            <p className="text-eyebrow text-muted-foreground mb-5">Texture &amp; sensorial</p>
            <h2 className="font-serif text-editorial">{product.texture}</h2>
            <p className="text-base text-muted-foreground mt-6 leading-relaxed">
              Sensory experience matters. A formulation that feels good gets used consistently — and consistency is where skincare actually works.
            </p>
          </div>
        </section>

        <section className="mt-20 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-4">
              <p className="text-eyebrow text-muted-foreground mb-5">How to use</p>
              <h2 className="font-serif text-editorial">The placement.</h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 md:pt-2">
              <p className="text-base text-muted-foreground leading-relaxed">
                {product.timeOfDay === "AM" && "Use in the morning."}
                {product.timeOfDay === "PM" && "Use in the evening."}
                {product.timeOfDay === "BOTH" && "Use morning and evening."}
              </p>
            </div>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {product.howToUse.map((step, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <li className="bg-background p-6 md:p-8 h-full">
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <p className="font-serif text-lg mt-4 leading-tight">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {pairings.length > 0 && (
          <CompleteRoutine mainProduct={product} pairings={pairings} />
        )}

        <ReviewsSection product={product} />

        <section className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-eyebrow text-muted-foreground mb-5">FAQ</p>
            <h2 className="font-serif text-editorial">Common questions.</h2>
          </div>
          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {product.faq.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="font-serif text-lg md:text-xl text-left hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-24 md:mt-32">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-serif text-editorial">You may also like</h2>
              <Link href="/shop" className="link-underline text-sm uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground">
                All products
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <MobileStickyPurchase
        slug={product.slug}
        name={product.name}
        price={product.price}
      />
    </>
  );
}

function benefitIcon(index: number) {
  const icons = [<ShieldCheck className="h-5 w-5" />, <Droplets className="h-5 w-5" />, <Leaf className="h-5 w-5" />, <Beaker className="h-5 w-5" />];
  return icons[index % icons.length];
}
