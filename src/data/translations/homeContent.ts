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
          "The product quality and consistency have been outstanding. Every batch arrives with complete documentation, giving our team confidence in the research process.",
        author: "Dr. Michael Reynolds",
      },
      {
        quote:
          "Fast shipping, excellent packaging, and clear COA access. Everything we need for reliable research materials is provided.",
        author: "Sarah Thompson",
      },
      {
        quote:
          "We've worked with several suppliers over the years, and the level of transparency and testing documentation here stands out.",
        author: "James Carter",
      },
      {
        quote:
          "The ordering process is straightforward, delivery is quick, and the product quality has remained consistent across multiple orders.",
        author: "Emily Parker",
      },
      {
        quote:
          "Third-party testing and detailed reporting make a real difference. It's reassuring to know exactly what we're receiving.",
        author: "David Mitchell",
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
          "La calidad y consistencia del producto han sido excepcionales. Cada lote llega con documentación completa, dando a nuestro equipo confianza en el proceso de investigación.",
        author: "Dr. Michael Reynolds",
      },
      {
        quote:
          "Envío rápido, excelente empaque y acceso claro a COA. Todo lo que necesitamos para materiales de investigación confiables está disponible.",
        author: "Sarah Thompson",
      },
      {
        quote:
          "Hemos trabajado con varios proveedores a lo largo de los años, y el nivel de transparencia y documentación de pruebas aquí destaca.",
        author: "James Carter",
      },
      {
        quote:
          "El proceso de pedido es sencillo, la entrega es rápida y la calidad del producto se ha mantenido consistente en múltiples pedidos.",
        author: "Emily Parker",
      },
      {
        quote:
          "Las pruebas de terceros y los informes detallados marcan una diferencia real. Es tranquilizador saber exactamente lo que recibimos.",
        author: "David Mitchell",
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
