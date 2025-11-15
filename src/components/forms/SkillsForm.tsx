/**
 * SkillsForm
 * Form for editing skills component
 */

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { skillsSchema, type SkillsFormData } from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

type Props = {
  onSubmit: (data: SkillsFormData) => void;
  defaultValues?: Partial<SkillsFormData>;
};

export default function SkillsForm({ onSubmit, defaultValues }: Props) {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillsFormData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: defaultValues || {
      items: [{ name: "", level: undefined, category: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-3 gap-2">
              {/* Skill Name */}
              <div>
                <input
                  {...register(`items.${index}.name`)}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="JavaScript"
                />
                {errors.items?.[index]?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(errors.items[index]?.name?.message as string)}
                  </p>
                )}
              </div>

              {/* Level */}
              <div>
                <select
                  {...register(`items.${index}.level`)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="">Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <input
                  {...register(`items.${index}.category`)}
                  type="text"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Frontend"
                />
              </div>
            </div>

            {/* Remove Button */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 mt-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add More Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: "", level: undefined, category: "" })}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Skill
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
