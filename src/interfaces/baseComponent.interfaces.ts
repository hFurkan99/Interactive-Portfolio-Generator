import type { ComponentType } from "@/types/componentType.types";

export interface BaseComponent {
  id: string;
  type: ComponentType;
  order: number;
  visible: boolean;
  pageNumber: number; // Which page this component is on (1, 2, 3...)
  position?: {
    // Optional: for future precise positioning
    x?: number;
    y?: number;
  };
}
