"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  Copy,
  FileCheck,
  FlaskConical,
  Lock,
  Mail,
  MessageCircle,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";
import { getContactPageContent } from "@/data/translations/contactPageContent";

const TOPIC_ICONS: Record<string, LucideIcon> = {
  orders: Package,
  coa: FileCheck,
  wholesale: Building2,
  research: FlaskConical,
};

export function ContactPage() {
  const { language, t } = useLanguage();
  const { email, topics, responseValue, shippingNote, emailUsBody } =
    getContactPageContent(language);
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      window.location.href = `mailto:${email}`;
    }
  }, [email]);

  return (
    <div className="contact-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="contact-page-content">
          <section className="contact-page-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="contact-page-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="contact-page-hero-copy mx-auto max-w-2xl text-center">
                  <p className="contact-page-eyebrow">{t("contact.eyebrow")}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{t("contact.title")}</span>
                  </h1>
                  <div
                    className="gold-accent-line qa-section-divider mx-auto mt-4 max-w-[12rem]"
                    aria-hidden
                  />
                  <p className="section-caption mx-auto mt-4 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {t("contact.pageDescription")}
                  </p>
                </div>

                <ul className="contact-page-trust" aria-label={t("hero.trustLabel")}>
                  <li>
                    <MessageCircle className="h-3 w-3" aria-hidden />
                    <span>{t("faq.excellenceSupport")}</span>
                  </li>
                  <li>
                    <ShieldCheck className="h-3 w-3" aria-hidden />
                    <span>{t("hero.trustIso")}</span>
                  </li>
                  <li>
                    <Truck className="h-3 w-3" aria-hidden />
                    <span>{t("hero.trustShipping")}</span>
                  </li>
                  <li>
                    <Lock className="h-3 w-3" aria-hidden />
                    <span>{t("cart.trustSecure")}</span>
                  </li>
                </ul>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="contact-page-main" aria-label={t("contact.title")}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <div className="contact-page-layout">
                <div className="contact-page-topics-col">
                  <p className="contact-page-topics-eyebrow">{t("contact.topicsEyebrow")}</p>

                  <div className="contact-page-topics-grid">
                    {topics.map((topic) => {
                      const Icon = TOPIC_ICONS[topic.id] ?? Mail;
                      const mailto = `mailto:${email}?subject=${encodeURIComponent(topic.mailSubject)}`;

                      return (
                        <article key={topic.id} className="contact-page-topic-card">
                          <span className="contact-page-topic-icon" aria-hidden>
                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                          </span>
                          <h2 className="contact-page-topic-title">{topic.title}</h2>
                          <p className="contact-page-topic-desc">{topic.description}</p>
                          <a href={mailto} className="contact-page-topic-cta">
                            {t("contact.topicCta")}
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                          </a>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <aside className="contact-page-sidebar" aria-label={t("contact.resourcesTitle")}>
                  <div className="contact-page-info-card">
                    <div className="contact-page-info-row">
                      <span className="contact-page-info-icon" aria-hidden>
                        <Clock className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="contact-page-info-label">{t("contact.responseLabel")}</p>
                        <p className="contact-page-info-value">{responseValue}</p>
                      </div>
                    </div>
                    <div className="contact-page-info-divider" aria-hidden />
                    <div className="contact-page-info-row">
                      <span className="contact-page-info-icon" aria-hidden>
                        <Truck className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div>
                        <p className="contact-page-info-label">{t("contact.shippingLabel")}</p>
                        <p className="contact-page-info-value contact-page-info-value--body">
                          {shippingNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="contact-page-resources">
                    <p className="contact-page-resources-title">{t("contact.resourcesTitle")}</p>
                    <div className="contact-page-resources-links">
                      <Link href="/faq" className="btn-outline-gold contact-page-resource-link">
                        {t("nav.faq")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                      <Link href="/coa" className="btn-outline-gold contact-page-resource-link">
                        {t("hero.ctaCoa")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                      <Link href="/products" className="btn-outline-gold contact-page-resource-link">
                        {t("hero.ctaProducts")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>

              <section className="contact-page-email-us" aria-labelledby="contact-email-heading">
                <div className="contact-page-email-us-inner">
                  <div className="contact-page-email-us-copy">
                    <p className="contact-page-eyebrow">{t("contact.eyebrow")}</p>
                    <h2 id="contact-email-heading" className="contact-page-email-us-title">
                      {t("contact.emailUsTitle")}
                    </h2>
                    <p className="contact-page-email-us-body">{emailUsBody}</p>
                  </div>

                  <div className="contact-page-email-display">
                    <span className="contact-page-email-display-icon" aria-hidden>
                      <Mail className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <a href={`mailto:${email}`} className="contact-page-email-address">
                      {email}
                    </a>
                    <div className="contact-page-email-actions">
                      <button
                        type="button"
                        className="contact-page-copy-btn"
                        onClick={() => void copyEmail()}
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5" aria-hidden />
                            {t("contact.copiedEmail")}
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden />
                            {t("contact.copyEmail")}
                          </>
                        )}
                      </button>
                      <a href={`mailto:${email}`} className="btn-primary contact-page-send-btn">
                        {t("contact.sendEmail")}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
