import type { BaseComponent } from "./baseComponent.interfaces";

export interface EducationData extends BaseComponent {
  type: "education";
  items: EducationItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}
