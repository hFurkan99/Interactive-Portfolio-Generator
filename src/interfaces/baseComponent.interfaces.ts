import type { ComponentType } from "@/types/componentType.types";

export interface BaseComponent {
  id: string;
  type: ComponentType;
  order: number;
  visible: boolean;
}
