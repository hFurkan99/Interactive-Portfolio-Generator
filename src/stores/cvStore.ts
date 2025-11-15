import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { nanoid } from "@/utils/id";
import { DEFAULT_TEMPLATES } from "@/utils/templates";
import type { CVDocument } from "@/interfaces/cVDocument.interfaces";
import type { CVStore } from "@/interfaces/storeInterfaces/cVStore.interfaces";
import type { CVComponentData } from "@/interfaces/cVComponentData.interfaces";

export const useCVStore = create<CVStore>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        documents: [],
        currentDocument: null,
        templates: DEFAULT_TEMPLATES,

        // Document Management
        createDocument: (templateId: string, title?: string) => {
          const template = get().templates.find((t) => t.id === templateId);
          if (!template) {
            throw new Error(`Template not found: ${templateId}`);
          }

          const newDocument: CVDocument = {
            id: nanoid(),
            title: title || "Yeni CV",
            templateId,
            components: [],
            settings: template.defaultSettings,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
          };

          set((state) => ({
            documents: [...state.documents, newDocument],
            currentDocument: newDocument,
          }));

          return newDocument;
        },

        loadDocument: (id: string) => {
          const document = get().documents.find((doc) => doc.id === id);
          if (document) {
            set({ currentDocument: document });
          }
        },

        updateDocument: (updates: Partial<CVDocument>) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          const updatedDocument: CVDocument = {
            ...currentDoc,
            ...updates,
            updatedAt: new Date().toISOString(),
            version: currentDoc.version + 1,
          };

          set((state) => ({
            documents: state.documents.map((doc) =>
              doc.id === currentDoc.id ? updatedDocument : doc
            ),
            currentDocument: updatedDocument,
          }));
        },

        deleteDocument: (id: string) => {
          set((state) => ({
            documents: state.documents.filter((doc) => doc.id !== id),
            currentDocument:
              state.currentDocument?.id === id ? null : state.currentDocument,
          }));
        },

        duplicateDocument: (id: string) => {
          const document = get().documents.find((doc) => doc.id === id);
          if (!document) {
            throw new Error(`Document not found: ${id}`);
          }

          const duplicatedDocument: CVDocument = {
            ...document,
            id: nanoid(),
            title: `${document.title} (Kopya)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
          };

          set((state) => ({
            documents: [...state.documents, duplicatedDocument],
          }));

          return duplicatedDocument;
        },

        // Component Management
        addComponent: (component: CVComponentData) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          const updatedComponents = [...currentDoc.components, component];

          get().updateDocument({
            components: updatedComponents,
          });
        },

        updateComponent: (
          componentId: string,
          updates: Partial<CVComponentData>
        ) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          const updatedComponents = currentDoc.components.map((comp) =>
            comp.id === componentId
              ? ({ ...comp, ...updates } as CVComponentData)
              : comp
          );

          get().updateDocument({
            components: updatedComponents,
          });
        },

        removeComponent: (componentId: string) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          const updatedComponents = currentDoc.components.filter(
            (comp) => comp.id !== componentId
          );

          get().updateDocument({
            components: updatedComponents,
          });
        },

        deleteComponent: (componentId: string) => {
          // Alias for removeComponent
          get().removeComponent(componentId);
        },

        updateComponents: (components: CVComponentData[]) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          get().updateDocument({
            components,
          });
        },

        reorderComponents: (componentIds: string[]) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          const componentMap = new Map(
            currentDoc.components.map((comp) => [comp.id, comp])
          );

          const reorderedComponents = componentIds
            .map((id) => componentMap.get(id))
            .filter((comp): comp is CVComponentData => comp !== undefined)
            .map((comp, index) => ({ ...comp, order: index }));

          get().updateDocument({
            components: reorderedComponents,
          });
        },

        toggleComponentVisibility: (componentId: string) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          const updatedComponents = currentDoc.components.map((comp) =>
            comp.id === componentId ? { ...comp, visible: !comp.visible } : comp
          );

          get().updateDocument({
            components: updatedComponents,
          });
        },

        // Page Management
        addNewPage: () => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return 1;

          // Find the highest page number
          const maxPage =
            currentDoc.components.length > 0
              ? Math.max(...currentDoc.components.map((c) => c.pageNumber))
              : 0;

          const newPageNumber = maxPage + 1;

          // Force a re-render by updating the document
          // The page will appear in the UI even if empty
          get().updateDocument({
            updatedAt: new Date().toISOString(),
          });

          return newPageNumber;
        },

        moveComponentToPage: (componentId: string, targetPage: number) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          const updatedComponents = currentDoc.components.map((comp) =>
            comp.id === componentId ? { ...comp, pageNumber: targetPage } : comp
          );

          get().updateDocument({
            components: updatedComponents,
          });
        },

        // Settings Management
        updateSettings: (settings: Partial<CVDocument["settings"]>) => {
          const currentDoc = get().currentDocument;
          if (!currentDoc) return;

          get().updateDocument({
            settings: {
              ...currentDoc.settings,
              ...settings,
            },
          });
        },

        // Template Management
        loadTemplates: () => {
          // Templates will be loaded from a separate file or API
          set({ templates: DEFAULT_TEMPLATES });
        },

        getTemplateById: (id: string) => {
          return get().templates.find((t) => t.id === id);
        },
      }),
      {
        name: "cv-storage",
        partialize: (state) => ({
          documents: state.documents,
        }),
      }
    ),
    { name: "CVStore" }
  )
);
