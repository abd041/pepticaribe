"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductVariantPicker } from "@/components/products/ProductVariantPicker";

type ProductDetailActionsProps = {
  product: Product;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { t } = useLanguage();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? "");
  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  return (
    <div className="mt-8 space-y-4 border-t border-white/[0.06] pt-8">
      <ProductVariantPicker
        product={product}
        selectedId={selectedVariantId}
        onSelect={setSelectedVariantId}
      />

      <div className="flex flex-wrap gap-3">
        <AddToCartButton
          product={product}
          variantId={selectedVariant?.id}
          disabled={!selectedVariant}
          className="btn-primary rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
        />
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
        {t("products.viewCoaLibrary")}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}
