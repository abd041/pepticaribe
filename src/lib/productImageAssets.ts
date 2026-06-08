/**
 * Canonical product vial images — public/products/
 * Source: Peptide Vials (Products)/ (Drive filenames → slug paths), e.g.:
 *   GLP-3 RT - 20MG.png → glp-3-rt-20mg.png | NAD+ - 500MG.png → nad-plus.png
 *   Glutothion - 1500MG.png → glutathione.png | ORIGINAL.png → original.png
 */
export const PRODUCT_IMAGE_DIR = "/products" as const;

export const IMPORTED_PRODUCT_IMAGE_FILES = [
  "5-amino-1mq.png",
  "adamax.png",
  "bac-water-30ml.png",
  "bac-water.png",
  "bpc-157-tb-500.png",
  "bpc-157.png",
  "cjc-1295-ipamorelin.png",
  "dsip.png",
  "ghk-cu-100mg.png",
  "ghk-cu-50mg.png",
  "glp-2-t-30mg.png",
  "glp-2-t-40mg.png",
  "glp-3-rt-10mg.png",
  "glp-3-rt-20mg.png",
  "glp-3-rt-30mg.png",
  "glutathione.png",
  "klow.png",
  "kpv.png",
  "melanotan-ii.png",
  "mots-c.png",
  "nad-plus.png",
  "original.png",
  "pt-141.png",
  "selank.png",
  "semax.png",
  "ss-31.png",
  "tesamorelin.png",
] as const;

export type ImportedProductImageFile = (typeof IMPORTED_PRODUCT_IMAGE_FILES)[number];

export function productImagePath(filename: ImportedProductImageFile): string {
  return `${PRODUCT_IMAGE_DIR}/${filename}`;
}

/** Catalog slug → primary hero image path (where unambiguous) */
export const PRODUCT_HERO_IMAGES: Record<string, string> = {
  "5-amino-1mq": productImagePath("5-amino-1mq.png"),
  adamax: productImagePath("adamax.png"),
  "bac-water": productImagePath("bac-water.png"),
  "bpc-157": productImagePath("bpc-157.png"),
  "bpc-157-tb-500": productImagePath("bpc-157-tb-500.png"),
  "cjc-1295-ipamorelin": productImagePath("cjc-1295-ipamorelin.png"),
  dsip: productImagePath("dsip.png"),
  "ghk-cu": productImagePath("ghk-cu-50mg.png"),
  "glp-2-t": productImagePath("glp-2-t-30mg.png"),
  "glp-3-rt": productImagePath("glp-3-rt-30mg.png"),
  glutathione: productImagePath("glutathione.png"),
  klow: productImagePath("klow.png"),
  kpv: productImagePath("kpv.png"),
  "melanotan-ii": productImagePath("melanotan-ii.png"),
  "mots-c": productImagePath("mots-c.png"),
  "nad-plus": productImagePath("nad-plus.png"),
  "pt-141": productImagePath("pt-141.png"),
  selank: productImagePath("selank.png"),
  semax: productImagePath("semax.png"),
  "ss-31": productImagePath("ss-31.png"),
  tesamorelin: productImagePath("tesamorelin.png"),
};

export function getProductHeroImagePath(slug: string): string | undefined {
  return PRODUCT_HERO_IMAGES[slug];
}
