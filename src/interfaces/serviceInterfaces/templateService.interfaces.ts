import type { Template } from "../template.interfaces";

export interface TemplateService {
  getAllTemplates: () => Template[];
  getTemplateById: (id: string) => Template | undefined;
  getTemplatesByStyle: (style: Template["style"]) => Template[];
  getFreeTemplates: () => Template[];
  getPremiumTemplates: () => Template[];
}
