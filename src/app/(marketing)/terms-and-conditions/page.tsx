import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { getLegalDocument } from "@/data/legal";
import { getServerLanguage } from "@/lib/i18n-server";
import "@/app/legal-page.css";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const doc = getLegalDocument(language, "terms-and-conditions");
  return { title: doc.title, description: doc.description };
}

export default function TermsRoutePage() {
  return (
    <div className="homepage-luxury luxury-experience art-direction legal-page-shell relative isolate min-h-dvh">
      <LegalDocumentPage slug="terms-and-conditions" />
    </div>
  );
}
