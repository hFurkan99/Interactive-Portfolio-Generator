import type { LanguageProficiency } from "@/types/languageProficiency.types";
import type { BaseComponent } from "./baseComponent.interfaces";

export interface LanguagesData extends BaseComponent {
  type: "languages";
  items: LanguageItem[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
}
