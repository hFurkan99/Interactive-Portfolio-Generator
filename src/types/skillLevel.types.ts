import type { SkillLevel } from "@/constants/skillLevel.contants";

export type SkillLevel = (typeof SkillLevel)[keyof typeof SkillLevel];
