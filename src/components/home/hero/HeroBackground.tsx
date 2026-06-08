"use client";

/** Hero copy legibility veil — page-wide particles live in MarketingCanvasBackdrop */
export function HeroBackground() {
  return (
    <div
      className="ref-hero-bg concept-hero-bg hero-cinematic-layers pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="ref-hero-copy-legibility absolute inset-0" />
    </div>
  );
}
