/**
 * Header Component - Main navigation header
 */

import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { Menu, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLang);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <FileText className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              {t("home.title")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm">
                {t("header.home")}
              </Button>
            </Link>
            <Link to="/templates">
              <Button
                variant={isActive("/templates") ? "default" : "ghost"}
                size="sm"
              >
                {t("header.templates")}
              </Button>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">
                {i18n.language === "tr" ? "EN" : "TR"}
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/") ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  {t("header.home")}
                </Button>
              </Link>
              <Link to="/templates" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive("/templates") ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  {t("header.templates")}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
