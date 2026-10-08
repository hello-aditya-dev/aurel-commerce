import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, RevealText, StaggerGroup } from "@/components/motion/reveal";
import { CaseStudyCtaButton } from "@/components/case-study/cta-button";
import { img } from "@/lib/img";

/**
 * AUREL — Case Study page (for prospective clients, not consumers).
 *
 * Demonstrates the design + engineering depth of the AUREL commerce concept
 * to attract ecommerce engagements. Kept as a server component; the only
 * client island is the tracked CTA button at the bottom.
 */

export const metadata: Metadata = {
  title: "Case Study — AUREL",
  description:
    "A complete premium DTC skincare commerce experience — designed and engineered end to end. Brand storytelling, PDP architecture, skin diagnostic and conversion-focused UX.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/case-study" },
  openGraph: {
    title: "AUREL — Premium DTC Commerce Concept (Case Study)",
    description:
      "A complete ecommerce experience designed and engineered by Aditya.",
    type: "article",
    images: [
      {
        url: img("/images/og-case-study.jpg"),
        width: 1200,
        height: 630,
        alt: "AUREL — Premium DTC Commerce Concept. Design + Ecommerce UX + Frontend Engineering.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUREL — Premium DTC Commerce Concept",
    description: "A complete ecommerce experience designed and engineered by Aditya.",
    images: [img("/images/og-case-study.jpg")],
  },
};

/** Configurable contact destination for the case-study CTA. */
const PROJECT_CONTACT_URL =
  process.env.NEXT_PUBLIC_CONTACT_URL || "/contact";

const CAPABILITIES: { n: string; label: string; desc: string }[] = [
  {
    n: "01",
    label: "Brand Visual Direction",
    desc: "Editorial art direction — Fraunces serif, Inter grotesk, mineral palette, motion language.",
  },
  {
    n: "02",
    label: "Ecommerce UX",
    desc: "Cart drawer, sticky mobile purchase, conversion-aware flows from PDP to checkout intent.",
  },
  {
    n: "03",
    label: "Product Discovery",
    desc: "Skin diagnostic, concerns index, and ingredient-led browse paths across the catalog.",
  },
  {
    n: "04",
    label: "Responsive Interface System",
    desc: "Mobile-first component system that scales gracefully from 320px to 80rem.",
  },
  {
    n: "05",
    label: "PDP Architecture",
    desc: "Gallery, purchase panel, complete-routine, reviews, and sticky mobile buy bar.",
  },
  {
    n: "06",
    label: "Routine Quiz",
    desc: "Five-step diagnostic with reduced-motion safe transitions and explainable results.",
  },
  {
    n: "07",
    label: "Personalised Recommendations",
    desc: "Concern-mapped routine results with rationale the shopper can actually trust.",
  },
  {
    n: "08",
    label: "Bundle Logic",
    desc: "System bundles with tiered pricing and complementary-product selection logic.",
  },
  {
    n: "09",
    label: "Cart Upsells",
    desc: "Drawer upsells, free-shipping threshold, and bundle-aware line-item additions.",
  },
  {
    n: "10",
    label: "Search & Filtering",
    desc: "Cmd-K search overlay, collection filters, and multi-dimensional sort.",
  },
  {
    n: "11",
    label: "Mobile Commerce",
    desc: "Touch-first interactions, dedicated mobile nav, and persistent purchase affordance.",
  },
  {
    n: "12",
    label: "Motion System",
    desc: "Framer Motion reveal + stagger system with strict reduced-motion fallbacks.",
  },
];

const STACK: { k: string; v: string }[] = [
  { k: "framework", v: "Next.js 16" },
  { k: "routing", v: "App Router" },
  { k: "ui runtime", v: "React 19" },
  { k: "language", v: "TypeScript 5" },
  { k: "styling", v: "Tailwind CSS 4" },
  { k: "motion", v: "Framer Motion" },
  { k: "client state", v: "Zustand" },
  { k: "commerce", v: "Shopify-compatible abstraction" },
  { k: "media", v: "Responsive image pipeline" },
];

const HIGHLIGHTS: { label: string; caption: string; image: string }[] = [
  {
    label: "Homepage",
    image: "/images/case-home.png",
    caption: "Thirteen editorial sections — brand, diagnostic, social proof, bundles.",
  },
  {
    label: "Product Detail",
    image: "/images/case-pdp.png",
    caption: "Gallery, purchase panel, routine completion, reviews, sticky mobile buy.",
  },
  {
    label: "Diagnostic",
    image: "/images/case-quiz.png",
    caption: "Five-step quiz leading to a personalised routine with explainable rationale.",
  },
  {
    label: "Cart",
    image: "/images/case-cart.png",
    caption: "Drawer with upsells, free-shipping threshold, bundle-aware line items.",
  },
  {
    label: "Collection",
    image: "/images/case-collection.png",
    caption: "Filters, sort and grid system built to scale across the catalog.",
  },
];

const METRICS: { v: string; l: string }[] = [
  { v: "08", l: "Products, one system" },
  { v: "13", l: "Homepage sections" },
  { v: "05", l: "Quiz steps" },
  { v: "4K", l: "Quality source assets" },
];

export default function CaseStudyPage() {
  return (
    <>
      {/* ============================================================
          HERO — Full editorial
          ============================================================ */}
      <section className="relative w-full overflow-hidden bg-background pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="container-aurel">
          {/* Top metadata strip */}
          <div className="flex items-center justify-between text-mono text-muted-foreground border-b border-border pb-5">
            <span>AR · CS · 01</span>
            <span className="hidden md:block">For prospective clients</span>
            <span>AD · 26</span>
          </div>

          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10">
            <div className="md:col-span-8">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground mb-7">
                  Case Study · For Prospective Clients
                </p>
              </Reveal>
              <h1
                className="font-serif font-light text-foreground leading-[0.94] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                <RevealText text="AUREL —" />
                <br />
                <span className="italic text-foreground/90">
                  <RevealText text="Premium DTC" delay={0.12} />
                </span>
                <br />
                <RevealText text="Commerce Concept" delay={0.24} />
              </h1>
            </div>

            <div className="md:col-span-4 md:pt-4 flex flex-col gap-8">
              <Reveal delay={0.3}>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  A complete ecommerce experience designed and engineered by
                  Aditya — brand storytelling, product education, personalised
                  discovery and conversion-focused UX, built as one coherent
                  system.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <Link
                  href="/"
                  className="group inline-flex h-12 items-center justify-center border border-foreground/40 px-7 text-xs uppercase tracking-[0.16em] text-foreground transition-all hover:border-foreground hover:bg-foreground/5"
                >
                  View live site
                  <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          01 / OBJECTIVE
          ============================================================ */}
      <section className="border-y border-border py-16 md:py-28">
        <div className="container-aurel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground">
                  01 / Objective
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.1}>
                <h2
                  className="font-serif font-light text-foreground leading-[1.05] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2rem, 4.2vw, 3.5rem)" }}
                >
                  Build a premium skincare commerce experience that combines
                  brand storytelling, product education, personalised discovery
                  and conversion-focused ecommerce UX — as one system.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
                  The brief was not a storefront. It was an end-to-end commerce
                  experience: art direction, copy, interface architecture,
                  product discovery, cart, and motion — designed and engineered
                  to feel like a single, considered object rather than a stack
                  of pages stitched together.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 / DESIGNED — capability grid
          ============================================================ */}
      <section className="py-16 md:py-28">
        <div className="container-aurel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 mb-14 md:mb-20">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground">
                  02 / Designed
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.1}>
                <p
                  className="font-serif font-light text-foreground leading-[1.1] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.625rem, 3vw, 2.5rem)" }}
                >
                  Twelve disciplines, one design system. Every surface of the
                  experience was specified, prototyped and shipped.
                </p>
              </Reveal>
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
            {CAPABILITIES.map((c) => (
              <Reveal
                key={c.n}
                as="div"
                className="group relative border-b border-border sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 px-0 py-8 md:px-6 md:py-10 md:[&:nth-child(3n+1)]:pl-0"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-mono text-muted-foreground">{c.n}</span>
                  <span className="h-px w-8 bg-border" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-light text-foreground leading-snug mb-3">
                  {c.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
              </Reveal>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ============================================================
          03 / ENGINEERING — technical spec grid
          ============================================================ */}
      <section className="border-y border-border py-16 md:py-28 bg-bone-deep">
        <div className="container-aurel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 mb-12 md:mb-16">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground">
                  03 / Engineering
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.1}>
                <h2
                  className="font-serif font-light text-foreground leading-[1.08] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2rem, 4.2vw, 3.5rem)" }}
                >
                  A modern, type-safe, statically-exportable stack.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Engineered for performance, accessibility and longevity — no
                  legacy patterns, no client-side routing debt, no unnecessary
                  runtime dependencies.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.15}>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-border">
              {STACK.map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between gap-6 border-b border-border py-5 md:py-6 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 md:px-6 md:[&:nth-child(3n+1)]:pl-0"
                >
                  <dt className="text-mono text-muted-foreground">{row.k}</dt>
                  <dd className="font-serif text-base md:text-lg font-light text-foreground text-right">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          FEATURE HIGHLIGHTS — placeholder visual blocks
          ============================================================ */}
      <section className="py-16 md:py-28">
        <div className="container-aurel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 mb-14 md:mb-20">
            <div className="md:col-span-4">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground">
                  Highlights
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.1}>
                <h2
                  className="font-serif font-light text-foreground leading-[1.08] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2rem, 4.2vw, 3.5rem)" }}
                >
                  Six surfaces of the experience.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                  Selected views from the production interface. In a live
                  engagement these would be presented as full-bleed captures;
                  here they are represented as labeled plates.
                </p>
              </Reveal>
            </div>
          </div>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {HIGHLIGHTS.map((h) => (
              <Reveal key={h.label} as="div">
                <figure className="group">
                  <div className="relative aspect-video w-full overflow-hidden bg-muted border border-border">
                    <img
                      src={img(h.image)}
                      alt={`AUREL ${h.label} screenshot`}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-end p-5 md:p-6">
                      <span className="font-serif text-2xl md:text-3xl font-light text-background leading-tight">
                        {h.label}
                      </span>
                    </div>
                    <span className="absolute top-4 right-4 text-mono text-background/70">
                      /{h.label.toLowerCase().split(" ")[0]}
                    </span>
                  </div>
                  <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {h.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ============================================================
          METRICS — 4-column stat row
          ============================================================ */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="container-aurel">
          <Reveal>
            <p className="text-eyebrow text-muted-foreground mb-10">
              Scope · At a glance
            </p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-10 border-t border-border pt-12">
            {METRICS.map((s, i) => (
              <Reveal key={s.l} delay={0.08 * i}>
                <div>
                  <p className="font-serif font-light tracking-tight text-foreground"
                    style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)", lineHeight: 0.95 }}
                  >
                    {s.v}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground leading-relaxed">
                    {s.l}
                  </p>
                </div>
              </Reveal>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — dark editorial
          ============================================================ */}
      <section className="bg-foreground text-background py-24 md:py-40">
        <div className="container-aurel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10">
            <div className="md:col-span-8">
              <Reveal>
                <p className="text-eyebrow text-background/60 mb-7">
                  Engagement
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2
                  className="font-serif font-light text-background leading-[1.02] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(2.25rem, 5.5vw, 5rem)" }}
                >
                  Need this level of experience for your brand?
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-background/70">
                  I work with a small number of brands each year on end-to-end
                  commerce experiences — from art direction and interface
                  architecture through to production engineering. If your
                  product deserves a storefront that earns attention rather
                  than asks for it, let&rsquo;s talk.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-4 flex md:items-end md:justify-end">
              <Reveal delay={0.3}>
                <CaseStudyCtaButton
                  url={PROJECT_CONTACT_URL}
                  label="Start a project"
                />
              </Reveal>
            </div>
          </div>

          {/* Footer metadata strip inside dark section */}
          <div className="mt-20 md:mt-32 pt-8 border-t border-background/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-mono text-background/50">
            <span>AUREL · Case Study · For prospective clients</span>
            <span className="hidden md:block">
              Designed &amp; engineered by Aditya
            </span>
            <Link
              href="/"
              className="link-underline text-background/70 hover:text-background transition-colors"
            >
              Return to AUREL
              <ArrowRight className="inline ml-1.5 h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
