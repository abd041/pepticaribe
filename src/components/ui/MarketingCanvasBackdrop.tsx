"use client";

import { useEffect, type ReactNode } from "react";
import { MarketingCanvasProvider } from "@/context/MarketingCanvasContext";
import {
  CANVAS_PARTICLE_PRESET,
  CaribeParticleField,
} from "@/components/ui/CaribeParticleField";

/** Full-page navy atmosphere + 200 canvas dots — single source for homepage + /products */
export function MarketingCanvasBackdrop({ children }: { children?: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("has-marketing-canvas");
    return () => {
      document.documentElement.classList.remove("has-marketing-canvas");
    };
  }, []);

  return (
    <MarketingCanvasProvider>
      {/* Scope wrapper — keeps backdrop out of .homepage-luxury > * stacking overrides */}
      <div className="marketing-canvas-scope relative isolate min-h-full w-full">
        <div
          className="marketing-canvas-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div className="atmosphere-base absolute inset-0" />
          <div className="atmosphere-teal atmosphere-teal-products absolute inset-0" />
          <div className="atmosphere-glow-ocean absolute inset-0" />
          <div className="section-identity-products absolute inset-0 opacity-75" />
          <CaribeParticleField {...CANVAS_PARTICLE_PRESET} />
        </div>
        <div className="marketing-canvas-foreground relative z-[1] isolate w-full min-h-full">
          {children}
        </div>
      </div>
    </MarketingCanvasProvider>
  );
}
