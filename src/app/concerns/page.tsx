import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

const CONCERNS = [
  { slug: "barrier", label: "Barrier", blurb: "Reinforce the protective lipid layer with ceramides, panthenol and ectoin." },
  { slug: "dryness", label: "Dryness", blurb: "Layer humectants, emollients and overnight occlusion." },
  { slug: "sensitivity", label: "Sensitivity", blurb: "Buffered actives and barrier restoration for reactive skin." },
  { slug: "dark-spots", label: "Dark spots", blurb: "Vitamin C, retinal and niacinamide for visibly even tone." },
  { slug: "texture", label: "Texture", blurb: "Overnight retinal and gentle exfoliation for smoother surface." },
  { slug: "fine-lines", label: "Fine lines", blurb: "Peptide and retinal protocol to visibly soften lines." },
  { slug: "dullness", label: "Dullness", blurb: "Antioxidant defence and exfoliation for visible radiance." },
  { slug: "breakouts", label: "Breakouts", blurb: "Niacinamide, gentle cleansing and barrier maintenance." },
];

export const metadata = {
  title: "Concerns",
  description: "Browse AUREL products by skin concern.",
};

export default function ConcernsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <p className="text-eyebrow text-muted-foreground mb-5">By concern</p>
          <h1
            className="font-serif font-light leading-[1] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Skin, mapped to its
            <br />
            <span className="italic text-muted-foreground">real concerns.</span>
          </h1>
        </div>
      </section>
      <div className="container-aurel py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {CONCERNS.map((c, i) => (
            <Reveal key={c.slug} delay={0.04 * i}>
              <Link
                href={`/concerns/${c.slug}`}
                className="group bg-background p-8 md:p-10 block hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span className="text-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    →
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl mt-4 group-hover:italic transition-all">
                  {c.label}
                </h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-sm">
                  {c.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
