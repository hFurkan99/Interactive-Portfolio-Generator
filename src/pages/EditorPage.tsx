import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useCVStore } from "@/stores/cvStore";
import { useEditorStore } from "@/stores/editorStore";
import ComponentLibrary from "@/components/editor/ComponentLibrary";
import ComponentEditor from "@/components/editor/ComponentEditor";
import CVCanvas from "@/components/editor/CVCanvas";
import { nanoid } from "@/utils/id";
import { suggestPageForComponent } from "@/utils/pageCalculator";
import type { ComponentType } from "@/types/componentType.types";
import type { CVComponentData } from "@/interfaces/cVComponentData.interfaces";

export default function EditorPage() {
  const { t } = useTranslation();
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const {
    currentDocument,
    loadDocument,
    addComponent,
    updateComponents,
    deleteComponent,
    getTemplateById,
    addNewPage,
  } = useCVStore();
  const { setPreviewMode } = useEditorStore();
  const [selectedComponentType, setSelectedComponentType] =
    useState<ComponentType | null>(null);
  const [editingComponent, setEditingComponent] =
    useState<CVComponentData | null>(null);

  const template = currentDocument
    ? getTemplateById(currentDocument.templateId)
    : null;

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    }
  }, [documentId, loadDocument]);

  useEffect(() => {
    // Preview mode'u kapat
    setPreviewMode(false);
  }, [setPreviewMode]);

  const handleSelectComponent = (type: ComponentType) => {
    if (!currentDocument) return;

    const existingComponent = currentDocument.components.find(
      (c) => c.type === type
    );

    if (existingComponent) {
      setEditingComponent(existingComponent);
      setSelectedComponentType(type);
    } else {
      setEditingComponent(null);
      setSelectedComponentType(type);
    }
  };

  const handleCloseEditor = () => {
    setSelectedComponentType(null);
    setEditingComponent(null);
  };

  const handleSaveComponent = (componentData: Record<string, unknown>) => {
    if (!selectedComponentType || !currentDocument) return;

    if (editingComponent) {
      const updatedComponent: CVComponentData = {
        ...editingComponent,
        ...componentData,
      } as CVComponentData;

      const updatedComponents = currentDocument.components.map((c) =>
        c.id === editingComponent.id ? updatedComponent : c
      );
      updateComponents(updatedComponents);
      setSelectedComponentType(null);
      setEditingComponent(null);
      return;
    }

    const suggestedPage = suggestPageForComponent(
      currentDocument.components,
      selectedComponentType
    );
    const pageComponents = currentDocument.components.filter(
      (c) => c.pageNumber === suggestedPage
    );
    const newOrder = pageComponents.length;

    const newComponent: CVComponentData = {
      id: nanoid(),
      type: selectedComponentType,
      order: newOrder,
      visible: true,
      pageNumber: suggestedPage,
      ...componentData,
    } as CVComponentData;
    addComponent(newComponent);

    setSelectedComponentType(null);
    setEditingComponent(null);
  };

  const handleReorderComponents = (newComponents: CVComponentData[]) => {
    if (!currentDocument) return;
    updateComponents(newComponents);
  };

  const handleDeleteComponent = (componentId: string) => {
    if (!currentDocument) return;
    deleteComponent(componentId);
  };

  const handleEditComponent = (componentId: string) => {
    if (!currentDocument) return;

    const component = currentDocument.components.find(
      (c) => c.id === componentId
    );
    if (!component) return;

    setEditingComponent(component);
    setSelectedComponentType(component.type);
  };

  const handleAddPage = () => {
    addNewPage();
  };

  if (!currentDocument) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {t("editor.notFound")}
          </h2>
          <button
            onClick={() => navigate("/templates")}
            className="text-blue-600 hover:underline"
          >
            {t("editor.backToTemplates")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Left Sidebar - Component Library */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <ComponentLibrary
            onSelectComponent={handleSelectComponent}
            selectedType={selectedComponentType}
            addedTypes={currentDocument.components.map((c) => c.type)}
          />
        </div>

        {/* Main Editor Area - Canvas */}
        <div className="flex-1 overflow-auto p-8 bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold mb-1">
                {currentDocument.title}
              </h1>
              <p className="text-gray-600 text-sm">{t("editor.editorArea")}</p>
            </div>

            {/* CV Canvas with Drag & Drop */}
            {template ? (
              <CVCanvas
                document={currentDocument}
                onReorderComponents={handleReorderComponents}
                onDeleteComponent={handleDeleteComponent}
                onEditComponent={handleEditComponent}
                onAddPage={handleAddPage}
              />
            ) : (
              <div className="text-center text-gray-500 py-12">
                Template not found
              </div>
            )}

            <div className="mt-6 text-xs text-gray-400 text-center">
              <p>Template: {currentDocument.templateId}</p>
              <p>Components: {currentDocument.components.length}</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Component Editor */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <ComponentEditor
            selectedType={selectedComponentType}
            onClose={handleCloseEditor}
            onSave={handleSaveComponent}
            initialData={editingComponent}
          />
        </div>
      </div>
    </div>
  );
}
