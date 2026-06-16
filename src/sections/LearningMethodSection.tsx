import { useTranslation } from "react-i18next";
import { learningMethodKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

export function LearningMethodSection() {
  const { t } = useTranslation();

  return (
    <section className="section" id="about-method">
      <div className="container">
        <SectionTitle
          eyebrow={t("learningMethod.eyebrow")}
          title={t("learningMethod.title")}
          description={t("learningMethod.description")}
        />

        <div className="method-grid">
          {learningMethodKeys.map((key, index) => (
            <ScrollReveal key={key} className="method-card" delay={index * 0.06}>
              <div className="method-card__number">{index + 1}</div>
              <h3>{t(`learningMethod.items.${key}.title`)}</h3>
              <p>{t(`learningMethod.items.${key}.description`)}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
