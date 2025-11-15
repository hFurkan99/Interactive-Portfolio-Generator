import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { headerSchema, type HeaderFormData } from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (data: HeaderFormData) => void;
  defaultValues?: Partial<HeaderFormData>;
};

export default function HeaderForm({ onSubmit, defaultValues }: Props) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeaderFormData>({
    resolver: zodResolver(headerSchema),
    defaultValues: defaultValues || {
      fullName: "",
      title: "",
      photo: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("headerForm.fullname")} *
        </label>
        <input
          {...register("fullName")}
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Furkan Baltacı"
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.fullName.message as string)}
          </p>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("headerForm.title")} *
        </label>
        <input
          {...register("title")}
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Software Engineer"
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.title.message as string)}
          </p>
        )}
      </div>

      {/* Photo URL (optional) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("headerForm.photoUrl")} ({t("common.optional")})
        </label>
        <input
          {...register("photo")}
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/photo.jpg"
        />
        {errors.photo && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.photo.message as string)}
          </p>
        )}
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
