"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getScrollProgress } from "@/lib/smoothScroll";

/** Sets --scroll-progress for ambient scroll narrative (rAF throttled, GPU-safe) */
export function ScrollNarrative() {
  const rafId = useRef(0);

  useEffect(() => {
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
    gsap.ticker.add(scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      gsap.ticker.remove(scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null;
}
