"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";

export function CartView() {
  const { t } = useLanguage();
  const { items, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--soft-ivory)]/50">{t("cart.updating")}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.04]">
          <ShoppingBag className="h-7 w-7 text-[var(--ocean-blue)]" aria-hidden />
        </div>
        <h1 className="font-display mt-8 text-3xl font-bold text-[var(--soft-ivory)]">
          {t("cart.emptyTitle")}
        </h1>
        <p className="section-caption mx-auto mt-4 max-w-md">{t("cart.emptyDescription")}</p>
        <Link
          href="/products"
          className="btn-primary mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
        >
          {t("cart.browseProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/products"
        className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--soft-ivory)]/55 transition-colors hover:text-[var(--ocean-blue)]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        {t("cart.continueShopping")}
      </Link>

      <p className="premium-eyebrow-gold mt-8">{t("nav.cart")}</p>
      <h1 className="font-display mt-3 text-3xl font-bold text-[var(--soft-ivory)] sm:text-4xl">
        {t("cart.title")}
      </h1>
      <p className="section-caption mt-4 max-w-2xl">{t("cart.description")}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="space-y-4">
          {items.map((line) => (
            <CartLineItem key={line.variantId} line={line} />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
