"use client";

import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { formatUsd } from "@/lib/pricing";
import {
  freeShippingProgress,
  freeShippingRemaining,
  hasFreeShipping,
} from "@/lib/cartShipping";
import { formatTranslation } from "@/lib/i18n-format";

type CartSummaryProps = {
  checkoutHref?: string;
  showCheckout?: boolean;
  showContinueShopping?: boolean;
};

export function CartSummary({
  checkoutHref = "/checkout",
  showCheckout = true,
  showContinueShopping = true,
}: CartSummaryProps) {
  const { t } = useLanguage();
  const { subtotal, itemCount } = useCart();
  const unlocked = hasFreeShipping(subtotal);
  const remaining = freeShippingRemaining(subtotal);
  const progress = freeShippingProgress(subtotal);

  return (
    <aside className="cart-summary-panel" aria-label={t("cart.orderSummary")}>
      <p className="cart-summary-eyebrow">{t("cart.orderSummary")}</p>
      <p className="cart-summary-subtotal">{formatUsd(subtotal)}</p>
      <p className="cart-summary-items">
        {itemCount} {itemCount === 1 ? t("cart.item") : t("cart.items")}
      </p>

      <div className={`cart-shipping-progress${unlocked ? " is-unlocked" : ""}`}>
        <p className="cart-shipping-progress-label">
          <Truck className="h-4 w-4" aria-hidden />
          {unlocked
            ? t("cart.freeShippingUnlocked")
            : formatTranslation(t, "cart.freeShippingAway", {
                amount: formatUsd(remaining),
              })}
        </p>
        <div
          className="cart-shipping-progress-bar"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t("cart.freeShippingProgress")}
        >
          <div
            className="cart-shipping-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="cart-summary-trust">
        <li>
          <Lock className="h-3 w-3" aria-hidden />
          {t("cart.trustSecure")}
        </li>
        <li>
          <ShieldCheck className="h-3 w-3" aria-hidden />
          {t("hero.trustIso")}
        </li>
      </ul>

      <div className="cart-summary-cta">
        {showCheckout ? (
          <Link href={checkoutHref} className="btn-primary cart-summary-checkout">
            {t("cart.proceedCheckout")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}

        {showContinueShopping ? (
          <Link href="/products" className="btn-outline-gold cart-summary-continue">
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
            {t("cart.continueShopping")}
          </Link>
        ) : null}
      </div>

      <p className="cart-summary-ruo">{t("cart.researchNote")}</p>
    </aside>
  );
}
