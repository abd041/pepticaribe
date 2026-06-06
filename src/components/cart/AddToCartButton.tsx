"use client";

import type { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  product: Product;
  variantId?: string;
  className?: string;
};

export function AddToCartButton({ product, variantId, className = "" }: AddToCartButtonProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className={className}
      onClick={() => addItem(product, variantId)}
    >
      {t("common.addToCart")}
    </button>
  );
}
