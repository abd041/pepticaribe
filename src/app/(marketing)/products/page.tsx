import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublicProducts } from "@/data/products";
import { ProductCatalogCard } from "@/components/products/ProductCatalogCard";
import { MarketingPage } from "@/components/pages/MarketingPage";

export const metadata: Metadata = {
  title: "Research Products",
  description:
    "Browse PeptiCaribe research-grade peptides with Certificate of Analysis on every batch. Research Use Only.",
};

export default function ProductsPage() {
  const products = getPublicProducts();

  return (
    <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <MarketingPage
        eyebrow="Catalog"
        title="Research Products"
        description="Premium research-grade compounds with independent purity verification and full batch documentation."
        backHref="/"
        backLabel="Back to Home"
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
          View Best Sellers
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
