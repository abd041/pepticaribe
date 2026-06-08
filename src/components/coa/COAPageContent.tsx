"use client";

import { BRAND_SAMPLE_COA_PDF } from "@/lib/brandAssets";

type COAPageContentProps = {
  body: readonly string[];
};

export function COAPageContent({ body }: COAPageContentProps) {
  return (
    <div className="coa-library-content">
      <div className="coa-sample-viewer overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--navy-900)]/60 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <object
          data={`${BRAND_SAMPLE_COA_PDF}#view=FitH&toolbar=1`}
          type="application/pdf"
          className="h-[min(70vh,640px)] w-full"
          title="Sample Certificate of Analysis"
        >
          <p className="p-6 text-sm text-[var(--text-secondary)]">
            Your browser cannot display PDFs inline.{" "}
            <a
              href={BRAND_SAMPLE_COA_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--ocean-blue)] hover:underline"
            >
              Open the sample COA (PDF)
            </a>
          </p>
        </object>
      </div>

      {body.length ? (
        <div className="marketing-prose mt-10">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
