import type { Metadata } from "next";
import { FAQPage } from "@/components/faq/FAQPage";
import { getMarketingPage } from "@/data/translations/marketingContent";
import { getServerLanguage } from "@/lib/i18n-server";
import "@/app/faq-page.css";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const page = getMarketingPage(language, "faq");
  return {
    title: page.title,
    description: page.description,
  };
}

export default function FaqRoutePage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction faq-page-shell relative isolate min-h-dvh">
      <FAQPage />
    </div>
  );
}
