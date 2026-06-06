import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("coa");
export default function COAPage() {
  return <MarketingPageView slug="coa" />;
}
