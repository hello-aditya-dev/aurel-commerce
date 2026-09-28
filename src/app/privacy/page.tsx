import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "AUREL privacy policy." };

export default function PrivacyPage() {
  return (
    <div className="container-aurel py-16 md:py-24 max-w-3xl">
      <p className="text-eyebrow text-muted-foreground mb-5">Legal</p>
      <h1 className="font-serif text-editorial mb-8">Privacy.</h1>
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <p>AUREL is a fictional concept brand created for design and development demonstration. This privacy policy is illustrative content.</p>
        <p>No personal data is collected by this website. The shopping cart and skin diagnostic use local browser storage only; no data is transmitted to a server.</p>
        <p>Analytics events (product_view, add_to_cart, etc.) are dispatched in the browser as custom events. No third-party analytics provider is wired up in this demo.</p>
        <p>If a real Shopify backend were connected, the Shopify privacy policy and GDPR/CCPA disclosures would apply to any data transmitted to Shopify.</p>
        <p className="text-xs font-mono uppercase tracking-wider pt-6 border-t border-border">
          Last updated: {new Date().getFullYear()} · AUREL fictional concept brand
        </p>
      </div>
    </div>
  );
}
