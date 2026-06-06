/**
 * Client reference document paths (PeptiCaribe website spec).
 * Files live at repo root: docs/client/ — not served publicly.
 * Source: PC - Website.docx — product catalog, copy, pricing, COA notes.
 */
export const CLIENT_REFERENCE = {
  docx: "docs/client/PC - Website.docx",
  pdf: "docs/client/PC - Website.pdf",
  extractedTextJson: "docs/client/pdf_extracted_text.json",
  pdfPagesDir: "docs/client/pdf_pages",
} as const;

export const CLIENT_PDF_PAGE_COUNT = 23;

export function clientPdfPageFilename(page: number): string {
  const n = Math.trunc(page);
  if (n < 1 || n > CLIENT_PDF_PAGE_COUNT) {
    throw new RangeError(`Client PDF page must be 1–${CLIENT_PDF_PAGE_COUNT}, got ${page}`);
  }
  return `page_${String(n).padStart(2, "0")}.png`;
}

export function clientPdfPagePath(page: number): string {
  return `${CLIENT_REFERENCE.pdfPagesDir}/${clientPdfPageFilename(page)}`;
}
