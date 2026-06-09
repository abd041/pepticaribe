/**
 * Client catalog order — pages 20–23 of the product document.
 * Public storefront listings should follow this sequence.
 */
export const CLIENT_CATALOG_SLUG_ORDER = [
  "bacteriostatic-water",
  "glp-3-rt",
  "glp-2-t",
  "ghk-cu",
  "bpc-157-tb-500",
  "bpc-157",
  "mots-c",
  "cjc-1295-ipamorelin",
  "ss-31",
  "kpv",
  "nad-plus",
  "glutathione",
  "5-amino-1mq",
  "tesamorelin",
  "klow",
  "adamax",
  "semax",
  "selank",
  "melanotan-ii",
  "dsip",
  "pt-141",
] as const;

const ORDER_INDEX: Map<string, number> = new Map(
  CLIENT_CATALOG_SLUG_ORDER.map((slug, index) => [slug, index]),
);

export function compareCatalogOrder(aSlug: string, bSlug: string): number {
  const aIndex = ORDER_INDEX.get(aSlug) ?? Number.MAX_SAFE_INTEGER;
  const bIndex = ORDER_INDEX.get(bSlug) ?? Number.MAX_SAFE_INTEGER;
  return aIndex - bIndex;
}
