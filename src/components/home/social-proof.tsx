"use client";

import { Reveal } from "@/components/motion/reveal";

const REVIEWS = [
  {
    quote:
      "I've used four 'barrier' brands before this one. AUREL is the first where the routine actually feels coherent — each step visibly works with the next.",
    author: "M. Vasquez",
    detail: "Combination skin · 6 weeks on the system",
    rating: 5,
  },
  {
    quote:
      "Retinal at 0.1% without the four-week retinol uglies. I didn't think that was possible. Texture around my cheeks is visibly softer at six weeks.",
    author: "C. Larsen",
    detail: "Dry skin · 8 weeks on the night protocol",
    rating: 5,
  },
  {
    quote:
      "The diagnostic got my routine right on the first try. No upsell pressure, no twelve-step nonsense — four products, two times of day.",
    author: "A. Mehta",
    detail: "Reactive skin · 4 weeks on essential routine",
    rating: 5,
  },
];

export function SocialProofSection() {
  return (
    <section className="bg-background py-24 md:py-36">
      <div className="container-aurel">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-eyebrow text-muted-foreground mb-5">From customers</p>
          <h2
            className="font-serif font-light leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Tens of thousands of routines, restored.
          </h2>
          <p className="text-xs text-muted-foreground mt-5 font-mono uppercase tracking-wider">
            Illustrative demonstration reviews · AUREL is a concept brand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.author} delay={0.08 * i}>
              <figure className="bg-background p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-6 text-foreground text-base tracking-tight">
                  {"★".repeat(r.rating)}
                </div>
                <blockquote className="font-serif text-xl md:text-2xl leading-[1.4] tracking-tight flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm font-medium">{r.author}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Aggregate stat row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-10 border-t border-border pt-12 text-center">
          {[
            { v: "4.9", l: "Average rating · 2,869 reviews" },
            { v: "60k+", l: "Routines built with the diagnostic" },
            { v: "92%", l: "Reported softer skin at week 4*" },
            { v: "0", l: "Added fragrance, ever" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-serif text-4xl md:text-5xl font-light">{s.v}</p>
              <p className="text-[0.6875rem] text-muted-foreground mt-3 uppercase tracking-[0.14em] leading-relaxed">
                {s.l}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-[0.625rem] text-muted-foreground mt-8 font-mono uppercase tracking-wider">
          *Illustrative demonstration data. AUREL is a fictional concept brand.
        </p>
      </div>
    </section>
  );
}
