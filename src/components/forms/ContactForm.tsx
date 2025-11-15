/**
 * ContactForm
 * Form for editing contact component data
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  contactSchema,
  type ContactFormData,
} from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (data: ContactFormData) => void;
  defaultValues?: Partial<ContactFormData>;
};

export default function ContactForm({ onSubmit, defaultValues }: Props) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultValues || {
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.email.message as string)}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          {...register("phone")}
          type="tel"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+1 234 567 8900"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.phone.message as string)}
          </p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          {...register("location")}
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="San Francisco, CA"
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.location.message as string)}
          </p>
        )}
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium mb-1">Website</label>
        <input
          {...register("website")}
          type="url"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://johndoe.com"
        />
        {errors.website && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.website.message as string)}
          </p>
        )}
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium mb-1">LinkedIn</label>
        <input
          {...register("linkedin")}
          type="url"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://linkedin.com/in/johndoe"
        />
        {errors.linkedin && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.linkedin.message as string)}
          </p>
        )}
      </div>

      {/* GitHub */}
      <div>
        <label className="block text-sm font-medium mb-1">GitHub</label>
        <input
          {...register("github")}
          type="url"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://github.com/johndoe"
        />
        {errors.github && (
          <p className="text-red-500 text-xs mt-1">
            {t(errors.github.message as string)}
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
