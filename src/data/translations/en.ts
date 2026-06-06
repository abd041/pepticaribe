import type { TranslationSchema } from "./types";

export const en: TranslationSchema = {
  common: {
    brandName: "PeptiCaribe",
    researchUseOnly: "Research Use Only",
    language: "Language",
    english: "English",
    spanish: "Spanish",
  },
  gate: {
    badge: "Researcher Verification Required",
    title: "Research Portal Access",
    subtitle:
      "PeptiCaribe supplies research-grade peptides exclusively for qualified laboratory and scientific research. Please confirm your eligibility before entering.",
    checkboxAge:
      "I confirm that I am at least 21 years of age (or the age of majority in my jurisdiction).",
    checkboxRuo:
      "I acknowledge that all products are intended strictly for Research Use Only (RUO) — in-vitro laboratory research by qualified researchers and institutions.",
    checkboxNoHuman:
      "I understand these products are not intended for human consumption, veterinary use, diagnostic, or therapeutic application.",
    enterButton: "Enter Research Portal",
    exitButton: "Exit Site",
    exitConfirm:
      "You must complete verification to access PeptiCaribe. You will now leave this site.",
    footerDisclaimer:
      "By entering, you agree that you are a qualified researcher and will use products only for legitimate laboratory research in compliance with all applicable laws.",
    isoBadge: "ISO 17025 Tested",
    secureBadge: "Secure Checkout",
    allRequired: "All confirmations are required to proceed.",
  },
};
