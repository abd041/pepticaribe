import type { Language } from "./types";
import type { FaqItem } from "./homeContent";

export type CoaStatItem = {
  value: string;
  label: string;
};

export type CoaMethodItem = {
  title: string;
  description: string;
};

export type CoaStepItem = {
  title: string;
  description: string;
};

export type CoaPageContent = {
  transparencyTitle: string;
  transparencyBody: string;
  stats: CoaStatItem[];
  methodsEyebrow: string;
  methodsTitle: string;
  methods: CoaMethodItem[];
  stepsEyebrow: string;
  stepsTitle: string;
  steps: CoaStepItem[];
  stepsCta: string;
  faqEyebrow: string;
  faqTitle: string;
  faqs: FaqItem[];
  supportTitle: string;
  supportBody: string;
  supportCta: string;
  supportEmail: string;
};

export const COA_PAGE_CONTENT: Record<Language, CoaPageContent> = {
  en: {
    transparencyTitle: "Transparency You Can Trust",
    transparencyBody:
      "A Certificate of Analysis is your proof that what's on the label is what's in the vial. Every PeptiCaribe batch is third-party tested — with full HPLC purity and mass spectrometry identity documentation available before you order.",
    stats: [
      { value: "99%+", label: "Purity Standard" },
      { value: "100%", label: "Batches Tested" },
      { value: "ISO 17025", label: "Lab Accreditation" },
    ],
    methodsEyebrow: "Verification Methods",
    methodsTitle: "Our Testing Methods",
    methods: [
      {
        title: "HPLC Purity Analysis",
        description:
          "High-Performance Liquid Chromatography separates and quantifies peptide components to verify 99%+ purity on every batch.",
      },
      {
        title: "Mass Spectrometry",
        description:
          "Precise molecular weight verification confirms peptide identity and structural integrity against the labeled reference.",
      },
      {
        title: "Identity Verification",
        description:
          "Amino acid sequence confirmation ensures the compound in the vial matches the labeled research reference.",
      },
      {
        title: "Batch Documentation",
        description:
          "Each batch is accompanied by documented quality controls tracking identity, content, and appearance prior to release.",
      },
    ],
    stepsEyebrow: "Quick Access",
    stepsTitle: "How to Access Your COA",
    steps: [
      {
        title: "Browse the COA Library",
        description:
          "Search our full catalog below. Every compound displays current batch information with lot, purity, and laboratory details.",
      },
      {
        title: "Download Your Certificate",
        description:
          "Click Download COA on any compound row to view or save the third-party lab report for that batch.",
      },
      {
        title: "Verify Your Results",
        description:
          "Review purity percentage, identity confirmation, test date, and ISO 17025 laboratory accreditation on each certificate.",
      },
    ],
    stepsCta: "Browse COA Library",
    faqEyebrow: "Common Questions",
    faqTitle: "COA Questions",
    faqs: [
      {
        question: "What is a Certificate of Analysis (COA)?",
        answer:
          "A Certificate of Analysis is a document from an independent laboratory that verifies the purity, identity, and quality of a peptide. It includes test results from HPLC analysis, mass spectrometry, and other quality control measures.",
      },
      {
        question: "Where can I find the COA for my product?",
        answer:
          "Every product in our COA Library includes a direct download link for the current batch. You can also find COA access on each product detail page, or email info@pepticaribe.com with your order number for batch-specific documentation.",
      },
      {
        question: "How do I read a COA?",
        answer:
          "Key sections include: Purity % (should be 99%+), molecular weight (confirms identity), appearance (lyophilized powder), and sequence (amino acid sequence). Our COAs include clear explanations of each test result.",
      },
      {
        question: "Are your labs accredited?",
        answer:
          "Yes. We partner with ISO 17025 accredited laboratories that specialize in peptide analysis. These independent facilities have no financial interest in our products, ensuring unbiased results.",
      },
      {
        question: "How often are peptides tested?",
        answer:
          "Every production batch undergoes full third-party testing before release. We maintain rigorous quality control with no exceptions — if a batch doesn't meet our 99%+ purity standard, it is not sold.",
      },
    ],
    supportTitle: "Need a specific COA?",
    supportBody:
      "Contact our team with your order number for batch-specific documentation or questions about test results.",
    supportCta: "Email Support",
    supportEmail: "info@pepticaribe.com",
  },
  es: {
    transparencyTitle: "Transparencia en la Que Puede Confiar",
    transparencyBody:
      "Un Certificado de Análisis es su prueba de que lo que está en la etiqueta es lo que hay en el vial. Cada lote PeptiCaribe es analizado por terceros — con documentación completa de pureza HPLC e identidad por espectrometría de masas disponible antes de ordenar.",
    stats: [
      { value: "99%+", label: "Estándar de Pureza" },
      { value: "100%", label: "Lotes Analizados" },
      { value: "ISO 17025", label: "Acreditación de Laboratorio" },
    ],
    methodsEyebrow: "Métodos de Verificación",
    methodsTitle: "Nuestros Métodos de Prueba",
    methods: [
      {
        title: "Análisis de Pureza HPLC",
        description:
          "La Cromatografía Líquida de Alto Rendimiento separa y cuantifica los componentes peptídicos para verificar pureza del 99%+ en cada lote.",
      },
      {
        title: "Espectrometría de Masas",
        description:
          "La verificación precisa del peso molecular confirma la identidad del péptido y la integridad estructural frente a la referencia etiquetada.",
      },
      {
        title: "Verificación de Identidad",
        description:
          "La confirmación de la secuencia de aminoácidos asegura que el compuesto en el vial coincide con la referencia de investigación etiquetada.",
      },
      {
        title: "Documentación por Lote",
        description:
          "Cada lote incluye controles de calidad documentados que rastrean identidad, contenido y apariencia antes de su liberación.",
      },
    ],
    stepsEyebrow: "Acceso Rápido",
    stepsTitle: "Cómo Acceder a Su COA",
    steps: [
      {
        title: "Explore la Biblioteca COA",
        description:
          "Busque en nuestro catálogo completo a continuación. Cada compuesto muestra información del lote actual con pureza y detalles del laboratorio.",
      },
      {
        title: "Descargue Su Certificado",
        description:
          "Haga clic en Descargar COA en cualquier fila para ver o guardar el informe de laboratorio de terceros de ese lote.",
      },
      {
        title: "Verifique Sus Resultados",
        description:
          "Revise el porcentaje de pureza, confirmación de identidad, fecha de prueba y acreditación del laboratorio ISO 17025 en cada certificado.",
      },
    ],
    stepsCta: "Ver Biblioteca COA",
    faqEyebrow: "Preguntas Comunes",
    faqTitle: "Preguntas sobre COA",
    faqs: [
      {
        question: "¿Qué es un Certificado de Análisis (COA)?",
        answer:
          "Un Certificado de Análisis es un documento de un laboratorio independiente que verifica la pureza, identidad y calidad de un péptido. Incluye resultados de análisis HPLC, espectrometría de masas y otras medidas de control de calidad.",
      },
      {
        question: "¿Dónde puedo encontrar el COA de mi producto?",
        answer:
          "Cada producto en nuestra Biblioteca COA incluye un enlace de descarga directa para el lote actual. También puede acceder al COA en cada página de producto, o enviar un correo a info@pepticaribe.com con su número de pedido.",
      },
      {
        question: "¿Cómo leo un COA?",
        answer:
          "Las secciones clave incluyen: Pureza % (debe ser 99%+), peso molecular (confirma identidad), apariencia (polvo liofilizado) y secuencia (secuencia de aminoácidos). Nuestros COA incluyen explicaciones claras de cada resultado.",
      },
      {
        question: "¿Sus laboratorios están acreditados?",
        answer:
          "Sí. Nos asociamos con laboratorios acreditados ISO 17025 especializados en análisis de péptidos. Estas instalaciones independientes no tienen interés financiero en nuestros productos, garantizando resultados imparciales.",
      },
      {
        question: "¿Con qué frecuencia se analizan los péptidos?",
        answer:
          "Cada lote de producción se somete a pruebas completas de terceros antes de su liberación. Mantenemos un control de calidad riguroso sin excepciones — si un lote no cumple nuestro estándar de pureza del 99%+, no se vende.",
      },
    ],
    supportTitle: "¿Necesita un COA específico?",
    supportBody:
      "Contacte a nuestro equipo con su número de pedido para documentación específica por lote o preguntas sobre resultados de pruebas.",
    supportCta: "Enviar Correo",
    supportEmail: "info@pepticaribe.com",
  },
};

export function getCoaPageContent(language: Language): CoaPageContent {
  return COA_PAGE_CONTENT[language];
}
