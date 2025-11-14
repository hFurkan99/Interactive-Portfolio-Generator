import type { TemplateStyle } from "@/types/templateStyle.types";
import type { TemplateSettings } from "./templateSettings.interfaces";
import type { ComponentType } from "@/types/componentType.types";

export interface Template {
  id: string;
  name: string;
  style: TemplateStyle;
  description: string;
  thumbnail: string;
  previewImage: string;
  defaultSettings: TemplateSettings;
  defaultComponents: ComponentType[];
  isPremium: boolean;
}
