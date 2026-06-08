import type { Product, ProductCategory } from "@/types/product";

export function stripRuoSuffix(text: string): string {
  return text.replace(/\s*Research Use Only\.?\s*$/i, "").trim();
}

export function getProductFormLabel(category: ProductCategory): string {
  if (category === "accessory") return "Sterile Solution";
  if (category === "small-molecule") return "Lyophilized Powder";
  return "Lyophilized Powder";
}

export function getProductStorageLabel(category: ProductCategory): string {
  if (category === "accessory") return "Room Temperature";
  return "Refrigerate 2–8°C";
}

export function getRelatedProducts(
  product: Product,
  catalog: Product[],
  limit = 4,
): Product[] {
  const pool = catalog.filter((item) => item.slug !== product.slug);
  const merged = [
    ...pool.filter((item) => item.featured),
    ...pool.filter((item) => item.category === product.category),
    ...pool,
  ];

  const seen = new Set<string>();
  return merged
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    })
    .slice(0, limit);
}
