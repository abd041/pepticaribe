import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("privacy-policy");
export default function PrivacyPolicyPage() {
  return <MarketingPageView slug="privacy-policy" />;
}
