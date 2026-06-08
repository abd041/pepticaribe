"use client";

import { useRef } from "react";
import {
  FileText,
  FlaskConical,
  Headphones,
  Lock,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function ValueProps() {
  const ref = useRef(null);
  const { t } = useLanguage();

  const valueProps = [
    { icon: Truck, title: t("valueProps.shippingTitle"), description: t("valueProps.shippingDesc") },
    { icon: FileText, title: t("valueProps.coaTitle"), description: t("valueProps.coaDesc") },
    {
      icon: ShieldCheck,
      title: t("valueProps.guaranteeTitle"),
      description: t("valueProps.guaranteeDesc"),
    },
    { icon: Lock, title: t("valueProps.checkoutTitle"), description: t("valueProps.checkoutDesc") },
    { icon: FlaskConical, title: t("valueProps.purityTitle"), description: t("valueProps.purityDesc") },
    { icon: Headphones, title: t("valueProps.supportTitle"), description: t("valueProps.supportDesc") },
  ] as const;

  return (
    <section
      ref={ref}
      className="ref-trust-section value-props-section trust-authority-section qa-trust-section relative border-y border-white/[0.05]"
    >
      <SectionAtmosphere variant="value" className="premium-section" showTopTransition={false}>
        <div className="trust-authority-spotlight" aria-hidden />
        <div className="qa-client-container relative z-[2] mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="ref-trust-frame qa-trust-frame">
            <div className="trust-authority-grid lux-stagger-group">
              {valueProps.map((item) => (
                <article
                  key={item.title}
                  className="trust-authority-card ref-trust-card value-prop-card polish-trust-card qa-trust-card lux-stagger-item"
                >
                  <div className="trust-authority-icon">
                    <span className="trust-authority-icon-ring trust-authority-icon-ring--outer" aria-hidden />
                    <span className="trust-authority-icon-ring trust-authority-icon-ring--inner" aria-hidden />
                    <span className="trust-authority-icon-well">
                      <item.icon className="trust-authority-icon-svg" strokeWidth={1.35} aria-hidden />
                    </span>
                  </div>
                  <h3 className="trust-authority-title ref-trust-title polish-type-trust-card-title font-display">
                    {item.title}
                  </h3>
                  <p className="trust-authority-desc ref-trust-desc polish-type-trust-card-desc section-caption">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionAtmosphere>
    </section>
  );
}
