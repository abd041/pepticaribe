/**
 * Client brand deliverables — public/brand/
 * URL-safe filenames (no spaces) for production use.
 */

export const BRAND_VIALS = {
  left: {
    src: "/brand/vial-1.png",
    width: 3024,
    height: 2688,
  },
  center: {
    src: "/brand/vial-2.png",
    width: 2688,
    height: 3024,
  },
  right: {
    src: "/brand/vial-3.png",
    width: 3024,
    height: 2688,
  },
} as const;

export const BRAND_GATE_VIALS = [
  { id: "left" as const, ...BRAND_VIALS.left },
  { id: "center" as const, ...BRAND_VIALS.center },
  { id: "right" as const, ...BRAND_VIALS.right },
] as const;

/** Hero / products ambient motion — 3-vial AI render */
export const BRAND_HERO_VIDEO = "/brand/hero-three-vials.mp4" as const;

/** Sample certificate for COA library preview + carousel */
export const BRAND_SAMPLE_COA_PDF = "/coa/sample-coa.pdf" as const;

/** Featured BPC-157 centerpiece vial */
export const BRAND_FEATURED_VIAL = BRAND_VIALS.left;
