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
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24" id="subjects">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-brand-50/40" />
      <div className="absolute left-[-2rem] top-20 -z-10 h-56 w-56 rounded-full bg-sky-200/45 blur-3xl" />
      <div className="absolute right-[-3rem] bottom-8 -z-10 h-64 w-64 rounded-full bg-brand-100/30 blur-3xl" />
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
                <article className="group h-full rounded-[2rem] border border-slate-200/90 bg-slate-50/80 p-7 shadow-sm shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-gradient-to-br hover:from-sky-100 hover:via-white hover:to-accent-100 hover:shadow-xl hover:shadow-brand-900/15">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-white p-3 text-brand-600 ring-1 ring-slate-200 transition duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:ring-brand-300">
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
          <div className="mt-10 rounded-[2rem] border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-cream-100 p-6 shadow-sm shadow-brand-900/5 transition duration-300 hover:border-brand-300 hover:bg-gradient-to-r hover:from-brand-200 hover:via-white hover:to-accent-200 hover:shadow-xl hover:shadow-brand-900/15">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              {t("subjects.levelsTitle")}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {supportedLevels.map((levelKey) => (
                <span
                  key={levelKey}
                  className="rounded-full border border-brand-200 bg-white/90 px-4 py-2 text-sm font-medium text-brand-800 shadow-sm transition duration-300 hover:border-brand-300 hover:bg-gradient-to-r hover:from-brand-100 hover:to-accent-100 hover:text-brand-900"
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
