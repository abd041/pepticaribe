import type { Language } from "@/data/translations/types";
import { disclaimerDocument } from "./disclaimer";
import { privacyPolicyDocument } from "./privacy-policy";
import { researchUseOnlyDocument } from "./research-use-only";
import { returnsRefundsDocument } from "./returns-refunds";
import { termsDocument } from "./terms-and-conditions";
import type { LegalDocument, LegalSlug } from "./types";

const DOCUMENTS: Record<LegalSlug, Record<Language, LegalDocument>> = {
  disclaimer: disclaimerDocument,
  "privacy-policy": privacyPolicyDocument,
  "terms-and-conditions": termsDocument,
  "research-use-only": researchUseOnlyDocument,
  "returns-refunds": returnsRefundsDocument,
};

export function getLegalDocument(language: Language, slug: LegalSlug): LegalDocument {
  return DOCUMENTS[slug][language];
}

export type { LegalDocument, LegalSlug, LegalBlock } from "./types";
export { LEGAL_SLUGS } from "./types";
