import Link from "next/link";
import type { Product } from "@/types/product";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ProductCardPrice } from "@/components/products/ProductCardPrice";
import { ProductVariantChips } from "@/components/products/ProductVariantChips";
import { hasMultipleVariants } from "@/lib/pricing";

type ProductCatalogCardProps = {
  product: Product;
};

/** Lightweight catalog card — server-rendered, no animation deps */
export function ProductCatalogCard({ product }: ProductCatalogCardProps) {
  const defaultVariant = product.variants[0];
  const multipleSizes = hasMultipleVariants(product);

  return (
    <article className="glass-card overflow-hidden rounded-xl transition-colors hover:border-[var(--ocean-blue)]/30">
      <Link href={`/products/${product.slug}`} className="block p-5">
        <div className="mb-4 flex h-44 items-end justify-center rounded-lg bg-[var(--navy-900)]/50 p-3">
          <OptimizedImage
            src={product.image}
            alt={product.displayName}
            width={400}
            height={600}
            sizes="(max-width: 768px) 45vw, 200px"
            className="h-full max-h-36 w-auto object-contain"
          />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ocean-blue)]">
          {product.category}
        </p>
        <h2 className="font-display mt-2 text-lg font-bold text-[var(--soft-ivory)]">
          {product.displayName}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--soft-ivory)]/55">
          {product.description.replace(/\s*Research Use Only\.?\s*$/i, "").trim()}
        </p>
        <div className="mt-5 border-t border-white/[0.06] pt-4">
          {multipleSizes ? (
            <ProductVariantChips product={product} className="mb-3" />
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <ProductCardPrice
              product={product}
              className="font-display text-base font-semibold text-[var(--luxury-gold)]"
            />
            {!multipleSizes ? (
              <span className="text-xs text-[var(--soft-ivory)]/40">
                {defaultVariant?.sizeLabel ?? "—"}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
