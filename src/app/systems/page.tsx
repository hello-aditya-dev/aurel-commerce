import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllBundles, formatPrice } from "@/lib/commerce/provider";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Systems & Bundles",
  description: "Pre-built AUREL routines engineered to work as one sequence.",
};

export default function SystemsIndexPage() {
  const bundles = getAllBundles();
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <p className="text-eyebrow text-muted-foreground mb-5">Systems &amp; Bundles</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Coherent routines,
            <br />
            <span className="italic text-muted-foreground">not loose products.</span>
          </h1>
        </div>
      </section>
      <div className="container-aurel py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bundles.map((b, i) => (
            <Reveal key={b.slug} delay={0.05 * i}>
              <Link
                href={`/systems/${b.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-5">
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background text-foreground text-[0.625rem] uppercase tracking-[0.14em] px-2.5 py-1 font-mono">
                      Save {Math.round((1 - b.price / b.compareAt) * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-eyebrow text-muted-foreground">{b.subtitle}</p>
                <h2 className="font-serif text-2xl mt-2 leading-tight group-hover:italic transition-all">
                  {b.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{b.description}</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-xl">{formatPrice(b.price)}</span>
                  <span className="text-sm text-muted-foreground line-through tabular-nums">{formatPrice(b.compareAt)}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
