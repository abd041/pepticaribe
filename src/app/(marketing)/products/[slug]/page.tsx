import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getPublicProducts } from "@/data/products";
import { formatUsd, getProductFromPrice, hasMultipleVariants } from "@/lib/pricing";
import { getServerT } from "@/lib/i18n-server";
import { MarketingPage } from "@/components/pages/MarketingPage";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { ProductDetailBadges } from "@/components/products/ProductDetailBadges";
import { ProductDetailMedia } from "@/components/products/ProductDetailMedia";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pepticaribe.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublicProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.displayName,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.isPrivate) notFound();

  const fromPrice = getProductFromPrice(product);
  const multipleSizes = hasMultipleVariants(product);
  const backToProducts = await getServerT("products.backToProducts");

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.displayName,
    description: product.description,
    sku: product.sku,
    image: `${SITE_URL}${product.image}`,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: fromPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    brand: {
      "@type": "Brand",
      name: "PeptiCaribe",
    },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <MarketingPage
        eyebrow={product.category}
        title={product.displayName}
        description={product.description}
        backHref="/products"
        backLabel={backToProducts}
      >
        <ProductDetailMedia product={product} />

        <div className="glass-card mt-8 rounded-2xl p-6 sm:p-8">
          <ProductDetailBadges />

          <p className="font-display mt-6 text-2xl font-bold text-[var(--luxury-gold)]">
            {multipleSizes ? "From " : null}
            {formatUsd(fromPrice)}
          </p>

          {!multipleSizes && product.variants[0] ? (
            <p className="mt-2 text-sm text-[var(--text-secondary)]">{product.variants[0].sizeLabel}</p>
          ) : null}

          <ProductDetailActions product={product} />
        </div>
      </MarketingPage>
    </div>
  );
}
