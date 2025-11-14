/**
 * Application Constants
 */

// Component Types
export const COMPONENT_TYPES = {
  HEADER: "header",
  CONTACT: "contact",
  SUMMARY: "summary",
  EXPERIENCE: "experience",
  EDUCATION: "education",
  SKILLS: "skills",
  PROJECTS: "projects",
  CERTIFICATIONS: "certifications",
  LANGUAGES: "languages",
  CUSTOM_SECTION: "custom_section",
} as const;

// Component Display Names (i18n keys)
export const COMPONENT_NAME_KEYS = {
  header: "componentTypes.header",
  contact: "componentTypes.contact",
  summary: "componentTypes.summary",
  experience: "componentTypes.experience",
  education: "componentTypes.education",
  skills: "componentTypes.skills",
  projects: "componentTypes.projects",
  certifications: "componentTypes.certifications",
  languages: "componentTypes.languages",
  custom_section: "componentTypes.customSection",
} as const;

// Component Icons (Lucide React icon names)
export const COMPONENT_ICONS = {
  header: "User",
  contact: "Mail",
  summary: "FileText",
  experience: "Briefcase",
  education: "GraduationCap",
  skills: "Award",
  projects: "FolderGit2",
  certifications: "Medal",
  languages: "Languages",
  custom_section: "Plus",
} as const;

// Skill Levels
export const SKILL_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
  EXPERT: "expert",
} as const;

export const SKILL_LEVEL_KEYS = {
  beginner: "skillLevels.beginner",
  intermediate: "skillLevels.intermediate",
  advanced: "skillLevels.advanced",
  expert: "skillLevels.expert",
} as const;

// Language Proficiency
export const LANGUAGE_PROFICIENCY = {
  BASIC: "basic",
  CONVERSATIONAL: "conversational",
  FLUENT: "fluent",
  NATIVE: "native",
} as const;

export const LANGUAGE_PROFICIENCY_KEYS = {
  basic: "languageProficiency.basic",
  conversational: "languageProficiency.conversational",
  fluent: "languageProficiency.fluent",
  native: "languageProficiency.native",
} as const;

// Template Styles
export const TEMPLATE_STYLES = {
  MODERN: "modern",
  CLASSIC: "classic",
  MINIMAL: "minimal",
  CREATIVE: "creative",
  PROFESSIONAL: "professional",
} as const;

// Template Style Name Keys (i18n)
export const TEMPLATE_STYLE_NAME_KEYS = {
  modern: "templateNames.modern",
  classic: "templateNames.classic",
  minimal: "templateNames.minimal",
  creative: "templateNames.creative",
  professional: "templateNames.professional",
} as const;

// PDF Export Options
export const PDF_FORMATS = {
  A4: "A4",
  LETTER: "Letter",
} as const;

export const PDF_ORIENTATIONS = {
  PORTRAIT: "portrait",
  LANDSCAPE: "landscape",
} as const;

export const PDF_QUALITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

// Layout Options
export const SPACING_OPTIONS = {
  COMPACT: "compact",
  NORMAL: "normal",
  RELAXED: "relaxed",
} as const;

export const SPACING_VALUES = {
  compact: {
    sectionSpacing: 16,
    itemSpacing: 8,
  },
  normal: {
    sectionSpacing: 24,
    itemSpacing: 12,
  },
  relaxed: {
    sectionSpacing: 32,
    itemSpacing: 16,
  },
} as const;

// Editor Settings
export const ZOOM_LEVELS = [25, 50, 75, 100, 125, 150, 175, 200] as const;
export const DEFAULT_ZOOM = 100;
export const MIN_ZOOM = 25;
export const MAX_ZOOM = 200;

// Local Storage Keys
export const STORAGE_KEYS = {
  CV_DOCUMENTS: "cv-documents",
  CURRENT_DOCUMENT_ID: "current-document-id",
  EDITOR_PREFERENCES: "editor-preferences",
  UI_STATE: "ui-state",
} as const;

// Validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[\d\s+\-()]+$/;
export const URL_REGEX = /^https?:\/\/.+/;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "MM/YYYY",
  DISPLAY_FULL: "DD/MM/YYYY",
  ISO: "YYYY-MM-DD",
} as const;

// Max Lengths
export const MAX_LENGTHS = {
  TITLE: 100,
  NAME: 100,
  POSITION: 100,
  COMPANY: 100,
  INSTITUTION: 100,
  SUMMARY: 1000,
  DESCRIPTION: 2000,
  CUSTOM_SECTION_CONTENT: 5000,
} as const;
