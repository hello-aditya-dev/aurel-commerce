import { notFound } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getCollectionBySlug, collections } from "@/lib/commerce/provider";
import { CollectionGrid } from "@/components/commerce/collection-grid";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) return { title: "Collection not found" };
  return {
    title: c.name,
    description: c.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground mb-5">{collection.tagline}</p>
                <h1
                  className="font-serif font-light leading-[1] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
                >
                  {collection.name}
                </h1>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <Reveal delay={0.15}>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {collection.description}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="container-aurel py-20" />}>
        <CollectionGrid collectionSlug={slug} />
      </Suspense>
    </>
  );
}
