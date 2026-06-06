"use client";

import { useEffect, useRef } from "react";
import { getScrollProgress } from "@/lib/smoothScroll";

/** Sets --scroll-progress for ambient scroll narrative (scroll-only, throttled) */
export function ScrollNarrative() {
  const rafId = useRef(0);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduced) return;

    const update = () => {
      document.documentElement.style.setProperty(
        "--scroll-progress",
        getScrollProgress().toFixed(4),
      );
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null;
}
