import type { Product } from "@/types/product";
import { hasMultipleVariants } from "@/lib/pricing";

type ProductVariantChipsProps = {
  product: Product;
  className?: string;
  size?: "sm" | "md";
};

/** Read-only size pills for catalog and featured cards */
export function ProductVariantChips({
  product,
  className = "",
  size = "sm",
}: ProductVariantChipsProps) {
  if (!hasMultipleVariants(product)) return null;

  return (
    <ul
      className={`product-variant-chips product-variant-chips--${size} ${className}`.trim()}
      aria-label="Available sizes"
    >
      {product.variants.map((variant) => (
        <li key={variant.id} className="product-variant-chip">
          {variant.sizeLabel}
        </li>
      ))}
    </ul>
  );
}
