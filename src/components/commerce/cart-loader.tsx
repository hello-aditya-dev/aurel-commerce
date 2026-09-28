"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/commerce/cart-store";
import { decodeCartFromShare } from "@/lib/commerce/share-cart";
import { getProductBySlug, getBundleBySlug } from "@/lib/commerce/provider";
import { toast } from "sonner";

// Reads ?cart=... from URL on first mount and pre-fills the cart.
// Mounted once in the SiteShell. Suspense-wrapped at the call site
// (see site-shell.tsx).
export function CartLoader() {
  const params = useSearchParams();
  const hasImported = React.useRef(false);
  const add = useCart((s) => s.add);
  const addBundle = useCart((s) => s.addBundle);

  React.useEffect(() => {
    if (hasImported.current) return;
    const raw = params.get("cart");
    if (!raw) return;
    hasImported.current = true;

    const decoded = decodeCartFromShare(raw);
    if (decoded.length === 0) return;

    let imported = 0;
    let bundles = 0;
    for (const d of decoded) {
      if (d.isBundle) {
        const b = getBundleBySlug(d.slug);
        if (b) {
          addBundle(b.slug, b.name, b.price, b.image, b.productSlugs);
          bundles++;
        }
      } else {
        const p = getProductBySlug(d.slug);
        if (p) {
          add(p, { variant: d.variant, quantity: d.quantity });
          imported++;
        }
      }
    }

    if (imported > 0 || bundles > 0) {
      const total = imported + bundles;
      toast(`Imported ${total} ${total === 1 ? "item" : "items"} from shared cart`, {
        description: "Your bag has been pre-filled. Adjust quantities as needed.",
      });
      // Strip the cart query param to avoid re-importing on refresh
      const url = new URL(window.location.href);
      url.searchParams.delete("cart");
      window.history.replaceState({}, "", url.toString());
    }
  }, [params, add, addBundle]);

  return null;
}
