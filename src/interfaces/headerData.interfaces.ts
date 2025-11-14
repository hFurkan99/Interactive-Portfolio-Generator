import type { BaseComponent } from "./baseComponent.interfaces";

export interface HeaderData extends BaseComponent {
  type: "header";
  fullName: string;
  title: string;
  photo?: string; // Base64 veya URL
}
