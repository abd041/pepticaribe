import { generateMarketingMetadata, MarketingPageView } from "@/lib/marketingPage";

export const generateMetadata = () => generateMarketingMetadata("account");
export default function AccountPage() {
  return <MarketingPageView slug="account" />;
}
