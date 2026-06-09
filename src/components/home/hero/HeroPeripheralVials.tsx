"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";

/** Subtle exhibit vials at hero edges — gate-inspired drift without competing with showcase */
const HERO_PERIPHERAL_VIALS = [
  {
    src: "/products/exhibit/glp-3-rt.png",
    className:
      "hero-peripheral-vial hero-peripheral-vial-1 absolute -left-6 top-[18%] w-[4.5rem] opacity-[0.22] sm:-left-4 sm:w-[5.5rem] md:opacity-[0.28]",
    width: 180,
    height: 320,
  },
  {
    src: "/products/exhibit/ghk-cu.png",
    className:
      "hero-peripheral-vial hero-peripheral-vial-2 absolute -right-4 top-[12%] w-[4rem] opacity-[0.18] sm:right-0 sm:w-[5rem] lg:opacity-[0.24]",
    width: 180,
    height: 320,
  },
  {
    src: "/products/exhibit/bpc-157.png",
    className:
      "hero-peripheral-vial hero-peripheral-vial-3 absolute bottom-[22%] left-[8%] hidden w-[3.5rem] opacity-[0.16] sm:block md:w-[4.25rem] lg:opacity-[0.2]",
    width: 160,
    height: 280,
  },
  {
    src: "/products/exhibit/mots-c.png",
    className:
      "hero-peripheral-vial hero-peripheral-vial-4 absolute bottom-[28%] right-[6%] hidden w-[3.25rem] opacity-[0.14] md:block md:w-[4rem] lg:opacity-[0.18]",
    width: 160,
    height: 280,
  },
] as const;

export function HeroPeripheralVials() {
  return (
    <div className="hero-peripheral-vials pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {HERO_PERIPHERAL_VIALS.map((vial) => (
        <div key={vial.src} className={vial.className}>
          <OptimizedImage
            src={vial.src}
            alt=""
            width={vial.width}
            height={vial.height}
            className="h-auto w-full object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
          />
        </div>
      ))}
    </div>
  );
}
