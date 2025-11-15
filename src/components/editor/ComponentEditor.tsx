/**
 * ComponentEditor
 * Right sidebar for editing selected component
 */

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { COMPONENT_NAME_KEYS } from "@/utils/constants";
import type { ComponentType } from "@/types/componentType.types";
import HeaderForm from "@/components/forms/HeaderForm";
import ContactForm from "@/components/forms/ContactForm";
import SummaryForm from "@/components/forms/SummaryForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { CertificationsForm } from "@/components/forms/CertificationsForm";
import { LanguagesForm } from "@/components/forms/LanguagesForm";
import type {
  HeaderFormData,
  ContactFormData,
  SummaryFormData,
  ExperienceFormData,
  EducationFormData,
  SkillsFormData,
  ProjectsFormData,
  CertificationsFormData,
  LanguagesFormData,
} from "@/schemas/componentSchemas";
import type { CVComponentData } from "@/interfaces/cVComponentData.interfaces";

type Props = {
  selectedType: ComponentType | null;
  onClose: () => void;
  onSave: (componentData: Record<string, unknown>) => void;
  initialData?: CVComponentData | null;
};

export default function ComponentEditor({
  selectedType,
  onClose,
  onSave,
  initialData,
}: Props) {
  const { t } = useTranslation();

  if (!selectedType) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <p className="text-sm text-gray-500 text-center">
          {t("editor.settingsList")}
        </p>
      </div>
    );
  }

  const nameKey =
    COMPONENT_NAME_KEYS[selectedType as keyof typeof COMPONENT_NAME_KEYS];

  const handleHeaderSubmit = (data: HeaderFormData) => {
    onSave(data);
  };

  const handleContactSubmit = (data: ContactFormData) => {
    onSave(data);
  };

  const handleSummarySubmit = (data: SummaryFormData) => {
    onSave(data);
  };

  const handleExperienceSubmit = (data: ExperienceFormData) => {
    onSave(data);
  };

  const handleEducationSubmit = (data: EducationFormData) => {
    onSave(data);
  };

  const handleSkillsSubmit = (data: SkillsFormData) => {
    onSave(data);
  };

  const handleProjectsSubmit = (data: ProjectsFormData) => {
    onSave(data);
  };

  const handleCertificationsSubmit = (data: CertificationsFormData) => {
    onSave(data);
  };

  const handleLanguagesSubmit = (data: LanguagesFormData) => {
    onSave(data);
  };

  const renderForm = () => {
    switch (selectedType) {
      case "header":
        return (
          <HeaderForm
            onSubmit={handleHeaderSubmit}
            defaultValues={initialData as HeaderFormData | undefined}
          />
        );
      case "contact":
        return (
          <ContactForm
            onSubmit={handleContactSubmit}
            defaultValues={initialData as ContactFormData | undefined}
          />
        );
      case "summary":
        return (
          <SummaryForm
            onSubmit={handleSummarySubmit}
            defaultValues={initialData as SummaryFormData | undefined}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            onSubmit={handleExperienceSubmit}
            defaultValues={initialData as ExperienceFormData | undefined}
          />
        );
      case "education":
        return (
          <EducationForm
            onSubmit={handleEducationSubmit}
            defaultValues={initialData as EducationFormData | undefined}
          />
        );
      case "skills":
        return (
          <SkillsForm
            onSubmit={handleSkillsSubmit}
            defaultValues={initialData as SkillsFormData | undefined}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            onSubmit={handleProjectsSubmit}
            defaultValues={initialData as ProjectsFormData | undefined}
          />
        );
      case "certifications":
        return (
          <CertificationsForm
            onSubmit={handleCertificationsSubmit}
            defaultValues={initialData as CertificationsFormData | undefined}
          />
        );
      case "languages":
        return (
          <LanguagesForm
            onSubmit={handleLanguagesSubmit}
            defaultValues={initialData as LanguagesFormData | undefined}
          />
        );
      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Form for {selectedType} component (Coming soon)
            </p>
            <div className="pt-4 border-t">
              <Button className="w-full" onClick={() => onSave({})}>
                {t("common.add")}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">{t(nameKey)}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Component-specific forms */}
        {renderForm()}
      </div>
    </div>
  );
}
