import type { LanguageProficiency } from "@/constants/languageProficiency.constants";

export type LanguageProficiency =
  (typeof LanguageProficiency)[keyof typeof LanguageProficiency];
