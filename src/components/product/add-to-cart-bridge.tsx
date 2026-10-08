"use client";

import * as React from "react";
import { useCart } from "@/lib/commerce/cart-store";
import { track } from "@/lib/analytics";
import { PurchasePanel } from "./purchase-panel";
import type { Product } from "@/types/commerce";

// Wraps the PurchasePanel so the PDP can stay a server component while
// add-to-cart remains fully interactive client-side.
export function AddToCartBridge({
  product,
}: {
  product: Product;
}) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);

  const handleAdd = (variant: "one-time" | "subscription", qty: number) => {
    track("add_to_cart", {
      slug: product.slug,
      variant,
      qty,
      source: "pdp",
    });
    add(product, { variant, quantity: qty });
    openCart();
  };

  return (
    <PurchasePanel
      price={product.price}
      size={product.size}
      subscriptionEligible={product.subscriptionEligible}
      rating={product.rating}
      reviewCount={product.reviewCount}
      onAdd={handleAdd}
    />
  );
}
