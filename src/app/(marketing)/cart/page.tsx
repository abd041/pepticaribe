import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your PeptiCaribe research cart before checkout.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartView />;
}
