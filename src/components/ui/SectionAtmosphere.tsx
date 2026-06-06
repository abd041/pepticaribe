"use client";

import type { ReactNode } from "react";
import {
  ArtDirectionLight,
  BioluminescentParticles,
  BrandAtmosphere,
  CaribeCurrentLayer,
  OceanWaveLayer,
} from "@/components/ui/BrandMotifs";

export type AtmosphereVariant =
  | "hero"
  | "value"
  | "products"
  | "coa"
  | "disclaimer"
  | "footer";

const VARIANT_CONFIG: Record<
  AtmosphereVariant,
  {
    particleCount: number;
    waveOpacity: string;
    glowIntensity: string;
    dna: { className: string; delay?: number }[];
  }
> = {
  hero: {
    particleCount: 8,
    waveOpacity: "opacity-[0.07]",
    glowIntensity: "atmosphere-glow-hero",
    dna: [
      { className: "left-[3%] top-[18%] h-32 w-8 opacity-[0.05]", delay: 0 },
      { className: "right-[5%] bottom-[22%] h-28 w-7 opacity-[0.04]", delay: 2 },
    ],
  },
  value: {
    particleCount: 6,
    waveOpacity: "opacity-[0.05]",
    glowIntensity: "atmosphere-glow-teal",
    dna: [
      { className: "left-[6%] top-[30%] h-24 w-6 opacity-[0.035]", delay: 1 },
      { className: "right-[8%] bottom-[35%] h-20 w-5 opacity-[0.03]", delay: 3 },
    ],
  },
  products: {
    particleCount: 6,
    waveOpacity: "opacity-[0.06]",
    glowIntensity: "atmosphere-glow-ocean",
    dna: [
      { className: "left-[4%] bottom-[15%] h-24 w-6 opacity-[0.04]", delay: 0 },
      { className: "right-[6%] top-[12%] h-20 w-5 opacity-[0.035]", delay: 2 },
    ],
  },
  coa: {
    particleCount: 10,
    waveOpacity: "opacity-[0.05]",
    glowIntensity: "atmosphere-glow-gold",
    dna: [
      { className: "left-[5%] top-[20%] h-28 w-7 opacity-[0.04]", delay: 1 },
      { className: "right-[4%] bottom-[18%] h-24 w-6 opacity-[0.035]", delay: 2.5 },
    ],
  },
  disclaimer: {
    particleCount: 6,
    waveOpacity: "opacity-[0.04]",
    glowIntensity: "atmosphere-glow-warm",
    dna: [{ className: "right-[10%] top-[40%] h-20 w-5 opacity-[0.03]", delay: 0 }],
  },
  footer: {
    particleCount: 8,
    waveOpacity: "opacity-[0.05]",
    glowIntensity: "atmosphere-glow-footer",
    dna: [
      { className: "left-[8%] top-[25%] h-24 w-6 opacity-[0.035]", delay: 0 },
      { className: "right-[12%] bottom-[30%] h-20 w-5 opacity-[0.03]", delay: 1.5 },
    ],
  },
};

interface SectionAtmosphereProps {
  variant: AtmosphereVariant;
  children: ReactNode;
  className?: string;
  showTopTransition?: boolean;
  showBottomTransition?: boolean;
}

/** Five-layer ambient environment — navy, teal, glow, waves, particles */
export function SectionAtmosphere({
  variant,
  children,
  className = "",
  showTopTransition = true,
  showBottomTransition = true,
}: SectionAtmosphereProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Layer 1 — deep navy foundation */}
      <div className="atmosphere-base pointer-events-none absolute inset-0" aria-hidden />

      {/* Layer 2 — subtle teal gradients */}
      <div
        className={`atmosphere-teal pointer-events-none absolute inset-0 atmosphere-teal-${variant}`}
        aria-hidden
      />

      {/* Layer 3 — soft ambient glows */}
      <div
        className={`pointer-events-none absolute inset-0 ${config.glowIntensity}`}
        aria-hidden
      />

      {/* Layer 3b — soft gold highlights */}
      {variant !== "hero" && (
        <div
          className={`atmosphere-gold pointer-events-none absolute inset-0 atmosphere-gold-${variant}`}
          aria-hidden
        />
      )}

      {/* Section identity foundation tint */}
      {variant !== "hero" && (
        <div
          className={`section-identity-${variant} pointer-events-none absolute inset-0 opacity-80`}
          aria-hidden
        />
      )}

      {/* Signature Caribbean current flows */}
      <CaribeCurrentLayer variant={variant} />

      {/* Directional cinematic lighting */}
      {variant !== "hero" && <ArtDirectionLight variant={variant} />}

      {/* Layer 4 — organic wave patterns */}
      <OceanWaveLayer className={config.waveOpacity} variant={variant} />

      {/* Layer 5 — bioluminescent particles */}
      <BioluminescentParticles count={config.particleCount} />

      {/* DNA + wave accents */}
      <BrandAtmosphere dnaPositions={config.dna} showWaves />

      {showTopTransition && (
        <div className="section-transition-top pointer-events-none absolute inset-x-0 top-0 z-[1]" aria-hidden />
      )}
      {showBottomTransition && (
        <div className="section-transition-bottom pointer-events-none absolute inset-x-0 bottom-0 z-[1]" aria-hidden />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
