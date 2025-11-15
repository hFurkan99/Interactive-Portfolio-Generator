import type { CVDocument } from "@/interfaces/cVDocument.interfaces";
import type { EditorStore } from "@/interfaces/storeInterfaces/editorStore.interfaces";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useEditorStore = create<EditorStore>()(
  devtools(
    (set, get) => ({
      // State
      selectedComponentId: null,
      isPreviewMode: false,
      zoom: 100,
      isDragging: false,

      // History Management
      canUndo: false,
      canRedo: false,

      undo: () => {
        // Will be implemented with proper history management
        console.log("Undo action");
      },

      redo: () => {
        // Will be implemented with proper history management
        console.log("Redo action");
      },

      saveState: (document: CVDocument) => {
        // Save current state to history
        console.log("Save state", document);
      },

      clearHistory: () => {
        set({
          canUndo: false,
          canRedo: false,
        });
      },

      // UI State
      setSelectedComponent: (id: string | null) => {
        set({ selectedComponentId: id });
      },

      setPreviewMode: (enabled: boolean) => {
        set({
          isPreviewMode: enabled,
          selectedComponentId: enabled ? null : get().selectedComponentId,
        });
      },

      setZoom: (zoom: number) => {
        const clampedZoom = Math.max(25, Math.min(200, zoom));
        set({ zoom: clampedZoom });
      },

      setDragging: (isDragging: boolean) => {
        set({ isDragging });
      },
    }),
    { name: "EditorStore" }
  )
);
