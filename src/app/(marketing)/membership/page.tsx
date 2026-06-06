import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("membership");
export default function MembershipPage() {
  return <MarketingPageView slug="membership" />;
}
