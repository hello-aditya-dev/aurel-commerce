import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms", description: "AUREL terms of service." };

export default function TermsPage() {
  return (
    <div className="container-aurel py-16 md:py-24 max-w-3xl">
      <p className="text-eyebrow text-muted-foreground mb-5">Legal</p>
      <h1 className="font-serif text-editorial mb-8">Terms.</h1>
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <p>AUREL is a fictional concept brand. These terms are illustrative demonstration content.</p>
        <p>Product names, prices, reviews, statistics and clinical claims shown on this website are demonstration content for design and development purposes only. They do not represent real products, real medical advice, or real endorsements.</p>
        <p>The demo checkout does not process real payments or collect real payment information. No orders are fulfilled.</p>
        <p>If a real Shopify backend were connected, the Shopify terms of service and the terms of the connected payment provider would apply.</p>
        <p className="text-xs font-mono uppercase tracking-wider pt-6 border-t border-border">
          Last updated: {new Date().getFullYear()} · AUREL fictional concept brand
        </p>
      </div>
    </div>
  );
}
