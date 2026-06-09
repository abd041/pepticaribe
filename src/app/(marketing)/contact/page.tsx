import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { getMarketingPage } from "@/data/translations/marketingContent";
import { getServerLanguage } from "@/lib/i18n-server";
import "@/app/contact-page.css";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const page = getMarketingPage(language, "contact");
  return {
    title: page.title,
    description: page.description,
  };
}

export default function ContactRoutePage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction contact-page-shell relative isolate min-h-dvh">
      <ContactPage />
    </div>
  );
}
