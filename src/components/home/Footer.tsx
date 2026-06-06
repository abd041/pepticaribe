import Link from "next/link";
import { Mail, Share2 } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";

const SHOP_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Best Sellers", href: "/#best-sellers" },
  { label: "New Arrivals", href: "/products" },
  { label: "Membership", href: "/membership" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about" },
  { label: "Research Standards", href: "/coa" },
  { label: "Contact", href: "/contact" },
];

const SUPPORT_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Shipping Info", href: "/contact" },
  { label: "Returns", href: "/returns-refunds" },
  { label: "Track Order", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Research Use Only", href: "/research-use-only" },
];

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
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Share2 className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com"
                  className="ref-social-btn"
                  aria-label="X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm font-bold">X</span>
                </a>
                <a href="mailto:info@pepticaribe.com" className="ref-social-btn" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            <FooterLinkColumn title="Shop" links={SHOP_LINKS} />
            <FooterLinkColumn title="Company" links={COMPANY_LINKS} />
            <FooterLinkColumn title="Support" links={SUPPORT_LINKS} />
            <FooterLinkColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <div className="ref-footer-bar polish-footer-bar border-t border-white/[0.06]">
          <div className="mx-auto max-w-[90rem] px-4 py-8 text-center sm:px-6 lg:px-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--soft-ivory)]/40">
              Research Use Only — Not for Human Consumption
            </p>
            <p className="mt-4 text-xs text-[var(--soft-ivory)]/32">
              © {new Date().getFullYear()} PeptiCaribe. All Rights Reserved.
            </p>
          </div>
        </div>
      </SectionAtmosphere>
    </footer>
  );
}
