/**
 * ExperienceForm
 * Form for editing work experience component
 */

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  experienceSchema,
  type ExperienceFormData,
} from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

type Props = {
  onSubmit: (data: ExperienceFormData) => void;
  defaultValues?: Partial<ExperienceFormData>;
};

export default function ExperienceForm({ onSubmit, defaultValues }: Props) {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: defaultValues || {
      items: [
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          achievements: [],
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
            <h4 className="font-semibold text-sm">Experience #{index + 1}</h4>
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

          {/* Company */}
          <div>
            <label className="block text-xs font-medium mb-1">Company *</label>
            <input
              {...register(`items.${index}.company`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Google"
            />
            {errors.items?.[index]?.company && (
              <p className="text-red-500 text-xs mt-1">
                {t(errors.items[index]?.company?.message as string)}
              </p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-xs font-medium mb-1">Position *</label>
            <input
              {...register(`items.${index}.position`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Software Engineer"
            />
            {errors.items?.[index]?.position && (
              <p className="text-red-500 text-xs mt-1">
                {t(errors.items[index]?.position?.message as string)}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium mb-1">Location</label>
            <input
              {...register(`items.${index}.location`)}
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="San Francisco, CA"
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
            <label className="text-xs">I currently work here</label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium mb-1">
              Description
            </label>
            <textarea
              {...register(`items.${index}.description`)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md text-sm resize-none"
              placeholder="Describe your responsibilities and achievements..."
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
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
          })
        }
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Experience
      </Button>

      {errors.items && (
        <p className="text-red-500 text-xs">{t(errors.items.message as string)}</p>
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
