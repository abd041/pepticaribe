import type { LegalDocument } from "./types";

export const disclaimerDocument: Record<"en" | "es", LegalDocument> = {
  en: {
    slug: "disclaimer",
    eyebrow: "Legal",
    title: "FDA Disclaimer",
    description:
      "Important legal notices regarding the intended use, regulatory status, and limitations of PeptiCaribe research compounds.",
    lastUpdated: "June 3, 2026",
    blocks: [
      {
        heading: "FDA Disclaimer",
        paragraphs: [
          "These products have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease or health condition.",
          "All product descriptions, specifications, and documentation on this website are provided for informational purposes related to legitimate laboratory research only. Nothing on this Site constitutes medical advice, treatment guidance, dosing information, or a recommendation for human or veterinary use.",
        ],
      },
      {
        heading: "Research Use Only",
        paragraphs: [
          "All products sold by PeptiCaribe are intended strictly for Research Use Only (RUO) — for in-vitro laboratory research, educational, and scientific purposes by qualified researchers and institutions only.",
          "By accessing this website or purchasing our products, you confirm that you are a qualified researcher or authorized representative of a recognized research institution and that all compounds will be used solely for legitimate laboratory research.",
        ],
        bullets: [
          "Not for human consumption, injection, inhalation, or cosmetic application",
          "Not for veterinary, diagnostic, therapeutic, or food use",
          "Not approved or labeled for any medical or clinical purpose",
        ],
      },
      {
        heading: "Not a Compounding Pharmacy",
        paragraphs: [
          "PeptiCaribe is not a registered 503A compounding pharmacy or 503B outsourcing facility. We do not compound, manufacture, dispense, or provide pharmaceutical-grade products or services for human or veterinary use.",
        ],
      },
      {
        heading: "Product Hazards & Assumption of Risk",
        paragraphs: [
          "Research-grade peptides may pose chemical, biological, or physical hazards if mishandled, stored improperly, or used outside controlled laboratory conditions. You assume full responsibility for the safe handling, storage, use, and disposal of all products in accordance with applicable laws and standard laboratory protocols.",
        ],
      },
      {
        heading: "No Guarantees",
        paragraphs: [
          "While PeptiCaribe provides Certificates of Analysis from independent ISO 17025 accredited laboratories, COAs document batch testing at the time of analysis and do not guarantee suitability for any specific research application. PeptiCaribe makes no representations or warranties regarding fitness for a particular purpose beyond documented research-grade standards.",
        ],
      },
    ],
  },
  es: {
    slug: "disclaimer",
    eyebrow: "Legal",
    title: "Descargo FDA",
    description:
      "Avisos legales importantes sobre el uso previsto, estado regulatorio y limitaciones de los compuestos de investigación PeptiCaribe.",
    lastUpdated: "3 de junio de 2026",
    blocks: [
      {
        heading: "Descargo FDA",
        paragraphs: [
          "Estos productos no han sido evaluados por la Administración de Alimentos y Medicamentos (FDA). No están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad o condición de salud.",
          "Todas las descripciones, especificaciones y documentación en este sitio se proporcionan únicamente con fines informativos relacionados con investigación de laboratorio legítima. Nada en este sitio constituye asesoramiento médico, orientación de tratamiento, información de dosificación o recomendación para uso humano o veterinario.",
        ],
      },
      {
        heading: "Solo Uso en Investigación",
        paragraphs: [
          "Todos los productos vendidos por PeptiCaribe están destinados estrictamente para Uso en Investigación (RUO) — para investigación de laboratorio in vitro, fines educativos y científicos por investigadores e instituciones calificadas únicamente.",
          "Al acceder a este sitio o comprar nuestros productos, confirma que es un investigador calificado o representante autorizado de una institución de investigación reconocida y que todos los compuestos se utilizarán únicamente para investigación de laboratorio legítima.",
        ],
        bullets: [
          "No para consumo humano, inyección, inhalación o aplicación cosmética",
          "No para uso veterinario, diagnóstico, terapéutico o alimentario",
          "No aprobados ni etiquetados para ningún fin médico o clínico",
        ],
      },
      {
        heading: "No Somos una Farmacia de Compounding",
        paragraphs: [
          "PeptiCaribe no es una farmacia de compounding 503A registrada ni una instalación de outsourcing 503B. No formulamos, fabricamos, dispensamos ni proporcionamos productos o servicios de grado farmacéutico para uso humano o veterinario.",
        ],
      },
      {
        heading: "Riesgos del Producto y Asunción de Responsabilidad",
        paragraphs: [
          "Los péptidos de grado de investigación pueden presentar riesgos químicos, biológicos o físicos si se manejan incorrectamente, almacenan de forma inadecuada o se usan fuera de condiciones de laboratorio controladas. Usted asume plena responsabilidad por el manejo, almacenamiento, uso y eliminación seguros de todos los productos conforme a las leyes aplicables y protocolos estándar de laboratorio.",
        ],
      },
      {
        heading: "Sin Garantías",
        paragraphs: [
          "Si bien PeptiCaribe proporciona Certificados de Análisis de laboratorios independientes acreditados ISO 17025, los COA documentan las pruebas del lote en el momento del análisis y no garantizan idoneidad para ninguna aplicación de investigación específica. PeptiCaribe no hace representaciones ni garantías sobre idoneidad para un propósito particular más allá de los estándares documentados de grado de investigación.",
        ],
      },
    ],
  },
};
