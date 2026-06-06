export type MarketingPageConfig = {
  eyebrow?: string;
  title: string;
  description: string;
  body?: string[];
};

export const MARKETING_PAGES: Record<string, MarketingPageConfig> = {
  about: {
    eyebrow: "Our Mission",
    title: "About PeptiCaribe",
    description:
      "PeptiCaribe supplies research-grade peptides with independent verification, transparent documentation, and a commitment to laboratory research standards.",
    body: [
      "We partner with ISO 17025 accredited laboratories to validate identity and purity on every batch we release.",
      "Our catalog is designed for qualified researchers and institutions conducting in-vitro laboratory research.",
    ],
  },
  coa: {
    eyebrow: "Transparency",
    title: "COA Library",
    description:
      "Every PeptiCaribe batch includes a Certificate of Analysis with HPLC purity and mass spectrometry identity results from independent testing.",
    body: [
      "The full COA library with searchable batch records is launching shortly. Contact our team for batch-specific documentation in the interim.",
    ],
  },
  faq: {
    eyebrow: "Support",
    title: "Frequently Asked Questions",
    description:
      "Answers to common questions about research use, purity verification, shipping, and product handling.",
    body: [
      "Browse the Researcher FAQs on our homepage for immediate answers, or reach out to our team for technical support.",
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    title: "Contact Us",
    description:
      "Questions about research orders, COA documentation, or peptide handling protocols? Our team is here to help qualified researchers.",
    body: [
      "Email: info@pepticaribe.com",
      "Orders placed before 4 PM EST ship same day with discreet packaging.",
    ],
  },
  membership: {
    eyebrow: "Research Partners",
    title: "Membership",
    description:
      "Institutional membership with preferred pricing, priority fulfillment, and dedicated research support is coming soon.",
    body: [
      "Register your interest by contacting our team — we will notify you when membership enrollment opens.",
    ],
  },
  account: {
    eyebrow: "Portal",
    title: "My Account",
    description:
      "Account management, order history, and saved COA downloads will be available when our research portal launches.",
    body: ["Check back soon or contact support for order status inquiries."],
  },
  "returns-refunds": {
    eyebrow: "Policy",
    title: "Returns & Refunds",
    description:
      "Our returns policy for research materials is designed to protect product integrity while supporting legitimate quality concerns.",
    body: [
      "Contact support within 7 days of delivery for damaged or mislabeled shipments. Research Use Only products require proper chain-of-custody documentation for returns.",
    ],
  },
  disclaimer: {
    eyebrow: "Legal",
    title: "FDA Disclaimer",
    description:
      "These products have not been evaluated by the Food and Drug Administration and are not intended to diagnose, treat, cure, or prevent any disease.",
    body: [
      "All products are sold strictly for Research Use Only (RUO) — for in-vitro laboratory research by qualified researchers and institutions.",
    ],
  },
  "privacy-policy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "How PeptiCaribe collects, uses, and protects your personal information when you visit our site or place research orders.",
    body: [
      "Our full privacy policy document is being finalized. We do not sell personal data and use industry-standard encryption for checkout.",
    ],
  },
  "terms-and-conditions": {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    description:
      "Terms governing use of the PeptiCaribe website and purchase of research-grade compounds.",
    body: [
      "By accessing this site you confirm products are for Research Use Only and agree to comply with applicable laws in your jurisdiction.",
    ],
  },
  "research-use-only": {
    eyebrow: "Compliance",
    title: "Research Use Only",
    description:
      "All PeptiCaribe products are intended strictly for in-vitro laboratory research, educational, and scientific purposes.",
    body: [
      "Not for human consumption, veterinary use, diagnostic, or therapeutic application. Purchasers must be qualified researchers or institutions.",
    ],
  },
};

export const MARKETING_PATHS = Object.keys(MARKETING_PAGES) as (keyof typeof MARKETING_PAGES)[];
