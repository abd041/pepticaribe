import type { Metadata } from "next";
import { MarketingPage } from "@/components/pages/MarketingPage";
import {
  getMarketingPage,
  type MarketingPageSlug,
} from "@/data/translations/marketingContent";
import { getServerLanguage } from "@/lib/i18n-server";

export async function generateMarketingMetadata(slug: MarketingPageSlug): Promise<Metadata> {
  const language = await getServerLanguage();
  const page = getMarketingPage(language, slug);
  return {
    title: page.title,
    description: page.description,
  };
}

export async function MarketingPageView({ slug }: { slug: MarketingPageSlug }) {
  const language = await getServerLanguage();
  const page = getMarketingPage(language, slug);

  return (
    <MarketingPage eyebrow={page.eyebrow} title={page.title} description={page.description}>
      {page.body.length ? (
        <div className="space-y-4 text-sm leading-relaxed text-[var(--soft-ivory)]/65">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </MarketingPage>
  );
}
