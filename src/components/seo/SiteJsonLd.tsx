const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pepticaribe.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PeptiCaribe",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/pepticaribe-logo.svg`,
  description:
    "Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, ISO 17025 third-party tested.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "info@pepticaribe.com",
    availableLanguage: ["English", "Spanish"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PeptiCaribe",
  url: SITE_URL,
  inLanguage: ["en-US", "es"],
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/products?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export function SiteJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
