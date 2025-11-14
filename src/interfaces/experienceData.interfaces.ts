import type { BaseComponent } from "./baseComponent.interfaces";

export interface ExperienceData extends BaseComponent {
  type: "experience";
  items: ExperienceItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string; // undefined -> "Present"
  current: boolean;
  description: string;
  highlights?: string[];
}
