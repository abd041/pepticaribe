import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("contact");
export default function ContactPage() {
  return <MarketingPageView slug="contact" />;
}
