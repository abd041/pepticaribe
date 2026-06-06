import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("faq");
export default function FAQPage() {
  return <MarketingPageView slug="faq" />;
}
