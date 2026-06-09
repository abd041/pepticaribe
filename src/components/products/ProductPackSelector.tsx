"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PackQuote, PackTier } from "@/lib/packPricing";
import { calculatePackQuote } from "@/lib/packPricing";
import { formatUsd } from "@/lib/pricing";
import { useLanguage } from "@/context/LanguageContext";
import { formatDiscountOffAndSave, formatTranslation } from "@/lib/i18n-format";
import type { TranslationKey } from "@/data/translations";

type ProductPackSelectorProps = {
  tiers: PackTier[];
  bulkTier: PackTier | null;
  unitPrice: number;
  selectedQuantity: number;
  onSelect: (quantity: number) => void;
};

function resolvePerkLabel(
  key: TranslationKey,
  discountPercent: number,
  savings: number,
  t: (key: TranslationKey) => string,
): string {
  if (key === "bundle.perkDiscount") {
    return formatTranslation(t, key, {
      percent: String(discountPercent),
      amount: formatUsd(savings),
    });
  }
  return t(key);
}

function PackCard({
  tier,
  unitPrice,
  selected,
  onSelect,
}: {
  tier: PackTier;
  unitPrice: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const { t } = useLanguage();
  const quote = calculatePackQuote(unitPrice, tier.quantity, tier.discountPercent);
  const vialLabel = tier.quantity === 1 ? t("products.vial") : t("products.vials");

  return (
    <button
      type="button"
      className={`product-pack-card${selected ? " is-selected" : ""}${tier.isPopular ? " is-popular" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      {tier.isPopular ? (
        <span className="product-pack-popular-ribbon">{t("products.mostPopular")}</span>
      ) : null}

      {tier.discountPercent > 0 && quote.savings > 0 ? (
        <span className={`product-pack-discount-line product-pack-discount-line--${tier.badgeVariant}`}>
          {formatDiscountOffAndSave(t, tier.discountPercent, quote.savings)}
        </span>
      ) : (
        <span className="product-pack-badge product-pack-badge--standard">
          {t("products.standard")}
        </span>
      )}

      <span className="product-pack-qty font-display">{tier.quantity}</span>
      <span className="product-pack-unit-label">{vialLabel}</span>

      {quote.savings > 0 ? (
        <span className="product-pack-compare">{formatUsd(quote.subtotal)}</span>
      ) : null}

      <span className="product-pack-total font-display">{formatUsd(quote.total)}</span>
      <span className="product-pack-per-unit">
        {formatTranslation(t, "products.perVial", { amount: formatUsd(quote.perUnit) })}
      </span>

      {tier.discountPercent === 0 ? (
        <span className="product-pack-full">{t("products.fullPrice")}</span>
      ) : null}

      {tier.perkKeys.filter((key) => key !== "bundle.perkDiscount").length > 0 ? (
        <ul className="product-pack-perks">
          {tier.perkKeys
            .filter((key) => key !== "bundle.perkDiscount")
            .map((key) => (
              <li key={key}>
                {resolvePerkLabel(
                  key as TranslationKey,
                  tier.discountPercent,
                  quote.savings,
                  t,
                )}
              </li>
            ))}
        </ul>
      ) : null}
    </button>
  );
}

function BulkPackCard({
  tier,
  unitPrice,
  selected,
  onSelect,
}: {
  tier: PackTier;
  unitPrice: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const { t } = useLanguage();
  const quote = calculatePackQuote(unitPrice, tier.quantity, tier.discountPercent);

  return (
    <div className={`product-pack-bulk${selected ? " is-selected" : ""}`}>
      <button type="button" className="product-pack-bulk-main" onClick={onSelect} aria-pressed={selected}>
        <div className="product-pack-bulk-copy">
          <p className="product-pack-bulk-title font-display">
            {formatTranslation(t, "products.bulkTitle", {
              count: String(tier.quantity),
              percent: String(tier.discountPercent),
            })}
          </p>
          <p className="product-pack-bulk-sub">{t("products.bulkSubtitle")}</p>
          <p className="product-pack-bulk-savings">
            {formatDiscountOffAndSave(t, tier.discountPercent, quote.savings)}
          </p>
          <ul className="product-pack-perks product-pack-perks--bulk">
            {tier.perkKeys
              .filter((key) => key !== "bundle.perkDiscount")
              .map((key) => (
                <li key={key}>
                  {resolvePerkLabel(
                    key as TranslationKey,
                    tier.discountPercent,
                    quote.savings,
                    t,
                  )}
                </li>
              ))}
          </ul>
        </div>

        <div className="product-pack-bulk-pricing">
          {quote.savings > 0 ? (
            <span className="product-pack-compare">{formatUsd(quote.subtotal)}</span>
          ) : null}
          <span className="product-pack-total font-display">{formatUsd(quote.total)}</span>
          <span className="product-pack-per-unit">
            {formatTranslation(t, "products.perVial", { amount: formatUsd(quote.perUnit) })}
          </span>
        </div>
      </button>

      <p className="product-pack-bulk-contact">
        {t("products.bulkContactPrefix")}{" "}
        <Link href="/contact" className="product-pack-bulk-link">
          {t("products.bulkContactLink")}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </p>
    </div>
  );
}

export function ProductPackSelector({
  tiers,
  bulkTier,
  unitPrice,
  selectedQuantity,
  onSelect,
}: ProductPackSelectorProps) {
  const { t } = useLanguage();

  return (
    <section className="product-pack-selector" aria-label={t("products.selectBundle")}>
      <h3 className="product-pack-heading">{t("products.selectBundle")}</h3>

      <div className="product-pack-grid">
        {tiers.map((tier) => (
          <PackCard
            key={tier.quantity}
            tier={tier}
            unitPrice={unitPrice}
            selected={selectedQuantity === tier.quantity}
            onSelect={() => onSelect(tier.quantity)}
          />
        ))}
      </div>

      {bulkTier ? (
        <BulkPackCard
          tier={bulkTier}
          unitPrice={unitPrice}
          selected={selectedQuantity === bulkTier.quantity}
          onSelect={() => onSelect(bulkTier.quantity)}
        />
      ) : null}
    </section>
  );
}
