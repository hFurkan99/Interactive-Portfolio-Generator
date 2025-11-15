import type { CVComponentData } from "../cVComponentData.interfaces";
import type { CVDocument } from "../cVDocument.interfaces";
import type { Template } from "../template.interfaces";

export interface CVStore {
  // State
  documents: CVDocument[];
  currentDocument: CVDocument | null;
  templates: Template[];

  // Document Management
  createDocument: (templateId: string, title?: string) => CVDocument;
  loadDocument: (id: string) => void;
  updateDocument: (updates: Partial<CVDocument>) => void;
  deleteDocument: (id: string) => void;
  duplicateDocument: (id: string) => CVDocument;

  // Component Management
  addComponent: (component: CVComponentData) => void;
  updateComponent: (
    componentId: string,
    updates: Partial<CVComponentData>
  ) => void;
  removeComponent: (componentId: string) => void;
  deleteComponent: (componentId: string) => void; // Alias for removeComponent
  updateComponents: (components: CVComponentData[]) => void; // Batch update
  reorderComponents: (componentIds: string[]) => void;
  toggleComponentVisibility: (componentId: string) => void;

  // Page Management
  addNewPage: () => number;
  moveComponentToPage: (componentId: string, targetPage: number) => void;

  // Settings Management
  updateSettings: (settings: Partial<CVDocument["settings"]>) => void;

  // Template Management
  loadTemplates: () => void;
  getTemplateById: (id: string) => Template | undefined;
}
