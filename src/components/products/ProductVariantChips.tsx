"use client";

import type { Product } from "@/types/product";
import { hasMultipleVariants } from "@/lib/pricing";

type ProductVariantChipsProps = {
  product: Product;
  className?: string;
  size?: "sm" | "md";
  /** When set, chips become selectable and drive card price / add-to-cart */
  selectedId?: string;
  onSelect?: (variantId: string) => void;
};

/** Size pills for catalog and featured cards — interactive when onSelect is provided */
export function ProductVariantChips({
  product,
  className = "",
  size = "sm",
  selectedId,
  onSelect,
}: ProductVariantChipsProps) {
  if (!hasMultipleVariants(product)) return null;

  const interactive = Boolean(onSelect);

  return (
    <ul
      className={`product-variant-chips product-variant-chips--${size}${interactive ? " product-variant-chips--interactive" : ""} ${className}`.trim()}
      aria-label="Available sizes"
      role={interactive ? "radiogroup" : undefined}
    >
      {product.variants.map((variant) => {
        const selected = interactive && variant.id === selectedId;

        if (interactive) {
          return (
            <li key={variant.id}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                className={`product-variant-chip${selected ? " is-selected" : ""}`}
                onClick={() => onSelect?.(variant.id)}
              >
                {variant.sizeLabel}
              </button>
            </li>
          );
        }

        return (
          <li key={variant.id} className="product-variant-chip">
            {variant.sizeLabel}
          </li>
        );
      })}
    </ul>
  );
}
