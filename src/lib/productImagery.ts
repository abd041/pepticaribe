/** Visual hierarchy + compound identity for premium product presentation */

import { HERO_SHOWCASE_REFERENCE } from "@/lib/heroAssets";

export type CompoundExhibitTone = "flagship" | "cyan" | "emerald" | "dual";

/** Per-product display — all exhibit PNGs share an identical normalized canvas */
export type ProductDisplaySettings = {
  scale: number;
  /** Vertical offset as % of slot height; positive moves vial down */
  y: number;
  intrinsicW: number;
  intrinsicH: number;
};

/** Normalized exhibit canvas (see scripts/generate-exhibit-assets.py) */
export const EXHIBIT_CANVAS = {
  width: 1060,
  height: 2274,
} as const;

/** Identical vial slot — editorial dominance */
export const EXHIBIT_VIAL_SLOT = {
  widthRatio: 0.84,
  heightRatio: 0.8,
  bottomOffset: 0.08,
} as const;

/** All four exhibit assets share the same canvas — no per-product scale needed */
export const UNIFIED_PRODUCT_DISPLAY: ProductDisplaySettings = {
  scale: 1,
  y: 0,
  intrinsicW: EXHIBIT_CANVAS.width,
  intrinsicH: EXHIBIT_CANVAS.height,
};

export const PRODUCT_DISPLAY_SETTINGS: Record<string, ProductDisplaySettings> = {
  "glp-3-rt": UNIFIED_PRODUCT_DISPLAY,
  "glp-2-t": UNIFIED_PRODUCT_DISPLAY,
  "ghk-cu": UNIFIED_PRODUCT_DISPLAY,
  "bpc-157-tb-500": UNIFIED_PRODUCT_DISPLAY,
  "bpc-157": UNIFIED_PRODUCT_DISPLAY,
  "mots-c": UNIFIED_PRODUCT_DISPLAY,
  "nad-plus": UNIFIED_PRODUCT_DISPLAY,
  "cjc-1295-ipamorelin": UNIFIED_PRODUCT_DISPLAY,
};

export const DEFAULT_PRODUCT_DISPLAY = UNIFIED_PRODUCT_DISPLAY;

/** Identical exhibit stage dimensions for every featured card */
export const EXHIBIT_STAGE_HEIGHT_CLASS =
  "h-[400px] sm:h-[440px] lg:h-[480px]";

export function getProductDisplaySettings(
  slug: string,
): ProductDisplaySettings {
  return PRODUCT_DISPLAY_SETTINGS[slug] ?? DEFAULT_PRODUCT_DISPLAY;
}

export type CompoundExhibitIdentity = {
  slug: string;
  src: string;
  tone: CompoundExhibitTone;
  display: ProductDisplaySettings;
};

export type CompoundProfile = {
  verificationLevel: string;
  researchField: string;
  positioning: string;
  snapshot: {
    purity: string;
    verification: string;
    coa: string;
  };
  exhibit: CompoundExhibitIdentity;
};

const EXHIBIT_IMAGE_BASE = "/products/exhibit";

/** Transparent exhibit PNGs — normalized to identical canvas dimensions */
export const COMPOUND_EXHIBIT_IMAGES: Record<string, string> = {
  "bacteriostatic-water": `${EXHIBIT_IMAGE_BASE}/bacteriostatic-water.png`,
  "glp-3-rt": `${EXHIBIT_IMAGE_BASE}/glp-3-rt.png`,
  "glp-2-t": `${EXHIBIT_IMAGE_BASE}/glp-2-t.png`,
  "ghk-cu": `${EXHIBIT_IMAGE_BASE}/ghk-cu.png`,
  "bpc-157-tb-500": `${EXHIBIT_IMAGE_BASE}/wolverine.png`,
  "bpc-157": `${EXHIBIT_IMAGE_BASE}/bpc-157.png`,
  "mots-c": `${EXHIBIT_IMAGE_BASE}/mots-c.png`,
  "cjc-1295-ipamorelin": `${EXHIBIT_IMAGE_BASE}/cjc-1295-ipamorelin.png`,
  "ss-31": `${EXHIBIT_IMAGE_BASE}/ss-31.png`,
  "kpv": `${EXHIBIT_IMAGE_BASE}/kpv.png`,
  "nad-plus": `${EXHIBIT_IMAGE_BASE}/nad-plus.png`,
  "glutathione": `${EXHIBIT_IMAGE_BASE}/glutathione.png`,
  "5-amino-1mq": `${EXHIBIT_IMAGE_BASE}/5-amino-1mq.png`,
  "tesamorelin": `${EXHIBIT_IMAGE_BASE}/tesamorelin.png`,
  "klow": `${EXHIBIT_IMAGE_BASE}/klow.png`,
  "adamax": `${EXHIBIT_IMAGE_BASE}/adamax.png`,
  "semax": `${EXHIBIT_IMAGE_BASE}/semax.png`,
  "selank": `${EXHIBIT_IMAGE_BASE}/selank.png`,
  "melanotan-ii": `${EXHIBIT_IMAGE_BASE}/melanotan-ii.png`,
  "dsip": `${EXHIBIT_IMAGE_BASE}/dsip.png`,
  "pt-141": `${EXHIBIT_IMAGE_BASE}/pt-141.png`,
};

export function getExhibitImagePath(slug: string): string | undefined {
  return COMPOUND_EXHIBIT_IMAGES[slug];
}

/** Featured BPC-157 centerpiece — single vial on illuminated pedestal (homepage only) */
export const FEATURED_BPC_SHOWCASE = {
  src: "/products/featured/bpc-157-showcase.png",
  width: 910,
  height: 1024,
} as const;

export const FEATURED_BPC_EXHIBIT = FEATURED_BPC_SHOWCASE;

/** @deprecated Use HERO_SHOWCASE_REFERENCE from @/lib/heroAssets */
export const HERO_FLAGSHIP_IMAGE = HERO_SHOWCASE_REFERENCE.src;

export const HERO_COMPOUND_ANNOTATIONS = [
  { label: "Compound", value: "GLP-3 RT" },
  { label: "Purity", value: "99%+" },
  { label: "Accreditation", value: "ISO 17025 Verified" },
  { label: "Batch Status", value: "Tested" },
  { label: "Classification", value: "Research Use Only" },
] as const;

/** Featured compounds — distinct exhibit identities */
export const FEATURED_COMPOUND_PROFILES: Record<string, CompoundProfile> = {
  "glp-3-rt": {
    verificationLevel: "Institutional Grade",
    researchField: "Metabolic Research",
    positioning:
      "Research compound for metabolic pathway and receptor signaling investigation.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "glp-3-rt",
      src: COMPOUND_EXHIBIT_IMAGES["glp-3-rt"],
      tone: "flagship",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
  "ghk-cu": {
    verificationLevel: "Lab Verified",
    researchField: "Recovery & Regeneration",
    positioning:
      "Copper peptide compound for cellular recovery and tissue regeneration studies.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "ghk-cu",
      src: COMPOUND_EXHIBIT_IMAGES["ghk-cu"],
      tone: "emerald",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
  "bpc-157-tb-500": {
    verificationLevel: "Advanced Protocol",
    researchField: "Advanced Research",
    positioning:
      "Dual-compound formulation for advanced recovery protocol research.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "bpc-157-tb-500",
      src: COMPOUND_EXHIBIT_IMAGES["bpc-157-tb-500"],
      tone: "dual",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
  "glp-2-t": {
    verificationLevel: "Research Verified",
    researchField: "Cellular Support",
    positioning:
      "GLP agonist compound for cellular metabolism and signaling research.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "glp-2-t",
      src: COMPOUND_EXHIBIT_IMAGES["glp-2-t"],
      tone: "cyan",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
  "bpc-157": {
    verificationLevel: "Lab Verified",
    researchField: "Tissue Protection",
    positioning:
      "Synthetic pentadecapeptide for tissue protection and angiogenic signaling research.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "bpc-157",
      src: COMPOUND_EXHIBIT_IMAGES["bpc-157"],
      tone: "emerald",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
  "mots-c": {
    verificationLevel: "Research Verified",
    researchField: "Mitochondrial Research",
    positioning:
      "Mitochondrial-derived peptide for metabolic regulation and cellular energy studies.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "mots-c",
      src: COMPOUND_EXHIBIT_IMAGES["mots-c"],
      tone: "cyan",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
  "nad-plus": {
    verificationLevel: "Institutional Grade",
    researchField: "Cellular Metabolism",
    positioning:
      "Coenzyme compound for redox signaling, mitochondrial function, and energy pathway research.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "nad-plus",
      src: COMPOUND_EXHIBIT_IMAGES["nad-plus"],
      tone: "flagship",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
  "cjc-1295-ipamorelin": {
    verificationLevel: "Advanced Protocol",
    researchField: "Growth Signaling",
    positioning:
      "Dual-peptide blend for growth hormone release and metabolic signaling research.",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug: "cjc-1295-ipamorelin",
      src: COMPOUND_EXHIBIT_IMAGES["cjc-1295-ipamorelin"],
      tone: "dual",
      display: UNIFIED_PRODUCT_DISPLAY,
    },
  },
};

export function getCompoundProfile(slug: string): CompoundProfile | undefined {
  return FEATURED_COMPOUND_PROFILES[slug];
}

function exhibitToneForSlug(
  slug: string,
  category?: "peptide" | "blend" | "accessory" | "small-molecule",
): CompoundExhibitTone {
  const featured = FEATURED_COMPOUND_PROFILES[slug];
  if (featured) return featured.exhibit.tone;
  if (category === "blend") return "dual";
  if (category === "accessory") return "emerald";
  return "cyan";
}

/** Featured profile when mapped; otherwise catalog image on the luxury stage */
export function resolveCompoundProfile(
  slug: string,
  image: string,
  category?: "peptide" | "blend" | "accessory" | "small-molecule",
): CompoundProfile {
  const featured = FEATURED_COMPOUND_PROFILES[slug];
  if (featured) return featured;

  const exhibitSrc = getExhibitImagePath(slug) ?? image;

  return {
    verificationLevel: "Research Verified",
    researchField: "Laboratory Research",
    positioning: "",
    snapshot: { purity: "99%+", verification: "Independent", coa: "Available" },
    exhibit: {
      slug,
      src: exhibitSrc,
      tone: exhibitToneForSlug(slug, category),
      display: DEFAULT_PRODUCT_DISPLAY,
    },
  };
}
