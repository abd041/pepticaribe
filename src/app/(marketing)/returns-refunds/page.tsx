import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("returns-refunds");
export default function ReturnsRefundsPage() {
  return <MarketingPageView slug="returns-refunds" />;
}
