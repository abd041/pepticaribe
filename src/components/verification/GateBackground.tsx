"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { BrandAtmosphere, DnaHelixAccent } from "@/components/ui/BrandMotifs";
import { CINEMATIC_EASE, isCoarsePointer, isReducedMotion } from "@/lib/gsap/motion";

const GATE_VIALS = [
  { id: "left", src: "/products/glp-3-rt.png" },
  { id: "center", src: "/products/bpc-157.png" },
  { id: "right", src: "/products/glp-2-t.png" },
] as const;

const PRODUCT_LAYERS = [
  {
    role: "left" as const,
    className: "left-[3%] top-[24%] w-[60px] sm:w-[76px]",
    blur: "blur-[10px]",
    opacity: 0.09,
    floatY: 8,
    floatDuration: 18,
    parallaxFactor: 10,
  },
  {
    role: "center" as const,
    className: "left-1/2 top-[11%] w-[92px] -translate-x-1/2 sm:w-[112px]",
    blur: "",
    opacity: 0.26,
    floatY: 10,
    floatDuration: 15,
    parallaxFactor: 16,
  },
  {
    role: "right" as const,
    className: "right-[3%] top-[28%] w-[60px] sm:w-[76px]",
    blur: "blur-[10px]",
    opacity: 0.09,
    floatY: 9,
    floatDuration: 17,
    parallaxFactor: 10,
  },
];

export function GateBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = isReducedMotion();
    const coarse = isCoarsePointer();
    const parallaxEnabled = !reduced && !coarse;

    floatRefs.current.forEach((el, i) => {
      const layer = PRODUCT_LAYERS[i];
      if (!el || !layer || reduced) return;

      gsap.to(el, {
        y: -layer.floatY,
        rotate: layer.role === "center" ? 0.5 : 1,
        duration: layer.floatDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    if (!parallaxEnabled) return;

    const setParallax = () => {
      parallaxRefs.current.forEach((el, i) => {
        const layer = PRODUCT_LAYERS[i];
        if (!el || !layer) return;
        gsap.to(el, {
          x: pointerRef.current.x * layer.parallaxFactor,
          y: pointerRef.current.y * layer.parallaxFactor * 0.5,
          duration: 0.85,
          ease: CINEMATIC_EASE,
          overwrite: "auto",
        });
      });
    };

    const onMove = (e: MouseEvent) => {
      pointerRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
      setParallax();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.killTweensOf([...parallaxRefs.current, ...floatRefs.current].filter(Boolean));
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 h-dvh overflow-hidden bg-navy-950"
      aria-hidden
    >
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(45,212,191,0.11),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(212,167,44,0.04),transparent_55%)]" />

      <div className="gate-light-sweep absolute inset-0 opacity-[0.045]" />

      <BrandAtmosphere
        dnaPositions={[
          { className: "left-[6%] top-[18%] h-36 w-10 text-teal-400/30 sm:h-44 sm:w-12", delay: 0 },
          { className: "right-[7%] bottom-[20%] h-32 w-9 text-teal-400/25 sm:h-40 sm:w-11", delay: 2 },
        ]}
      />
      <DnaHelixAccent className="gate-dna-drift-reverse absolute left-[50%] top-[8%] h-16 w-4 -translate-x-1/2 text-gold-400/15" />

      {GATE_VIALS.map((vial, i) => {
        const layer = PRODUCT_LAYERS[i];
        if (!layer) return null;
        const isCenter = layer.role === "center";

        return (
          <div
            key={vial.id}
            ref={(el) => {
              parallaxRefs.current[i] = el;
            }}
            className={`absolute ${layer.className}`}
            style={{ opacity: layer.opacity, zIndex: isCenter ? 2 : 1 }}
          >
            <div
              ref={(el) => {
                floatRefs.current[i] = el;
              }}
              className={layer.blur || undefined}
            >
              <OptimizedImage
                src={vial.src}
                alt=""
                width={isCenter ? 180 : 140}
                height={isCenter ? 270 : 210}
                priority={isCenter}
                className={`h-auto w-full object-contain ${
                  isCenter
                    ? "drop-shadow-[0_12px_40px_rgba(20,184,166,0.15)]"
                    : "drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
