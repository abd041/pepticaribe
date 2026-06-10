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
      <ul className="ref-footer-links final8-footer-links mt-2 space-y-1.5 lg:mt-4 lg:space-y-2.5">
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

  const shopLinks = [{ label: t("footer.linkAllProducts"), href: "/products" }];

  const resourcesLinks = [{ label: t("footer.linkCoa"), href: "/coa" }];

  const supportLinks = [
    { label: t("nav.faq"), href: "/faq" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("footer.linkReturns"), href: "/returns-refunds" },
  ];

  const legalLinks = [
    { label: t("disclaimer.title"), href: "/disclaimer" },
    { label: t("footer.linkPrivacy"), href: "/privacy-policy" },
    { label: t("footer.linkRuo"), href: "/research-use-only" },
    { label: t("footer.linkTerms"), href: "/terms-and-conditions" },
    { label: t("footer.linkReturnsPolicy"), href: "/returns-refunds" },
  ];

  return (
    <footer className="ref-footer polish-footer final8-footer qa-footer premium-footer-brand lux-footer relative overflow-hidden text-white">
      <SectionAtmosphere variant="footer" showBottomTransition={false}>
        <div className="polish-footer-top qa-footer-top mx-auto max-w-[90rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="ref-footer-grid polish-footer-grid grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,1fr))] lg:gap-10 xl:gap-12">
            <div className="ref-footer-brand polish-footer-brand final8-footer-brand ref-footer-brand-row">
              <div className="final8-footer-logo-well">
                <BrandLogo size="lg" />
              </div>
              <div className="ref-footer-social mt-0 flex gap-2.5 lg:mt-8 lg:gap-3">
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
          <div className="mx-auto max-w-[90rem] px-4 py-5 text-center sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
              {t("footer.barRuo")}
            </p>
            <p className="mt-2 text-xs text-[var(--text-muted)] sm:mt-3 lg:mt-4">
              {t("footer.copyright").replace("{year}", String(year))}
            </p>
          </div>
        </div>
      </SectionAtmosphere>
    </footer>
  );
}
