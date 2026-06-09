"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CoaSampleModal } from "@/components/coa/CoaSampleModal";
import { useLanguage } from "@/context/LanguageContext";

type COASamplePreviewProps = {
  className?: string;
  title?: string;
  variant?: "default" | "showcase";
};

function CoaShowcaseCertificate({
  title,
  onOpen,
}: {
  title: string;
  onOpen: () => void;
}) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onOpen}
      className="coa-showcase-preview-trigger coa-showcase-preview-link group"
      aria-label={`${title} — ${t("coa.openCertificate")}`}
    >
      <div className="coa-showcase-document-frame">
        <div className="coa-showcase-document-shell">
          <article className="coa-showcase-cert">
            <header className="coa-showcase-cert-header">
              <p className="coa-showcase-cert-eyebrow">{t("coa.previewEyebrow")}</p>
              <p className="coa-showcase-cert-title">{t("coa.previewTitle")}</p>
              <p className="coa-showcase-cert-brand">PeptiCaribe</p>
            </header>

            <div className="coa-showcase-cert-divider" aria-hidden />

            <dl className="coa-showcase-cert-grid">
              <div>
                <dt>{t("coa.purityLabel")}</dt>
                <dd>99%+</dd>
              </div>
              <div>
                <dt>{t("coa.previewMethodHplc")}</dt>
                <dd>{t("coa.previewVerified")}</dd>
              </div>
              <div>
                <dt>{t("coa.previewMethodIdentity")}</dt>
                <dd>{t("coa.previewVerified")}</dd>
              </div>
              <div>
                <dt>{t("coa.previewLaboratory")}</dt>
                <dd>{t("coa.isoBadge")}</dd>
              </div>
            </dl>

            <div className="coa-showcase-cert-lines" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>

            <p className="coa-showcase-cert-open">
              {t("coa.previewOpen")}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </p>
          </article>
        </div>
        <div className="coa-showcase-document-seal" aria-hidden />
      </div>
    </button>
  );
}

/** In-page preview of the client sample COA certificate */
export function COASamplePreview({
  className = "",
  title = "Sample Certificate of Analysis",
  variant = "default",
}: COASamplePreviewProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (variant === "showcase") {
    return (
      <div className={className}>
        <CoaShowcaseCertificate title={title} onOpen={() => setModalOpen(true)} />
        <CoaSampleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={title}
        />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`coa-showcase-preview-trigger group block ${className}`}
        aria-label={`${title} — open PDF`}
      >
        <div className="art-coa-document-frame overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
          <div
            className="lux-coa-cert-preview art-coa-document flex h-[220px] w-full items-center justify-center bg-[var(--navy-900)] sm:h-[260px] lg:h-[280px]"
            aria-hidden
          />
          <div className="lux-coa-embossed-seal art-coa-seal" aria-hidden />
        </div>
      </button>
      <CoaSampleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
      />
    </>
  );
}
