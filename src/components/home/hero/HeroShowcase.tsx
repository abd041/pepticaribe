"use client";

import { HERO_SHOWCASE, HERO_SHOWCASE_PATH } from "@/lib/heroAssets";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";

/**
 * Hero right panel — MUST render public/hero/hero-showcase-reference.png only.
 * Uses a direct <img> to the canonical PNG (no alternate asset paths).
 */
export function HeroShowcase() {
  if (process.env.NODE_ENV !== "production" && HERO_SHOWCASE.src !== HERO_SHOWCASE_PATH) {
    console.error(
      "[HeroShowcase] Asset mismatch — expected",
      HERO_SHOWCASE_PATH,
      "got",
      HERO_SHOWCASE.src,
    );
  }

  return (
    <div
      className="ref-hero-showcase concept-hero-showcase ref-hero-showcase-reference-scene art-hero-showcase"
      data-hero-asset="hero-showcase-reference"
      data-hero-src={HERO_SHOWCASE_PATH}
    >
      <div className="lux-hero-product">
        <LuxuryProductPresentation variant="hero" alt={HERO_SHOWCASE.alt}>
          <div className="ref-hero-showcase-reference-frame lux-hero-float relative mx-auto flex items-end justify-center">
            <img
              src={HERO_SHOWCASE_PATH}
              alt={HERO_SHOWCASE.alt}
              width={HERO_SHOWCASE.width}
              height={HERO_SHOWCASE.height}
              decoding="async"
              fetchPriority="high"
              loading="eager"
              className="ref-hero-showcase-reference h-auto w-auto max-h-[var(--hero-showcase-max-h)] max-w-[var(--hero-showcase-max-w)] object-contain"
            />
          </div>
        </LuxuryProductPresentation>
      </div>
    </div>
  );
}
