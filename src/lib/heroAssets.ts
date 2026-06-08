import { BRAND_HERO_VIDEO } from "@/lib/brandAssets";

/** Canonical hero right image — public/hero/hero-showcase-reference.png */
export const HERO_SHOWCASE_PATH = "/hero/hero-showcase-reference.png" as const;

export const HERO_SHOWCASE_FILE = "hero-showcase-reference.png" as const;

/** @deprecated Use HERO_SHOWCASE_PATH */
export const HERO_SHOWCASE_REFERENCE_PATH = HERO_SHOWCASE_PATH;

export const HERO_SHOWCASE = {
  src: HERO_SHOWCASE_PATH,
  width: 1024,
  height: 1024,
  alt: "GLP-3 RT and GHK-Cu research peptide vials on luxury pedestal",
} as const;

/** @deprecated Use HERO_SHOWCASE */
export const HERO_SHOWCASE_REFERENCE = {
  src: HERO_SHOWCASE.src,
  width: HERO_SHOWCASE.width,
  height: HERO_SHOWCASE.height,
} as const;

export const HERO_ASSETS = {
  background: "/hero/hero-background.png",
  showcaseReference: HERO_SHOWCASE_PATH,
  showcaseVideo: BRAND_HERO_VIDEO,
} as const;

/** Guard — hero showcase must only use the canonical PNG */
export function assertHeroShowcasePath(src: string): boolean {
  return src === HERO_SHOWCASE_PATH;
}
