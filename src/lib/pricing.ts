import type { Product } from "@/types/product";

export function getProductFromPrice(product: Product): number {
  if (product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((v) => v.price));
}

/** Whole dollars omit decimals ($40); fractional amounts keep cents ($39.99). */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  if (Number.isInteger(rounded)) {
    return rounded.toString();
  }
  return rounded.toFixed(2);
}

export function formatUsd(amount: number): string {
  return `$${formatPrice(amount)}`;
}

export function hasMultipleVariants(product: Product): boolean {
  return product.variants.length > 1;
}

export function getVariantSizeSummary(product: Product): string {
  return product.variants.map((v) => v.sizeLabel).join(" · ");
}
