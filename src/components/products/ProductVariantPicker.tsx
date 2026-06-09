"use client";

import type { Product } from "@/types/product";
import { formatUsd } from "@/lib/pricing";
import { useLanguage } from "@/context/LanguageContext";

type ProductVariantPickerProps = {
  product: Product;
  selectedId: string;
  onSelect: (variantId: string) => void;
};

export function ProductVariantPicker({
  product,
  selectedId,
  onSelect,
}: ProductVariantPickerProps) {
  const { t } = useLanguage();

  if (product.variants.length <= 1) return null;

  return (
    <fieldset className="product-variant-picker">
      <legend className="form-field-label">{t("products.selectDose")}</legend>
      <div
        className="product-variant-picker-options"
        role="radiogroup"
        aria-label={t("products.selectDose")}
      >
        {product.variants.map((variant) => {
          const selected = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`product-variant-picker-option${selected ? " is-selected" : ""}`}
              onClick={() => onSelect(variant.id)}
            >
              <span className="product-variant-picker-size">{variant.sizeLabel}</span>
              <span className="product-variant-picker-price">{formatUsd(variant.price)}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
