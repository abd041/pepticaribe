import type { Metadata } from "next";
import { MarketingPage } from "@/components/pages/MarketingPage";
import {
  getMarketingPage,
  type MarketingPageSlug,
} from "@/data/translations/marketingContent";
import { getServerLanguage, getServerT } from "@/lib/i18n-server";

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

  const backToHome = await getServerT("common.backToHome");

  return (
    <MarketingPage
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.description}
      backLabel={backToHome}
    >
      {page.sections?.length ? (
        <div className="marketing-prose">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      ) : page.body.length ? (
        <div className="marketing-prose">
          {page.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </MarketingPage>
  );
}
