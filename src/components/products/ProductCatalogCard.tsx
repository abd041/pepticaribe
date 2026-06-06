import Link from "next/link";
import type { Product } from "@/types/product";
import { getProductFromPrice } from "@/lib/pricing";

type ProductCatalogCardProps = {
  product: Product;
};

/** Lightweight catalog card — server-rendered, no animation deps */
export function ProductCatalogCard({ product }: ProductCatalogCardProps) {
  const fromPrice = getProductFromPrice(product);
  const defaultVariant = product.variants[0];

  return (
    <article className="glass-card rounded-xl p-5 transition-colors hover:border-[var(--ocean-blue)]/30">
      <Link href={`/products/${product.slug}`} className="block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ocean-blue)]">
          {product.category}
        </p>
        <h2 className="font-display mt-2 text-lg font-bold text-[var(--soft-ivory)]">
          {product.displayName}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--soft-ivory)]/55">
          {product.description.replace(/\s*Research Use Only\.?\s*$/i, "").trim()}
        </p>
        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="font-display text-base font-semibold text-[var(--luxury-gold)]">
            From ${fromPrice.toFixed(2)}
          </span>
          <span className="text-xs text-[var(--soft-ivory)]/40">
            {defaultVariant?.sizeLabel ?? "—"}
          </span>
        </div>
      </Link>
    </article>
  );
}
