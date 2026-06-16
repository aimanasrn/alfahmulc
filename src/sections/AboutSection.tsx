import { Compass, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="section" id="about">
      <div className="container about-section">
        <ScrollReveal className="about-section__visual">
          <div className="about-illustration">
            <div className="about-illustration__card">
              <span>AL-FAHMU</span>
              <strong>{t("brand.tagline")}</strong>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="about-section__content" delay={0.08}>
          <SectionTitle
            align="left"
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
            description={t("about.description")}
          />

          <div className="about-cards">
            <article className="about-card">
              <Target aria-hidden="true" />
              <h3>{t("about.mission.title")}</h3>
              <p>{t("about.mission.description")}</p>
            </article>
            <article className="about-card">
              <Compass aria-hidden="true" />
              <h3>{t("about.vision.title")}</h3>
              <p>{t("about.vision.description")}</p>
            </article>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
