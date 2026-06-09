import type { TranslationKey } from "@/data/translations";
import { formatUsd } from "@/lib/pricing";

export function formatTranslation(
  t: (key: TranslationKey) => string,
  key: TranslationKey,
  params: Record<string, string>,
): string {
  return Object.entries(params).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, value),
    t(key),
  );
}

/** Client preference: show % off and dollar savings together */
export function formatDiscountOffAndSave(
  t: (key: TranslationKey) => string,
  discountPercent: number,
  savings: number,
): string {
  return formatTranslation(t, "products.discountOffAndSave", {
    percent: String(discountPercent),
    amount: formatUsd(savings),
  });
}
