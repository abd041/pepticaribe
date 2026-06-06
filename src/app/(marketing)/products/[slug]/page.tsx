import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getProductBySlug, getPublicProducts } from "@/data/products";
import { getProductFromPrice } from "@/lib/pricing";
import { MarketingPage } from "@/components/pages/MarketingPage";

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <MarketingPage
        eyebrow={product.category}
        title={product.displayName}
        description={product.description}
        backHref="/products"
        backLabel="Back to Products"
      >
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-400">
              Research Use Only
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-white/50">
              <ShieldCheck className="h-3 w-3" aria-hidden />
              COA Available
            </span>
          </div>

          <p className="font-display mt-6 text-2xl font-bold text-[var(--luxury-gold)]">
            From ${fromPrice.toFixed(2)}
          </p>

          <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
            {product.variants.map((variant) => (
              <li
                key={variant.id}
                className="flex items-center justify-between text-sm text-[var(--soft-ivory)]/75"
              >
                <span>{variant.sizeLabel}</span>
                <span className="font-display font-semibold text-[var(--soft-ivory)]">
                  ${variant.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs leading-relaxed text-[var(--soft-ivory)]/40">
            Full product imagery, COA downloads, and cart checkout are launching soon. Contact
            support to place research orders in the interim.
          </p>

          <Link
            href="/coa"
            className="btn-outline-gold mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.08em]"
          >
            View COA Library
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </MarketingPage>
    </div>
  );
}
