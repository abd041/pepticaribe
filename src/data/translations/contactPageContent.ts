import type { Language } from "./types";

export type ContactTopic = {
  id: string;
  title: string;
  description: string;
  mailSubject: string;
};

export type ContactPageContent = {
  email: string;
  topics: ContactTopic[];
  responseValue: string;
  shippingNote: string;
  emailUsBody: string;
};

const CONTACT_PAGE_CONTENT: Record<Language, ContactPageContent> = {
  en: {
    email: "info@pepticaribe.com",
    topics: [
      {
        id: "orders",
        title: "Orders & Shipping",
        description:
          "Order status, tracking updates, delivery questions, or changes before your shipment leaves our facility.",
        mailSubject: "Order Inquiry",
      },
      {
        id: "coa",
        title: "COA & Quality",
        description:
          "Request batch-specific Certificates of Analysis, purity documentation, or verification details for your compounds.",
        mailSubject: "COA Request",
      },
      {
        id: "wholesale",
        title: "Wholesale & Bulk",
        description:
          "Institutional pricing, recurring supply needs, and custom quotes for universities, labs, and high-volume research customers.",
        mailSubject: "Wholesale Inquiry",
      },
      {
        id: "research",
        title: "Research Support",
        description:
          "Peptide handling protocols, storage guidance, product specifications, or general laboratory research questions.",
        mailSubject: "Research Support",
      },
    ],
    responseValue: "Within 24–48 business hours",
    shippingNote: "Orders placed before 4 PM EST ship the same day with discreet protective packaging.",
    emailUsBody:
      "For the fastest response, include your order number, institution name, and a brief description of your research inquiry.",
  },
  es: {
    email: "info@pepticaribe.com",
    topics: [
      {
        id: "orders",
        title: "Pedidos y Envío",
        description:
          "Estado del pedido, actualizaciones de seguimiento, preguntas de entrega o cambios antes de que salga su envío.",
        mailSubject: "Consulta de Pedido",
      },
      {
        id: "coa",
        title: "COA y Calidad",
        description:
          "Solicite Certificados de Análisis por lote, documentación de pureza o detalles de verificación para sus compuestos.",
        mailSubject: "Solicitud de COA",
      },
      {
        id: "wholesale",
        title: "Mayoristas y Volumen",
        description:
          "Precios institucionales, suministro recurrente y cotizaciones personalizadas para universidades, laboratorios y clientes de alto volumen.",
        mailSubject: "Consulta Mayorista",
      },
      {
        id: "research",
        title: "Soporte de Investigación",
        description:
          "Protocolos de manejo de péptidos, guía de almacenamiento, especificaciones de producto o preguntas generales de laboratorio.",
        mailSubject: "Soporte de Investigación",
      },
    ],
    responseValue: "Dentro de 24–48 horas hábiles",
    shippingNote:
      "Los pedidos realizados antes de las 4 PM EST se envían el mismo día con empaque discreto y protector.",
    emailUsBody:
      "Para una respuesta más rápida, incluya su número de pedido, nombre de institución y una breve descripción de su consulta de investigación.",
  },
};

export function getContactPageContent(language: Language): ContactPageContent {
  return CONTACT_PAGE_CONTENT[language];
}
