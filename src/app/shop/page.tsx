import { CollectionGrid } from "@/components/commerce/collection-grid";
import { Reveal } from "@/components/motion/reveal";

export const metadata = {
  title: "Shop All — AUREL",
  description: "The complete AUREL catalogue. Eight products engineered as one coherent system.",
};

export default function ShopPage() {
  return (
    <>
      {/* Editorial header */}
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <Reveal>
                <p className="text-eyebrow text-muted-foreground mb-5">The catalogue</p>
                <h1
                  className="font-serif font-light leading-[1] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                >
                  Eight products,
                  <br />
                  <span className="italic text-muted-foreground">one system.</span>
                </h1>
              </Reveal>
            </div>
            <div className="md:col-span-4 md:col-start-9 md:pt-3">
              <Reveal delay={0.15}>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Every AUREL product is formulated to layer with every other. No filler, no
                  contradiction, no tokens. Filter by concern, skin type or step.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CollectionGrid />
    </>
  );
}
