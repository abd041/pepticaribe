"use client";

/** Minimal copy legibility veil — global atmosphere provides hero depth */
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
