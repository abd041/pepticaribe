"use client";

import type { Product } from "@/types/product";
import { formatUsd, getProductFromPrice, hasMultipleVariants } from "@/lib/pricing";
import { useLanguage } from "@/context/LanguageContext";

type ProductCardPriceProps = {
  product: Product;
  className?: string;
  priceClassName?: string;
};

export function ProductCardPrice({
  product,
  className = "",
  priceClassName = "font-display",
}: ProductCardPriceProps) {
  const { t } = useLanguage();
  const fromPrice = getProductFromPrice(product);
  const showFrom = hasMultipleVariants(product);

  return (
    <span className={className}>
      {showFrom ? (
        <>
          {t("common.fromPrice")}{" "}
        </>
      ) : null}
      <span className={priceClassName}>{formatUsd(fromPrice)}</span>
    </span>
  );
}
