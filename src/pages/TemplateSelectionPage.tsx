import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useCVStore } from "@/stores/cvStore";
import { Button } from "@/components/ui/button";
import { DEFAULT_TEMPLATES } from "@/utils/templates";
import { showToast } from "@/utils/toast";

export default function TemplateSelectionPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createDocument = useCVStore((state) => state.createDocument);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = DEFAULT_TEMPLATES.find((tmpl) => tmpl.id === templateId);
    if (template) {
      //   showToast.success(`${t(template.name)} ${t("templates.selected")}`);
    }
  };

  const handleCreateCV = () => {
    if (!selectedTemplateId) {
      showToast.warning(t("templates.selectWarning"));
      return;
    }

    const newDoc = createDocument(selectedTemplateId);
    // showToast.success(t("templates.created"));
    navigate(`/editor/${newDoc.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("templates.title")}
          </h1>
          <p className="text-lg text-gray-600">{t("templates.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {DEFAULT_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
                selectedTemplateId === template.id
                  ? "ring-4 ring-blue-500 transform scale-105"
                  : "hover:shadow-lg"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="aspect-3/4 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Template Preview</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{t(template.name)}</h3>
                  {template.isPremium ? (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      {t("templates.premium")}
                    </span>
                  ) : (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {t("templates.free")}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {t(template.description)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleCreateCV}
            disabled={!selectedTemplateId}
          >
            {t("templates.continue")}
          </Button>
        </div>
      </div>
    </div>
  );
}
