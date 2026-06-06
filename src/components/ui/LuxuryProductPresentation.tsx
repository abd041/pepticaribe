"use client";

import type { ReactNode } from "react";
import { CompoundExhibitStage } from "@/components/ui/CompoundExhibitStage";
import type { CompoundExhibitIdentity } from "@/lib/productImagery";

export type LuxuryPresentationVariant = "card" | "hero" | "featured";

type LuxuryProductPresentationProps = {
  alt: string;
  exhibit?: CompoundExhibitIdentity;
  variant?: LuxuryPresentationVariant;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Override stage content — e.g. hero composite render */
  children?: ReactNode;
};

/**
 * Reusable luxury product presentation — spotlight, glass, pedestal glow, shadow depth.
 * Visual-only system; does not alter copy or card structure.
 */
export function LuxuryProductPresentation({
  alt,
  exhibit,
  variant = "card",
  sizes,
  priority = false,
  className = "",
  children,
}: LuxuryProductPresentationProps) {
  return (
    <div
      className={`lux-product-presentation lux-product-presentation--${variant} ${className}`}
      data-variant={variant}
    >
      <div className="lux-pp-atmosphere" aria-hidden />
      <div className="lux-pp-volumetric" aria-hidden />
      <div className="lux-pp-spotlight-beam" aria-hidden />
      <div className="lux-pp-spotlight-core" aria-hidden />
      <div className="lux-pp-glass-sheen" aria-hidden />
      <div className="lux-pp-glass-reflection" aria-hidden />
      <div className="lux-pp-pedestal-glow" aria-hidden />
      <div className="lux-pp-shadow-depth" aria-hidden />
      <div className="lux-pp-rim-light" aria-hidden />

      <div className="lux-pp-stage">
        {children ??
          (exhibit ? (
            <CompoundExhibitStage
              alt={alt}
              exhibit={exhibit}
              sizes={sizes}
              priority={priority}
            />
          ) : null)}
      </div>
    </div>
  );
}
