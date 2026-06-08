"use client";

import { useEffect, useRef } from "react";
import {
  createCaribeParticles,
  getCaribeParticleColor,
  type CaribeParticleDot,
} from "@/lib/caribeParticleEngine";
import { isReducedMotion } from "@/lib/gsap/motion";

export type CaribeParticleVariant = "hero" | "products" | "coa";

/** Shared canvas preset — homepage hero + /products catalog */
export const CANVAS_PARTICLE_PRESET = {
  variant: "products" as const,
  engine: "canvas" as const,
  density: 200,
};

type CaribeParticleFieldProps = {
  variant: CaribeParticleVariant;
  className?: string;
  /** Canvas dots — reliable on marketing pages */
  engine?: "auto" | "css" | "canvas";
  density?: number;
};

const DENSITY: Record<CaribeParticleVariant, number> = {
  hero: 72,
  products: 200,
  coa: 84,
};

const BASE_RADIUS: Record<CaribeParticleVariant, number> = {
  hero: 1.35,
  products: 2.05,
  coa: 1.4,
};

function shouldUseCanvas(variant: CaribeParticleVariant, engine: CaribeParticleFieldProps["engine"]) {
  if (engine === "css") return false;
  if (engine === "canvas") return true;
  return variant === "products";
}

function CaribeParticleCanvas({
  variant,
  className,
  density,
}: {
  variant: CaribeParticleVariant;
  className: string;
  density: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<CaribeParticleDot[]>(createCaribeParticles(variant, density));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = isReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const dots = dotsRef.current;
    const rand = () => Math.random();

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;

      width = Math.max(1, Math.floor(w * dpr));
      height = Math.max(1, Math.floor(h * dpr));
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const baseRadius = BASE_RADIUS[variant] * dpr;

      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x * width, dot.y * height, baseRadius * dot.size, 0, Math.PI * 2);
        ctx.fillStyle = getCaribeParticleColor(variant, dot.tone, dot.alpha);
        ctx.fill();
      }
    };

    const tick = () => {
      if (!reducedMotion) {
        for (const dot of dots) {
          dot.y -= dot.speed;
          if (dot.y < -0.02) {
            dot.y = 1.02;
            dot.x = rand();
          }
        }
      }
      draw();
      rafId = window.requestAnimationFrame(tick);
    };

    resize();
    rafId = window.requestAnimationFrame(tick);

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        draw();
      }, 120);
    };

    window.addEventListener("resize", onResize);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize();
          })
        : null;
    if (canvas.parentElement && observer) {
      observer.observe(canvas.parentElement);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [variant, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`caribe-particle-canvas caribe-particle-canvas--${variant} ${className}`.trim()}
      aria-hidden
    />
  );
}

/** Ivory, teal, and gold atmosphere motes */
export function CaribeParticleField({
  variant,
  className = "",
  engine = "auto",
  density,
}: CaribeParticleFieldProps) {
  const dotCount = density ?? DENSITY[variant];

  if (shouldUseCanvas(variant, engine)) {
    return <CaribeParticleCanvas variant={variant} className={className} density={dotCount} />;
  }

  return (
    <div
      className={`caribe-particle-field caribe-particle-field--${variant} ${className}`.trim()}
      aria-hidden
    />
  );
}
