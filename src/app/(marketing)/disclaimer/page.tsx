import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("disclaimer");
export default function DisclaimerPage() {
  return <MarketingPageView slug="disclaimer" />;
}
