import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("about");
export default function AboutPage() {
  return <MarketingPageView slug="about" />;
}
