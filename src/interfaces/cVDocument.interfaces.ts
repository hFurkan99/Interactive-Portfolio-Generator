import type { CVComponentData } from "./cVComponentData.interfaces";
import type { TemplateSettings } from "./templateSettings.interfaces";

export interface CVDocument {
  id: string;
  title: string;
  templateId: string;
  components: CVComponentData[];
  settings: TemplateSettings;
  createdAt: string;
  updatedAt: string;
  version: number;
}
