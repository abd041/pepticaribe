"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import {
  EXHIBIT_STAGE_HEIGHT_CLASS,
  getCompoundProfile,
} from "@/lib/productImagery";
import { getProductFromPrice } from "@/lib/pricing";
import { CompoundExhibitStage } from "@/components/ui/CompoundExhibitStage";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LuxuryProductCardProps {
  product: Product;
  index: number;
}

/** Luxury research-grade specimen presentation — curated display, not catalog listing */
export function LuxuryProductCard({ product, index }: LuxuryProductCardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();
  const fromPrice = getProductFromPrice(product);
  const profile = getCompoundProfile(product.slug);

  if (!profile) return null;

  return (
    <article
      ref={ref}
      data-slug={product.slug}
      data-tone={profile.exhibit.tone}
      className={`product-showcase-card editorial-product-card group motion-reveal ${inView || reduceMotion ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="product-showcase-vitrine">
        <div className="product-showcase-frame" aria-hidden="true" />

        <div
          className={`product-showcase-stage editorial-product-stage ${EXHIBIT_STAGE_HEIGHT_CLASS}`}
        >
          <div className="product-showcase-chamber-light" aria-hidden="true" />
          <div className="product-showcase-pedestal-surface" aria-hidden="true" />
          <div className="product-showcase-reflection-surface" aria-hidden="true" />

          <CompoundExhibitStage
            alt={product.displayName}
            exhibit={profile.exhibit}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 520px"
            priority={index < 2}
          />
        </div>

        <div className="product-showcase-plinth" aria-hidden="true" />
      </div>

      <div className="product-showcase-meta editorial-product-meta">
        <div className="product-showcase-meta-row">
          <span className="product-showcase-registry-mark" aria-hidden="true" />

          <div className="product-showcase-meta-primary editorial-product-meta-primary">
            <h3 className="product-showcase-name type-editorial-product-name font-display">
              {product.displayName}
            </h3>
            <div className="product-showcase-precision-divider" aria-hidden="true" />
            <p className="product-showcase-price type-editorial-price">
              From{" "}
              <span className="font-display">${fromPrice}</span>
            </p>
          </div>
        </div>

        <div className="product-showcase-actions editorial-product-actions">
          <Link
            href={`/products/${product.slug}`}
            className="editorial-btn editorial-btn-primary product-showcase-btn"
          >
            View More
          </Link>
          <button
            type="button"
            className="editorial-btn editorial-btn-secondary product-showcase-btn"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
}
