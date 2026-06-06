"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/types/cart";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

type CartLineItemProps = {
  line: CartLine;
};

export function CartLineItem({ line }: CartLineItemProps) {
  const { t } = useLanguage();
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = line.price * line.quantity;

  return (
    <article className="glass-card flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      <Link
        href={`/products/${line.slug}`}
        className="relative mx-auto flex h-28 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/[0.03] sm:mx-0"
      >
        <OptimizedImage
          src={line.image}
          alt=""
          width={96}
          height={112}
          sizes="96px"
          className="h-full w-full object-contain p-2"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${line.slug}`}
          className="font-display text-lg font-semibold text-[var(--soft-ivory)] hover:text-[var(--ocean-blue)]"
        >
          {line.displayName}
        </Link>
        <p className="mt-1 text-sm text-[var(--soft-ivory)]/50">
          {line.sizeLabel} · {t("cart.sku")} {line.sku}
        </p>
        <p className="mt-2 font-display text-base text-[var(--luxury-gold)]">
          ${line.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-col sm:items-end">
        <div className="flex items-center gap-2">
          <span className="sr-only">{t("cart.quantity")}</span>
          <button
            type="button"
            onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
            className="nav-icon-btn h-9 w-9 rounded-full"
            aria-label={`Decrease quantity for ${line.displayName}`}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2rem] text-center text-sm font-semibold tabular-nums">
            {line.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
            className="nav-icon-btn h-9 w-9 rounded-full"
            aria-label={`Increase quantity for ${line.displayName}`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--soft-ivory)]/40">
            {t("cart.lineTotal")}
          </p>
          <p className="font-display text-lg font-semibold text-[var(--soft-ivory)]">
            ${lineTotal.toFixed(2)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => removeItem(line.variantId)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--soft-ivory)]/45 transition-colors hover:text-red-400"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          {t("cart.remove")}
        </button>
      </div>
    </article>
  );
}
