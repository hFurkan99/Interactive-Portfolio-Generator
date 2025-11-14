import type { CVDocument } from "./cVDocument.interfaces";

export interface EditorState {
  currentCVId: string | null;
  selectedComponentId: string | null;
  isPreviewMode: boolean;
  zoom: number;
  isDragging: boolean;
  history: {
    past: CVDocument[];
    present: CVDocument | null;
    future: CVDocument[];
  };
}
