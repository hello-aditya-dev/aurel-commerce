import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBundleBySlug, getProductsBySlugs, formatPrice } from "@/lib/commerce/provider";
import { BundleAddButton } from "@/components/commerce/bundle-add-button";
import { Reveal } from "@/components/motion/reveal";
import { Check } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBundleBySlug(slug);
  if (!b) return { title: "Bundle not found" };
  return { title: b.name, description: b.subtitle };
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  if (!bundle) notFound();
  const products = getProductsBySlugs(bundle.productSlugs);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">{bundle.subtitle}</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                {bundle.name}
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <p className="text-base text-muted-foreground leading-relaxed">{bundle.description}</p>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-serif text-3xl">{formatPrice(bundle.price)}</span>
                <span className="text-muted-foreground line-through tabular-nums">{formatPrice(bundle.compareAt)}</span>
                <span className="text-xs uppercase tracking-[0.14em]">
                  Save {Math.round((1 - bundle.price / bundle.compareAt) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-aurel py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden bg-muted sticky top-32">
              <Image
                src={bundle.image}
                alt={bundle.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <div>
            <p className="text-eyebrow text-muted-foreground mb-5">What's included</p>
            <ul className="divide-y divide-border border-y border-border">
              {products.map((p, i) => (
                <li key={p.id} className="py-5 flex items-start gap-5">
                  <span className="font-mono text-xs text-muted-foreground w-8 mt-1">
                    0{i + 1}
                  </span>
                  <Link href={`/products/${p.slug}`} className="relative h-20 w-16 shrink-0 overflow-hidden bg-muted">
                    <Image src={p.media[0].src} alt={p.media[0].alt} fill sizes="64px" className="object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${p.slug}`}
                      className="font-serif text-lg leading-tight hover:underline underline-offset-4 block"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.subtitle}</p>
                    <p className="text-sm mt-2 tabular-nums">{formatPrice(p.price)}</p>
                  </div>
                  <Check className="h-4 w-4 text-foreground mt-1 shrink-0" />
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border">
              <BundleAddButton
                bundle={bundle}
                className="w-full h-12 bg-foreground text-background text-xs uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Free shipping · 30-day returns · Subscription eligible
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
