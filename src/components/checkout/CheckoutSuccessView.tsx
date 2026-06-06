"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type StoredOrder = {
  orderNumber: string;
  total: string;
  currency: string;
  paymentUrl: string;
};

export function CheckoutSuccessView() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [storedOrder, setStoredOrder] = useState<StoredOrder | null>(null);

  const orderNumber = searchParams.get("order");
  const total = searchParams.get("total");
  const currency = searchParams.get("currency") ?? "USD";

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("pepticaribe_last_order");
      if (raw) {
        setStoredOrder(JSON.parse(raw) as StoredOrder);
        sessionStorage.removeItem("pepticaribe_last_order");
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const paymentUrl = storedOrder?.paymentUrl;
  const displayOrder = orderNumber ?? storedOrder?.orderNumber;
  const displayTotal = total ?? storedOrder?.total;
  const displayCurrency = currency ?? storedOrder?.currency ?? "USD";

  if (!displayOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <p className="text-sm text-[var(--soft-ivory)]/55">No order found.</p>
        <Link href="/products" className="btn-primary mt-6 inline-flex rounded-full px-8 py-3.5 text-sm font-bold uppercase">
          {t("checkout.continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:py-24 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15">
        <CheckCircle2 className="h-8 w-8 text-[var(--ocean-blue)]" aria-hidden />
      </div>

      <h1 className="font-display mt-8 text-3xl font-bold text-[var(--soft-ivory)]">
        {t("checkout.successTitle")}
      </h1>
      <p className="section-caption mx-auto mt-4 max-w-md">{t("checkout.successDescription")}</p>

      <div className="glass-card mx-auto mt-8 max-w-md rounded-xl p-6 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--soft-ivory)]/45">
          {t("checkout.orderNumber")}
        </p>
        <p className="font-display mt-2 text-2xl font-bold text-[var(--luxury-gold)]">#{displayOrder}</p>
        {displayTotal ? (
          <p className="mt-3 text-sm text-[var(--soft-ivory)]/65">
            Total: {displayCurrency} ${Number(displayTotal).toFixed(2)}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {paymentUrl ? (
          <a
            href={paymentUrl}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
          >
            {t("checkout.payNow")}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        ) : null}
        <Link
          href="/products"
          className="btn-outline-gold inline-flex rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.08em]"
        >
          {t("checkout.continueShopping")}
        </Link>
      </div>

      <p className="mx-auto mt-6 max-w-md text-xs text-[var(--soft-ivory)]/40">
        {t("checkout.paymentRedirectNote")}
      </p>
    </div>
  );
}
