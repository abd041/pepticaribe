"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import {
  EXHIBIT_VIAL_SLOT,
  type CompoundExhibitIdentity,
} from "@/lib/productImagery";

type CompoundExhibitStageProps = {
  alt: string;
  exhibit: CompoundExhibitIdentity;
  sizes?: string;
  priority?: boolean;
};

const PARTICLE_OFFSETS = [
  [12, 18],
  [28, 42],
  [72, 24],
  [88, 58],
  [18, 72],
  [55, 12],
  [44, 68],
  [82, 38],
] as const;

export function CompoundExhibitStage({
  alt,
  exhibit,
  sizes = "(max-width: 640px) 48vw, (max-width: 1024px) 28vw, 320px",
  priority = false,
}: CompoundExhibitStageProps) {
  return (
    <div
      className="compound-exhibit-stage relative h-full w-full overflow-hidden"
      data-slug={exhibit.slug}
      data-tone={exhibit.tone}
    >
      {/* Layer 0 — laboratory chamber */}
      <div className="compound-exhibit-chamber pointer-events-none absolute inset-0" aria-hidden />

      {/* Layer 1 — soft radial glow */}
      <div className="compound-exhibit-glow pointer-events-none absolute inset-0" aria-hidden />

      {/* Layer 2 — blurred halo */}
      <div className="compound-exhibit-halo pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" aria-hidden />

      {/* Layer 3 — spotlight cone */}
      <div className="compound-exhibit-cone-beam pointer-events-none absolute inset-x-[14%] top-0 h-[58%]" aria-hidden />

      {/* Layer 4 — subtle particle field */}
      <div className="compound-exhibit-particles pointer-events-none absolute inset-0" aria-hidden>
        {PARTICLE_OFFSETS.map(([left, top]) => (
          <span
            key={`${left}-${top}`}
            className="compound-exhibit-particle absolute h-px w-px rounded-full"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>

      {/* Pedestal stack */}
      <div className="compound-exhibit-pedestal-stack pointer-events-none absolute inset-x-0 bottom-[6%] z-10" aria-hidden>
        <div className="compound-exhibit-pedestal-base mx-auto h-[14px] w-[72%] rounded-[100%]" />
        <div className="compound-exhibit-pedestal-glass mx-auto -mt-2 h-[10px] w-[58%] rounded-[100%]" />
        <div className="compound-exhibit-pedestal-ring mx-auto -mt-1.5 h-[6px] w-[44%] rounded-[100%]" />
      </div>

      {/* Contact shadow + reflection */}
      <div className="compound-exhibit-contact-shadow pointer-events-none absolute inset-x-0 bottom-[10%] z-[11]" aria-hidden />
      <div className="compound-exhibit-platform-reflection pointer-events-none absolute inset-x-[26%] bottom-[9%] z-[11] h-[8%] rounded-[100%]" aria-hidden />

      {/* Uniform vial slot — object-contain, per-product scale, never cropped */}
      <div
        className="compound-exhibit-vial-slot absolute left-1/2 z-20 -translate-x-1/2"
        style={
          {
            width: `${EXHIBIT_VIAL_SLOT.widthRatio * 100}%`,
            height: `${EXHIBIT_VIAL_SLOT.heightRatio * 100}%`,
            bottom: `${EXHIBIT_VIAL_SLOT.bottomOffset * 100}%`,
            "--vial-scale": exhibit.display.scale,
            "--vial-y": exhibit.display.y,
          } as CSSProperties
        }
      >
        <div className="compound-exhibit-vial-frame">
          <Image
            key={exhibit.src}
            src={exhibit.src}
            alt={alt}
            width={exhibit.display.intrinsicW}
            height={exhibit.display.intrinsicH}
            priority={priority}
            sizes={sizes}
            className="compound-exhibit-vial h-full w-full object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}
