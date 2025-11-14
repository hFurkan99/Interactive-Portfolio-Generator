import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {t("home.title")}
        </h1>
        <p className="text-xl text-gray-600 mb-8">{t("home.subtitle")}</p>
        <div className="flex gap-4 justify-center">
          <Link to="/templates">
            <Button size="lg">{t("home.getStarted")}</Button>
          </Link>
          <Button variant="outline" size="lg">
            {t("home.viewExamples")}
          </Button>
        </div>
      </div>
    </div>
  );
}
