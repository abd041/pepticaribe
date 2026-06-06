/**
 * Canonical hero imagery — single source of truth.
 * Right-side hero showcase MUST use public/hero/hero-showcase-reference.png only.
 */
export const HERO_SHOWCASE_REFERENCE_PATH = "/hero/hero-showcase-reference.png" as const;

export const HERO_SHOWCASE_REFERENCE = {
  src: HERO_SHOWCASE_REFERENCE_PATH,
  width: 1536,
  height: 1024,
} as const;

export const HERO_ASSETS = {
  background: "/hero/hero-background.png",
  /** Hero right panel — vial + pedestal composite (hero-showcase-reference.png) */
  showcaseReference: HERO_SHOWCASE_REFERENCE_PATH,
} as const;

/** Runtime guard — hero showcase components should only render this asset */
export function isHeroShowcaseReference(src: string): boolean {
  return src === HERO_SHOWCASE_REFERENCE_PATH;
}
