import type { ComponentType } from "@/constants/componentType.constants";

export type ComponentType = (typeof ComponentType)[keyof typeof ComponentType];
