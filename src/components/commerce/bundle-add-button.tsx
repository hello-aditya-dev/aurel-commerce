"use client";

import { useCart } from "@/lib/commerce/cart-store";
import { track } from "@/lib/analytics";
import type { Bundle } from "@/types/commerce";
import { formatPrice } from "@/lib/commerce/provider";

export function BundleAddButton({
  bundle,
  className,
}: {
  bundle: Bundle;
  className?: string;
}) {
  const addBundle = useCart((s) => s.addBundle);
  const openCart = useCart((s) => s.open);

  return (
    <button
      onClick={() => {
        track("add_bundle", { slug: bundle.slug, value: bundle.price, source: "system_page" });
        addBundle(bundle.slug, bundle.name, bundle.price, bundle.image, bundle.productSlugs);
        openCart();
      }}
      className={className}
    >
      Add {bundle.name} — {formatPrice(bundle.price)}
    </button>
  );
}
