/**
 * EducationForm
 * Form for editing education component
 */

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  educationSchema,
  type EducationFormData,
} from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

type Props = {
  onSubmit: (data: EducationFormData) => void;
  defaultValues?: Partial<EducationFormData>;
};

export default function EducationForm({ onSubmit, defaultValues }: Props) {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: defaultValues || {
      items: [
        {
          institution: "",
          degree: "",
          field: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          gpa: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border rounded-lg bg-gray-50 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Education #{index + 1}</h4>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Institution */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Institution *
            </label>
            <input
              {...register(`items.${index}.institution`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Stanford University"
            />
            {errors.items?.[index]?.institution && (
              <p className="text-red-500 text-xs mt-1">
                {t(errors.items[index]?.institution?.message as string)}
              </p>
            )}
          </div>

          {/* Degree */}
          <div>
            <label className="block text-xs font-medium mb-1">Degree *</label>
            <input
              {...register(`items.${index}.degree`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Bachelor of Science"
            />
            {errors.items?.[index]?.degree && (
              <p className="text-red-500 text-xs mt-1">
                {t(errors.items[index]?.degree?.message as string)}
              </p>
            )}
          </div>

          {/* Field */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Field of Study
            </label>
            <input
              {...register(`items.${index}.field`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Computer Science"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium mb-1">Location</label>
            <input
              {...register(`items.${index}.location`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Stanford, CA"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium mb-1">
                Start Date *
              </label>
              <input
                {...register(`items.${index}.startDate`)}
                type="month"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
              {errors.items?.[index]?.startDate && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.startDate?.message as string)}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">End Date</label>
              <input
                {...register(`items.${index}.endDate`)}
                type="month"
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          {/* Current checkbox */}
          <div className="flex items-center gap-2">
            <input
              {...register(`items.${index}.current`)}
              type="checkbox"
              className="rounded"
            />
            <label className="text-xs">Currently studying here</label>
          </div>

          {/* GPA */}
          <div>
            <label className="block text-xs font-medium mb-1">GPA</label>
            <input
              {...register(`items.${index}.gpa`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="3.8/4.0"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Description
            </label>
            <textarea
              {...register(`items.${index}.description`)}
              rows={2}
              className="w-full px-3 py-2 border rounded-md text-sm resize-none"
              placeholder="Honors, activities, coursework..."
            />
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          append({
            institution: "",
            degree: "",
            field: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            gpa: "",
            description: "",
          })
        }
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Education
      </Button>

      {errors.items && (
        <p className="text-red-500 text-xs">
          {t(errors.items.message as string)}
        </p>
      )}

      {/* Submit Button */}
      <div className="pt-4 border-t">
        <Button type="submit" className="w-full">
          {t("common.add")}
        </Button>
      </div>
    </form>
  );
}
