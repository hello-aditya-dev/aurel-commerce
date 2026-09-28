import type { Metadata } from "next";
import { CompatibilityChecker } from "@/components/product/compatibility-checker";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Compatibility Check",
  description: "Check whether two AUREL products can be layered in the same routine step.",
};

export default function CompatibilityPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">Layering check</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Do these
                <br />
                <span className="italic text-muted-foreground">layer?</span>
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <p className="text-base text-muted-foreground leading-relaxed">
                Select two AUREL products to see if they can be layered in the same routine step. The checker cross-references key actives in each formula.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CompatibilityChecker />
    </>
  );
}
