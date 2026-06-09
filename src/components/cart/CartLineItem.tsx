"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/types/cart";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { formatUsd } from "@/lib/pricing";
import { resolveCompoundProfile } from "@/lib/productImagery";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { formatTranslation } from "@/lib/i18n-format";

type CartLineItemProps = {
  line: CartLine;
};

export function CartLineItem({ line }: CartLineItemProps) {
  const { t } = useLanguage();
  const { updateQuantity, removeItem } = useCart();
  const profile = resolveCompoundProfile(line.slug, line.image);
  const thumbSrc = profile.exhibit?.src ?? line.image;
  const lineTotal = line.price * line.quantity;

  return (
    <article className="cart-line-item">
      <Link
        href={`/products/${line.slug}`}
        className="cart-line-thumb"
        aria-label={line.displayName}
      >
        <span className="cart-line-thumb-glow" aria-hidden />
        <OptimizedImage
          src={thumbSrc}
          alt=""
          width={96}
          height={112}
          sizes="96px"
          className="cart-line-thumb-img"
        />
      </Link>

      <div className="cart-line-body">
        <Link href={`/products/${line.slug}`} className="cart-line-name">
          {line.displayName}
        </Link>
        <p className="cart-line-meta">
          {line.sizeLabel} · {t("cart.sku")} {line.sku}
        </p>
        <div className="cart-line-unit-row">
          <span className="cart-line-unit-price">{formatUsd(line.price)}</span>
          {line.quantity > 1 ? (
            <span className="cart-line-unit-breakdown">
              {formatTranslation(t, "cart.perUnitLine", {
                qty: String(line.quantity),
                price: formatUsd(line.price),
              })}
            </span>
          ) : null}
        </div>
      </div>

      <div className="cart-line-actions">
        <div className="cart-line-qty" role="group" aria-label={t("cart.quantity")}>
          <button
            type="button"
            onClick={() => updateQuantity(line.variantId, line.quantity - 1)}
            className="cart-line-qty-btn"
            aria-label={`Decrease quantity for ${line.displayName}`}
          >
            <Minus className="h-3.5 w-3.5" aria-hidden />
          </button>
          <span className="cart-line-qty-value" aria-live="polite">
            {line.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(line.variantId, line.quantity + 1)}
            className="cart-line-qty-btn"
            aria-label={`Increase quantity for ${line.displayName}`}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>

        <div className="cart-line-total-block">
          <p className="cart-line-total-label">{t("cart.lineTotal")}</p>
          <p className="cart-line-total-value">{formatUsd(lineTotal)}</p>
        </div>

        <button
          type="button"
          onClick={() => removeItem(line.variantId)}
          className="cart-line-remove"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          <span>{t("cart.remove")}</span>
        </button>
      </div>
    </article>
  );
}
