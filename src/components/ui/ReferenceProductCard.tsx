"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { getCompoundProfile } from "@/lib/productImagery";
import { getProductFromPrice } from "@/lib/pricing";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";

interface ReferenceProductCardProps {
  product: Product;
  index: number;
  className?: string;
}

function getDefaultVariant(product: Product) {
  if (product.variants.length === 0) return null;
  return product.variants.reduce((a, b) => (a.price <= b.price ? a : b));
}

/** Premium best seller card — luxury product presentation system */
export function ReferenceProductCard({ product, index, className = "" }: ReferenceProductCardProps) {
  const fromPrice = getProductFromPrice(product);
  const profile = getCompoundProfile(product.slug);
  const variant = getDefaultVariant(product);
  const sizeLabel = variant?.sizeLabel ?? "—";

  if (!profile) return null;

  return (
    <article
      data-slug={product.slug}
      className={`best-seller-card ref-product-card polish-product-card qa-product-card art-product-card group overflow-hidden ${className}`}
    >
      <Link
        href={`/products/${product.slug}`}
        className="ref-product-image-wrap polish-product-stage block overflow-hidden"
        aria-label={`View ${product.displayName}`}
      >
        <LuxuryProductPresentation
          variant="card"
          alt={product.displayName}
          exhibit={profile.exhibit}
          priority={index < 2}
          sizes="(max-width: 1024px) 25vw, 220px"
        />
      </Link>

      <div className="ref-product-info polish-product-info qa-product-info">
        <div className="ref-product-info-row">
          <h3 className="ref-product-name polish-type-product-name font-display">{product.displayName}</h3>
          <span className="ref-product-price polish-type-product-price font-display">${fromPrice.toFixed(2)}</span>
        </div>

        <div className="ref-product-size-row">
          <span>{sizeLabel}</span>
          <span className="text-white/40">Research Grade</span>
        </div>

        <div className="ref-product-actions qa-product-actions">
          <Link href={`/products/${product.slug}`} className="ref-product-btn-teal polish-product-cta qa-btn-card-teal">
            View Details
          </Link>
          <button type="button" className="ref-product-btn-gold polish-product-cta qa-btn-card-gold">
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
}
