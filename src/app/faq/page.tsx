import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about AUREL — orders, subscriptions, shipping, formulations.",
};

const FAQS: { section: string; items: { q: string; a: string }[] }[] = [
  {
    section: "Orders & shipping",
    items: [
      { q: "How long will my order take to arrive?", a: "Standard orders ship within 1–2 business days. US delivery is typically 3–5 business days. International shipping varies by destination." },
      { q: "Do you offer complimentary shipping?", a: "Yes — complimentary standard shipping on all orders over $75. Orders below $75 ship at a flat rate of $6." },
      { q: "Can I change or cancel my order after placing it?", a: "Within 60 minutes of placing an order, contact us via /contact and we will do our best to amend or cancel. After 60 minutes the order enters our fulfilment queue." },
      { q: "Do you ship internationally?", a: "Yes, to 38 countries. International duties and taxes are calculated at checkout." },
    ],
  },
  {
    section: "Returns",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 30 days of delivery on unopened products, and on opened products up to 50% used if you have experienced a reaction. See /returns for full terms." },
      { q: "How do I start a return?", a: "Visit /contact with your order number and a brief reason. We will issue a prepaid return label for orders within the US." },
    ],
  },
  {
    section: "Subscriptions",
    items: [
      { q: "How does Subscribe & Save work?", a: "Subscribe & Save delivers your chosen products every 8 weeks at 15% off the one-time price. You can edit, skip or cancel at any time from your account." },
      { q: "Can I change the delivery frequency?", a: "Yes. Choose from 4, 6, 8 or 12 weeks. Adjust anytime before your next billing date." },
      { q: "How do I cancel my subscription?", a: "From your account, select the subscription and choose Cancel. No fees, no retention calls." },
    ],
  },
  {
    section: "Formulation",
    items: [
      { q: "Are AUREL products fragrance-free?", a: "Yes. Every AUREL product is formulated without added fragrance, including essential oils. We do not use masking fragrance either." },
      { q: "Are the products vegan and cruelty-free?", a: "Yes. All AUREL products are vegan and cruelty-free. We do not test on animals and do not sell in markets that require animal testing." },
      { q: "Are they safe during pregnancy?", a: "Most AUREL products are compatible with pregnancy and breastfeeding. The exception is Retinal Renewal 0.1, which should be avoided. Consult your physician for personal guidance." },
      { q: "What is the shelf life once opened?", a: "Most products are best within 12 months of opening. C15 Antioxidant Serum is best within 3 months due to the nature of L-ascorbic acid." },
    ],
  },
  {
    section: "Routine",
    items: [
      { q: "How do I build a routine?", a: "Take the Skin Diagnostic at /diagnostic. It returns a personalised AM and PM protocol from the AUREL catalogue based on your concerns, skin type, reactivity, routine time and budget." },
      { q: "Can I mix AUREL with other brands?", a: "Yes, but AUREL is engineered as a coherent system. The pairings and complete-routine suggestions on each product page show which products work together." },
      { q: "How do I introduce retinal?", a: "Start twice weekly. Apply to clean, dry skin in the PM. Layer Peptide Recovery Serum behind it for additional buffering. Always use SPF the next morning." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-aurel py-14 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="text-eyebrow text-muted-foreground mb-5">Help</p>
              <h1
                className="font-serif font-light leading-[1] tracking-[-0.025em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Common questions.
              </h1>
            </div>
            <div className="md:col-span-5 md:col-start-8 md:pt-3">
              <p className="text-base text-muted-foreground leading-relaxed">
                Can't find what you're looking for?{" "}
                <Link href="/contact" className="link-underline text-foreground">Contact our team</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-aurel py-12 md:py-20 max-w-3xl">
        {FAQS.map((group, gi) => (
          <Reveal key={group.section} delay={0.03 * gi}>
            <div id={group.section.toLowerCase().replace(/[^a-z]+/g, "-")} className="mb-12">
              <p className="text-eyebrow text-muted-foreground mb-5">{group.section}</p>
              <Accordion type="single" collapsible className="w-full">
                {group.items.map((f, i) => (
                  <AccordionItem key={i} value={`${gi}-${i}`}>
                    <AccordionTrigger className="font-serif text-lg md:text-xl text-left hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        ))}

        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            AUREL is a fictional concept brand. FAQ content is demonstration material.
          </p>
        </div>
      </div>
    </>
  );
}
