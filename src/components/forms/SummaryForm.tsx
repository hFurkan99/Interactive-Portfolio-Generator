/**
 * SummaryForm
 * Form for editing summary/professional summary component
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  summarySchema,
  type SummaryFormData,
} from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (data: SummaryFormData) => void;
  defaultValues?: Partial<SummaryFormData>;
};

export default function SummaryForm({ onSubmit, defaultValues }: Props) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SummaryFormData>({
    resolver: zodResolver(summarySchema),
    defaultValues: defaultValues || {
      content: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Professional Summary *
        </label>
        <textarea
          {...register("content")}
          rows={6}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Brief overview of your professional background, skills, and career objectives..."
        />
        {errors.content && (
          <p className="text-red-500 text-xs mt-1">{t(errors.content.message as string)}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">Max 1000 characters</p>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t">
        <Button type="submit" className="w-full">
          {t("common.add")}
        </Button>
      </div>
    </form>
  );
}
