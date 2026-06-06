"use client";

import { useRef } from "react";
import { FlaskConical, Shield, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

export function ValueProps() {
  const ref = useRef(null);
  const { t } = useLanguage();

  const valueProps = [
    { icon: Shield, title: t("valueProps.qualityTitle"), description: t("valueProps.qualityDesc") },
    { icon: Truck, title: t("valueProps.shippingTitle"), description: t("valueProps.shippingDesc") },
    { icon: FlaskConical, title: t("valueProps.testedTitle"), description: t("valueProps.testedDesc") },
    { icon: ShieldCheck, title: t("valueProps.trustedTitle"), description: t("valueProps.trustedDesc") },
  ] as const;

  return (
    <section
      ref={ref}
      className="ref-trust-section value-props-section qa-trust-section relative border-y border-white/[0.05]"
    >
      <SectionAtmosphere variant="value" className="premium-section" showTopTransition={false}>
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="ref-trust-frame qa-trust-frame lux-stagger-group">
            <div className="ref-trust-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {valueProps.map((item) => (
                <article
                  key={item.title}
                  className="ref-trust-card value-prop-card polish-trust-card qa-trust-card lux-stagger-item"
                >
                  <div className="ref-trust-icon-well mx-auto">
                    <item.icon className="h-6 w-6" strokeWidth={1.35} aria-hidden />
                  </div>
                  <h3 className="ref-trust-title polish-type-trust-card-title font-display mt-5">
                    {item.title}
                  </h3>
                  <p className="ref-trust-desc polish-type-trust-card-desc section-caption mt-3">
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
