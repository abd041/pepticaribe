import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("terms-and-conditions");
export default function TermsPage() {
  return <MarketingPageView slug="terms-and-conditions" />;
}
