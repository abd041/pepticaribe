import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublicProducts } from "@/data/products";
import { ProductCatalogCard } from "@/components/products/ProductCatalogCard";
import { MarketingPage } from "@/components/pages/MarketingPage";
import { getServerLanguage, getServerT } from "@/lib/i18n-server";
import { getTranslation } from "@/data/translations";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return {
    title: getTranslation(language, "products.catalogTitle"),
    description: getTranslation(language, "products.catalogDescription"),
  };
}

export default async function ProductsPage() {
  const products = getPublicProducts();
  const [eyebrow, title, description, backLabel, viewBestSellers] = await Promise.all([
    getServerT("products.catalogEyebrow"),
    getServerT("products.catalogTitle"),
    getServerT("products.catalogDescription"),
    getServerT("common.backToHome"),
    getServerT("products.viewBestSellers"),
  ]);

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <MarketingPage
        eyebrow={eyebrow}
        title={title}
        description={description}
        backHref="/"
        backLabel={backLabel}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCatalogCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/#best-sellers"
          className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
        >
          {viewBestSellers}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
