import type { Language } from "./types";

export type ReviewItem = { quote: string; author: string };
export type FaqItem = { question: string; answer: string };

export type HomeContent = {
  reviews: ReviewItem[];
  faqs: FaqItem[];
};

export const HOME_CONTENT: Record<Language, HomeContent> = {
  en: {
    reviews: [
      {
        quote:
          "Consistently high purity across multiple orders. COAs match every batch — exactly what our lab requires.",
        author: "Verified Researcher",
      },
      {
        quote:
          "Fast fulfillment and discreet packaging. The documentation quality sets PeptiCaribe apart from other suppliers.",
        author: "Verified Researcher",
      },
      {
        quote:
          "Third-party testing on every compound gives us confidence before any in-vitro protocol begins.",
        author: "Verified Researcher",
      },
    ],
    faqs: [
      {
        question: "Are these peptides for human consumption?",
        answer:
          "No. All PeptiCaribe products are sold strictly for Research Use Only (RUO) — for in-vitro laboratory research, educational, and scientific purposes by qualified researchers and institutions only.",
      },
      {
        question: "How do I verify batch purity?",
        answer:
          "Every batch includes a Certificate of Analysis from an independent ISO 17025 accredited laboratory. Browse our COA Library to view HPLC purity and mass spectrometry identity results.",
      },
      {
        question: "What shipping options are available?",
        answer:
          "Orders placed before 4 PM EST ship same day with discreet packaging. Standard delivery is 2–3 business days domestically with secure worldwide options available.",
      },
      {
        question: "Do you provide technical support?",
        answer:
          "Yes. Our team includes researchers who understand peptide handling, reconstitution, and storage protocols. Contact us for technical assistance with your research orders.",
      },
    ],
  },
  es: {
    reviews: [
      {
        quote:
          "Pureza consistentemente alta en múltiples pedidos. Los COA coinciden con cada lote — exactamente lo que nuestro laboratorio requiere.",
        author: "Investigador Verificado",
      },
      {
        quote:
          "Cumplimiento rápido y empaque discreto. La calidad de la documentación distingue a PeptiCaribe de otros proveedores.",
        author: "Investigador Verificado",
      },
      {
        quote:
          "Las pruebas de terceros en cada compuesto nos dan confianza antes de iniciar cualquier protocolo in vitro.",
        author: "Investigador Verificado",
      },
    ],
    faqs: [
      {
        question: "¿Estos péptidos son para consumo humano?",
        answer:
          "No. Todos los productos PeptiCaribe se venden estrictamente para Uso en Investigación (RUO) — para investigación de laboratorio in vitro por investigadores e instituciones calificadas.",
      },
      {
        question: "¿Cómo verifico la pureza del lote?",
        answer:
          "Cada lote incluye un Certificado de Análisis de un laboratorio acreditado ISO 17025 independiente. Consulte nuestra Biblioteca COA para ver resultados de pureza HPLC e identidad por espectrometría de masas.",
      },
      {
        question: "¿Qué opciones de envío están disponibles?",
        answer:
          "Los pedidos antes de las 4 PM EST se envían el mismo día con empaque discreto. La entrega estándar es de 2–3 días hábiles a nivel nacional con opciones seguras a nivel mundial.",
      },
      {
        question: "¿Ofrecen soporte técnico?",
        answer:
          "Sí. Nuestro equipo incluye investigadores que comprenden el manejo, reconstitución y almacenamiento de péptidos. Contáctenos para asistencia técnica con sus pedidos de investigación.",
      },
    ],
  },
};

export function getHomeContent(language: Language): HomeContent {
  return HOME_CONTENT[language];
}
