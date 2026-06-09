import type { BundleDiscount, Product } from "@/types/product";

export type PackBadgeVariant = "standard" | "off" | "popular" | "bulk";

export interface PackTier {
  quantity: number;
  discountPercent: number;
  badgeLabel?: string;
  badgeVariant: PackBadgeVariant;
  perkKeys: string[];
  isPopular?: boolean;
  isBulk?: boolean;
}

export interface PackQuote {
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  subtotal: number;
  total: number;
  perUnit: number;
  savings: number;
}

/** Bulk tier applied when a product has volume bundle tiers */
export const BULK_PACK_TIER: Omit<PackTier, "quantity"> & { quantity: 10 } = {
  quantity: 10,
  discountPercent: 20,
  badgeLabel: "20% off",
  badgeVariant: "bulk",
  perkKeys: [
    "bundle.perkDiscount",
    "bundle.perkHospiraBac",
    "bundle.perkPriority",
  ],
  isBulk: true,
};

function roundMoney(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function calculatePackQuote(
  unitPrice: number,
  quantity: number,
  discountPercent: number,
): PackQuote {
  const subtotal = roundMoney(unitPrice * quantity);
  const total = roundMoney(subtotal * (1 - discountPercent / 100));
  const perUnit = quantity > 0 ? roundMoney(total / quantity) : 0;
  const savings = roundMoney(subtotal - total);

  return {
    quantity,
    unitPrice,
    discountPercent,
    subtotal,
    total,
    perUnit,
    savings,
  };
}

function bundleToTier(bundle: BundleDiscount): PackTier {
  return {
    quantity: bundle.quantity,
    discountPercent: bundle.discountPercent,
    badgeLabel: bundle.label,
    badgeVariant: bundle.popular ? "popular" : "off",
    perkKeys: bundle.perkKeys ?? ["bundle.perkDiscount"],
    isPopular: bundle.popular,
  };
}

function standardTier(): PackTier {
  return {
    quantity: 1,
    discountPercent: 0,
    badgeLabel: "standard",
    badgeVariant: "standard",
    perkKeys: [],
  };
}

/** Build selectable pack tiers for the purchase panel */
export function buildPackTiers(product: Product): {
  tiers: PackTier[];
  bulkTier: PackTier | null;
  defaultQuantity: number;
} {
  if (product.bundles.length === 0) {
    return { tiers: [standardTier()], bulkTier: null, defaultQuantity: 1 };
  }

  const tiers: PackTier[] = [
    standardTier(),
    ...[...product.bundles]
      .sort((a, b) => a.quantity - b.quantity)
      .map(bundleToTier),
  ];

  const bulkTier: PackTier = {
    ...BULK_PACK_TIER,
    perkKeys: [...BULK_PACK_TIER.perkKeys],
  };

  const popular = tiers.find((tier) => tier.isPopular);
  const defaultQuantity = popular?.quantity ?? 1;

  return { tiers, bulkTier, defaultQuantity };
}

export function findPackTier(
  tiers: PackTier[],
  bulkTier: PackTier | null,
  quantity: number,
): PackTier | undefined {
  if (bulkTier?.quantity === quantity) return bulkTier;
  return tiers.find((tier) => tier.quantity === quantity);
}

export function productSupportsPacks(product: Product): boolean {
  return product.bundles.length > 0;
}
