"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

type ProductDetailActionsProps = {
  product: Product;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? "");
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  return (
    <div className="mt-8 space-y-4 border-t border-white/[0.06] pt-8">
      {product.variants.length > 1 ? (
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
            Size
          </span>
          <select
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-[var(--soft-ivory)] outline-none focus:border-[var(--ocean-blue)]/50"
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.sizeLabel} — ${variant.price.toFixed(2)} ({variant.sku})
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="btn-primary rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
          onClick={() => addItem(product, selectedVariant?.id)}
        >
          {t("common.addToCart")}
        </button>
        <Link
          href="/cart"
          className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.08em]"
        >
          {t("nav.cart")}
        </Link>
      </div>

      <Link
        href="/coa"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ocean-blue)]"
      >
        View COA Library
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
