import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/marketing/ComingSoonPage";
import { getMarketingPage } from "@/data/translations/marketingContent";
import { getServerLanguage } from "@/lib/i18n-server";
import "@/app/coming-soon-page.css";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const page = getMarketingPage(language, "account");
  return {
    title: page.title,
    description: page.description,
  };
}

export default function AccountRoutePage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction coming-soon-page-shell relative isolate min-h-dvh">
      <ComingSoonPage slug="account" />
    </div>
  );
}
