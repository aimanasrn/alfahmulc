import { Compass, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

export function AboutSection() {
  const { t } = useTranslation();
  const missionItems = t("about.mission.items", { returnObjects: true }) as string[];
  const objectiveItems = t("about.objectives.items", { returnObjects: true }) as string[];

  return (
    <section className="section" id="about">
      <div className="container about-section about-section--single">
        <ScrollReveal className="about-section__content">
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
              <ul className="about-card__list">
                {missionItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="about-card">
              <Compass aria-hidden="true" />
              <h3>{t("about.vision.title")}</h3>
              <p>{t("about.vision.description")}</p>
            </article>
          </div>

          <div className="about-objectives">
            <h3>{t("about.objectives.title")}</h3>
            <ul className="about-objectives__list">
              {objectiveItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
