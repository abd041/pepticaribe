import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutSuccessView } from "@/components/checkout/CheckoutSuccessView";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-[var(--soft-ivory)]/50">Loading…</div>}>
      <CheckoutSuccessView />
    </Suspense>
  );
}
