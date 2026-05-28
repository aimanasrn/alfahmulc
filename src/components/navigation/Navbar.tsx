import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { navigationItems } from "../../data/navigation";
import { buttonVariants } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { cn } from "../../utils/cn";

export function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto max-w-6xl rounded-[24px] border border-white/70 bg-white/85 px-3 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:rounded-[28px] sm:px-6"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <a className="flex min-w-0 flex-1 items-center gap-2 text-slate-950 no-underline sm:gap-3" href="#home">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-brand-100 sm:h-11 sm:w-11">
              <span className="text-xs font-bold text-brand-700 sm:text-sm">AF</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500 sm:text-sm sm:tracking-[0.24em]">
                {t("brand.name")}
              </p>
              <p className="hidden text-sm text-slate-500 lg:block">{t("brand.tagline")}</p>
            </div>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                href={item.href}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher />
            <a className={cn(buttonVariants("primary"), "hidden lg:inline-flex")} href="#contact">
              {t("cta.register")}
            </a>
            <button
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-100 lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={cn("overflow-hidden lg:hidden", isMenuOpen ? "mt-4 block" : "hidden")}>
          <div className="space-y-2 border-t border-slate-200 pt-4">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
