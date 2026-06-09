"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

function CartLoading() {
  const { t } = useLanguage();

  return (
    <div className="cart-loading">
      <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <p className="cart-eyebrow text-center">{t("nav.cart")}</p>
        <div className="cart-layout mt-8">
          <div className="cart-lines-list">
            <div className="cart-skeleton-line" />
            <div className="cart-skeleton-line" />
          </div>
          <div className="cart-skeleton-summary" />
        </div>
      </div>
    </div>
  );
}

function CartEmpty() {
  const { t } = useLanguage();

  return (
    <section className="cart-empty" aria-label={t("cart.emptyTitle")}>
      <div className="cart-empty-icon">
        <ShoppingBag className="h-8 w-8" strokeWidth={1.5} aria-hidden />
      </div>
      <h1 className="cart-empty-title">{t("cart.emptyTitle")}</h1>
      <p className="section-caption mx-auto mt-4 max-w-md text-[14px] sm:text-[15px]">
        {t("cart.emptyDescription")}
      </p>
      <Link href="/products" className="btn-primary cart-empty-cta">
        {t("cart.browseProducts")}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </section>
  );
}

export function CartView() {
  const { t } = useLanguage();
  const { items, hydrated, itemCount } = useCart();

  if (!hydrated) {
    return (
      <div className="cart-page relative min-h-dvh">
        <MarketingCanvasBackdrop>
          <div className="cart-page-content">
            <CartLoading />
          </div>
        </MarketingCanvasBackdrop>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page relative min-h-dvh">
        <MarketingCanvasBackdrop>
          <div className="cart-page-content">
            <section className="cart-hero relative overflow-hidden">
              <SectionAtmosphere
                variant="products"
                showTopTransition={false}
                showBottomTransition={false}
                className="cart-hero-atmosphere bg-transparent"
              >
                <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                  <CartEmpty />
                </div>
              </SectionAtmosphere>
            </section>
          </div>
        </MarketingCanvasBackdrop>
      </div>
    );
  }

  return (
    <div className="cart-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="cart-page-content">
          <section className="cart-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="cart-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="cart-hero-copy mx-auto max-w-2xl">
                  <p className="cart-eyebrow">{t("cart.eyebrow")}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{t("cart.title")}</span>
                  </h1>
                  <p className="section-caption mx-auto mt-3 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {t("cart.description")}
                  </p>
                </div>

                <ul className="cart-trust" aria-label={t("hero.trustLabel")}>
                  <li>
                    <Truck className="h-3.5 w-3.5" aria-hidden />
                    <span>{t("hero.trustShipping")}</span>
                  </li>
                  <li>
                    <Lock className="h-3.5 w-3.5" aria-hidden />
                    <span>{t("cart.trustSecure")}</span>
                  </li>
                  <li>
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    <span>{t("hero.trustIso")}</span>
                  </li>
                </ul>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="cart-main" aria-label={t("cart.title")}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <Link href="/products" className="cart-back group">
                <ArrowLeft
                  className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden
                />
                {t("cart.continueShopping")}
              </Link>

              <div className="cart-layout">
                <div className="cart-lines">
                  <div className="cart-lines-header">
                    <p className="cart-lines-count">
                      {itemCount} {itemCount === 1 ? t("cart.item") : t("cart.items")}
                    </p>
                  </div>
                  <div className="cart-lines-list">
                    {items.map((line) => (
                      <CartLineItem key={line.variantId} line={line} />
                    ))}
                  </div>
                </div>

                <CartSummary />
              </div>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
