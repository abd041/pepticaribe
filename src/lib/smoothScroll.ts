import { ScrollSmoother } from "gsap/ScrollSmoother";

export const SMOOTH_SCROLL_MIN_WIDTH = 768;
export const SMOOTH_SCROLL_DURATION = 1.35;

/** Set true once ScrollSmoother is verified on target browsers */
export const SMOOTH_SCROLL_ENABLED = false;

export function isSmoothScrollActive(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("smooth-scroll-active");
}

export function getScrollTop(): number {
  if (typeof window === "undefined") return 0;
  const smoother = ScrollSmoother.get();
  if (smoother && isSmoothScrollActive()) {
    return smoother.scrollTop();
  }
  return window.scrollY;
}

export function getMaxScroll(): number {
  if (typeof window === "undefined" || typeof document === "undefined") return 0;

  if (isSmoothScrollActive()) {
    const content = document.getElementById("smooth-content");
    if (content) {
      return Math.max(0, content.scrollHeight - window.innerHeight);
    }
  }

  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

export function getScrollProgress(): number {
  const max = getMaxScroll();
  if (max <= 0) return 0;
  return getScrollTop() / max;
}

export function shouldUseSmoothScroll(): boolean {
  if (!SMOOTH_SCROLL_ENABLED) return false;
  if (typeof window === "undefined") return false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia(`(max-width: ${SMOOTH_SCROLL_MIN_WIDTH - 1}px)`).matches;
  return !reduced && !mobile;
}
