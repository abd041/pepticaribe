"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { resolveCompoundProfile } from "@/lib/productImagery";
import { ProductCardPrice } from "@/components/products/ProductCardPrice";
import { ProductVariantChips } from "@/components/products/ProductVariantChips";
import { hasMultipleVariants } from "@/lib/pricing";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";
import { useLanguage } from "@/context/LanguageContext";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

interface ReferenceProductCardProps {
  product: Product;
  index: number;
  className?: string;
  /** Show research category label (catalog page) */
  showCategoryLabel?: boolean;
}

const CATEGORY_I18N_KEY: Record<Product["category"], string> = {
  peptide: "products.categoryPeptide",
  blend: "products.categoryBlend",
  accessory: "products.categoryAccessory",
  "small-molecule": "products.categorySmallMolecule",
};

function getDefaultVariant(product: Product) {
  if (product.variants.length === 0) return null;
  return product.variants.reduce((a, b) => (a.price <= b.price ? a : b));
}

/** Premium best seller card — luxury product presentation system */
export function ReferenceProductCard({
  product,
  index,
  className = "",
  showCategoryLabel = false,
}: ReferenceProductCardProps) {
  const { t } = useLanguage();
  const profile = resolveCompoundProfile(product.slug, product.image, product.category);
  const variant = getDefaultVariant(product);
  const sizeLabel = variant?.sizeLabel ?? "—";
  const multipleSizes = hasMultipleVariants(product);

  return (
    <article
      data-slug={product.slug}
      className={`best-seller-card ref-product-card polish-product-card qa-product-card art-product-card group overflow-clip ${className}`}
    >
      <Link
        href={`/products/${product.slug}`}
        className="ref-product-image-wrap polish-product-stage block"
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
          <ProductCardPrice
            product={product}
            className="ref-product-price polish-type-product-price"
            priceClassName="font-display"
          />
        </div>

        {showCategoryLabel ? (
          <p className="ref-product-tagline">
            {product.shortDescription?.trim() || t(CATEGORY_I18N_KEY[product.category])}
          </p>
        ) : null}

        {multipleSizes ? (
          <ProductVariantChips product={product} className="ref-product-variant-chips" />
        ) : (
          <div className="ref-product-size-row">
            <span>{sizeLabel}</span>
            <span className="text-[var(--text-muted)]">{t("common.coaIncluded")}</span>
          </div>
        )}

        <div className="ref-product-actions qa-product-actions">
          <Link href={`/products/${product.slug}`} className="ref-product-btn-teal polish-product-cta qa-btn-card-teal">
            {t("common.viewDetails")}
          </Link>
          <AddToCartButton
            product={product}
            variantId={variant?.id}
            disabled={!variant}
            className="ref-product-btn-gold polish-product-cta qa-btn-card-gold"
          />
        </div>
      </div>
    </article>
  );
}
