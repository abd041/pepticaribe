"use client";

import { useRef } from "react";
import {
  FlaskConical,
  Shield,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

const VALUE_PROPS = [
  {
    icon: Shield,
    title: "Quality",
    description:
      "Research grade peptides manufactured to the highest standards.",
  },
  {
    icon: Truck,
    title: "Shipping",
    description:
      "Fast, discreet, and secure worldwide delivery you can rely on.",
  },
  {
    icon: FlaskConical,
    title: "Tested",
    description:
      "Every batch is tested by independent third-party laboratories.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Source",
    description:
      "Transparent COAs and proven compounds for researchers worldwide.",
  },
] as const;

export function ValueProps() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="ref-trust-section value-props-section qa-trust-section relative border-y border-white/[0.05]"
    >
      <SectionAtmosphere variant="value" className="premium-section" showTopTransition={false}>
        <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="ref-trust-frame qa-trust-frame lux-stagger-group">
            <div className="ref-trust-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {VALUE_PROPS.map((item) => (
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
                  <p className="section-caption qa-trust-copy mx-auto mt-3 max-w-[16rem]">
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
