"use client";

import Link from "next/link";
import {
  ArrowRight,
  Beaker,
  ClipboardList,
  Dna,
  FileCheck,
  Mail,
  Microscope,
} from "lucide-react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { useLanguage } from "@/context/LanguageContext";
import { getCoaPageContent } from "@/data/translations/coaPageContent";

const METHOD_ICONS = [Beaker, Microscope, Dna, ClipboardList] as const;

export function COALibraryStats() {
  const { language } = useLanguage();
  const { stats } = getCoaPageContent(language);

  return (
    <section className="coa-library-stats" aria-label="Quality standards">
      <ul className="coa-library-stats-grid">
        {stats.map((stat) => (
          <li key={stat.label} className="coa-library-stat-card">
            <p className="coa-library-stat-value">{stat.value}</p>
            <p className="coa-library-stat-label">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function COALibraryTransparency() {
  const { language } = useLanguage();
  const { transparencyTitle, transparencyBody } = getCoaPageContent(language);

  return (
    <section className="coa-library-transparency">
      <h2 className="coa-library-section-title">{transparencyTitle}</h2>
      <p className="coa-library-section-body">{transparencyBody}</p>
      <div className="gold-accent-line coa-library-section-divider" aria-hidden />
    </section>
  );
}

export function COALibraryMethods() {
  const { language } = useLanguage();
  const { methodsEyebrow, methodsTitle, methods } = getCoaPageContent(language);

  return (
    <section className="coa-library-methods" aria-labelledby="coa-methods-heading">
      <p className="coa-library-eyebrow">{methodsEyebrow}</p>
      <h2 id="coa-methods-heading" className="coa-library-section-title">
        {methodsTitle}
      </h2>
      <ul className="coa-library-methods-grid">
        {methods.map((method, index) => {
          const Icon = METHOD_ICONS[index] ?? FileCheck;
          return (
            <li key={method.title} className="coa-library-method-card">
              <span className="coa-library-method-icon" aria-hidden>
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="coa-library-method-title">{method.title}</h3>
              <p className="coa-library-method-desc">{method.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function COALibrarySteps() {
  const { language } = useLanguage();
  const { stepsEyebrow, stepsTitle, steps, stepsCta } = getCoaPageContent(language);

  return (
    <section className="coa-library-steps" aria-labelledby="coa-steps-heading">
      <p className="coa-library-eyebrow">{stepsEyebrow}</p>
      <h2 id="coa-steps-heading" className="coa-library-section-title">
        {stepsTitle}
      </h2>
      <ol className="coa-library-steps-grid">
        {steps.map((step, index) => (
          <li key={step.title} className="coa-library-step-card">
            <span className="coa-library-step-num" aria-hidden>
              {index + 1}
            </span>
            <h3 className="coa-library-step-title">{step.title}</h3>
            <p className="coa-library-step-desc">{step.description}</p>
          </li>
        ))}
      </ol>
      <a href="#coa-library-grid" className="coa-library-steps-cta">
        {stepsCta}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </section>
  );
}

export function COALibraryFaq() {
  const { language } = useLanguage();
  const { faqEyebrow, faqTitle, faqs } = getCoaPageContent(language);

  return (
    <section className="coa-library-faq" aria-labelledby="coa-faq-heading">
      <p className="coa-library-eyebrow">{faqEyebrow}</p>
      <h2 id="coa-faq-heading" className="coa-library-section-title">
        {faqTitle}
      </h2>
      <FaqAccordion items={faqs} idPrefix="coa-faq" />
    </section>
  );
}

export function COALibrarySupport() {
  const { language } = useLanguage();
  const { supportTitle, supportBody, supportCta, supportEmail } = getCoaPageContent(language);

  return (
    <section className="coa-library-support" aria-labelledby="coa-support-heading">
      <div className="coa-library-support-inner">
        <span className="coa-library-support-icon" aria-hidden>
          <Mail className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <div className="coa-library-support-copy">
          <h2 id="coa-support-heading" className="coa-library-support-title">
            {supportTitle}
          </h2>
          <p className="coa-library-support-body">{supportBody}</p>
        </div>
        <Link
          href={`mailto:${supportEmail}?subject=COA%20Request`}
          className="ref-product-btn-gold coa-library-support-cta"
        >
          {supportCta}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
