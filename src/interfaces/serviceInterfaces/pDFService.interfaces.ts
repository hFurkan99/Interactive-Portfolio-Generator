import type { CVDocument } from "../cVDocument.interfaces";
import type { PDFExportOptions } from "../pDFExportOptions.interfaces";
import type { Template } from "../template.interfaces";

export interface PDFService {
  generatePDF: (
    document: CVDocument,
    template: Template,
    options?: Partial<PDFExportOptions>
  ) => Promise<Blob>;
  downloadPDF: (blob: Blob, filename: string) => void;
  previewPDF: (blob: Blob) => Promise<string>; // Returns blob URL
}
