"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { formatUsd } from "@/lib/pricing";

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
      <div className="checkout-page relative min-h-dvh">
        <MarketingCanvasBackdrop>
          <div className="checkout-page-content">
            <section className="checkout-hero relative overflow-hidden">
              <SectionAtmosphere
                variant="products"
                showTopTransition={false}
                showBottomTransition={false}
                className="checkout-hero-atmosphere bg-transparent"
              >
                <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                  <div className="checkout-success">
                    <p className="text-sm text-[var(--text-secondary)]">{t("checkout.noOrderFound")}</p>
                    <Link href="/products" className="btn-primary mt-6 inline-flex rounded-full px-8 py-3.5 text-sm font-bold uppercase">
                      {t("checkout.continueShopping")}
                    </Link>
                  </div>
                </div>
              </SectionAtmosphere>
            </section>
          </div>
        </MarketingCanvasBackdrop>
      </div>
    );
  }

  return (
    <div className="checkout-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="checkout-page-content">
          <section className="checkout-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="checkout-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="checkout-success">
                  <div className="checkout-success-icon">
                    <CheckCircle2 className="h-8 w-8" aria-hidden />
                  </div>

                  <h1 className="checkout-success-title">{t("checkout.successTitle")}</h1>
                  <p className="section-caption mx-auto mt-4 max-w-md text-[14px] sm:text-[15px]">
                    {t("checkout.successDescription")}
                  </p>

                  <div className="checkout-success-card">
                    <p className="technical-label font-semibold">{t("checkout.orderNumber")}</p>
                    <p className="checkout-success-order">#{displayOrder}</p>
                    {displayTotal ? (
                      <p className="mt-3 text-sm text-[var(--text-secondary)]">
                        {t("checkout.totalLabel")}: {displayCurrency}{" "}
                        {formatUsd(Number(displayTotal))}
                      </p>
                    ) : null}
                  </div>

                  <div className="checkout-success-actions">
                    {paymentUrl ? (
                      <a href={paymentUrl} className="btn-primary">
                        {t("checkout.payNow")}
                        <ExternalLink className="h-4 w-4" aria-hidden />
                      </a>
                    ) : null}
                    <Link href="/products" className="btn-outline-gold">
                      {t("checkout.continueShopping")}
                    </Link>
                  </div>

                  <p className="checkout-payment-note mx-auto mt-6 max-w-md">
                    {t("checkout.paymentRedirectNote")}
                  </p>
                </div>
              </div>
            </SectionAtmosphere>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
