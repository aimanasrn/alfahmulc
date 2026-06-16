import { Award, BookOpen, GraduationCap, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { statKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";

const statIcons = [Users, Award, GraduationCap, BookOpen] as const;

export function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="section section--stats" aria-label="Trust indicators">
      <div className="container stats-grid">
        {statKeys.map((key, index) => {
          const Icon = statIcons[index];

          return (
            <ScrollReveal key={key} className="stat-card" delay={index * 0.05}>
              <div className="stat-card__icon">
                <Icon aria-hidden="true" />
              </div>
              <strong>{t(`stats.items.${key}.value`)}</strong>
              <span>{t(`stats.items.${key}.label`)}</span>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
