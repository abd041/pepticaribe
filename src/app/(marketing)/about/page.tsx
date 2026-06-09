import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { getMarketingPage } from "@/data/translations/marketingContent";
import { getServerLanguage } from "@/lib/i18n-server";
import "@/app/about-page.css";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const page = getMarketingPage(language, "about");
  return {
    title: page.title,
    description: page.description,
  };
}

export default function AboutRoutePage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction about-page-shell relative isolate min-h-dvh">
      <AboutPage />
    </div>
  );
}
