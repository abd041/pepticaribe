"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { BrandAtmosphere, DnaHelixAccent } from "@/components/ui/BrandMotifs";
import { BRAND_GATE_VIALS, BRAND_HERO_VIDEO } from "@/lib/brandAssets";
import { CINEMATIC_EASE, isCoarsePointer, isReducedMotion } from "@/lib/gsap/motion";

const PRODUCT_LAYERS = [
  {
    role: "left" as const,
    className: "left-[2%] top-[20%] w-[80px] sm:top-[18%] sm:w-[100px]",
    blur: "blur-[6px]",
    opacity: 0.2,
    floatY: 14,
    floatX: 18,
    floatDuration: 16,
    parallaxFactor: 14,
    rotate: 2,
  },
  {
    role: "center" as const,
    className:
      "gate-vial-center left-1/2 top-[14%] w-[100px] -translate-x-1/2 sm:top-[12%] sm:w-[132px] lg:w-[148px]",
    blur: "",
    opacity: 0.36,
    floatY: 14,
    floatX: 10,
    floatDuration: 13,
    parallaxFactor: 18,
    rotate: 1,
  },
  {
    role: "right" as const,
    className: "right-[2%] top-[24%] w-[80px] sm:top-[20%] sm:w-[100px]",
    blur: "blur-[6px]",
    opacity: 0.2,
    floatY: 15,
    floatX: -16,
    floatDuration: 17,
    parallaxFactor: 14,
    rotate: -2,
  },
] as const;

export function GateBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (video && !isReducedMotion()) {
      const play = () => {
        void video.play().catch(() => undefined);
      };
      play();
      video.addEventListener("loadeddata", play);
      return () => video.removeEventListener("loadeddata", play);
    }
  }, []);

  useEffect(() => {
    const reduced = isReducedMotion();
    const coarse = isCoarsePointer();
    const parallaxEnabled = !reduced && !coarse;

    floatRefs.current.forEach((el, i) => {
      const layer = PRODUCT_LAYERS[i];
      if (!el || !layer || reduced) return;

      gsap.to(el, {
        y: -layer.floatY,
        x: layer.floatX,
        rotate: layer.rotate,
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

      <video
        ref={videoRef}
        className="gate-bg-video absolute inset-0 h-full w-full object-cover opacity-[0.18] motion-reduce:hidden"
        src={BRAND_HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(45,212,191,0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(212,167,44,0.05),transparent_55%)]" />

      <div className="gate-light-sweep absolute inset-0 opacity-[0.06]" />

      <BrandAtmosphere
        dnaPositions={[
          { className: "left-[4%] top-[14%] h-40 w-11 text-teal-400/35 sm:h-48 sm:w-12", delay: 0 },
          { className: "right-[5%] bottom-[16%] h-36 w-10 text-teal-400/28 sm:h-44 sm:w-11", delay: 2 },
          { className: "left-[18%] bottom-[8%] h-28 w-8 text-teal-400/18", delay: 4 },
        ]}
      />
      <DnaHelixAccent className="gate-dna-drift-reverse absolute left-[50%] top-[6%] h-20 w-5 -translate-x-1/2 text-gold-400/18" />

      {BRAND_GATE_VIALS.map((vial, i) => {
        const layer = PRODUCT_LAYERS[i];
        if (!layer) return null;
        const isCenter = layer.role === "center";

        return (
          <div
            key={vial.id}
            ref={(el) => {
              parallaxRefs.current[i] = el;
            }}
            className={`gate-vial-drift absolute ${layer.className}`}
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
                width={isCenter ? 220 : 180}
                height={isCenter ? 330 : 270}
                priority={isCenter}
                className={`h-auto w-full object-contain ${
                  isCenter
                    ? "drop-shadow-[0_16px_48px_rgba(20,184,166,0.22)]"
                    : "drop-shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
