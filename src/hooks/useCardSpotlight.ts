"use client";

import { useCallback, useRef } from "react";

/** Cursor-reactive card spotlight — sets --spot-x / --spot-y CSS vars */
export function useCardSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "50%");
    el.style.setProperty("--spot-y", "50%");
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
