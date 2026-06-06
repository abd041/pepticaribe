"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Lightweight cursor-reactive ambient glow — CSS vars + rAF throttling */
export function CursorAtmosphere() {
  const reduceMotion = useReducedMotion();
  const rafId = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 1023px)").matches;
    setEnabled(!coarse && !narrow && !reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${e.clientX}px`);
        root.style.setProperty("--cursor-y", `${e.clientY}px`);
        root.style.setProperty("--cursor-active", "1");
      });
    };

    const onLeave = () => {
      root.style.setProperty("--cursor-active", "0");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
      root.style.removeProperty("--cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor-atmosphere pointer-events-none fixed inset-0 z-[2]" aria-hidden>
      <div className="cursor-glow-orb" />
    </div>
  );
}
