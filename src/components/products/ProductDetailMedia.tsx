"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ProductVideo } from "@/components/ui/ProductVideo";
import type { Product } from "@/types/product";

type ProductDetailMediaProps = {
  product: Product;
};

/** Client peptide vial render — image with optional AI motion loop */
export function ProductDetailMedia({ product }: ProductDetailMediaProps) {
  const defaultVariant = product.variants[0];
  const imageSrc = defaultVariant?.image ?? product.image;

  return (
    <div className="product-detail-media relative mx-auto w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--navy-900)]/40 p-6">
        {product.video ? (
          <ProductVideo
            src={product.video}
            poster={imageSrc}
            className="mx-auto h-auto max-h-[420px] w-full object-contain"
            ariaLabel={`${product.displayName} product video`}
          />
        ) : (
          <OptimizedImage
            src={imageSrc}
            alt={product.displayName}
            width={800}
            height={1200}
            sizes="(max-width: 768px) 80vw, 400px"
            className="mx-auto h-auto max-h-[420px] w-full object-contain"
            priority
          />
        )}
      </div>
    </div>
  );
}
