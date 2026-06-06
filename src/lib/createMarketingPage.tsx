import type { Metadata } from "next";
import { MarketingPage } from "@/components/pages/MarketingPage";
import { MARKETING_PAGES } from "@/lib/marketingPages";

export function getMarketingPageExports(slug: keyof typeof MARKETING_PAGES) {
  const config = MARKETING_PAGES[slug];

  const metadata: Metadata = {
    title: config.title,
    description: config.description,
  };

  function Page() {
    return (
      <MarketingPage
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
      >
        {config.body?.length ? (
          <div className="space-y-4 text-sm leading-relaxed text-[var(--soft-ivory)]/65">
            {config.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </MarketingPage>
    );
  }

  return { metadata, Page };
}
