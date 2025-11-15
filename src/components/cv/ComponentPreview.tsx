/**
 * ComponentPreview
 * Renders CV components with proper styling based on type
 */

import { useTranslation } from "react-i18next";
import type { CVComponentData } from "@/interfaces/cVComponentData.interfaces";
import type { HeaderData } from "@/interfaces/headerData.interfaces";
import type { ContactData } from "@/interfaces/contactData.interfaces";
import type { SummaryData } from "@/interfaces/summaryData.interfaces";
import type { ExperienceData } from "@/interfaces/experienceData.interfaces";
import type { EducationData } from "@/interfaces/educationData.interfaces";
import type { SkillsData } from "@/interfaces/skillsData.interfaces";
import type { ProjectsData } from "@/interfaces/projectsData.interfaces";
import type { CertificationsData } from "@/interfaces/certificationsData.interfaces";
import type { LanguagesData } from "@/interfaces/languagesData.interfaces";
import { COMPONENT_NAME_KEYS } from "@/utils/constants";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  Calendar,
  ExternalLink,
  Award,
} from "lucide-react";

type Props = {
  component: CVComponentData;
};

export default function ComponentPreview({ component }: Props) {
  const { t } = useTranslation();

  const typeKey =
    COMPONENT_NAME_KEYS[component.type as keyof typeof COMPONENT_NAME_KEYS] ||
    component.type;

  // Header Component
  if (component.type === "header") {
    const data = component as HeaderData;
    return (
      <div className="mb-3 text-center">
        {data.photo && (
          <img
            src={data.photo}
            alt={data.fullName}
            className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data.fullName}
        </h1>
        <p className="text-base text-gray-600">{data.title}</p>
      </div>
    );
  }

  // Contact Component
  if (component.type === "contact") {
    const data = component as ContactData;
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">
          {t(typeKey)}
        </h3>
        <div className="space-y-2 text-sm">
          {data.email && (
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${data.email}`} className="hover:text-blue-600">
                {data.email}
              </a>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2 text-gray-700">
              <Globe className="w-4 h-4" />
              <a
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                {data.website}
              </a>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center gap-2 text-gray-700">
              <Linkedin className="w-4 h-4" />
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                LinkedIn
              </a>
            </div>
          )}
          {data.github && (
            <div className="flex items-center gap-2 text-gray-700">
              <Github className="w-4 h-4" />
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Summary Component
  if (component.type === "summary") {
    const data = component as SummaryData;
    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">
          {t(typeKey)}
        </h3>
        <p className="text-gray-700 leading-relaxed">{data.content}</p>
      </div>
    );
  }

  // Experience Component
  if (component.type === "experience") {
    const data = component as ExperienceData;
    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          {t(typeKey)}
        </h3>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="border-l-2 border-blue-500 pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.position}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-700 mt-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{item.company}</span>
                    {item.location && (
                      <span className="text-gray-500">• {item.location}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {item.startDate} -{" "}
                    {item.current ? "Present" : item.endDate || "Present"}
                  </span>
                </div>
              </div>
              {item.description && (
                <p className="text-gray-700 text-sm mt-2">{item.description}</p>
              )}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Education Component
  if (component.type === "education") {
    const data = component as EducationData;
    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          {t(typeKey)}
        </h3>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="border-l-2 border-green-500 pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.degree}</h4>
                  <p className="text-gray-700">{item.institution}</p>
                  {item.field && (
                    <p className="text-gray-600 text-sm">{item.field}</p>
                  )}
                  {item.location && (
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {item.startDate} -{" "}
                      {item.current ? "Present" : item.endDate || "Present"}
                    </span>
                  </div>
                  {item.gpa && (
                    <p className="text-sm text-gray-600 mt-1">
                      GPA: {item.gpa}
                    </p>
                  )}
                </div>
              </div>
              {item.description && (
                <p className="text-gray-700 text-sm mt-2">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Skills Component
  if (component.type === "skills") {
    const data = component as SkillsData;

    // Group by category if needed
    const groupedSkills = data.groupByCategory
      ? data.items.reduce((acc, skill) => {
          const category = skill.category || "Other";
          if (!acc[category]) acc[category] = [];
          acc[category].push(skill);
          return acc;
        }, {} as Record<string, typeof data.items>)
      : { "All Skills": data.items };

    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          {t(typeKey)}
        </h3>
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              {data.groupByCategory && (
                <h4 className="font-medium text-xs text-gray-700 mb-1">
                  {category}
                </h4>
              )}
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {skill.name}
                    {data.showLevel && skill.level && (
                      <span className="ml-1 text-xs opacity-75">
                        ({skill.level})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Projects Component
  if (component.type === "projects") {
    const data = component as ProjectsData;
    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          {t(typeKey)}
        </h3>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="border-l-2 border-purple-500 pl-4">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <div className="flex gap-2">
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              {(item.startDate || item.endDate) && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {item.startDate} {item.endDate && `- ${item.endDate}`}
                  </span>
                </div>
              )}
              <p className="text-gray-700 text-sm mt-2">{item.description}</p>
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Certifications Component
  if (component.type === "certifications") {
    const data = component as CertificationsData;
    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          {t(typeKey)}
        </h3>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="border-l-2 border-yellow-500 pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  </div>
                  <p className="text-gray-700 text-sm mt-1">{item.issuer}</p>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                <span>Issued: {item.date}</span>
                {item.expiryDate && <span>Expires: {item.expiryDate}</span>}
                {item.credentialId && <span>ID: {item.credentialId}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Languages Component
  if (component.type === "languages") {
    const data = component as LanguagesData;

    const proficiencyColors = {
      basic: "bg-gray-200 text-gray-800",
      conversational: "bg-blue-200 text-blue-800",
      fluent: "bg-green-200 text-green-800",
      native: "bg-purple-200 text-purple-800",
    };

    return (
      <div className="mb-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-4">
          {t(typeKey)}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span className="font-medium text-gray-900">{item.language}</span>
              <span
                className={`px-2 py-1 rounded text-xs capitalize ${
                  proficiencyColors[item.proficiency]
                }`}
              >
                {item.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="mb-6 p-4 border rounded-md bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{t(typeKey)}</h3>
        <span className="text-xs text-gray-500">{component.type}</span>
      </div>
      <p className="text-sm text-gray-500">Component preview coming soon...</p>
    </div>
  );
}
