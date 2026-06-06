import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const CINEMATIC_EASE = "power3.out";
export const SPRING_EASE = "back.out(1.4)";

/** Shared homepage motion tokens — keep LuxuryMotion + atmosphere in sync */
export const MOTION = {
  heroEntrance: 0.95,
  reveal: 0.75,
  revealY: 24,
  staggerItem: 0.07,
  staggerMax: 0.28,
  revealStart: "top 82%",
  staggerStart: "top 80%",
  featuredStart: "top 75%",
} as const;

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

type RevealOptions = {
  y?: number;
  duration?: number;
  start?: string;
  opacity?: number;
};

/** Scroll reveal for a single element */
export function bindLuxReveal(el: Element, options: RevealOptions = {}) {
  const { y = MOTION.revealY, duration = MOTION.reveal, start = MOTION.revealStart, opacity = 0 } =
    options;

  return gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none none",
    },
    y,
    opacity,
    duration,
    ease: CINEMATIC_EASE,
  });
}

/** Stagger children within each `.lux-stagger-group` — index resets per group */
export function bindLuxStaggerGroups(selector = ".lux-stagger-group") {
  const animations: gsap.core.Tween[] = [];

  gsap.utils.toArray<HTMLElement>(selector).forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(".lux-stagger-item");
    items.forEach((el, i) => {
      const delay = Math.min(i * MOTION.staggerItem, MOTION.staggerMax);
      animations.push(
        gsap.from(el, {
          scrollTrigger: {
            trigger: group,
            start: MOTION.staggerStart,
            toggleActions: "play none none none",
          },
          y: 24,
          opacity: 0,
          duration: MOTION.reveal,
          delay,
          ease: CINEMATIC_EASE,
        }),
      );
    });
  });

  return animations;
}

/** Refresh ScrollTrigger after layout-affecting assets settle */
export function scheduleScrollTriggerRefresh(rootSelector = ".homepage-narrative") {
  const refresh = () => ScrollTrigger.refresh();
  const onImageLoad = () => refresh();

  window.addEventListener("load", refresh, { once: true });

  const root = document.querySelector(rootSelector);
  const images = root ? Array.from(root.querySelectorAll("img")) : [];
  images.forEach((img) => {
    if (!img.complete) {
      img.addEventListener("load", onImageLoad, { once: true });
    }
  });

  requestAnimationFrame(refresh);

  return () => {
    window.removeEventListener("load", refresh);
    images.forEach((img) => img.removeEventListener("load", onImageLoad));
  };
}
