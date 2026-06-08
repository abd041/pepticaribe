"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TOAST_DURATION_MS = 4800;

export function CartAddedToast() {
  const { lastAdded, dismissLastAdded, itemCount } = useCart();
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!lastAdded) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dismissLastAdded();
    }, TOAST_DURATION_MS);

    return () => clearTimeout(timerRef.current);
  }, [lastAdded, dismissLastAdded]);

  if (!lastAdded) return null;

  return (
    <div
      key={lastAdded.id}
      role="status"
      aria-live="polite"
      className={`cart-added-toast${reduceMotion ? " cart-added-toast--static" : ""}`}
    >
      <div className="cart-added-toast-accent" aria-hidden />
      <div className="cart-added-toast-body">
        <div className="cart-added-toast-media">
          <OptimizedImage
            src={lastAdded.image}
            alt=""
            width={56}
            height={64}
            sizes="56px"
            className="h-full w-full object-contain p-1"
          />
        </div>
        <div className="cart-added-toast-copy">
          <p className="cart-added-toast-eyebrow">
            <Check className="cart-added-toast-check" aria-hidden />
            {t("cart.addedTitle")}
          </p>
          <p className="cart-added-toast-name">{lastAdded.displayName}</p>
          <p className="cart-added-toast-meta">
            {lastAdded.sizeLabel}
            <span aria-hidden> · </span>
            {itemCount} {itemCount === 1 ? t("cart.item") : t("cart.items")}
          </p>
        </div>
        <button
          type="button"
          className="cart-added-toast-close"
          onClick={dismissLastAdded}
          aria-label={t("cart.dismissToast")}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="cart-added-toast-actions">
        <Link href="/cart" className="cart-added-toast-cta" onClick={dismissLastAdded}>
          {t("cart.viewCart")}
        </Link>
        <button type="button" className="cart-added-toast-dismiss" onClick={dismissLastAdded}>
          {t("cart.continueShopping")}
        </button>
      </div>
    </div>
  );
}
