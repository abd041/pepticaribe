/**
 * Canonical product vial videos — public/videos/
 * Source: AI vial video renders (mapped to catalog slugs).
 */
export const PRODUCT_VIDEO_PATHS = {
  "5-amino-1mq": "/videos/5-amino-1mq.mp4",
  "bac-water": "/videos/bac-water.mp4",
  "bpc-157-tb-500": "/videos/bpc-157-tb-500.mp4",
  "cjc-1295-ipamorelin": "/videos/cjc-1295-ipamorelin.mp4",
  "ghk-cu": "/videos/ghk-cu.mp4",
  "glp-2-t": "/videos/glp-2-t.mp4",
  "glp-3-rt": "/videos/glp-3-rt.mp4",
  glutathione: "/videos/glutathione.mp4",
  "mots-c": "/videos/mots-c.mp4",
  "nad-plus": "/videos/nad-plus.mp4",
} as const;

export type ProductVideoSlug = keyof typeof PRODUCT_VIDEO_PATHS;

export const IMPORTED_VIDEO_FILES = [
  "5-amino-1mq.mp4",
  "bac-water.mp4",
  "bpc-157-tb-500.mp4",
  "cjc-1295-ipamorelin.mp4",
  "ghk-cu.mp4",
  "glp-2-t.mp4",
  "glp-3-rt.mp4",
  "glutathione.mp4",
  "mots-c.mp4",
  "nad-plus.mp4",
] as const;

export function getProductVideoPath(slug: string): string | undefined {
  return PRODUCT_VIDEO_PATHS[slug as ProductVideoSlug];
}
