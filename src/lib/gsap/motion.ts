import gsap from "gsap";

export const CINEMATIC_EASE = "power3.out";
export const SPRING_EASE = "back.out(1.4)";

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Kill all tweens on targets and optionally reset inline styles */
export function killTweens(
  targets: gsap.TweenTarget,
  clearProps?: string | boolean,
): void {
  gsap.killTweensOf(targets);
  if (clearProps) {
    gsap.set(targets, { clearProps: clearProps === true ? "all" : clearProps });
  }
}
