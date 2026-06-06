import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("research-use-only");
export default function ResearchUseOnlyPage() {
  return <MarketingPageView slug="research-use-only" />;
}
