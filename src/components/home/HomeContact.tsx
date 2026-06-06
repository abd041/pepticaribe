"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export function HomeContact() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("PeptiCaribe — Homepage inquiry");
    const body = encodeURIComponent(
      `Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`,
    );
    window.location.href = `mailto:info@pepticaribe.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setForm(EMPTY_FORM);
  };

  return (
    <section className="ref-home-contact qa-contact-section relative overflow-hidden border-y border-white/[0.05]">
      <SectionAtmosphere variant="disclaimer" className="premium-section-lg">
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lux-reveal">
            <div className="qa-section-header text-center">
              <p className="premium-eyebrow-gold polish-type-eyebrow">{t("homeContact.eyebrow")}</p>
              <h2 className="font-display ref-contact-title polish-type-section-title mt-3 font-bold text-[var(--soft-ivory)]">
                {t("homeContact.title")}
              </h2>
              <p className="section-caption mx-auto mt-4 max-w-xl">{t("homeContact.description")}</p>
              <div className="gold-accent-line qa-section-divider mx-auto mt-6" aria-hidden />
            </div>

            {submitted ? (
              <p
                role="status"
                className="mt-8 rounded-[var(--radius-premium)] border border-teal-500/25 bg-teal-500/10 px-6 py-4 text-center text-sm text-teal-200"
              >
                {t("homeContact.success")}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    {t("homeContact.firstName")}
                  </span>
                  <input
                    required
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="lux-enterprise-input w-full px-5 text-sm text-[var(--soft-ivory)] outline-none"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    {t("homeContact.lastName")}
                  </span>
                  <input
                    required
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="lux-enterprise-input w-full px-5 text-sm text-[var(--soft-ivory)] outline-none"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    {t("homeContact.email")}
                  </span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="lux-enterprise-input w-full px-5 text-sm text-[var(--soft-ivory)] outline-none"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    {t("homeContact.phone")}
                  </span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="lux-enterprise-input w-full px-5 text-sm text-[var(--soft-ivory)] outline-none"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                    {t("homeContact.message")}
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="lux-enterprise-textarea w-full resize-y px-5 text-sm text-[var(--soft-ivory)] outline-none"
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="btn-primary polish-cta-primary group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em] sm:w-auto"
                  >
                    {t("homeContact.submit")}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
