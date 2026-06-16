import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";

const languages = [
  { code: "ms", label: "BM" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language;

  return (
    <div aria-label="Language switcher" className="language-switcher" role="group">
      {languages.map((language) => {
        const isActive = activeLanguage === language.code;

        return (
          <button
            key={language.code}
            aria-pressed={isActive}
            className={cn("language-switcher__button", isActive && "is-active")}
            onClick={() => void i18n.changeLanguage(language.code)}
            type="button"
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}
