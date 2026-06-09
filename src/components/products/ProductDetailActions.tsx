"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

type ProductDetailActionsProps = {
  product: Product;
  selectedVariantId: string;
  packQuantity?: number;
  packUnitPrice?: number;
};

export function ProductDetailActions({
  product,
  selectedVariantId,
  packQuantity = 1,
  packUnitPrice,
}: ProductDetailActionsProps) {
  const { t } = useLanguage();
  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const basePrice = selectedVariant?.price;
  const hasPackPricing =
    packQuantity > 1 ||
    (packUnitPrice != null && basePrice != null && packUnitPrice !== basePrice);

  const cartOptions = hasPackPricing
    ? {
        quantity: packQuantity,
        unitPrice: packUnitPrice ?? basePrice,
      }
    : undefined;

  return (
    <div className="product-detail-actions">
      <div className="ref-product-actions qa-product-actions product-detail-action-row">
        <AddToCartButton
          product={product}
          variantId={selectedVariant?.id}
          disabled={!selectedVariant}
          cartOptions={cartOptions}
          className="ref-product-btn-gold polish-product-cta qa-btn-card-gold product-detail-add-btn"
        />
        <Link
          href="/cart"
          className="ref-product-btn-teal polish-product-cta qa-btn-card-teal product-detail-cart-btn"
        >
          {t("nav.cart")}
        </Link>
      </div>
    </div>
  );
}
