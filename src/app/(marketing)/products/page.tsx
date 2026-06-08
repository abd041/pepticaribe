import type { Metadata } from "next";
import { getCatalogProducts } from "@/data/products";
import { ProductCatalogPage } from "@/components/products/ProductCatalogPage";
import { getTranslation } from "@/data/translations";
import { getServerLanguage } from "@/lib/i18n-server";
import "@/app/products-catalog.css";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return {
    title: getTranslation(language, "products.catalogTitle"),
    description: getTranslation(language, "products.catalogDescription"),
  };
}

export default function ProductsPage() {
  const products = getCatalogProducts();

  return (
    <div className="homepage-luxury luxury-experience art-direction products-catalog-page relative isolate min-h-dvh">
      <ProductCatalogPage products={products} />
    </div>
  );
}
