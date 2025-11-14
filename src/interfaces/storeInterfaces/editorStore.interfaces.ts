import type { CVDocument } from "../cVDocument.interfaces";

export interface EditorStore {
  // State
  selectedComponentId: string | null;
  isPreviewMode: boolean;
  zoom: number;
  isDragging: boolean;

  // History Management
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  saveState: (document: CVDocument) => void;
  clearHistory: () => void;

  // UI State
  setSelectedComponent: (id: string | null) => void;
  setPreviewMode: (enabled: boolean) => void;
  setZoom: (zoom: number) => void;
  setDragging: (isDragging: boolean) => void;
}
