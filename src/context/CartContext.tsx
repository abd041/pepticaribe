"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/types/product";
import type { CartLine } from "@/types/cart";
import {
  getCartItemCount,
  getCartSubtotal,
  readCart,
  writeCart,
} from "@/lib/cart-storage";

export type CartAddedNotice = {
  id: string;
  displayName: string;
  sizeLabel: string;
  image: string;
};

export type AddToCartOptions = {
  /** Pack quantity — defaults to 1 */
  quantity?: number;
  /** Discounted per-unit price when a bundle tier is selected */
  unitPrice?: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  lastAdded: CartAddedNotice | null;
  addItem: (product: Product, variantId?: string, options?: AddToCartOptions) => void;
  dismissLastAdded: () => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function resolveVariant(product: Product, variantId?: string) {
  if (product.variants.length === 0) return null;
  if (variantId) {
    return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  }
  return product.variants.reduce((a, b) => (a.price <= b.price ? a : b));
}

function normalizeLine(line: CartLine): CartLine {
  return {
    ...line,
    sku: line.sku ?? line.variantId,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartAddedNotice | null>(null);

  useEffect(() => {
    setItems(readCart().map(normalizeLine));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeCart(items);
  }, [items, hydrated]);

  const dismissLastAdded = useCallback(() => {
    setLastAdded(null);
  }, []);

  const addItem = useCallback(
    (product: Product, variantId?: string, options?: AddToCartOptions) => {
      const variant = resolveVariant(product, variantId);
      if (!variant) return;

      const quantity = Math.max(1, options?.quantity ?? 1);
      const unitPrice = options?.unitPrice ?? variant.price;

      setLastAdded({
        id: `${variant.id}-${Date.now()}`,
        displayName: product.displayName,
        sizeLabel: variant.sizeLabel,
        image: variant.image || product.image,
      });

      setItems((prev) => {
        const existing = prev.find((line) => line.variantId === variant.id);
        if (existing) {
          return prev.map((line) =>
            line.variantId === variant.id
              ? {
                  ...line,
                  quantity: line.quantity + quantity,
                  price: unitPrice,
                }
              : line,
          );
        }

        const next: CartLine = {
          productId: product.id,
          variantId: variant.id,
          sku: variant.sku,
          slug: product.slug,
          displayName: product.displayName,
          sizeLabel: variant.sizeLabel,
          price: unitPrice,
          quantity,
          image: variant.image || product.image,
        };

        return [...prev, next];
      });
    },
    [],
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((line) => line.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.variantId !== variantId);
      }
      return prev.map((line) =>
        line.variantId === variantId ? { ...line, quantity } : line,
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: getCartItemCount(items),
      subtotal: getCartSubtotal(items),
      hydrated,
      lastAdded,
      addItem,
      dismissLastAdded,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, hydrated, lastAdded, addItem, dismissLastAdded, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
