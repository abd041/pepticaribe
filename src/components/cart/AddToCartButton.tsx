"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import type { Product } from "@/types/product";
import type { AddToCartOptions } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AddToCartButtonProps = {
  product: Product;
  variantId?: string;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  cartOptions?: AddToCartOptions;
};

const ADDED_FEEDBACK_MS = 2200;

export function AddToCartButton({
  product,
  variantId,
  className = "",
  children,
  disabled = false,
  cartOptions,
}: AddToCartButtonProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleClick = () => {
    if (disabled) return;
    addItem(product, variantId, cartOptions);
    setAdded(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), ADDED_FEEDBACK_MS);
  };

  return (
    <button
      type="button"
      className={`add-to-cart-btn${added ? " is-added-to-cart" : ""}${reduceMotion ? " add-to-cart-btn--static" : ""} ${className}`.trim()}
      onClick={handleClick}
      disabled={disabled}
      aria-live="polite"
    >
      {added ? (
        <>
          <Check className="add-to-cart-btn-check" aria-hidden />
          <span>{t("cart.addedShort")}</span>
        </>
      ) : (
        children ?? t("common.addToCart")
      )}
    </button>
  );
}
