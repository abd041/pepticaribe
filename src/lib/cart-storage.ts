import type { CartLine, CartState } from "@/types/cart";

const CART_KEY = "pepticaribe_cart";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartState;
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartLine[]): void {
  if (typeof window === "undefined") return;
  const state: CartState = { items, updatedAt: new Date().toISOString() };
  localStorage.setItem(CART_KEY, JSON.stringify(state));
}

export function getCartItemCount(items: CartLine[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(items: CartLine[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
