import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useCVStore } from "@/stores/cvStore";
import { useEditorStore } from "@/stores/editorStore";

export default function EditorPage() {
  const { t } = useTranslation();
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const { currentDocument, loadDocument } = useCVStore();
  const { setPreviewMode } = useEditorStore();

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    }
  }, [documentId, loadDocument]);

  useEffect(() => {
    // Preview mode'u kapat
    setPreviewMode(false);
  }, [setPreviewMode]);

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
        {/* Left Sidebar - Component Panel */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">
              {t("editor.components")}
            </h2>
            <p className="text-sm text-gray-500">
              {t("editor.componentsList")}
            </p>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-[1100px] p-12">
            <h1 className="text-3xl font-bold mb-4">{currentDocument.title}</h1>
            <p className="text-gray-600">{t("editor.editorArea")}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Template ID: {currentDocument.templateId}</p>
              <p>Components: {currentDocument.components.length}</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Settings Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-4">
              {t("editor.settings")}
            </h2>
            <p className="text-sm text-gray-500">{t("editor.settingsList")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
