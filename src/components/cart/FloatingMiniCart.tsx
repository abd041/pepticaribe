"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { formatUsd } from "@/lib/pricing";

const HIDDEN_PREFIXES = ["/cart", "/checkout"];

function isHiddenPath(pathname: string): boolean {
  return HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function FloatingMiniCart() {
  const pathname = usePathname();
  const { itemCount, subtotal, hydrated } = useCart();
  const { t } = useLanguage();
  const [pulse, setPulse] = useState(false);
  const prevCountRef = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCountRef.current) {
      setPulse(true);
      const timer = window.setTimeout(() => setPulse(false), 650);
      prevCountRef.current = itemCount;
      return () => window.clearTimeout(timer);
    }
    prevCountRef.current = itemCount;
  }, [itemCount]);

  if (!hydrated || isHiddenPath(pathname)) return null;

  const hasItems = itemCount > 0;
  const ariaLabel = hasItems
    ? `${t("nav.cart")}, ${itemCount} ${itemCount === 1 ? t("cart.item") : t("cart.items")}, ${formatUsd(subtotal)}`
    : t("nav.cart");

  return (
    <Link
      href="/cart"
      className={`floating-mini-cart interaction-lift${hasItems ? " floating-mini-cart-has-items" : ""}${pulse ? " floating-mini-cart-pulse" : ""}`}
      aria-label={ariaLabel}
    >
      <span className="floating-mini-cart-icon-wrap">
        <ShoppingBag className="floating-mini-cart-icon" strokeWidth={1.75} aria-hidden />
        {hasItems ? (
          <span className="floating-mini-cart-badge cart-badge" aria-hidden>
            {itemCount}
          </span>
        ) : null}
      </span>
      {hasItems ? (
        <span className="floating-mini-cart-meta" aria-hidden>
          <span className="floating-mini-cart-label">{t("nav.cart")}</span>
          <span className="floating-mini-cart-total">{formatUsd(subtotal)}</span>
        </span>
      ) : null}
    </Link>
  );
}
