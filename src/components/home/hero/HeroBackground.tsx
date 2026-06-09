"use client";

import { HeroPeripheralVials } from "@/components/home/hero/HeroPeripheralVials";

/** Hero copy legibility veil + subtle peripheral vial drift (page particles in MarketingCanvasBackdrop) */
export function HeroBackground() {
  return (
    <div
      className="ref-hero-bg concept-hero-bg hero-cinematic-layers pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <HeroPeripheralVials />
      <div className="ref-hero-copy-legibility absolute inset-0" />
    </div>
  );
}
