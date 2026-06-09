import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import "@/app/cart-page.css";
import "@/app/checkout-page.css";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your PeptiCaribe research order securely via WooCommerce.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction checkout-page-shell relative isolate min-h-dvh">
      <CheckoutView />
    </div>
  );
}
