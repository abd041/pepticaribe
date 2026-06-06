"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

type CartSummaryProps = {
  checkoutHref?: string;
  showCheckout?: boolean;
};

export function CartSummary({ checkoutHref = "/checkout", showCheckout = true }: CartSummaryProps) {
  const { t } = useLanguage();
  const { subtotal, itemCount } = useCart();

  return (
    <aside className="glass-card rounded-xl p-6 lg:sticky lg:top-24">
      <h2 className="font-display text-lg font-bold text-[var(--soft-ivory)]">{t("cart.subtotal")}</h2>
      <p className="mt-3 font-display text-3xl font-bold text-[var(--luxury-gold)]">
        ${subtotal.toFixed(2)}
      </p>
      <p className="mt-2 text-xs text-[var(--soft-ivory)]/45">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>

      <p className="mt-5 text-xs leading-relaxed text-[var(--soft-ivory)]/45">{t("cart.researchNote")}</p>

      {showCheckout ? (
        <Link
          href={checkoutHref}
          className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
        >
          {t("cart.proceedCheckout")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : null}

      <Link
        href="/products"
        className="btn-outline-gold mt-3 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.08em]"
      >
        <ShoppingBag className="h-3.5 w-3.5" aria-hidden />
        {t("cart.continueShopping")}
      </Link>
    </aside>
  );
}
