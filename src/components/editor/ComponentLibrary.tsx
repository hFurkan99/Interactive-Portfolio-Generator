/**
 * ComponentLibrary
 * Left sidebar showing available component types to add
 */

import { useTranslation } from "react-i18next";
import {
  COMPONENT_TYPES,
  COMPONENT_NAME_KEYS,
  COMPONENT_ICONS,
} from "@/utils/constants";
import type { ComponentType } from "@/types/componentType.types";
import * as Icons from "lucide-react";
import { Check } from "lucide-react";

type Props = {
  onSelectComponent: (type: ComponentType) => void;
  selectedType: ComponentType | null;
  addedTypes: ComponentType[];
};

export default function ComponentLibrary({
  onSelectComponent,
  selectedType,
  addedTypes,
}: Props) {
  const { t } = useTranslation();

  const componentTypes = Object.values(COMPONENT_TYPES) as ComponentType[];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">{t("editor.components")}</h2>
        <div className="space-y-2">
          {componentTypes.map((type) => {
            const iconName =
              COMPONENT_ICONS[type as keyof typeof COMPONENT_ICONS];
            const Icon = Icons[
              iconName as keyof typeof Icons
            ] as React.ComponentType<{ className?: string }>;
            const nameKey =
              COMPONENT_NAME_KEYS[type as keyof typeof COMPONENT_NAME_KEYS];
            const isSelected = selectedType === type;
            const isAdded = addedTypes.includes(type);

            return (
              <button
                key={type}
                onClick={() => onSelectComponent(type)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors relative ${
                  isSelected
                    ? "bg-blue-100 text-blue-700 border-2 border-blue-500"
                    : "bg-white hover:bg-gray-50 border-2 border-transparent"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="text-sm font-medium flex-1">{t(nameKey)}</span>
                {isAdded && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    <Check className="w-3 h-3" />
                    <span>{t("editor.added")}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
