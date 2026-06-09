import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSuccessView } from "@/components/checkout/CheckoutSuccessView";
import "@/app/checkout-page.css";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: { index: false, follow: false },
};

function CheckoutSuccessFallback() {
  return (
    <div className="checkout-page relative min-h-dvh">
      <div className="checkout-loading">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 py-16 text-center text-sm text-[var(--text-muted)]">
          Loading…
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction checkout-page-shell relative isolate min-h-dvh">
      <Suspense fallback={<CheckoutSuccessFallback />}>
        <CheckoutSuccessView />
      </Suspense>
    </div>
  );
}
