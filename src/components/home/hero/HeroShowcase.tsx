"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import {
  HERO_ASSETS,
  HERO_SHOWCASE_REFERENCE,
  isHeroShowcaseReference,
} from "@/lib/heroAssets";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";

/** Hero right panel — always hero-showcase-reference.png (see @/lib/heroAssets) */
export function HeroShowcase() {
  const src = HERO_ASSETS.showcaseReference;

  if (process.env.NODE_ENV !== "production" && !isHeroShowcaseReference(src)) {
    console.error("[HeroShowcase] Unexpected hero image path:", src);
  }

  return (
    <div
      className="ref-hero-showcase concept-hero-showcase ref-hero-showcase-reference-scene art-hero-showcase"
      data-hero-asset="hero-showcase-reference"
      data-speed="0.95"
    >
      <div className="lux-hero-product">
        <LuxuryProductPresentation variant="hero" alt="Research peptide vials on luxury pedestal">
          <div className="ref-hero-showcase-reference-frame lux-hero-float flex h-full w-full items-end justify-start">
            <OptimizedImage
              src={src}
              alt="GLP-2 T and GLP-5 RT research peptide vials on a luxury illuminated pedestal"
              width={HERO_SHOWCASE_REFERENCE.width}
              height={HERO_SHOWCASE_REFERENCE.height}
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="ref-hero-showcase-reference h-auto w-auto max-w-full object-contain object-bottom-left"
            />
          </div>
        </LuxuryProductPresentation>
      </div>
    </div>
  );
}
