import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealText } from "@/components/motion/reveal";

export function BrandStatementSection() {
  return (
    <section className="relative bg-foreground text-background py-24 md:py-40 overflow-hidden">
      <div className="container-aurel">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-7">
            <p className="text-eyebrow text-background/60 mb-6">AUREL · Philosophy</p>
            <h2 className="font-serif font-light leading-[1.02] tracking-[-0.025em]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 5rem)" }}
            >
              <RevealText text="Your skin barrier" />
              <br />
              <span className="italic text-background/90">
                <RevealText text="is not a trend." delay={0.15} />
              </span>
            </h2>
          </div>

          <div className="md:col-span-5 md:pt-3">
            <Reveal delay={0.3}>
              <p className="text-base md:text-lg leading-relaxed text-background/75">
                AUREL was founded on a single observation: most modern skin is stressed, and most
                skincare makes that worse. Layer upon layer of actives, fragrance and trend —
                without first restoring the barrier that everything sits on top of.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-background/75 mt-5">
                We formulate barrier-first. Clinical actives at meaningful concentrations,
                botanical intelligence where it earns its place, and routines that respect the
                skin rather than overwhelm it.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/approach"
                  className="link-underline text-sm uppercase tracking-[0.14em] text-background hover:text-background/80 transition-colors"
                >
                  Our approach
                </Link>
                <span className="font-mono text-[0.6875rem] text-background/40">·</span>
                <Link
                  href="/about"
                  className="link-underline text-sm uppercase tracking-[0.14em] text-background/60 hover:text-background transition-colors"
                >
                  About AUREL
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stat row */}
        <div className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-10 border-t border-background/15 pt-12">
          {[
            { v: "08", l: "Products, one system" },
            { v: "3:1:1", l: "Skin-identical ceramide ratio" },
            { v: "0.1%", l: "Retinaldehyde concentration" },
            { v: "0", l: "Added fragrance" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={0.1 * i}>
              <div>
                <p className="font-serif text-4xl md:text-6xl font-light tracking-tight">{s.v}</p>
                <p className="text-xs text-background/60 mt-3 leading-relaxed uppercase tracking-[0.12em]">
                  {s.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
