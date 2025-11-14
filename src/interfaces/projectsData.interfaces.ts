import type { BaseComponent } from "./baseComponent.interfaces";

export interface ProjectsData extends BaseComponent {
  type: "projects";
  items: ProjectItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies?: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
}
