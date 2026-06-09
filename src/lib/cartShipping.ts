/** Client reference — free 2-day shipping over this subtotal (USD) */
export const FREE_SHIPPING_THRESHOLD_USD = 175;

export function freeShippingRemaining(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD_USD - subtotal);
}

export function hasFreeShipping(subtotal: number): boolean {
  return subtotal >= FREE_SHIPPING_THRESHOLD_USD;
}

export function freeShippingProgress(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_USD) * 100);
}
