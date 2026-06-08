import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalogProducts, getProductBySlug } from "@/data/products";
import { getProductFromPrice } from "@/lib/pricing";
import { getRelatedProducts } from "@/lib/productDetail";
import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import "@/app/products-catalog.css";
import "@/app/products-detail.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pepticaribe.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getCatalogProducts().map((product) => ({ slug: product.slug }));
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

export default async function ProductDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const catalog = getCatalogProducts();
  const relatedProducts = getRelatedProducts(product, catalog);
  const fromPrice = getProductFromPrice(product);

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
    <div className="homepage-luxury luxury-experience art-direction product-detail-page relative isolate min-h-dvh">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailPage product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
