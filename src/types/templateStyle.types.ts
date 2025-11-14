import type { TemplateStyle } from "@/constants/templateStyle.constants";

export type TemplateStyle = (typeof TemplateStyle)[keyof typeof TemplateStyle];
