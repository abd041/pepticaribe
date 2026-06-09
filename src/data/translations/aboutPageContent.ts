import type { Language } from "./types";

export type AboutPillar = {
  id: string;
  title: string;
  description: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutPageContent = {
  pillars: AboutPillar[];
  stats: AboutStat[];
  missionTitle: string;
  missionBody: string;
};

const ABOUT_PAGE_CONTENT: Record<Language, AboutPageContent> = {
  en: {
    missionTitle: "Laboratory-grade standards for serious research",
    missionBody:
      "PeptiCaribe supplies research-grade peptides with independent verification, transparent documentation, and a commitment to in-vitro laboratory research standards. Every compound is intended for qualified researchers and institutions — never for human or veterinary use.",
    stats: [
      { value: "99%+", label: "Purity Standard" },
      { value: "ISO 17025", label: "Accredited Testing" },
      { value: "100%", label: "Batches Tested" },
    ],
    pillars: [
      {
        id: "verification",
        title: "Independent Verification",
        description:
          "Every batch is evaluated by third-party ISO 17025 accredited laboratories using HPLC and mass spectrometry for identity and purity.",
      },
      {
        id: "transparency",
        title: "Transparent Documentation",
        description:
          "Certificates of Analysis are available for every compound — searchable in our COA library and downloadable from product pages.",
      },
      {
        id: "fulfillment",
        title: "Research-Grade Fulfillment",
        description:
          "Orders placed before 4 PM EST ship the same day with discreet protective packaging and 2-day shipping included.",
      },
      {
        id: "compliance",
        title: "Research Use Only",
        description:
          "Our catalog, policies, and checkout require confirmation that all products are for legitimate in-vitro laboratory research only.",
      },
    ],
  },
  es: {
    missionTitle: "Estándares de grado de laboratorio para investigación seria",
    missionBody:
      "PeptiCaribe suministra péptidos de grado de investigación con verificación independiente, documentación transparente y compromiso con los estándares de investigación de laboratorio in vitro. Cada compuesto está destinado a investigadores e instituciones calificadas — nunca para uso humano o veterinario.",
    stats: [
      { value: "99%+", label: "Estándar de Pureza" },
      { value: "ISO 17025", label: "Pruebas Acreditadas" },
      { value: "100%", label: "Lotes Analizados" },
    ],
    pillars: [
      {
        id: "verification",
        title: "Verificación Independiente",
        description:
          "Cada lote es evaluado por laboratorios acreditados ISO 17025 de terceros mediante HPLC y espectrometría de masas para identidad y pureza.",
      },
      {
        id: "transparency",
        title: "Documentación Transparente",
        description:
          "Los Certificados de Análisis están disponibles para cada compuesto — buscables en nuestra biblioteca COA y descargables desde las páginas de producto.",
      },
      {
        id: "fulfillment",
        title: "Cumplimiento de Grado Investigación",
        description:
          "Los pedidos realizados antes de las 4 PM EST se envían el mismo día con empaque discreto y protector, con envío de 2 días incluido.",
      },
      {
        id: "compliance",
        title: "Solo Uso en Investigación",
        description:
          "Nuestro catálogo, políticas y pago requieren confirmación de que todos los productos son solo para investigación de laboratorio in vitro legítima.",
      },
    ],
  },
};

export function getAboutPageContent(language: Language): AboutPageContent {
  return ABOUT_PAGE_CONTENT[language];
}
