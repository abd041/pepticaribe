import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import "@/app/cart-page.css";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your PeptiCaribe research cart before checkout.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction cart-page-shell relative isolate min-h-dvh">
      <CartView />
    </div>
  );
}
