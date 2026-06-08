import type { Metadata } from "next";
import { COALibraryPage } from "@/components/coa/COALibraryPage";
import { getCoaLibraryEntries } from "@/lib/coaLibrary";
import { getTranslation } from "@/data/translations";
import { getServerLanguage } from "@/lib/i18n-server";
import "@/app/coa-library.css";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return {
    title: getTranslation(language, "coa.libraryTitle"),
    description: getTranslation(language, "coa.libraryDescription"),
  };
}

export default function COAPage() {
  const entries = getCoaLibraryEntries();

  return (
    <div className="homepage-luxury luxury-experience art-direction coa-library-page relative isolate min-h-dvh">
      <COALibraryPage entries={entries} />
    </div>
  );
}
