import { BiotechAtmosphere } from "@/components/home/BiotechAtmosphere";
import { SiteChrome } from "@/components/home/SiteChrome";
import { LuxuryMotion } from "@/components/home/LuxuryMotion";
import { SmoothScrollProvider } from "@/components/home/SmoothScrollProvider";
import { Hero } from "@/components/home/Hero";
import { ValueProps } from "@/components/home/ValueProps";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturedCompound } from "@/components/home/FeaturedCompound";
import { COAPromotionBar } from "@/components/home/COAPromotionBar";
import { ReviewsFAQ } from "@/components/home/ReviewsFAQ";
import { FDADisclaimer } from "@/components/home/FDADisclaimer";
import { Footer } from "@/components/home/Footer";
import { CursorAtmosphere } from "@/components/ui/CursorAtmosphere";
import { ScrollNarrative } from "@/components/ui/ScrollNarrative";

export default function HomePage() {
  return (
    <>
      <ScrollNarrative />
      <CursorAtmosphere />
      <div className="homepage-narrative ref-homepage polish-homepage final8-homepage qa-client-homepage phase-g-premium luxury-experience art-direction bio-atmosphere-host">
        <BiotechAtmosphere />
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
            <FeaturedCompound />
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
