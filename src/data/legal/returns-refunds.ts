import type { LegalDocument } from "./types";

export const returnsRefundsDocument: Record<"en" | "es", LegalDocument> = {
  en: {
    slug: "returns-refunds",
    eyebrow: "Policy",
    title: "Returns & Refunds",
    description:
      "Our returns policy for research materials protects product integrity while supporting legitimate quality concerns.",
    lastUpdated: "June 3, 2026",
    blocks: [
      {
        paragraphs: [
          "Due to the specialized and sensitive nature of our research-grade products, which are manufactured and sold strictly for legitimate laboratory and scientific research purposes, all sales are final. PeptiCaribe does not offer refunds, returns, or exchanges for any reason, including but not limited to change of mind, buyer's remorse, incorrect product selection, misunderstanding of specifications, or failure to review product details prior to purchase.",
          "Our products are high-purity research compounds that often require specific storage conditions and careful handling. Once an order has shipped, we are unable to accept returns because we cannot guarantee the integrity, stability, or proper storage of any product that has left our facility. This policy protects the safety and compliance standards required for research materials.",
        ],
      },
      {
        heading: "Damaged Shipments",
        paragraphs: [
          "If your package arrives damaged, contact us within 48 hours at info@pepticaribe.com with photos of the damaged items and packaging. We will review and, where appropriate, offer a one-time replacement. Reconstituted or opened products are not eligible for return or replacement.",
        ],
      },
      {
        heading: "Research Use Only (RUO) Disclaimer",
        paragraphs: [
          "All products sold by PeptiCaribe are intended solely for Research Use Only. They are not intended for human consumption, veterinary use, diagnostic purposes, therapeutic applications, or any other non-research purpose. These compounds have not been evaluated by the U.S. Food and Drug Administration (FDA) and are not approved for any medical use. PeptiCaribe is not a registered 503A compounding pharmacy or 503B outsourcing facility.",
        ],
      },
      {
        heading: "Customer Responsibilities",
        paragraphs: [
          "Customers are fully responsible for the proper receipt, storage, handling, reconstitution, and use of all products in compliance with local, state, and federal regulations. PeptiCaribe assumes no liability for any misuse, improper handling, or failure to follow recommended storage and safety protocols.",
          "We strongly recommend that you carefully review all product descriptions, specifications, purity data, pricing, and shipping information before completing your order. If you have any questions, please contact us at info@pepticaribe.com prior to placing your order.",
        ],
      },
    ],
  },
  es: {
    slug: "returns-refunds",
    eyebrow: "Política",
    title: "Devoluciones y Reembolsos",
    description:
      "Nuestra política de devoluciones para materiales de investigación protege la integridad del producto mientras apoya preocupaciones legítimas de calidad.",
    lastUpdated: "3 de junio de 2026",
    blocks: [
      {
        paragraphs: [
          "Debido a la naturaleza especializada y sensible de nuestros productos de grado de investigación, fabricados y vendidos estrictamente para fines legítimos de investigación de laboratorio y científica, todas las ventas son finales. PeptiCaribe no ofrece reembolsos, devoluciones ni cambios por ningún motivo, incluidos, entre otros, cambio de opinión, arrepentimiento del comprador, selección incorrecta de producto, malentendido de especificaciones o no revisar los detalles del producto antes de la compra.",
          "Nuestros productos son compuestos de investigación de alta pureza que a menudo requieren condiciones de almacenamiento específicas y manejo cuidadoso. Una vez que un pedido ha sido enviado, no podemos aceptar devoluciones porque no podemos garantizar la integridad, estabilidad o almacenamiento adecuado de ningún producto que haya salido de nuestras instalaciones.",
        ],
      },
      {
        heading: "Envíos Dañados",
        paragraphs: [
          "Si su paquete llega dañado, contáctenos dentro de las 48 horas a info@pepticaribe.com con fotos de los artículos y el empaque dañados. Revisaremos y, cuando corresponda, ofreceremos un reemplazo único. Los productos reconstituidos o abiertos no son elegibles para devolución ni reemplazo.",
        ],
      },
      {
        heading: "Descargo de Solo Uso en Investigación (RUO)",
        paragraphs: [
          "Todos los productos vendidos por PeptiCaribe están destinados únicamente para Uso en Investigación. No están destinados para consumo humano, uso veterinario, fines diagnósticos, aplicaciones terapéuticas ni ningún otro fin que no sea de investigación. Estos compuestos no han sido evaluados por la FDA de EE. UU. y no están aprobados para ningún uso médico. PeptiCaribe no es una farmacia de compounding 503A registrada ni una instalación de outsourcing 503B.",
        ],
      },
      {
        heading: "Responsabilidades del Cliente",
        paragraphs: [
          "Los clientes son plenamente responsables de la recepción, almacenamiento, manejo, reconstitución y uso adecuados de todos los productos conforme a las regulaciones locales, estatales y federales. PeptiCaribe no asume responsabilidad por mal uso, manejo inadecuado o incumplimiento de los protocolos de almacenamiento y seguridad recomendados.",
          "Recomendamos encarecidamente revisar cuidadosamente todas las descripciones de productos, especificaciones, datos de pureza, precios e información de envío antes de completar su pedido. Si tiene preguntas, contáctenos en info@pepticaribe.com antes de realizar su pedido.",
        ],
      },
    ],
  },
};
