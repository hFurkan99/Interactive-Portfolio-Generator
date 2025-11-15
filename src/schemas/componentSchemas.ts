/**
 * Zod Schemas for CV Components
 */

import { z } from "zod";

// Header Component Schema
export const headerSchema = z.object({
  fullName: z.string().min(1, "headerForm.validations.nameRequired").max(100),
  title: z.string().min(1, "headerForm.validations.titleRequired").max(100),
  photo: z.string().optional(),
});

export type HeaderFormData = z.infer<typeof headerSchema>;

// Contact Component Schema
export const contactSchema = z.object({
  email: z.string().email("contactForm.validations.invalidEmail").optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url("contactForm.validations.invalidUrl").optional().or(z.literal("")),
  linkedin: z.string().url("contactForm.validations.invalidUrl").optional().or(z.literal("")),
  github: z.string().url("contactForm.validations.invalidUrl").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Summary Component Schema
export const summarySchema = z.object({
  content: z.string().min(1, "summaryForm.validations.summaryRequired").max(1000),
});

export type SummaryFormData = z.infer<typeof summarySchema>;

// Experience Component Schema
export const experienceItemSchema = z.object({
  company: z.string().min(1, "experienceForm.validations.companyRequired"),
  position: z.string().min(1, "experienceForm.validations.positionRequired"),
  location: z.string().optional(),
  startDate: z.string().min(1, "experienceForm.validations.startDateRequired"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  achievements: z.array(z.string()).optional(),
});

export const experienceSchema = z.object({
  items: z
    .array(experienceItemSchema)
    .min(1, "experienceForm.validations.atLeastOneExperience"),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

// Education Component Schema
export const educationItemSchema = z.object({
  institution: z.string().min(1, "educationForm.validations.institutionRequired"),
  degree: z.string().min(1, "educationForm.validations.degreeRequired"),
  field: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, "educationForm.validations.startDateRequired"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

export const educationSchema = z.object({
  items: z.array(educationItemSchema).min(1, "educationForm.validations.atLeastOneEducation"),
});

export type EducationFormData = z.infer<typeof educationSchema>;

// Skills Component Schema
export const skillItemSchema = z.object({
  name: z.string().min(1, "skillsForm.validations.skillNameRequired"),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
  category: z.string().optional(),
});

export const skillsSchema = z.object({
  items: z.array(skillItemSchema).min(1, "skillsForm.validations.atLeastOneSkill"),
});

export type SkillsFormData = z.infer<typeof skillsSchema>;

// Projects Component Schema
export const projectItemSchema = z.object({
  name: z.string().min(1, "projectsForm.validations.projectNameRequired"),
  description: z.string().min(1, "projectsForm.validations.descriptionRequired"),
  technologies: z.array(z.string()).optional(),
  url: z.string().url("projectsForm.validations.invalidUrl").optional().or(z.literal("")),
  github: z.string().url("projectsForm.validations.invalidUrl").optional().or(z.literal("")),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

export const projectsSchema = z.object({
  items: z.array(projectItemSchema).min(1, "projectsForm.validations.atLeastOneProject"),
});

export type ProjectsFormData = z.infer<typeof projectsSchema>;

// Certifications Component Schema
export const certificationItemSchema = z.object({
  name: z.string().min(1, "certificationsForm.validations.certificationNameRequired"),
  issuer: z.string().min(1, "certificationsForm.validations.issuerRequired"),
  date: z.string().min(1, "certificationsForm.validations.dateRequired"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  url: z.string().url("certificationsForm.validations.invalidUrl").optional().or(z.literal("")),
});

export const certificationsSchema = z.object({
  items: z
    .array(certificationItemSchema)
    .min(1, "certificationsForm.validations.atLeastOneCertification"),
});

export type CertificationsFormData = z.infer<typeof certificationsSchema>;

// Languages Component Schema
export const languageItemSchema = z.object({
  language: z.string().min(1, "languagesForm.validations.languageRequired"),
  proficiency: z.enum(["basic", "conversational", "fluent", "native"]),
});

export const languagesSchema = z.object({
  items: z.array(languageItemSchema).min(1, "languagesForm.validations.atLeastOneLanguage"),
});

export type LanguagesFormData = z.infer<typeof languagesSchema>;
