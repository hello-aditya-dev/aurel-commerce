import Link from "next/link";
import { Wordmark } from "./wordmark";
import { NewsletterForm } from "@/components/commerce/newsletter-form";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Barrier Repair", href: "/collections/barrier-repair" },
      { label: "Brightening", href: "/collections/brightening" },
      { label: "Renewal", href: "/collections/renewal" },
      { label: "Systems", href: "/collections/systems" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our approach", href: "/approach" },
      { label: "Ingredients", href: "/ingredients" },
      { label: "Journal", href: "/journal" },
      { label: "Skin diagnostic", href: "/diagnostic" },
      { label: "Build a routine", href: "/build-routine" },
      { label: "Compare products", href: "/compare" },
      { label: "Recently viewed", href: "/recently-viewed" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Case study", href: "/case-study" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/faq#shipping" },
      { label: "Returns", href: "/faq#returns" },
      { label: "Subscriptions", href: "/faq#subscriptions" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-background">
      {/* Newsletter band */}
      <div className="container-aurel py-16 md:py-24 border-b border-background/15">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] items-end">
          <div>
            <p className="text-eyebrow opacity-60">Notes on better skin</p>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05] tracking-[-0.02em]">
              Research, routines and product education — delivered occasionally.
            </h2>
          </div>
          <div className="md:pb-2">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>

      {/* Link grid */}
      <div className="container-aurel py-16">
        <div className="grid grid-cols-2 md:grid-cols-[1.5fr_repeat(4,1fr)] gap-10">
          <div>
            <Wordmark className="text-background text-lg" />
            <p className="text-sm text-background/70 mt-5 max-w-xs leading-relaxed">
              Clinical skincare for stressed modern skin. Barrier-first formulation,
              restrained routines, considered design.
            </p>
            <p className="text-mono text-background/40 mt-6">
              AR-HQ · Stockholm / Seoul / NYC
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-eyebrow opacity-60 mb-4">{col.title}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-background/75 hover:text-background transition-colors link-underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/15">
        <div className="container-aurel py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-background/60">
          <p className="font-mono tracking-wider">
            © {new Date().getFullYear()} AUREL · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono uppercase tracking-wider">EN / USD $</span>
            <span className="opacity-30">|</span>
            <a href="#" className="hover:text-background transition-colors">Instagram</a>
            <a href="#" className="hover:text-background transition-colors">TikTok</a>
            <a href="#" className="hover:text-background transition-colors">YouTube</a>
          </div>
        </div>
        <div className="container-aurel pb-8">
          <p className="text-[0.6875rem] leading-relaxed text-background/40 max-w-3xl">
            AUREL is a fictional concept brand. Product names, reviews, statistics and clinical
            claims shown on this website are demonstration content for design and development
            purposes only and do not represent real medical advice or endorsements.
          </p>
        </div>
      </div>
    </footer>
  );
}
