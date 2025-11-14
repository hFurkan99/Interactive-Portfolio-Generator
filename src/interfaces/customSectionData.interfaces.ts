import type { BaseComponent } from "./baseComponent.interfaces";

export interface CustomSectionData extends BaseComponent {
  type: "custom_section";
  title: string;
  content: string;
}
