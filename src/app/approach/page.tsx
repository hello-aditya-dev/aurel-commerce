import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Our Approach",
  description: "AUREL's barrier-first, evidence-led approach to skincare formulation.",
};

export default function ApproachPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-24">
          <p className="text-eyebrow text-muted-foreground mb-5">Our approach</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Formulation as
            <br />
            <span className="italic text-muted-foreground">a sequence.</span>
          </h1>
        </div>
      </section>

      {/* Section 1: Barrier first */}
      <section className="container-aurel py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-mono text-muted-foreground uppercase tracking-wider mb-5">01 / Barrier first</p>
              <h2 className="font-serif text-editorial">The lipid matrix.</h2>
              <p className="text-base text-muted-foreground mt-6 leading-relaxed">
                The skin barrier is a thin matrix of corneocytes embedded in a lipid mortar of
                ceramides, cholesterol and free fatty acids. When that mortar is intact, skin looks
                calm and hydrated. When it is compromised, every active layered on top underperforms.
              </p>
              <p className="text-base text-muted-foreground mt-4 leading-relaxed">
                AUREL mirrors the skin's own 3:1:1 ceramide ratio in our recovery cream and overnight
                mask — so we restore, not just coat.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image src="/images/texture-cream.png" alt="Ceramide cream texture" fill sizes="50vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 2: Evidence-led */}
      <section className="bg-bone-deep py-16 md:py-24">
        <div className="container-aurel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="md:col-span-6 md:order-2">
              <Reveal>
                <p className="text-mono text-muted-foreground uppercase tracking-wider mb-5">02 / Evidence-led</p>
                <h2 className="font-serif text-editorial">Meaningful concentrations.</h2>
                <p className="text-base text-muted-foreground mt-6 leading-relaxed">
                  Many brands add actives at trace concentrations purely for marketing. AUREL
                  formulates at concentrations supported by published research: retinal 0.1%,
                  L-ascorbic acid 15%, niacinamide 4%.
                </p>
                <p className="text-base text-muted-foreground mt-4 leading-relaxed">
                  We buffer strong actives with ingredients that genuinely reduce irritation —
                  ectoin, panthenol, peptides — so the active can do its work without derailing
                  the routine.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:order-1">
              <Reveal delay={0.1}>
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image src="/images/ingredient-laboratory.png" alt="Laboratory composition" fill sizes="50vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Restrained routines */}
      <section className="container-aurel py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-mono text-muted-foreground uppercase tracking-wider mb-5">03 / Restrained routines</p>
              <h2 className="font-serif text-editorial">Four steps, not fourteen.</h2>
              <p className="text-base text-muted-foreground mt-6 leading-relaxed">
                The skincare industry rewards excess — more products, more steps, more actives. But
                the barrier rewards restraint. The AUREL method is four steps: cleanse, treat,
                restore, protect. Each step has a single job.
              </p>
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-[0.14em] link-underline"
              >
                Take the diagnostic
              </Link>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image src="/images/editorial-routine.png" alt="Bathroom routine moment" fill sizes="50vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 4: Sensory */}
      <section className="bg-foreground text-background py-20 md:py-32">
        <div className="container-aurel max-w-3xl">
          <Reveal>
            <p className="text-eyebrow text-background/60 mb-5">04 / Sensory experience</p>
            <h2
              className="font-serif font-light leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              A formulation that feels good
              <br />
              <span className="italic text-background/80">gets used consistently.</span>
            </h2>
            <p className="text-base md:text-lg text-background/70 mt-6 leading-relaxed">
              And consistency is where skincare actually works. Every AUREL texture is engineered
              for absorption, layerability and sensory pleasure — never for show.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
