import { SiteChrome } from "@/components/home/SiteChrome";
import { SmoothScrollProvider } from "@/components/home/SmoothScrollProvider";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturedCompound } from "@/components/home/FeaturedCompound";
import { PrecisionVerification } from "@/components/home/PrecisionVerification";
import { ReviewsFAQ } from "@/components/home/ReviewsFAQ";
import { QualityVerification } from "@/components/home/QualityVerification";
import { COAPromotionBar } from "@/components/home/COAPromotionBar";
import { ProductExploreCta } from "@/components/home/ProductExploreCta";
import { HomeContact } from "@/components/home/HomeContact";
import { FDADisclaimer } from "@/components/home/FDADisclaimer";
import { Footer } from "@/components/home/Footer";
import { HomePageEffects, LuxuryMotion } from "@/components/home/HomePageEffects";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { getProductBySlug } from "@/data/products";

export default function HomePage() {
  const featuredBpc = getProductBySlug("bpc-157");

  return (
    <>
      <HomePageEffects />
      <SiteChrome />
      <div className="homepage-narrative homepage-luxury luxury-experience art-direction site-chrome-offset relative isolate min-h-dvh">
        <MarketingCanvasBackdrop>
          <SmoothScrollProvider chrome={<LuxuryMotion />}>
            <div className="homepage-canvas-content">
              <main>
                <Hero />
                <ValueProps />
                <QualityVerification />
                <COAPromotionBar />
                <FeaturedProducts />
                {featuredBpc ? <FeaturedCompound product={featuredBpc} /> : null}
                <PrecisionVerification />
                <ReviewsFAQ />
                <ProductExploreCta />
                <HomeContact />
                <FDADisclaimer />
              </main>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </MarketingCanvasBackdrop>
      </div>
    </>
  );
}
