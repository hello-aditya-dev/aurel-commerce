import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "AUREL is a fictional premium skincare brand, founded on barrier-first formulation.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">About AUREL</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                Skincare for
                <br />
                <span className="italic text-muted-foreground">stressed modern skin.</span>
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                AUREL was founded on a single observation: most modern skin is stressed, and most
                skincare makes that worse. Layer upon layer of actives, fragrance and trend —
                without first restoring the barrier that everything sits on top of.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-aurel py-16 md:py-24">
        <Reveal>
          <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-muted">
            <Image
              src="/images/editorial-stone.png"
              alt="AUREL serum on raw mineral stone"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </section>

      {/* Manifesto */}
      <section className="container-aurel py-12 md:py-20 max-w-3xl">
        <Reveal>
          <p className="text-eyebrow text-muted-foreground mb-5">Manifesto</p>
          <p
            className="font-serif font-light leading-[1.2] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            The barrier is not a trend. It is the foundation everything else sits on.
            <br /><br />
            AUREL formulates barrier-first because no active — no matter how clever —
            can do its best work on top of a compromised barrier.
            <br /><br />
            <span className="italic text-muted-foreground">Clinical actives. Botanical intelligence. Skin, restored.</span>
          </p>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="bg-bone-deep py-16 md:py-24">
        <div className="container-aurel">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { n: "01", t: "Barrier-first", d: "Every formulation begins with the lipid matrix. Ceramides, cholesterol, fatty acids — in the skin's own 3:1:1 ratio." },
              { n: "02", t: "Evidence-led", d: "Actives at meaningful concentrations. Retinal 0.1%, L-AA 15%, niacinamide 4%. No token percentages." },
              { n: "03", t: "Restrained routines", d: "Four steps, two times of day. The skin barrier rewards consistency, not excess." },
            ].map((p, i) => (
              <Reveal key={p.n} delay={0.05 * i}>
                <div className="bg-background p-8 md:p-10 h-full">
                  <p className="font-mono text-xs text-muted-foreground">{p.n}</p>
                  <h3 className="font-serif text-2xl mt-4 leading-tight">{p.t}</h3>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-aurel py-12 md:py-16">
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider max-w-2xl leading-relaxed">
          AUREL is a fictional concept brand created for design and development demonstration.
          Product names, claims, statistics and reviews shown are demonstration content only and do
          not represent real medical advice or endorsements.
        </p>
      </section>
    </>
  );
}
