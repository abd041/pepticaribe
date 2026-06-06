export interface TranslationSchema {
  common: {
    brandName: string;
    researchUseOnly: string;
    language: string;
    english: string;
    spanish: string;
  };
  gate: {
    badge: string;
    title: string;
    subtitle: string;
    checkboxAge: string;
    checkboxRuo: string;
    checkboxNoHuman: string;
    enterButton: string;
    exitButton: string;
    exitConfirm: string;
    footerDisclaimer: string;
    isoBadge: string;
    secureBadge: string;
    allRequired: string;
  };
}

export type TranslationKey =
  | `common.${keyof TranslationSchema["common"]}`
  | `gate.${keyof TranslationSchema["gate"]}`;
