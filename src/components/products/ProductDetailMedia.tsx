"use client";

import { useState } from "react";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";
import { ProductVideo } from "@/components/ui/ProductVideo";
import type { CompoundProfile } from "@/lib/productImagery";
import { getProductVideoPath } from "@/lib/videoAssets";
import type { Product, ProductVariant } from "@/types/product";

type ProductDetailMediaProps = {
  product: Product;
  profile: CompoundProfile;
  selectedVariant?: ProductVariant;
};

/** Luxury exhibit stage — product video when available, exhibit PNG as fallback */
export function ProductDetailMedia({
  product,
  profile,
  selectedVariant,
}: ProductDetailMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoSrc = getProductVideoPath(product.slug) ?? product.video;
  const poster = selectedVariant?.image ?? product.image;
  const showVideo = Boolean(videoSrc) && !videoFailed;

  return (
    <div className="product-detail-media">
      <div
        className={`product-detail-media-frame${showVideo ? " product-detail-media-frame--video" : ""}`}
      >
        <div className="product-detail-media-stage">
          <LuxuryProductPresentation
            variant="featured"
            alt={product.displayName}
            exhibit={profile.exhibit}
            priority
            sizes="(max-width: 1024px) 90vw, 520px"
            className="product-detail-presentation"
          >
            {showVideo && videoSrc ? (
              <ProductVideo
                key={`${videoSrc}-${poster}`}
                src={videoSrc}
                poster={poster}
                className="product-detail-video"
                ariaLabel={`${product.displayName} product video`}
                onError={() => setVideoFailed(true)}
              />
            ) : null}
          </LuxuryProductPresentation>
        </div>
      </div>
    </div>
  );
}
