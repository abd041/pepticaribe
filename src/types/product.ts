/**
 * PeptiCaribe product catalog types.
 * Source of truth for headless WooCommerce sync and UI layers.
 */

export interface BundleDiscount {
  /** Number of vials/units required */
  quantity: number;
  /** Percentage off (e.g. 5 = 5%) */
  discountPercent: number;
  /** Badge label e.g. "5% off", "MOST POPULAR" */
  label?: string;
  /** i18n keys for perk lines (see bundle.perk* translations) */
  perkKeys?: string[];
  /** Highlights this tier as the recommended default */
  popular?: boolean;
}

export interface COABatch {
  lotNumber: string;
  purityPercent: number;
  labeledWeight: string;
  actualWeight: string;
  testedDate: string;
  /** Path to COA PDF in /public/coa */
  pdfUrl: string;
  /** Path to COA preview image if available */
  previewImageUrl?: string;
  labName: string;
  isLatest?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  sizeLabel: string;
  sizeMg?: number;
  price: number;
  /** Path relative to /public */
  image: string;
  /** Per-variant COA PDF placeholder */
  coaPdf?: string;
  inStock?: boolean;
}

export interface Product {
  id: string;
  /** Internal/catalog name from client document */
  name: string;
  /** Customer-facing display name (mockup labels) */
  displayName: string;
  slug: string;
  /** Parent/base SKU */
  sku: string;
  description: string;
  shortDescription?: string;
  researchUseOnly: true;
  /** Hidden until launch when true */
  isPrivate: boolean;
  featured?: boolean;
  category: ProductCategory;
  /** Default hero/card image */
  image: string;
  /** Product-level AI video */
  video?: string;
  variants: ProductVariant[];
  bundles: BundleDiscount[];
  coaBatches: COABatch[];
  tags?: string[];
}

export type ProductCategory =
  | "peptide"
  | "blend"
  | "accessory"
  | "small-molecule";

export interface ProductCatalogStats {
  totalProducts: number;
  publicProducts: number;
  privateProducts: number;
  totalImagesMapped: number;
  totalVideosMapped: number;
  productsMissingImage: string[];
  productsMissingVideo: string[];
  productsMissingCoa: string[];
  unmappedImages: string[];
  unmappedVideos: string[];
}
