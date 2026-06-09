import type { LegalDocument } from "./types";

export const privacyPolicyDocument: Record<"en" | "es", LegalDocument> = {
  en: {
    slug: "privacy-policy",
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "How PeptiCaribe collects, uses, and protects your personal information when you visit our site or place research orders.",
    lastUpdated: "June 3, 2026",
    blocks: [
      {
        paragraphs: [
          "PeptiCaribe is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website at pepticaribe.com (the \"Site\"), place an order, or otherwise interact with us. All products offered on this Site are intended exclusively for legitimate in-vitro laboratory and scientific research purposes only.",
        ],
      },
      {
        heading: "1. Information We Collect",
        paragraphs: [
          "We collect information you provide directly to us and information collected automatically when you use our Site.",
          "Information You Provide:",
        ],
        bullets: [
          "Contact information (name, email address, phone number, shipping address, and billing address)",
          "Account information (username and securely hashed password, if you create an account)",
          "Order and transaction details (products purchased, order history)",
          "Communications you send us (support requests, emails, or messages)",
        ],
      },
      {
        paragraphs: ["Automatically Collected Information:"],
        bullets: [
          "IP address, browser type, device information, and operating system",
          "Pages viewed, time spent on the Site, and referring/exit pages",
          "Cookies and similar tracking technologies",
        ],
      },
      {
        heading: "2. Payment Processing",
        paragraphs: [
          "Payments are processed exclusively through trusted third-party payment processors. PeptiCaribe does not store or have direct access to full credit card numbers or banking details. All payment information is handled securely in accordance with PCI-DSS standards.",
        ],
      },
      {
        heading: "3. How We Use Your Information",
        paragraphs: ["We use the information we collect to:"],
        bullets: [
          "Process and fulfill your orders",
          "Provide order confirmations, shipping updates, and customer support",
          "Improve our website, products, and services",
          "Prevent fraud and enhance security",
          "Comply with legal and regulatory obligations",
          "Send promotional communications (email or SMS) only when you have explicitly opted in",
        ],
      },
      {
        heading: "4. Marketing Communications (Email & SMS)",
        paragraphs: [
          "We may send promotional emails or SMS messages only with your explicit consent. You can opt in during checkout or account creation.",
          "You may opt out at any time by:",
        ],
        bullets: [
          "Replying \"STOP\" to any SMS message",
          "Clicking the unsubscribe link in any email",
          "Contacting us at info@pepticaribe.com",
        ],
      },
      {
        paragraphs: [
          "Standard message and data rates may apply. We do not share your phone number with third parties for their own marketing purposes.",
        ],
      },
      {
        heading: "5. Information Sharing and Disclosure",
        paragraphs: [
          "We do not sell, rent, or trade your personal information. We may share your information only when necessary with:",
        ],
        bullets: [
          "Trusted service providers (payment processors, shipping carriers, email/SMS platforms, and analytics providers) who are contractually obligated to protect your data",
          "Law enforcement, regulatory authorities, or as required by applicable law",
          "Affiliated entities for internal operational purposes",
          "In the event of a merger, acquisition, or sale of assets (your information would be transferred under equivalent privacy protections)",
        ],
      },
      {
        heading: "6. Data Security",
        paragraphs: [
          "We implement industry-standard security measures, including encryption, secure server infrastructure, access controls, and regular monitoring, to protect your personal information. While we take reasonable steps to safeguard your data, no online system can be guaranteed to be 100% secure.",
        ],
      },
      {
        heading: "7. Cookies and Tracking Technologies",
        paragraphs: [
          "Our Site uses cookies and similar technologies to improve functionality, analyze usage, remember preferences, and enhance your experience. You can manage cookie preferences through your browser settings. Disabling cookies may affect certain features of the Site.",
        ],
      },
      {
        heading: "8. Your Privacy Rights",
        paragraphs: [
          "Depending on your jurisdiction, you may have the right to access, correct, delete, restrict, or object to certain processing of your personal information, opt out of marketing communications, or request a portable copy of your data where applicable.",
          "To exercise these rights, please email us at info@pepticaribe.com. We will respond within the timeframes required by applicable law.",
        ],
      },
      {
        heading: "9. California Privacy Rights (CCPA/CPRA)",
        paragraphs: [
          "If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete your information, and the right to opt out of the sale of your information. PeptiCaribe does not sell personal information.",
        ],
      },
      {
        heading: "10. Children's Privacy",
        paragraphs: [
          "Our Site and services are intended for individuals who are at least 21 years of age. We do not knowingly collect personal information from anyone under 21. If we become aware that we have collected information from a minor, we will promptly delete it.",
        ],
      },
      {
        heading: "11. Third-Party Links",
        paragraphs: [
          "Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.",
        ],
      },
      {
        heading: "12. Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. We will notify you of any material changes by updating the \"Last Updated\" date on this page. Your continued use of the Site after changes are posted constitutes acceptance of the updated policy.",
        ],
      },
      {
        heading: "13. Contact Us",
        paragraphs: [
          "If you have any questions about this Privacy Policy or our privacy practices, please contact us:",
          "PeptiCaribe — Email: info@pepticaribe.com — Website: https://www.pepticaribe.com",
          "We appreciate your trust in PeptiCaribe for your laboratory research needs.",
        ],
      },
    ],
  },
  es: {
    slug: "privacy-policy",
    eyebrow: "Legal",
    title: "Política de Privacidad",
    description:
      "Cómo PeptiCaribe recopila, usa y protege su información personal cuando visita nuestro sitio o realiza pedidos de investigación.",
    lastUpdated: "3 de junio de 2026",
    blocks: [
      {
        paragraphs: [
          "PeptiCaribe está comprometido con la protección de su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información personal cuando visita pepticaribe.com (el \"Sitio\"), realiza un pedido o interactúa con nosotros. Todos los productos ofrecidos en este Sitio están destinados exclusivamente para fines legítimos de investigación de laboratorio in vitro y científica.",
        ],
      },
      {
        heading: "1. Información que Recopilamos",
        paragraphs: [
          "Recopilamos información que usted nos proporciona directamente e información recopilada automáticamente cuando usa nuestro Sitio.",
          "Información que usted proporciona:",
        ],
        bullets: [
          "Información de contacto (nombre, correo electrónico, teléfono, dirección de envío y facturación)",
          "Información de cuenta (nombre de usuario y contraseña hasheada de forma segura, si crea una cuenta)",
          "Detalles de pedidos y transacciones (productos comprados, historial de pedidos)",
          "Comunicaciones que nos envía (solicitudes de soporte, correos o mensajes)",
        ],
      },
      {
        paragraphs: ["Información recopilada automáticamente:"],
        bullets: [
          "Dirección IP, tipo de navegador, información del dispositivo y sistema operativo",
          "Páginas visitadas, tiempo en el Sitio y páginas de referencia/salida",
          "Cookies y tecnologías de seguimiento similares",
        ],
      },
      {
        heading: "2. Procesamiento de Pagos",
        paragraphs: [
          "Los pagos se procesan exclusivamente a través de procesadores de pago de confianza. PeptiCaribe no almacena ni tiene acceso directo a números completos de tarjetas de crédito o datos bancarios. Toda la información de pago se maneja de forma segura conforme a los estándares PCI-DSS.",
        ],
      },
      {
        heading: "3. Cómo Usamos Su Información",
        paragraphs: ["Usamos la información recopilada para:"],
        bullets: [
          "Procesar y cumplir sus pedidos",
          "Proporcionar confirmaciones de pedido, actualizaciones de envío y soporte al cliente",
          "Mejorar nuestro sitio web, productos y servicios",
          "Prevenir fraude y mejorar la seguridad",
          "Cumplir con obligaciones legales y regulatorias",
          "Enviar comunicaciones promocionales (correo o SMS) solo cuando haya dado su consentimiento explícito",
        ],
      },
      {
        heading: "4. Comunicaciones de Marketing (Correo y SMS)",
        paragraphs: [
          "Podemos enviar correos promocionales o mensajes SMS solo con su consentimiento explícito. Puede optar por participar durante el pago o la creación de cuenta.",
          "Puede darse de baja en cualquier momento:",
        ],
        bullets: [
          "Respondiendo \"STOP\" a cualquier mensaje SMS",
          "Haciendo clic en el enlace de cancelación de suscripción en cualquier correo",
          "Contactándonos en info@pepticaribe.com",
        ],
      },
      {
        heading: "5. Compartir y Divulgar Información",
        paragraphs: [
          "No vendemos, alquilamos ni comercializamos su información personal. Podemos compartir su información solo cuando sea necesario con proveedores de servicios de confianza, autoridades legales, entidades afiliadas u operaciones corporativas, siempre bajo protecciones equivalentes de privacidad.",
        ],
      },
      {
        heading: "6. Seguridad de Datos",
        paragraphs: [
          "Implementamos medidas de seguridad estándar de la industria, incluidos cifrado, infraestructura de servidores seguros, controles de acceso y monitoreo regular, para proteger su información personal.",
        ],
      },
      {
        heading: "7. Cookies y Tecnologías de Seguimiento",
        paragraphs: [
          "Nuestro Sitio usa cookies y tecnologías similares para mejorar la funcionalidad, analizar el uso, recordar preferencias y mejorar su experiencia. Puede gestionar las preferencias de cookies en la configuración de su navegador.",
        ],
      },
      {
        heading: "8. Sus Derechos de Privacidad",
        paragraphs: [
          "Según su jurisdicción, puede tener derecho a acceder, corregir, eliminar, restringir u oponerse a ciertos tratamientos de su información personal, darse de baja de comunicaciones de marketing o solicitar una copia portable de sus datos.",
          "Para ejercer estos derechos, envíenos un correo a info@pepticaribe.com.",
        ],
      },
      {
        heading: "9. Derechos de Privacidad de California (CCPA/CPRA)",
        paragraphs: [
          "Si es residente de California, tiene derechos adicionales bajo la Ley de Privacidad del Consumidor de California. PeptiCaribe no vende información personal.",
        ],
      },
      {
        heading: "10. Privacidad de Menores",
        paragraphs: [
          "Nuestro Sitio y servicios están destinados a personas de al menos 21 años. No recopilamos conscientemente información personal de menores de 21 años.",
        ],
      },
      {
        heading: "11. Enlaces de Terceros",
        paragraphs: [
          "Nuestro Sitio puede contener enlaces a sitios web de terceros. No somos responsables de las prácticas de privacidad o el contenido de esos sitios.",
        ],
      },
      {
        heading: "12. Cambios a Esta Política",
        paragraphs: [
          "Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos cualquier cambio material actualizando la fecha de \"Última actualización\" en esta página.",
        ],
      },
      {
        heading: "13. Contáctenos",
        paragraphs: [
          "Si tiene preguntas sobre esta Política de Privacidad, contáctenos:",
          "PeptiCaribe — Email: info@pepticaribe.com — Sitio web: https://www.pepticaribe.com",
        ],
      },
    ],
  },
};
