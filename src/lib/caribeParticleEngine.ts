export type CaribeParticleTone = "ivory" | "teal" | "gold";

export type CaribeParticleDot = {
  x: number;
  y: number;
  alpha: number;
  speed: number;
  size: number;
  tone: CaribeParticleTone;
};

export type CaribeParticlePalette = {
  ivory: string;
  teal: string;
  gold: string;
};

const PALETTES: Record<"hero" | "products" | "coa", CaribeParticlePalette> = {
  hero: {
    ivory: "255, 255, 255",
    teal: "14, 165, 198",
    gold: "232, 181, 71",
  },
  products: {
    ivory: "255, 255, 255",
    teal: "56, 189, 248",
    gold: "232, 181, 71",
  },
  coa: {
    ivory: "255, 255, 255",
    teal: "14, 165, 198",
    gold: "232, 181, 71",
  },
};

function createRng(seed: number) {
  let state = seed;
  return () => {
    state = (16807 * state) % 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function pickTone(rand: () => number, variant: "hero" | "products" | "coa"): CaribeParticleTone {
  if (variant === "coa") {
    if (rand() < 0.55) return "gold";
    if (rand() < 0.7) return "ivory";
    return "teal";
  }
  if (variant === "products") {
    if (rand() < 0.42) return "ivory";
    if (rand() < 0.82) return "teal";
    return "gold";
  }
  if (rand() < 0.45) return "ivory";
  if (rand() < 0.75) return "teal";
  return "gold";
}

function randomAlpha(rand: () => number, variant: "hero" | "products" | "coa"): number {
  if (variant === "products") {
    return rand() * 0.22 + 0.52;
  }
  if (variant === "coa") {
    return rand() * 0.24 + 0.22;
  }
  return rand() * 0.22 + 0.18;
}

function randomSize(rand: () => number, variant: "hero" | "products" | "coa"): number {
  if (variant === "products") {
    return rand() < 0.35 ? rand() * 1.25 + 2.15 : rand() * 0.85 + 1.15;
  }
  return rand() < 0.18 ? rand() * 0.9 + 1.6 : rand() * 0.55 + 0.85;
}

export function createCaribeParticles(
  variant: "hero" | "products" | "coa",
  count: number,
  seed = 42,
): CaribeParticleDot[] {
  const rand = createRng(seed);
  const dots: CaribeParticleDot[] = [];

  for (let i = 0; i < count; i++) {
    const fast = rand() < (variant === "products" ? 0.28 : 0.22);
    const speed =
      variant === "products"
        ? fast
          ? rand() * 0.00085 + 0.00055
          : rand() * 0.000055 + 0.00002
        : fast
          ? rand() * 0.0007 + 0.00045
          : rand() * 0.00004 + 0.000015;
    dots.push({
      x: rand(),
      y: rand(),
      alpha: randomAlpha(rand, variant),
      speed,
      size: randomSize(rand, variant),
      tone: pickTone(rand, variant),
    });
  }

  return dots;
}

export function getCaribeParticleColor(
  variant: "hero" | "products" | "coa",
  tone: CaribeParticleTone,
  alpha: number,
): string {
  const palette = PALETTES[variant];
  return `rgba(${palette[tone]}, ${alpha})`;
}
