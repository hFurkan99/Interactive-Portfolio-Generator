import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  projectsSchema,
  type ProjectsFormData,
} from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ProjectsFormProps {
  onSubmit: (data: ProjectsFormData) => void;
  defaultValues?: Partial<ProjectsFormData>;
}

export function ProjectsForm({ onSubmit, defaultValues }: ProjectsFormProps) {
  const { t } = useTranslation();
  const [techInputs, setTechInputs] = useState<Record<number, string>>({});
  const [highlightInputs, setHighlightInputs] = useState<
    Record<number, string>
  >({});
  const [technologies, setTechnologies] = useState<Record<number, string[]>>(
    {}
  );
  const [highlights, setHighlights] = useState<Record<number, string[]>>({});

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectsFormData>({
    resolver: zodResolver(projectsSchema),
    defaultValues: defaultValues || {
      items: [
        {
          name: "",
          description: "",
          technologies: [],
          url: "",
          github: "",
          startDate: "",
          endDate: "",
          highlights: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addTechnology = (index: number) => {
    const tech = techInputs[index]?.trim();
    if (!tech) return;

    const currentTechs = technologies[index] || [];
    const newTechs = [...currentTechs, tech];
    setTechnologies((prev) => ({ ...prev, [index]: newTechs }));
    setValue(`items.${index}.technologies`, newTechs);
    setTechInputs((prev) => ({ ...prev, [index]: "" }));
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const currentTechs = technologies[projectIndex] || [];
    const newTechs = currentTechs.filter((_, i) => i !== techIndex);
    setTechnologies((prev) => ({ ...prev, [projectIndex]: newTechs }));
    setValue(`items.${projectIndex}.technologies`, newTechs);
  };

  const addHighlight = (index: number) => {
    const highlight = highlightInputs[index]?.trim();
    if (!highlight) return;

    const currentHighlights = highlights[index] || [];
    const newHighlights = [...currentHighlights, highlight];
    setHighlights((prev) => ({ ...prev, [index]: newHighlights }));
    setValue(`items.${index}.highlights`, newHighlights);
    setHighlightInputs((prev) => ({ ...prev, [index]: "" }));
  };

  const removeHighlight = (projectIndex: number, highlightIndex: number) => {
    const currentHighlights = highlights[projectIndex] || [];
    const newHighlights = currentHighlights.filter(
      (_, i) => i !== highlightIndex
    );
    setHighlights((prev) => ({ ...prev, [projectIndex]: newHighlights }));
    setValue(`items.${projectIndex}.highlights`, newHighlights);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border-b pb-4 last:border-b-0">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Project {index + 1}</h4>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Name *
              </label>
              <input
                {...register(`items.${index}.name`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholder="My Awesome Project"
              />
              {errors.items?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.name?.message as string)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description *
              </label>
              <textarea
                {...register(`items.${index}.description`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                rows={3}
                placeholder="Describe your project..."
              />
              {errors.items?.[index]?.description && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.description?.message as string)}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  {...register(`items.${index}.url`)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="https://project.com"
                />
                {errors.items?.[index]?.url && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(errors.items[index]?.url?.message as string)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GitHub</label>
                <input
                  {...register(`items.${index}.github`)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="https://github.com/..."
                />
                {errors.items?.[index]?.github && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(errors.items[index]?.github?.message as string)}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  {...register(`items.${index}.startDate`)}
                  type="month"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  {...register(`items.${index}.endDate`)}
                  type="month"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Technologies
              </label>
              <div className="flex gap-2">
                <input
                  value={techInputs[index] || ""}
                  onChange={(e) =>
                    setTechInputs((prev) => ({
                      ...prev,
                      [index]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechnology(index);
                    }
                  }}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                  placeholder="React, TypeScript, etc."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTechnology(index)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(technologies[index] || []).map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs flex items-center gap-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(index, techIdx)}
                      className="hover:text-blue-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Highlights
              </label>
              <div className="flex gap-2">
                <input
                  value={highlightInputs[index] || ""}
                  onChange={(e) =>
                    setHighlightInputs((prev) => ({
                      ...prev,
                      [index]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addHighlight(index);
                    }
                  }}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                  placeholder="Add key achievement..."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addHighlight(index)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <ul className="mt-2 space-y-1">
                {(highlights[index] || []).map((highlight, highlightIdx) => (
                  <li
                    key={highlightIdx}
                    className="text-xs flex items-start gap-2 bg-gray-50 p-2 rounded"
                  >
                    <span className="flex-1">{highlight}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(index, highlightIdx)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            name: "",
            description: "",
            technologies: [],
            url: "",
            github: "",
            startDate: "",
            endDate: "",
            highlights: [],
          })
        }
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>

      {errors.items?.root && (
        <p className="text-red-500 text-sm">{t(errors.items.root.message as string)}</p>
      )}

      <Button type="submit" className="w-full">
        Add to CV
      </Button>
    </form>
  );
}
