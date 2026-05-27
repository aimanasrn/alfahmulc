import {
  BookOpenText,
  Calculator,
  FlaskConical,
  Languages,
  MoonStar,
  ScrollText,
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
  "scroll-text": ScrollText,
  "moon-star": MoonStar,
};

export function SubjectsSection() {
  const { t } = useTranslation();

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

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
      </div>
    </section>
  );
}
