import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  languagesSchema,
  type LanguagesFormData,
} from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LanguagesFormProps {
  onSubmit: (data: LanguagesFormData) => void;
  defaultValues?: Partial<LanguagesFormData>;
}

export function LanguagesForm({ onSubmit, defaultValues }: LanguagesFormProps) {
  const { t } = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LanguagesFormData>({
    resolver: zodResolver(languagesSchema),
    defaultValues: defaultValues || {
      items: [
        {
          language: "",
          proficiency: "conversational",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="border-b pb-4 last:border-b-0">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Language {index + 1}</h4>
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
                Language *
              </label>
              <input
                {...register(`items.${index}.language`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholder="English"
              />
              {errors.items?.[index]?.language && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.language?.message as string)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Proficiency *
              </label>
              <select
                {...register(`items.${index}.proficiency`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="basic">Basic</option>
                <option value="conversational">Conversational</option>
                <option value="fluent">Fluent</option>
                <option value="native">Native</option>
              </select>
              {errors.items?.[index]?.proficiency && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.proficiency?.message as string)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            language: "",
            proficiency: "conversational",
          })
        }
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Language
      </Button>

      {errors.items?.root && (
        <p className="text-red-500 text-sm">
          {t(errors.items.root.message as string)}
        </p>
      )}

      <Button type="submit" className="w-full">
        Add to CV
      </Button>
    </form>
  );
}
