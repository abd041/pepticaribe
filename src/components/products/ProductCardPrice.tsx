"use client";

import type { Product } from "@/types/product";
import { formatUsd, getProductFromPrice, hasMultipleVariants } from "@/lib/pricing";
import { useLanguage } from "@/context/LanguageContext";

type ProductCardPriceProps = {
  product: Product;
  className?: string;
  priceClassName?: string;
  /** When set, shows this variant's price instead of the lowest "from" price */
  selectedVariantId?: string;
};

export function ProductCardPrice({
  product,
  className = "",
  priceClassName = "font-display",
  selectedVariantId,
}: ProductCardPriceProps) {
  const { t } = useLanguage();
  const selectedVariant = selectedVariantId
    ? product.variants.find((v) => v.id === selectedVariantId)
    : undefined;
  const fromPrice = getProductFromPrice(product);
  const displayPrice = selectedVariant?.price ?? fromPrice;
  const showFrom = hasMultipleVariants(product) && !selectedVariant;

  return (
    <span className={className}>
      {showFrom ? (
        <>
          {t("common.fromPrice")}{" "}
        </>
      ) : null}
      <span className={priceClassName}>{formatUsd(displayPrice)}</span>
    </span>
  );
}
