import type { BaseComponent } from "./baseComponent.interfaces";

export interface SummaryData extends BaseComponent {
  type: "summary";
  content: string;
}
