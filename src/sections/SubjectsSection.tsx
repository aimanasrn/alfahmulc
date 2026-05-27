import {
  BadgeCheck,
  BookCopy,
  BookMarked,
  BookOpenCheck,
  BookOpenText,
  Calculator,
  FlaskConical,
  Languages,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../components/ui/SectionTitle";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { subjects } from "../data/subjects";

const iconMap: Record<string, LucideIcon> = {
  "book-open-text": BookOpenText,
  languages: Languages,
  calculator: Calculator,
  "flask-conical": FlaskConical,
  "book-copy": BookCopy,
  "badge-check": BadgeCheck,
  "book-marked": BookMarked,
  "book-open-check": BookOpenCheck,
};

export function SubjectsSection() {
  const { t } = useTranslation();
  const supportedLevels = [
    "subjects.levels.prasekolah",
    "subjects.levels.rendah",
    "subjects.levels.menengahRendah",
    "subjects.levels.spm",
    "subjects.levels.kafa",
    "subjects.levels.upkk",
  ];

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24" id="subjects">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionTitle
            description={t("subjects.description")}
            eyebrow={t("subjects.eyebrow")}
            title={t("subjects.title")}
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => {
            const Icon = iconMap[subject.icon];

            return (
              <ScrollReveal key={subject.titleKey}>
                <article className="h-full rounded-[2rem] border border-slate-200/90 bg-slate-50/80 p-7 shadow-sm shadow-slate-900/5">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-white p-3 text-brand-600 ring-1 ring-slate-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950">{t(subject.titleKey)}</h3>
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{t(subject.descriptionKey)}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="mt-10 rounded-[2rem] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-cream-100 p-6 shadow-sm shadow-brand-900/5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              {t("subjects.levelsTitle")}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {supportedLevels.map((levelKey) => (
                <span
                  key={levelKey}
                  className="rounded-full border border-brand-200 bg-white/90 px-4 py-2 text-sm font-medium text-brand-800 shadow-sm"
                >
                  {t(levelKey)}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
