import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ReferenceProductCard } from "@/components/ui/ReferenceProductCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { getServerT } from "@/lib/i18n-server";

/** Server-rendered featured grid — catalog helpers stay on the server */
export async function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();
  const [titleLine1, titleLine2, description, viewAll] = await Promise.all([
    getServerT("featured.titleLine1"),
    getServerT("featured.titleLine2"),
    getServerT("featured.description"),
    getServerT("featured.viewAll"),
  ]);

  return (
    <section
      id="best-sellers"
      className="best-sellers-section ref-best-sellers qa-products-section art-products-section relative overflow-hidden"
    >
      <SectionAtmosphere variant="products" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="qa-section-header mx-auto max-w-2xl text-center lux-reveal">
            <h2 className="font-display type-display-section polish-type-section-title">
              <span className="text-[var(--soft-ivory)]">{titleLine1}</span>{" "}
              <span className="text-[var(--ocean-blue)]">{titleLine2}</span>
            </h2>
            <p className="section-caption mx-auto mt-5 max-w-xl text-[15px] leading-relaxed">
              {description}
            </p>
            <div className="gold-accent-line qa-section-divider mx-auto mt-6" aria-hidden />
          </div>

          <div className="ref-product-grid qa-product-grid mt-10 sm:mt-12 lux-stagger-group">
            {featuredProducts.map((product, i) => (
              <ReferenceProductCard
                key={product.id}
                product={product}
                index={i}
                className="lux-stagger-item"
              />
            ))}
          </div>

          <div className="qa-section-footer mt-10 text-center sm:mt-12 lux-reveal">
            <Link href="/products" className="qa-cta-text group inline-flex items-center gap-2">
              {viewAll}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
