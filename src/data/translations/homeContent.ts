import type { Language } from "./types";

export type ReviewItem = { quote: string; author: string };
export type FaqItem = { question: string; answer: string };

export type HomeContent = {
  reviews: ReviewItem[];
  faqs: FaqItem[];
};

/** Homepage FAQ accordion — full list lives on /faq */
export const HOME_FAQ_PREVIEW_COUNT = 4;

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
          "Products are shipped out the same day if placed before 4PM EST and are expected to arrive at your doorstep within 2-3 business days as 2-day shipping is included in every order.",
      },
      {
        question: "Is a COA included with every order?",
        answer:
          "Yes. Every order includes batch-specific Certificate of Analysis documentation with third-party lab results (HPLC + mass spec). Browse our COA Library anytime to review testing standards before you buy.",
      },
      {
        question: "How should I store lyophilized peptides?",
        answer:
          "Store unopened lyophilized vials refrigerated at 2–8°C, protected from light. After reconstitution, follow your laboratory protocol; most researchers refrigerate reconstituted material and use it within the stability window noted in your batch documentation.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards, Apple Pay, select third-party payment options, and cryptocurrency for added privacy. All checkout is encrypted and processed through our secure payment gateway.",
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
          "Los productos se envían el mismo día si el pedido se realiza antes de las 4 PM EST y se espera que lleguen a su puerta en 2-3 días hábiles, ya que el envío de 2 días está incluido en cada pedido.",
      },
      {
        question: "¿Se incluye un COA con cada pedido?",
        answer:
          "Sí. Cada pedido incluye documentación de Certificado de Análisis específica del lote con resultados de laboratorio de terceros (HPLC + espectrometría de masas). Consulte nuestra Biblioteca COA en cualquier momento para revisar los estándares de prueba antes de comprar.",
      },
      {
        question: "¿Cómo debo almacenar los péptidos liofilizados?",
        answer:
          "Guarde los viales liofilizados sin abrir refrigerados a 2–8°C, protegidos de la luz. Después de la reconstitución, siga el protocolo de su laboratorio; la mayoría de los investigadores refrigeran el material reconstituido y lo usan dentro del período de estabilidad indicado en la documentación del lote.",
      },
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito principales, Apple Pay, opciones de pago de terceros seleccionadas y criptomonedas para mayor privacidad. Todo el pago está encriptado y se procesa a través de nuestra pasarela segura.",
      },
    ],
  },
};

export function getHomeContent(language: Language): HomeContent {
  return HOME_CONTENT[language];
}
