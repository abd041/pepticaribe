/** Shared Framer Motion presets — Phase 1 motion system */

export const easeLuxury = [0.22, 1, 0.36, 1] as const;

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: easeLuxury },
});

export const fadeUpInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, delay, ease: easeLuxury },
});
