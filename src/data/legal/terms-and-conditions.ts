import type { LegalDocument } from "./types";

export const termsDocument: Record<"en" | "es", LegalDocument> = {
  en: {
    slug: "terms-and-conditions",
    eyebrow: "Legal",
    title: "Terms & Conditions",
    description:
      "Terms governing use of the PeptiCaribe website and purchase of research-grade compounds.",
    lastUpdated: "June 3, 2026",
    blocks: [
      {
        paragraphs: [
          "Welcome to PeptiCaribe. By accessing or using our website at pepticaribe.com (the \"Site\"), placing an order, or otherwise interacting with PeptiCaribe, you agree to be fully bound by these Terms & Conditions (\"Terms\"). Please read them carefully. If you do not agree to any provision, you must immediately cease use of the Site and refrain from placing orders.",
        ],
      },
      {
        heading: "1. Research Use Only – Important Disclaimer",
        paragraphs: [
          "All products sold by PeptiCaribe are intended strictly for legitimate in-vitro laboratory and scientific research purposes only. They are not intended, labeled, or approved for human consumption, injection, inhalation, animal or veterinary use, diagnostic, therapeutic, food, cosmetic, or any other non-research application.",
          "PeptiCaribe is not a registered 503A compounding pharmacy or 503B outsourcing facility. Products have not been evaluated by the FDA for safety, efficacy, or any other purpose.",
          "By placing an order you represent and warrant that you are at least 21 years of age, a qualified researcher or authorized institutional representative, possess necessary expertise and authorizations, will comply with all applicable laws, assume full responsibility for product handling and use, and will not promote human or veterinary use.",
        ],
      },
      {
        heading: "2. Eligibility and Account Registration",
        paragraphs: [
          "Access to PeptiCaribe products and services is limited to qualified researchers, laboratory professionals, and organizations engaged in legitimate scientific research. PeptiCaribe reserves the right to approve, deny, or terminate any account or order at its sole discretion. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
        ],
      },
      {
        heading: "3. Orders and Payment",
        paragraphs: [
          "All orders are subject to acceptance and availability. PeptiCaribe reserves the right to accept, reject, modify, or cancel any order at any time for any reason, including suspected non-compliance with these Terms.",
          "Payments are processed securely through trusted third-party processors. We do not store complete credit card or banking information. Orders ship only after payment clears.",
        ],
      },
      {
        heading: "4. Shipping and Delivery",
        paragraphs: [
          "We offer same-day shipping for orders placed before 4:00 PM EST (subject to product availability). Delivery times are estimates only. PeptiCaribe is not liable for delays caused by carriers, customs, weather, or circumstances beyond our reasonable control. You are solely responsible for compliance with all import/export laws in your jurisdiction. Risk of loss and title pass to you upon delivery to the carrier.",
        ],
      },
      {
        heading: "5. Returns, Refunds, and Exchanges",
        paragraphs: [
          "All sales are final. Due to the specialized nature of research-grade materials, PeptiCaribe does not accept returns, offer refunds, or provide exchanges. Reconstituted products are not eligible for replacement. Please refer to our separate Return & Refund Policy for full details.",
        ],
      },
      {
        heading: "6. Prohibited Conduct",
        paragraphs: ["You agree not to:"],
        bullets: [
          "Use products for any purpose other than legitimate in-vitro laboratory research",
          "Promote, imply, or suggest human consumption, veterinary use, therapeutic benefits, dosing, or medical applications",
          "Resell products without prior written authorization",
          "Use automated means to access or scrape the Site",
          "Violate any applicable laws or regulations",
          "Engage in any activity that could expose PeptiCaribe to regulatory, legal, or reputational risk",
        ],
      },
      {
        heading: "7. Assumption of Risk and Waiver",
        paragraphs: [
          "You expressly acknowledge that your purchase, possession, handling, storage, and use of any products from PeptiCaribe is at your sole and exclusive risk. To the fullest extent permitted by law, you waive, release, and forever discharge PeptiCaribe and its officers, employees, affiliates, and agents from any claims arising from or related to your possession, handling, storage, use, or misuse of products.",
        ],
      },
      {
        heading: "8. Disclaimer of Warranties",
        paragraphs: [
          "All products and the Site are provided \"AS IS\" and \"AS AVAILABLE\" without warranties of any kind, express or implied. PeptiCaribe disclaims all warranties, including merchantability, fitness for a particular purpose, and non-infringement.",
        ],
      },
      {
        heading: "9. Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by law, PeptiCaribe shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages. Our total aggregate liability shall not exceed the amount you paid for the specific product(s) giving rise to the claim.",
        ],
      },
      {
        heading: "10. Indemnification",
        paragraphs: [
          "You agree to indemnify, defend, and hold harmless PeptiCaribe from claims arising out of your use or misuse of products, any statements or promotions you make regarding our products, your violation of these Terms or applicable laws, or any regulatory action resulting from your actions.",
        ],
      },
      {
        heading: "11. Intellectual Property",
        paragraphs: [
          "All content on the Site is the property of PeptiCaribe or its licensors and is protected by intellectual property laws. You may not reproduce, modify, distribute, or create derivative works without prior written consent.",
        ],
      },
      {
        heading: "12. Termination",
        paragraphs: [
          "PeptiCaribe reserves the right to suspend or terminate your account or cancel orders at any time, for any reason, at our sole discretion. Key provisions survive termination.",
        ],
      },
      {
        heading: "13. Dispute Resolution & Arbitration",
        paragraphs: [
          "Any dispute arising out of or relating to these Terms, the Site, or products purchased from PeptiCaribe shall be resolved exclusively through binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. Arbitration shall take place in Miami, Florida. Arbitration shall be conducted on an individual basis only. You expressly waive any right to participate in any class action or representative proceeding.",
        ],
      },
      {
        heading: "14. Governing Law",
        paragraphs: [
          "These Terms shall be governed by the laws of the State of Florida, without regard to conflict of law principles. Subject to the arbitration provision above, any legal action shall be brought exclusively in the state or federal courts located in Florida.",
        ],
      },
      {
        heading: "15. Modifications to Terms",
        paragraphs: [
          "PeptiCaribe may update these Terms at any time. Changes are effective immediately upon posting. Your continued use of the Site constitutes acceptance of the updated Terms.",
        ],
      },
      {
        heading: "16. Force Majeure",
        paragraphs: [
          "PeptiCaribe shall not be liable for any failure or delay in performance due to causes beyond our reasonable control, including acts of God, natural disasters, war, government actions, labor disputes, or internet disruptions.",
        ],
      },
      {
        heading: "17. Severability, Waiver, and Entire Agreement",
        paragraphs: [
          "If any provision is found invalid or unenforceable, the remaining provisions continue in full force. These Terms, together with our Privacy Policy and Return Policy, constitute the entire agreement between you and PeptiCaribe.",
        ],
      },
      {
        heading: "18. Contact Information",
        paragraphs: [
          "For questions regarding these Terms, please contact PeptiCaribe at info@pepticaribe.com or visit https://www.pepticaribe.com.",
        ],
      },
    ],
  },
  es: {
    slug: "terms-and-conditions",
    eyebrow: "Legal",
    title: "Términos y Condiciones",
    description:
      "Términos que rigen el uso del sitio web PeptiCaribe y la compra de compuestos de grado de investigación.",
    lastUpdated: "3 de junio de 2026",
    blocks: [
      {
        paragraphs: [
          "Bienvenido a PeptiCaribe. Al acceder o usar nuestro sitio web en pepticaribe.com (el \"Sitio\"), realizar un pedido o interactuar con PeptiCaribe, usted acepta estar plenamente sujeto a estos Términos y Condiciones (\"Términos\"). Léelos cuidadosamente. Si no está de acuerdo con alguna disposición, debe cesar inmediatamente el uso del Sitio y abstenerse de realizar pedidos.",
        ],
      },
      {
        heading: "1. Solo Uso en Investigación – Descargo Importante",
        paragraphs: [
          "Todos los productos vendidos por PeptiCaribe están destinados estrictamente para fines legítimos de investigación de laboratorio in vitro y científica únicamente. No están destinados, etiquetados ni aprobados para consumo humano, inyección, inhalación, uso animal o veterinario, diagnóstico, terapéutico, alimentario, cosmético ni ninguna otra aplicación que no sea de investigación.",
          "PeptiCaribe no es una farmacia de compounding 503A registrada ni una instalación de outsourcing 503B. Los productos no han sido evaluados por la FDA para seguridad, eficacia ni ningún otro fin.",
          "Al realizar un pedido, declara y garantiza que tiene al menos 21 años, es un investigador calificado o representante institucional autorizado, posee la experiencia y autorizaciones necesarias, cumplirá todas las leyes aplicables, asume plena responsabilidad por el manejo y uso de los productos, y no promoverá uso humano o veterinario.",
        ],
      },
      {
        heading: "2. Elegibilidad y Registro de Cuenta",
        paragraphs: [
          "El acceso a los productos y servicios de PeptiCaribe está limitado a investigadores calificados, profesionales de laboratorio y organizaciones dedicadas a investigación científica legítima. PeptiCaribe se reserva el derecho de aprobar, denegar o terminar cualquier cuenta o pedido a su entera discreción.",
        ],
      },
      {
        heading: "3. Pedidos y Pago",
        paragraphs: [
          "Todos los pedidos están sujetos a aceptación y disponibilidad. Los pagos se procesan de forma segura a través de procesadores de terceros de confianza. Los pedidos se envían solo después de que el pago se confirme.",
        ],
      },
      {
        heading: "4. Envío y Entrega",
        paragraphs: [
          "Ofrecemos envío el mismo día para pedidos realizados antes de las 4:00 PM EST (sujeto a disponibilidad). Los tiempos de entrega son estimaciones. El riesgo de pérdida y el título se transfieren al entregar al transportista.",
        ],
      },
      {
        heading: "5. Devoluciones, Reembolsos y Cambios",
        paragraphs: [
          "Todas las ventas son finales. Consulte nuestra Política de Devoluciones y Reembolsos por detalles completos.",
        ],
      },
      {
        heading: "6. Conducta Prohibida",
        paragraphs: [
          "Usted acepta no usar los productos para fines distintos a la investigación de laboratorio in vitro legítima, no promover uso humano o veterinario, no revender sin autorización escrita, no usar medios automatizados para acceder al Sitio, y no violar leyes aplicables.",
        ],
      },
      {
        heading: "7. Asunción de Riesgo y Renuncia",
        paragraphs: [
          "Usted reconoce expresamente que la compra, posesión, manejo, almacenamiento y uso de productos de PeptiCaribe es bajo su exclusivo riesgo y renuncia a reclamaciones derivadas de dicho uso o mal uso.",
        ],
      },
      {
        heading: "8. Descargo de Garantías",
        paragraphs: [
          "Todos los productos y el Sitio se proporcionan \"TAL CUAL\" y \"SEGÚN DISPONIBILIDAD\" sin garantías de ningún tipo, expresas o implícitas.",
        ],
      },
      {
        heading: "9. Limitación de Responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, la responsabilidad total agregada de PeptiCaribe no excederá el monto pagado por el(los) producto(s) específico(s) que dieron lugar a la reclamación.",
        ],
      },
      {
        heading: "10. Indemnización",
        paragraphs: [
          "Usted acepta indemnizar y eximir de responsabilidad a PeptiCaribe por reclamaciones derivadas de su uso o mal uso de productos, violación de estos Términos o leyes aplicables.",
        ],
      },
      {
        heading: "11. Propiedad Intelectual",
        paragraphs: [
          "Todo el contenido del Sitio es propiedad de PeptiCaribe o sus licenciantes y está protegido por las leyes de propiedad intelectual.",
        ],
      },
      {
        heading: "12. Terminación",
        paragraphs: [
          "PeptiCaribe se reserva el derecho de suspender o terminar su cuenta o cancelar pedidos en cualquier momento.",
        ],
      },
      {
        heading: "13. Resolución de Disputas y Arbitraje",
        paragraphs: [
          "Cualquier disputa se resolverá exclusivamente mediante arbitraje vinculante administrado por la AAA, con sede en Miami, Florida, de forma individual únicamente.",
        ],
      },
      {
        heading: "14. Ley Aplicable",
        paragraphs: [
          "Estos Términos se regirán por las leyes del Estado de Florida, sin considerar principios de conflicto de leyes.",
        ],
      },
      {
        heading: "15. Modificaciones",
        paragraphs: [
          "PeptiCaribe puede actualizar estos Términos en cualquier momento. Los cambios son efectivos al publicarse.",
        ],
      },
      {
        heading: "16. Fuerza Mayor",
        paragraphs: [
          "PeptiCaribe no será responsable por fallas o retrasos debido a causas fuera de nuestro control razonable.",
        ],
      },
      {
        heading: "17. Divisibilidad y Acuerdo Completo",
        paragraphs: [
          "Estos Términos, junto con nuestra Política de Privacidad y Política de Devoluciones, constituyen el acuerdo completo entre usted y PeptiCaribe.",
        ],
      },
      {
        heading: "18. Información de Contacto",
        paragraphs: [
          "Para preguntas sobre estos Términos, contacte a PeptiCaribe en info@pepticaribe.com o visite https://www.pepticaribe.com.",
        ],
      },
    ],
  },
};
