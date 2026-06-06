import type { Language } from "./types";

export type MarketingPageSlug =
  | "about"
  | "coa"
  | "faq"
  | "contact"
  | "membership"
  | "account"
  | "returns-refunds"
  | "disclaimer"
  | "privacy-policy"
  | "terms-and-conditions"
  | "research-use-only";

export type MarketingPageSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type MarketingPageContent = {
  eyebrow?: string;
  title: string;
  description: string;
  body: readonly string[];
  sections?: readonly MarketingPageSection[];
};

export const MARKETING_PAGE_SLUGS: MarketingPageSlug[] = [
  "about",
  "coa",
  "faq",
  "contact",
  "membership",
  "account",
  "returns-refunds",
  "disclaimer",
  "privacy-policy",
  "terms-and-conditions",
  "research-use-only",
];

export const MARKETING_CONTENT: Record<Language, Record<MarketingPageSlug, MarketingPageContent>> = {
  en: {
    about: {
      eyebrow: "Our Mission",
      title: "About PeptiCaribe",
      description:
        "PeptiCaribe supplies research-grade peptides with independent verification, transparent documentation, and a commitment to laboratory research standards.",
      body: [
        "We partner with ISO 17025 accredited laboratories to validate identity and purity on every batch we release.",
        "Our catalog is designed for qualified researchers and institutions conducting in-vitro laboratory research.",
      ],
      sections: [
        {
          heading: "Laboratory Standards",
          paragraphs: [
            "We partner with ISO 17025 accredited laboratories to validate identity and purity on every batch we release.",
          ],
        },
        {
          heading: "Research Catalog",
          paragraphs: [
            "Our catalog is designed for qualified researchers and institutions conducting in-vitro laboratory research.",
          ],
        },
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
      sections: [
        {
          heading: "Email",
          paragraphs: ["Email: info@pepticaribe.com"],
        },
        {
          heading: "Shipping",
          paragraphs: ["Orders placed before 4 PM EST ship same day with discreet packaging."],
        },
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
  },
  es: {
    about: {
      eyebrow: "Nuestra Misión",
      title: "Acerca de PeptiCaribe",
      description:
        "PeptiCaribe suministra péptidos de grado investigación con verificación independiente, documentación transparente y compromiso con los estándares de laboratorio.",
      body: [
        "Colaboramos con laboratorios acreditados ISO 17025 para validar identidad y pureza en cada lote que liberamos.",
        "Nuestro catálogo está diseñado para investigadores e instituciones calificadas que realizan investigación de laboratorio in vitro.",
      ],
      sections: [
        {
          heading: "Estándares de Laboratorio",
          paragraphs: [
            "Colaboramos con laboratorios acreditados ISO 17025 para validar identidad y pureza en cada lote que liberamos.",
          ],
        },
        {
          heading: "Catálogo de Investigación",
          paragraphs: [
            "Nuestro catálogo está diseñado para investigadores e instituciones calificadas que realizan investigación de laboratorio in vitro.",
          ],
        },
      ],
    },
    coa: {
      eyebrow: "Transparencia",
      title: "Biblioteca COA",
      description:
        "Cada lote PeptiCaribe incluye un Certificado de Análisis con pureza HPLC e identidad por espectrometría de masas de pruebas independientes.",
      body: [
        "La biblioteca COA completa con registros de lotes buscables se lanzará pronto. Contacte a nuestro equipo para documentación específica por lote.",
      ],
    },
    faq: {
      eyebrow: "Soporte",
      title: "Preguntas Frecuentes",
      description:
        "Respuestas a preguntas comunes sobre uso en investigación, verificación de pureza, envío y manejo de productos.",
      body: [
        "Consulte las FAQ para investigadores en nuestra página de inicio para respuestas inmediatas, o contacte a nuestro equipo para soporte técnico.",
      ],
    },
    contact: {
      eyebrow: "Contáctenos",
      title: "Contacto",
      description:
        "¿Preguntas sobre pedidos de investigación, documentación COA o protocolos de manejo de péptidos? Nuestro equipo está aquí para ayudar.",
      body: [
        "Email: info@pepticaribe.com",
        "Pedidos antes de las 4 PM EST se envían el mismo día con empaque discreto.",
      ],
      sections: [
        {
          heading: "Correo",
          paragraphs: ["Email: info@pepticaribe.com"],
        },
        {
          heading: "Envío",
          paragraphs: ["Pedidos antes de las 4 PM EST se envían el mismo día con empaque discreto."],
        },
      ],
    },
    membership: {
      eyebrow: "Socios de Investigación",
      title: "Membresía",
      description:
        "Membresía institucional con precios preferenciales, cumplimiento prioritario y soporte dedicado estará disponible pronto.",
      body: [
        "Registre su interés contactando a nuestro equipo — le notificaremos cuando se abra la inscripción.",
      ],
    },
    account: {
      eyebrow: "Portal",
      title: "Mi Cuenta",
      description:
        "Gestión de cuenta, historial de pedidos y descargas COA guardadas estarán disponibles cuando lancemos nuestro portal de investigación.",
      body: ["Vuelva pronto o contacte soporte para consultas sobre el estado de pedidos."],
    },
    "returns-refunds": {
      eyebrow: "Política",
      title: "Devoluciones y Reembolsos",
      description:
        "Nuestra política de devoluciones para materiales de investigación protege la integridad del producto mientras apoya preocupaciones legítimas de calidad.",
      body: [
        "Contacte soporte dentro de 7 días de la entrega por envíos dañados o mal etiquetados. Los productos RUO requieren documentación de cadena de custodia para devoluciones.",
      ],
    },
    disclaimer: {
      eyebrow: "Legal",
      title: "Descargo FDA",
      description:
        "Estos productos no han sido evaluados por la Administración de Alimentos y Medicamentos y no están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad.",
      body: [
        "Todos los productos se venden estrictamente para Uso en Investigación (RUO) — para investigación de laboratorio in vitro por investigadores e instituciones calificadas.",
      ],
    },
    "privacy-policy": {
      eyebrow: "Legal",
      title: "Política de Privacidad",
      description:
        "Cómo PeptiCaribe recopila, usa y protege su información personal cuando visita nuestro sitio o realiza pedidos de investigación.",
      body: [
        "Nuestro documento completo de política de privacidad se está finalizando. No vendemos datos personales y usamos cifrado estándar de la industria.",
      ],
    },
    "terms-and-conditions": {
      eyebrow: "Legal",
      title: "Términos y Condiciones",
      description:
        "Términos que rigen el uso del sitio web PeptiCaribe y la compra de compuestos de grado investigación.",
      body: [
        "Al acceder a este sitio confirma que los productos son para Uso en Investigación y acepta cumplir con las leyes aplicables en su jurisdicción.",
      ],
    },
    "research-use-only": {
      eyebrow: "Cumplimiento",
      title: "Solo Uso en Investigación",
      description:
        "Todos los productos PeptiCaribe están destinados estrictamente para investigación de laboratorio in vitro, fines educativos y científicos.",
      body: [
        "No para consumo humano, uso veterinario, diagnóstico ni aplicación terapéutica. Los compradores deben ser investigadores o instituciones calificadas.",
      ],
    },
  },
};

export function getMarketingPage(language: Language, slug: MarketingPageSlug): MarketingPageContent {
  return MARKETING_CONTENT[language][slug];
}

/** @deprecated Use MARKETING_PAGE_SLUGS from marketingContent */
export const MARKETING_PATHS = MARKETING_PAGE_SLUGS;
