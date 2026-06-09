"use client";

import { useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductCardPrice } from "@/components/products/ProductCardPrice";
import { ProductVariantChips } from "@/components/products/ProductVariantChips";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";
import { useLanguage } from "@/context/LanguageContext";
import { hasMultipleVariants } from "@/lib/pricing";
import { resolveCompoundProfile } from "@/lib/productImagery";
import { getProductVideoPath } from "@/lib/videoAssets";
import { stripRuoSuffix } from "@/lib/productDetail";

function getDefaultVariant(product: Product) {
  if (product.variants.length === 0) return null;
  return product.variants.reduce((a, b) => (a.price <= b.price ? a : b));
}

type ProductCatalogRowProps = {
  product: Product;
  index: number;
};

export function ProductCatalogRow({ product, index }: ProductCatalogRowProps) {
  const { t } = useLanguage();
  const profile = resolveCompoundProfile(product.slug, product.image, product.category);
  const defaultVariant = getDefaultVariant(product);
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?.id ?? "");
  const [videoFailed, setVideoFailed] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? defaultVariant;
  const multipleSizes = hasMultipleVariants(product);
  const sizeLabel = selectedVariant?.sizeLabel ?? "—";

  const videoSrc = getProductVideoPath(product.slug) ?? product.video;
  const showVideo = index % 2 === 1 && Boolean(videoSrc) && !videoFailed;
  const mediaOnRight = index % 2 === 1;

  const description = stripRuoSuffix(product.shortDescription ?? product.description);

  const mediaPanel = showVideo ? (
    <div className="catalog-row-media catalog-row-media--video">
      <span className="catalog-row-media-badge">
        <Play className="h-3 w-3" aria-hidden />
        {t("products.catalogVideoBadge")}
      </span>
      <div className="catalog-row-video-shell">
        <video
          src={videoSrc}
          poster={profile.exhibit.src}
          className="catalog-row-video"
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoFailed(true)}
        />
      </div>
    </div>
  ) : (
    <Link
      href={`/products/${product.slug}`}
      className="catalog-row-media catalog-row-media--image"
      aria-label={`${product.displayName} — ${t("featured.viewDetails")}`}
    >
      <LuxuryProductPresentation
        variant="card"
        alt={product.displayName}
        exhibit={profile.exhibit}
        priority={index < 2}
        sizes="(max-width: 1024px) 42vw, 280px"
      />
    </Link>
  );

  const bodyPanel = (
    <div className="catalog-row-body">
      <p className="catalog-row-index" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2 className="catalog-row-title">
        <Link href={`/products/${product.slug}`}>{product.displayName}</Link>
      </h2>
      <p className="catalog-row-desc">{description}</p>

      <div className="catalog-row-price-row">
        <ProductCardPrice
          product={product}
          selectedVariantId={multipleSizes ? selectedVariantId : undefined}
          className="catalog-row-price"
          priceClassName="font-display"
        />
      </div>

      {multipleSizes ? (
        <ProductVariantChips
          product={product}
          className="catalog-row-chips"
          selectedId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />
      ) : (
        <p className="catalog-row-size">{sizeLabel}</p>
      )}

      <div className="catalog-row-actions">
        <Link href={`/products/${product.slug}`} className="ref-product-btn-teal catalog-row-btn">
          {t("featured.viewDetails")}
        </Link>
        <AddToCartButton
          product={product}
          variantId={selectedVariant?.id}
          disabled={!selectedVariant}
          className="ref-product-btn-gold catalog-row-btn"
        />
      </div>
    </div>
  );

  return (
    <article
      className={`catalog-row${mediaOnRight ? " catalog-row--media-right" : " catalog-row--media-left"}`}
      data-slug={product.slug}
    >
      {mediaOnRight ? (
        <>
          {bodyPanel}
          {mediaPanel}
        </>
      ) : (
        <>
          {mediaPanel}
          {bodyPanel}
        </>
      )}
    </article>
  );
}
