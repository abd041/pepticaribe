import type { LegalDocument } from "./types";

export const researchUseOnlyDocument: Record<"en" | "es", LegalDocument> = {
  en: {
    slug: "research-use-only",
    eyebrow: "Compliance",
    title: "Research Use Only",
    description:
      "All PeptiCaribe products are intended strictly for in-vitro laboratory research by qualified researchers and institutions.",
    lastUpdated: "June 3, 2026",
    blocks: [
      {
        paragraphs: [
          "All products sold by PeptiCaribe are intended strictly for legitimate in-vitro laboratory and scientific research purposes only. They are not intended, labeled, or approved for human consumption, injection, inhalation, animal or veterinary use, diagnostic, therapeutic, food, cosmetic, or any other non-research application.",
        ],
      },
      {
        heading: "Purchaser Requirements",
        paragraphs: ["By placing an order you represent and warrant that:"],
        bullets: [
          "You are at least 21 years of age (or the age of majority in your jurisdiction).",
          "You are a qualified researcher or authorized representative of a recognized research institution or laboratory.",
          "You possess the necessary expertise, facilities, licenses, and authorizations to safely handle, store, use, and dispose of research compounds.",
          "You will comply with all applicable local, state, federal, and international laws, including import and export regulations.",
          "You assume full responsibility and risk for any damages, injuries, or legal violations arising from possession, handling, storage, use, or misuse of products.",
          "You will not promote, imply, or suggest human or veterinary use in any communications or promotions.",
        ],
      },
      {
        heading: "Regulatory Status",
        paragraphs: [
          "PeptiCaribe is not a registered 503A compounding pharmacy or 503B outsourcing facility. Products have not been evaluated by the U.S. Food and Drug Administration (FDA) for safety, efficacy, or any other purpose.",
          "PeptiCaribe makes no representations or warranties regarding the suitability of any product for a specific application. Any attempt to use our products for non-research purposes violates our Terms and may result in account termination and legal action.",
        ],
      },
      {
        heading: "Laboratory Handling",
        paragraphs: [
          "Research compounds may pose chemical, biological, or physical hazards if misused. Always follow standard laboratory handling protocols, wear appropriate personal protective equipment, and store materials according to product labels and Certificates of Analysis.",
        ],
      },
    ],
  },
  es: {
    slug: "research-use-only",
    eyebrow: "Cumplimiento",
    title: "Solo Uso en Investigación",
    description:
      "Todos los productos PeptiCaribe están destinados estrictamente para investigación de laboratorio in vitro por investigadores e instituciones calificadas.",
    lastUpdated: "3 de junio de 2026",
    blocks: [
      {
        paragraphs: [
          "Todos los productos vendidos por PeptiCaribe están destinados estrictamente para fines legítimos de investigación de laboratorio in vitro y científica únicamente. No están destinados, etiquetados ni aprobados para consumo humano, inyección, inhalación, uso animal o veterinario, diagnóstico, terapéutico, alimentario, cosmético ni ninguna otra aplicación que no sea de investigación.",
        ],
      },
      {
        heading: "Requisitos del Comprador",
        paragraphs: ["Al realizar un pedido, usted declara y garantiza que:"],
        bullets: [
          "Tiene al menos 21 años de edad (o la mayoría de edad en su jurisdicción).",
          "Es un investigador calificado o representante autorizado de una institución o laboratorio de investigación reconocido.",
          "Posee la experiencia, instalaciones, licencias y autorizaciones necesarias para manejar, almacenar, usar y eliminar compuestos de investigación de forma segura.",
          "Cumplirá con todas las leyes locales, estatales, federales e internacionales aplicables, incluidas las regulaciones de importación y exportación.",
          "Asume plena responsabilidad y riesgo por daños, lesiones o violaciones legales derivadas de la posesión, manejo, almacenamiento, uso o mal uso de los productos.",
          "No promoverá, implicará ni sugerirá uso humano o veterinario en ninguna comunicación o promoción.",
        ],
      },
      {
        heading: "Estado Regulatorio",
        paragraphs: [
          "PeptiCaribe no es una farmacia de compounding 503A registrada ni una instalación de outsourcing 503B. Los productos no han sido evaluados por la FDA de EE. UU. para seguridad, eficacia ni ningún otro fin.",
          "PeptiCaribe no hace representaciones ni garantías sobre la idoneidad de ningún producto para una aplicación específica. Cualquier intento de usar nuestros productos para fines que no sean de investigación viola nuestros Términos y puede resultar en terminación de cuenta y acciones legales.",
        ],
      },
      {
        heading: "Manejo en Laboratorio",
        paragraphs: [
          "Los compuestos de investigación pueden presentar riesgos químicos, biológicos o físicos si se usan incorrectamente. Siga siempre los protocolos estándar de manejo de laboratorio, use el equipo de protección personal adecuado y almacene los materiales según las etiquetas del producto y los Certificados de Análisis.",
        ],
      },
    ],
  },
};
