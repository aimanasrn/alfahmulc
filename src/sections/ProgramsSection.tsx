import { BookCopy, BookOpenCheck, CalendarRange, NotebookPen, ScrollText, Shapes } from "lucide-react";
import { useTranslation } from "react-i18next";
import { programKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

const programIcons = [BookCopy, BookOpenCheck, NotebookPen, Shapes, ScrollText, CalendarRange] as const;

export function ProgramsSection() {
  const { t } = useTranslation();

  return (
    <section className="section section--surface" id="programs">
      <div className="container">
        <SectionTitle
          eyebrow={t("programs.eyebrow")}
          title={t("programs.title")}
          description={t("programs.description")}
        />

        <div className="program-grid">
          {programKeys.map((key, index) => {
            const Icon = programIcons[index];

            return (
              <ScrollReveal key={key} className="program-card" delay={index * 0.06}>
                <div className="program-card__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{t(`programs.items.${key}.title`)}</h3>
                <p>{t(`programs.items.${key}.description`)}</p>
                <a href="#contact">{t("programs.learnMore")}</a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
