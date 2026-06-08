import { getCoaLibraryEntries, type CoaLibraryEntry } from "@/lib/coaLibrary";

export type CoaShowcaseItem = CoaLibraryEntry;

/** Public catalog compounds with latest batch metadata for the homepage COA marquee */
export function getCoaShowcaseItems(): CoaShowcaseItem[] {
  return getCoaLibraryEntries();
}
