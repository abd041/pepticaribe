import type { Product } from "@/types/product";

export function getProductFromPrice(product: Product): number {
  if (product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((v) => v.price));
}
