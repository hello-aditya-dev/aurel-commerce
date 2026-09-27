import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/data/catalog";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";
import type { Concern } from "@/types/commerce";

const CONCERN_LABELS: Record<Concern, { label: string; blurb: string }> = {
  barrier: { label: "Barrier", blurb: "Reinforce the protective lipid layer." },
  dryness: { label: "Dryness", blurb: "Layer humectants, emollients and overnight occlusion." },
  sensitivity: { label: "Sensitivity", blurb: "Buffered actives and barrier restoration for reactive skin." },
  "dark-spots": { label: "Dark spots", blurb: "Vitamin C, retinal and niacinamide for visibly even tone." },
  texture: { label: "Texture", blurb: "Overnight retinal and gentle exfoliation." },
  "fine-lines": { label: "Fine lines", blurb: "Peptide and retinal protocol to visibly soften lines." },
  dullness: { label: "Dullness", blurb: "Antioxidant defence and exfoliation." },
  breakouts: { label: "Breakouts", blurb: "Niacinamide, gentle cleansing and barrier maintenance." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = CONCERN_LABELS[slug as Concern];
  if (!meta) return { title: "Concern not found" };
  return {
    title: `${meta.label} — AUREL`,
    description: meta.blurb,
  };
}

export default async function ConcernDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = CONCERN_LABELS[slug as Concern];
  if (!meta) notFound();
  const matching = products.filter((p) => p.concerns.includes(slug as Concern));

  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <p className="text-eyebrow text-muted-foreground mb-5">Concern</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {meta.label}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            {meta.blurb}
          </p>
        </div>
      </section>
      <div className="container-aurel py-12 md:py-20">
        <p className="text-sm text-muted-foreground mb-8">
          {matching.length} {matching.length === 1 ? "product" : "products"}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {matching.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} priority={i < 2} />
          ))}
        </div>
      </div>
    </>
  );
}
