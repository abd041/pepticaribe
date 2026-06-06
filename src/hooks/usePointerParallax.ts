"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface PointerParallax {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

/** Subtle cursor-reactive depth — lightweight, GPU-friendly */
export function usePointerParallax(intensity = 1) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const rafId = useRef(0);
  const [values, setValues] = useState<PointerParallax>({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
  });

  useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const clampedX = Math.max(0, Math.min(1, x));
        const clampedY = Math.max(0, Math.min(1, y));
        const nx = (clampedX - 0.5) * 2;
        const ny = (clampedY - 0.5) * 2;

        setValues({
          rotateX: -ny * 2.5 * intensity,
          rotateY: nx * 3 * intensity,
          glowX: clampedX * 100,
          glowY: clampedY * 100,
        });
      });
    };

    const onLeave = () => {
      setValues({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [reduceMotion, intensity]);

  return { ref, values, enabled: !reduceMotion };
}
