import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { cn } from "../../utils/cn";

const languages = [
  { code: "ms", label: "BM" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 backdrop-blur">
      {languages.map((language) => {
        const isActive = activeLanguage === language.code;

        return (
          <Button
            key={language.code}
            aria-pressed={isActive}
            className={cn(
              "px-3 py-2 text-xs shadow-none",
              isActive && "bg-slate-900 text-white hover:bg-slate-900",
            )}
            onClick={() => void i18n.changeLanguage(language.code)}
            variant="ghost"
          >
            {language.label}
          </Button>
        );
      })}
    </div>
  );
}
