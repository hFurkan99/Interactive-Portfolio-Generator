import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useCVStore } from "@/stores/cvStore";
import { useEditorStore } from "@/stores/editorStore";
import { Button } from "@/components/ui/button";
import { showToast } from "@/utils/toast";

export default function PreviewPage() {
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
    // Preview mode'u aç
    setPreviewMode(true);

    return () => {
      setPreviewMode(false);
    };
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

  const handleDownloadPDF = () => {
    // PDF download fonksiyonu buraya eklenecek
    showToast.info(t("preview.pdfComingSoon"));
    console.log("PDF downloading...");
  };

  const handleBackToEditor = () => {
    navigate(`/editor/${documentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBackToEditor}>
              {t("preview.backToEditor")}
            </Button>
            <h1 className="text-white font-semibold">
              {currentDocument.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadPDF}>
              {t("preview.downloadPDF")}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-[1100px] p-12">
          <h1 className="text-3xl font-bold mb-4">{currentDocument.title}</h1>
          <p className="text-gray-600">{t("preview.previewArea")}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Template ID: {currentDocument.templateId}</p>
            <p>Components: {currentDocument.components.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
