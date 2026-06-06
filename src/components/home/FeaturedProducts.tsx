"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ReferenceProductCard } from "@/components/ui/ReferenceProductCard";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function FeaturedProducts() {
  const ref = useRef(null);
  const featuredProducts = getFeaturedProducts();

  return (
    <section
      ref={ref}
      id="best-sellers"
      className="best-sellers-section ref-best-sellers qa-products-section art-products-section relative overflow-hidden"
    >
      <SectionAtmosphere variant="products" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="qa-section-header mx-auto max-w-2xl text-center lux-reveal">
            <p className="premium-eyebrow-gold polish-type-eyebrow font-display">Premium Selection</p>
            <h2 className="font-display type-display-section polish-type-section-title mt-3">
              Our Best Sellers
            </h2>
            <div className="gold-accent-line qa-section-divider mx-auto" aria-hidden />
          </div>

          <div className="ref-product-grid qa-product-grid mt-10 sm:mt-12 lux-stagger-group">
            {featuredProducts.map((product, i) => (
              <ReferenceProductCard key={product.id} product={product} index={i} className="lux-stagger-item" />
            ))}
          </div>

          <div className="qa-section-footer mt-10 text-center sm:mt-12 lux-reveal">
            <Link
              href="/products"
              className="qa-cta-text group inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
