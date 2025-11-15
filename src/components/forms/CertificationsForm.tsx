import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  certificationsSchema,
  type CertificationsFormData,
} from "@/schemas/componentSchemas";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CertificationsFormProps {
  onSubmit: (data: CertificationsFormData) => void;
  defaultValues?: Partial<CertificationsFormData>;
}

export function CertificationsForm({
  onSubmit,
  defaultValues,
}: CertificationsFormProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificationsFormData>({
    resolver: zodResolver(certificationsSchema),
    defaultValues: defaultValues || {
      items: [
        {
          name: "",
          issuer: "",
          date: "",
          expiryDate: "",
          credentialId: "",
          url: "",
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
            <h4 className="font-medium text-sm">Certification {index + 1}</h4>
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
                Certification Name *
              </label>
              <input
                {...register(`items.${index}.name`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholder="AWS Certified Solutions Architect"
              />
              {errors.items?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.name?.message as string)}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Issuer *</label>
              <input
                {...register(`items.${index}.issuer`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholder="Amazon Web Services"
              />
              {errors.items?.[index]?.issuer && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.issuer?.message as string)}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Issue Date *
                </label>
                <input
                  {...register(`items.${index}.date`)}
                  type="month"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
                {errors.items?.[index]?.date && (
                  <p className="text-red-500 text-xs mt-1">
                    {t(errors.items[index]?.date?.message as string)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  {...register(`items.${index}.expiryDate`)}
                  type="month"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Credential ID
              </label>
              <input
                {...register(`items.${index}.credentialId`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholder="ABC123XYZ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <input
                {...register(`items.${index}.url`)}
                className="w-full px-3 py-2 border rounded-md text-sm"
                placeholder="https://credential-url.com"
              />
              {errors.items?.[index]?.url && (
                <p className="text-red-500 text-xs mt-1">
                  {t(errors.items[index]?.url?.message as string)}
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
            name: "",
            issuer: "",
            date: "",
            expiryDate: "",
            credentialId: "",
            url: "",
          })
        }
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Certification
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
