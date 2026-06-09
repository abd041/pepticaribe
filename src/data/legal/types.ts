import type { Language } from "@/data/translations/types";

export type LegalSlug =
  | "disclaimer"
  | "privacy-policy"
  | "terms-and-conditions"
  | "research-use-only"
  | "returns-refunds";

export type LegalBlock = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: LegalSlug;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  blocks: LegalBlock[];
};

export type LegalDocuments = Record<LegalSlug, Record<Language, LegalDocument>>;

export const LEGAL_SLUGS: LegalSlug[] = [
  "disclaimer",
  "privacy-policy",
  "terms-and-conditions",
  "research-use-only",
  "returns-refunds",
];
