import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Your bag",
  description:
    "Review your AUREL selections, adjust quantities, and proceed to checkout. Concept showcase — no payment processed.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartView />;
}
