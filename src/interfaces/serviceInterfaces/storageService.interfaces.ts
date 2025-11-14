import type { CVDocument } from "../cVDocument.interfaces";

export interface StorageService {
  saveDocument: (document: CVDocument) => Promise<void>;
  loadDocument: (id: string) => Promise<CVDocument | null>;
  loadAllDocuments: () => Promise<CVDocument[]>;
  deleteDocument: (id: string) => Promise<void>;
  exportDocument: (document: CVDocument) => Promise<string>; // JSON string
  importDocument: (data: string) => Promise<CVDocument>;
}
