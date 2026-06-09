import type { Language } from "./types";
import { getFaqPreviewItems } from "./faqPageContent";

export type ReviewItem = { quote: string; author: string };
export type FaqItem = { question: string; answer: string };

export type HomeContent = {
  reviews: ReviewItem[];
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
  },
};

export function getHomeContent(language: Language): HomeContent {
  return HOME_CONTENT[language];
}

export function getHomeFaqs(language: Language): FaqItem[] {
  return getFaqPreviewItems(language, HOME_FAQ_PREVIEW_COUNT);
}
