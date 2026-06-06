"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function HomeNewsletter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="ref-newsletter qa-newsletter-section relative overflow-hidden">
      <SectionAtmosphere variant="footer" className="premium-section" showBottomTransition={false}>
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="lux-reveal mx-auto max-w-xl text-center">
            <h2 className="font-display type-display-section polish-type-section-title">
              <span className="block text-[var(--soft-ivory)]">{t("newsletter.titleLine1")}</span>
              <span className="mt-1 block text-[var(--ocean-blue)]">{t("newsletter.titleLine2")}</span>
            </h2>
            <p className="section-caption mx-auto mt-4 max-w-md">{t("newsletter.description")}</p>

            {submitted ? (
              <p
                role="status"
                className="mt-6 rounded-[var(--radius-premium)] border border-teal-500/25 bg-teal-500/10 px-6 py-4 text-sm text-teal-200"
              >
                {t("newsletter.success")}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="sr-only" htmlFor="newsletter-email">
                  {t("newsletter.emailPlaceholder")}
                </label>
                <input
                  id="newsletter-email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder={t("newsletter.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-[var(--soft-ivory)] outline-none transition-colors focus:border-[var(--ocean-blue)]/50"
                />
                <button
                  type="submit"
                  className="btn-primary polish-cta-primary inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em] sm:w-auto"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {t("newsletter.subscribe")}
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
