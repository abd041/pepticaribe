import { SiteChrome } from "@/components/home/SiteChrome";
import { SmoothScrollProvider } from "@/components/home/SmoothScrollProvider";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturedCompound } from "@/components/home/FeaturedCompound";
import { COAPromotionBar } from "@/components/home/COAPromotionBar";
import { ReviewsFAQ } from "@/components/home/ReviewsFAQ";
import { FDADisclaimer } from "@/components/home/FDADisclaimer";
import { Footer } from "@/components/home/Footer";
import { HomePageEffects, LuxuryMotion } from "@/components/home/HomePageEffects";
import { getProductBySlug } from "@/data/products";

export default function HomePage() {
  const featuredBpc = getProductBySlug("bpc-157");

  return (
    <>
      <HomePageEffects />
      <div className="homepage-narrative luxury-experience art-direction bio-atmosphere-host">
        <SmoothScrollProvider
          chrome={
            <>
              <LuxuryMotion />
              <SiteChrome />
            </>
          }
        >
          <main>
            <Hero />
            <ValueProps />
            <FeaturedProducts />
            {featuredBpc ? <FeaturedCompound product={featuredBpc} /> : null}
            <COAPromotionBar />
            <ReviewsFAQ />
            <FDADisclaimer />
          </main>
          <Footer />
        </SmoothScrollProvider>
      </div>
    </>
  );
}
