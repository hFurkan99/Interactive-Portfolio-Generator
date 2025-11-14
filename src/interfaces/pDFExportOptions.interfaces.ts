export interface PDFExportOptions {
  format: "A4" | "Letter";
  orientation: "portrait" | "landscape";
  quality: "low" | "medium" | "high";
  includePageNumbers: boolean;
  scale: number;
}
