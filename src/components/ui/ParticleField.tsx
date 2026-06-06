"use client";

import { BrandAtmosphere } from "@/components/ui/BrandMotifs";

/** Legacy particle field — now uses brand DNA + wave atmosphere */
export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <BrandAtmosphere
        dnaPositions={[
          { className: "left-[8%] top-[20%] h-24 w-6 opacity-[0.04]", delay: 0 },
          { className: "right-[10%] top-[40%] h-20 w-5 opacity-[0.035]", delay: 2 },
          { className: "left-[20%] bottom-[25%] h-16 w-4 opacity-[0.03]", delay: 1 },
        ]}
      />
    </div>
  );
}
