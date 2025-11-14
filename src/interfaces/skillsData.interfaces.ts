import type { SkillLevel } from "@/types/skillLevel.types";
import type { BaseComponent } from "./baseComponent.interfaces";

export interface SkillsData extends BaseComponent {
  type: "skills";
  items: SkillItem[];
  showLevel: boolean;
  groupByCategory: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: SkillLevel;
  category?: string;
}
