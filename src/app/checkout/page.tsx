import type { Metadata } from "next";
import { CheckoutView } from "@/components/cart/checkout-view";

export const metadata: Metadata = {
  title: "Preview checkout",
  description:
    "AUREL checkout demonstration. No payment is processed and no order is created. Concept showcase.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
