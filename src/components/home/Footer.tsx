"use client";

import Link from "next/link";
import { Mail, Share2 } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { useLanguage } from "@/context/LanguageContext";

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="ref-footer-column">
      <h4 className="footer-column-title polish-type-footer-label font-display">{title}</h4>
      <ul className="ref-footer-links final8-footer-links mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className="ref-footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const shopLinks = [
    { label: t("footer.linkAllProducts"), href: "/products" },
    { label: t("footer.linkBestSellers"), href: "/#best-sellers" },
    { label: t("nav.membership"), href: "/membership" },
  ];

  const resourcesLinks = [
    { label: t("footer.linkCoa"), href: "/coa" },
    { label: t("footer.linkAboutUs"), href: "/about" },
  ];

  const supportLinks = [
    { label: t("nav.faq"), href: "/faq" },
    { label: t("footer.linkShippingInfo"), href: "/contact" },
    { label: t("footer.linkReturns"), href: "/returns-refunds" },
    { label: t("footer.linkTrackOrder"), href: "/contact" },
  ];

  const legalLinks = [
    { label: t("disclaimer.title"), href: "/disclaimer" },
    { label: t("footer.linkPrivacy"), href: "/privacy-policy" },
    { label: t("footer.linkTerms"), href: "/terms-and-conditions" },
    { label: t("footer.linkRuo"), href: "/research-use-only" },
  ];

  return (
    <footer className="ref-footer polish-footer final8-footer qa-footer premium-footer-brand lux-footer relative overflow-hidden text-white">
      <SectionAtmosphere variant="footer" showBottomTransition={false}>
        <div className="polish-footer-top qa-footer-top mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="ref-footer-grid polish-footer-grid grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:gap-10 xl:gap-12">
            <div className="ref-footer-brand polish-footer-brand final8-footer-brand">
              <div className="final8-footer-logo-well">
                <BrandLogo size="lg" />
              </div>
              <div className="ref-footer-social mt-8 flex gap-3">
                <a
                  href="https://instagram.com"
                  className="ref-social-btn"
                  aria-label={t("footer.socialInstagram")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com"
                  className="ref-social-btn"
                  aria-label={t("footer.socialX")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm font-bold">X</span>
                </a>
                <a
                  href="mailto:info@pepticaribe.com"
                  className="ref-social-btn"
                  aria-label={t("footer.socialEmail")}
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <FooterLinkColumn title={t("footer.columnShop")} links={shopLinks} />
            <FooterLinkColumn title={t("footer.columnResources")} links={resourcesLinks} />
            <FooterLinkColumn title={t("footer.columnSupport")} links={supportLinks} />
            <FooterLinkColumn title={t("footer.columnLegal")} links={legalLinks} />
          </div>
        </div>

        <div className="ref-footer-bar polish-footer-bar border-t border-white/[0.06]">
          <div className="mx-auto max-w-[90rem] px-4 py-8 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
              {t("footer.barRuo")}
            </p>
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              {t("footer.copyright").replace("{year}", String(year))}
            </p>
          </div>
        </div>
      </SectionAtmosphere>
    </footer>
  );
}
