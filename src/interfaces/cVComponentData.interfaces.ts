import type { CertificationsData } from "./certificationsData.interfaces";
import type { ContactData } from "./contactData.interfaces";
import type { CustomSectionData } from "./customSectionData.interfaces";
import type { EducationData } from "./educationData.interfaces";
import type { ExperienceData } from "./experienceData.interfaces";
import type { HeaderData } from "./headerData.interfaces";
import type { LanguagesData } from "./languagesData.interfaces";
import type { ProjectsData } from "./projectsData.interfaces";
import type { SkillsData } from "./skillsData.interfaces";
import type { SummaryData } from "./summaryData.interfaces";

export type CVComponentData =
  | HeaderData
  | ContactData
  | SummaryData
  | ExperienceData
  | EducationData
  | SkillsData
  | ProjectsData
  | CertificationsData
  | LanguagesData
  | CustomSectionData;
