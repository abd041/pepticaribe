"use client";

import { FlaskConical, Shield, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AnnouncementBar() {
  const { t } = useLanguage();

  const announcements = [
    { icon: Truck, text: t("announcements.shipping") },
    { icon: FlaskConical, text: t("announcements.ruo") },
    { icon: Shield, text: t("announcements.secure") },
  ] as const;

  const ticker = [...announcements, ...announcements];

  return (
    <div className="concept-announcement premium-announcement relative overflow-hidden text-white">
      <div className="concept-announcement-glow premium-announcement-glow absolute inset-0" aria-hidden />
      <div
        className="concept-announcement-marquee relative py-2.5 lg:py-3"
        role="region"
        aria-label={t("announcements.regionLabel")}
      >
        <div className="concept-announcement-marquee-track flex w-max items-center">
          {ticker.map((item, index) => (
            <span
              key={`${item.text}-${index}`}
              className="concept-announcement-item flex shrink-0 items-center gap-2.5 px-8"
            >
              <item.icon
                className="concept-announcement-icon h-3.5 w-3.5 shrink-0 text-[var(--luxury-gold)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <span className="concept-announcement-text whitespace-nowrap">{item.text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
