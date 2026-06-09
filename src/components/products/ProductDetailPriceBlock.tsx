"use client";

import type { PackQuote } from "@/lib/packPricing";
import { formatUsd } from "@/lib/pricing";
import { useLanguage } from "@/context/LanguageContext";
import { formatDiscountOffAndSave, formatTranslation } from "@/lib/i18n-format";

type ProductDetailPriceBlockProps = {
  quote: PackQuote;
};

export function ProductDetailPriceBlock({ quote }: ProductDetailPriceBlockProps) {
  const { t } = useLanguage();
  const vialLabel = quote.quantity === 1 ? t("products.vial") : t("products.vials");

  return (
    <div className="product-detail-price-block">
      <div className="product-detail-price-main">
        <p className="product-detail-price-total font-display">{formatUsd(quote.total)}</p>
        <div className="product-detail-price-meta">
          {quote.quantity > 1 ? (
            <p className="product-detail-price-kit">
              {formatTranslation(t, "products.perKit", { count: String(quote.quantity) })}
            </p>
          ) : null}
          <p className="product-detail-price-per-vial">
            {formatTranslation(t, "products.perVial", { amount: formatUsd(quote.perUnit) })}
          </p>
        </div>
      </div>

      {quote.savings > 0 && quote.discountPercent > 0 ? (
        <p className="product-detail-price-savings">
          {formatDiscountOffAndSave(t, quote.discountPercent, quote.savings)}
        </p>
      ) : quote.quantity === 1 ? (
        <p className="product-detail-price-full">{t("products.fullPrice")}</p>
      ) : null}

      {quote.quantity > 1 ? (
        <p className="product-detail-price-qty-note">
          {quote.quantity} {vialLabel}
        </p>
      ) : null}
    </div>
  );
}
