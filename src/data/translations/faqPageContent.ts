import type { Language } from "./types";
import type { FaqItem } from "./homeContent";

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export type FaqStat = {
  value: string;
  label: string;
};

export type FaqPageContent = {
  categories: FaqCategory[];
  stats: FaqStat[];
  supportTitle: string;
  supportBody: string;
  supportCta: string;
  supportEmail: string;
};

const FAQ_PAGE_CONTENT: Record<Language, FaqPageContent> = {
  en: {
    stats: [
      { value: "99%+", label: "Purity Standard" },
      { value: "ISO 17025", label: "Lab Accreditation" },
      { value: "2-Day", label: "Shipping Included" },
    ],
    categories: [
      {
        id: "research",
        title: "Research & Products",
        items: [
          {
            question: "What are peptides and how do they work?",
            answer:
              "Peptides are short chains of amino acids that act as highly specific signaling molecules in biological systems. In research, they work by binding to targeted receptors to modulate cellular pathways, allowing scientists to study processes such as metabolism, tissue repair, and neurological function in laboratory models.",
          },
          {
            question: "What is the intended use of your products?",
            answer:
              "All products sold by PeptiCaribe are intended strictly for Research Use Only (RUO). They are for in-vitro laboratory research, educational, and scientific purposes by qualified researchers and institutions only. Our peptides are not for human consumption, veterinary use, diagnostic purposes, or any therapeutic application. They have not been evaluated by the FDA for safety or efficacy in humans. By purchasing, you confirm you are using these compounds for legitimate laboratory research purposes only.",
          },
        ],
      },
      {
        id: "quality",
        title: "Quality & Testing",
        items: [
          {
            question: "Are your products third-party tested?",
            answer:
              "Yes. All peptides undergo independent third-party testing to verify purity, identity, and quality. Certificates of Analysis from accredited ISO 17025 laboratories are available to confirm that each batch meets strict research-grade standards. All Certificates have tamper-evident results through digitally verifiable reporting. 8x testing is being implemented in our next batch of Certificates of Analysis. Our products are intended strictly for research use only.",
          },
          {
            question: "How do I access the Certificate of Analysis (COA) for my order?",
            answer:
              "Every batch comes with a Certificate of Analysis from an accredited ISO 17025 laboratory. You can view or download COAs on our dedicated COA page. You can also request them anytime by emailing support with your order number. We are rolling out enhanced 8x testing standards on upcoming batches for additional verification.",
          },
          {
            question: "How should I store and handle the peptides?",
            answer:
              "Store lyophilized peptides at –20°C for long-term stability or 2–8°C (refrigerated) for short-term use. Protect from light, moisture, and repeated freeze-thaw cycles. Once reconstituted, store in the refrigerator and use within the timeframe indicated on the product label or COA. Always follow standard laboratory handling protocols and wear appropriate personal protective equipment.",
          },
        ],
      },
      {
        id: "ordering",
        title: "Ordering, Shipping & Payments",
        items: [
          {
            question: "How long do products take to deliver?",
            answer:
              "Products are shipped out the same day if placed before 4PM EST and are expected to arrive at your doorstep within 2-3 business days as 2-day shipping is included in every order.",
          },
          {
            question: "What payment methods are accepted?",
            answer:
              "We are currently accepting all major credit cards, Apple Pay, Google Pay, ACH Payments, and Zelle. All transactions are processed through secure, encrypted payment gateways to protect your information.",
          },
        ],
      },
      {
        id: "support",
        title: "Returns, Support & Wholesale",
        items: [
          {
            question: "What is your return or replacement policy?",
            answer:
              "We stand behind every order. If your package arrives damaged, contact us within 48 hours with photos of the damaged items and packaging. We will review and, where appropriate, offer a one-time replacement. Reconstituted or opened products are not eligible for return. We do not offer refunds for change of mind. All shipments include protective packaging.",
          },
          {
            question: "Do you offer bulk or wholesale pricing?",
            answer:
              "Yes. We offer competitive bulk and wholesale pricing for research institutions, universities, and high-volume customers. Email info@pepticaribe.com with your peptide requirements, quantities, and any recurring needs for a custom quote. Bulk orders may qualify for expedited processing and dedicated account support.",
          },
        ],
      },
    ],
    supportTitle: "Still have questions?",
    supportBody:
      "Our team supports qualified researchers with order questions, COA documentation, and peptide handling guidance.",
    supportCta: "Contact Support",
    supportEmail: "info@pepticaribe.com",
  },
  es: {
    stats: [
      { value: "99%+", label: "Estándar de Pureza" },
      { value: "ISO 17025", label: "Acreditación de Laboratorio" },
      { value: "2 Días", label: "Envío Incluido" },
    ],
    categories: [
      {
        id: "research",
        title: "Investigación y Productos",
        items: [
          {
            question: "¿Qué son los péptidos y cómo funcionan?",
            answer:
              "Los péptidos son cadenas cortas de aminoácidos que actúan como moléculas de señalización altamente específicas en los sistemas biológicos. En la investigación, funcionan uniéndose a receptores específicos para modular vías celulares, permitiendo a los científicos estudiar procesos como el metabolismo, la reparación de tejidos y la función neurológica en modelos de laboratorio.",
          },
          {
            question: "¿Cuál es el uso previsto de sus productos?",
            answer:
              "Todos los productos vendidos por PeptiCaribe están destinados estrictamente para Uso en Investigación (RUO). Son para investigación de laboratorio in vitro, fines educativos y científicos por investigadores e instituciones calificadas únicamente. Nuestros péptidos no son para consumo humano, uso veterinario, fines diagnósticos ni ninguna aplicación terapéutica. No han sido evaluados por la FDA para seguridad o eficacia en humanos. Al comprar, confirma que utiliza estos compuestos únicamente para fines legítimos de investigación de laboratorio.",
          },
        ],
      },
      {
        id: "quality",
        title: "Calidad y Pruebas",
        items: [
          {
            question: "¿Sus productos son analizados por terceros?",
            answer:
              "Sí. Todos los péptidos pasan por pruebas independientes de terceros para verificar pureza, identidad y calidad. Los Certificados de Análisis de laboratorios acreditados ISO 17025 están disponibles para confirmar que cada lote cumple estrictos estándares de grado de investigación. Todos los certificados tienen resultados a prueba de manipulación mediante informes digitalmente verificables. Las pruebas 8x se están implementando en nuestro próximo lote de Certificados de Análisis. Nuestros productos están destinados estrictamente para uso en investigación.",
          },
          {
            question: "¿Cómo accedo al Certificado de Análisis (COA) de mi pedido?",
            answer:
              "Cada lote incluye un Certificado de Análisis de un laboratorio acreditado ISO 17025. Puede ver o descargar COAs en nuestra página dedicada de COA. También puede solicitarlos en cualquier momento enviando un correo a soporte con su número de pedido. Estamos implementando estándares mejorados de pruebas 8x en lotes próximos para verificación adicional.",
          },
          {
            question: "¿Cómo debo almacenar y manejar los péptidos?",
            answer:
              "Almacene los péptidos liofilizados a –20°C para estabilidad a largo plazo o a 2–8°C (refrigerados) para uso a corto plazo. Protéjalos de la luz, la humedad y los ciclos repetidos de congelación-descongelación. Una vez reconstituidos, almacene en el refrigerador y use dentro del plazo indicado en la etiqueta del producto o el COA. Siga siempre los protocolos estándar de manejo de laboratorio y use el equipo de protección personal adecuado.",
          },
        ],
      },
      {
        id: "ordering",
        title: "Pedidos, Envío y Pagos",
        items: [
          {
            question: "¿Cuánto tardan los productos en llegar?",
            answer:
              "Los productos se envían el mismo día si el pedido se realiza antes de las 4 PM EST y se espera que lleguen a su puerta en 2-3 días hábiles, ya que el envío de 2 días está incluido en cada pedido.",
          },
          {
            question: "¿Qué métodos de pago aceptan?",
            answer:
              "Actualmente aceptamos todas las tarjetas de crédito principales, Apple Pay, Google Pay, pagos ACH y Zelle. Todas las transacciones se procesan a través de pasarelas de pago seguras y encriptadas para proteger su información.",
          },
        ],
      },
      {
        id: "support",
        title: "Devoluciones, Soporte y Mayoristas",
        items: [
          {
            question: "¿Cuál es su política de devolución o reemplazo?",
            answer:
              "Respaldamos cada pedido. Si su paquete llega dañado, contáctenos dentro de las 48 horas con fotos de los artículos y el empaque dañados. Revisaremos y, cuando corresponda, ofreceremos un reemplazo único. Los productos reconstituidos o abiertos no son elegibles para devolución. No ofrecemos reembolsos por cambio de opinión. Todos los envíos incluyen empaque protector.",
          },
          {
            question: "¿Ofrecen precios al por mayor o mayoristas?",
            answer:
              "Sí. Ofrecemos precios competitivos al por mayor para instituciones de investigación, universidades y clientes de alto volumen. Envíe un correo a info@pepticaribe.com con sus requisitos de péptidos, cantidades y necesidades recurrentes para una cotización personalizada. Los pedidos al por mayor pueden calificar para procesamiento acelerado y soporte de cuenta dedicado.",
          },
        ],
      },
    ],
    supportTitle: "¿Aún tiene preguntas?",
    supportBody:
      "Nuestro equipo apoya a investigadores calificados con preguntas sobre pedidos, documentación COA y manejo de péptidos.",
    supportCta: "Contactar Soporte",
    supportEmail: "info@pepticaribe.com",
  },
};

/** Preview indices: peptides, intended use, shipping, returns */
const HOME_FAQ_PREVIEW_INDICES = [0, 1, 0, 0] as const;
const HOME_FAQ_PREVIEW_CATEGORIES = ["research", "research", "ordering", "support"] as const;

export function getFaqPageContent(language: Language): FaqPageContent {
  return FAQ_PAGE_CONTENT[language];
}

export function getAllFaqItems(language: Language): FaqItem[] {
  return FAQ_PAGE_CONTENT[language].categories.flatMap((category) => category.items);
}

/** Homepage accordion preview — one question per major topic */
export function getFaqPreviewItems(language: Language, count = 4): FaqItem[] {
  const { categories } = FAQ_PAGE_CONTENT[language];
  const byId = Object.fromEntries(categories.map((c) => [c.id, c.items]));

  return HOME_FAQ_PREVIEW_CATEGORIES.slice(0, count).map((categoryId, index) => {
    const items = byId[categoryId];
    return items[HOME_FAQ_PREVIEW_INDICES[index] ?? 0];
  });
}
