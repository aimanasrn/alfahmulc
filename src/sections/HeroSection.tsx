import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { HeroGrainient } from "../components/ui/HeroGrainient";
import { buttonVariants } from "../components/ui/Button";
import { SplitText } from "../components/ui/SplitText";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-section" id="home">
      <HeroGrainient />
      <div className="container hero-section__grid">
        <ScrollReveal className="hero-copy">
          <SplitText
            text={t("hero.title")}
            tag="h1"
            delay={50}
            duration={0.7}
            from={{ opacity: 0, y: 35 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p>{t("hero.description")}</p>
          <div className="hero-copy__actions">
            <a className={buttonVariants("primary")} href="#contact">
              <span>{t("hero.primaryCta")}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={buttonVariants("secondary")} href="#about">
              {t("hero.secondaryCta")}
            </a>
          </div>
          <div className="hero-copy__proof">
            <span><CheckCircle2 aria-hidden="true" /> {t("stats.items.students.value")} {t("stats.items.students.label")}</span>
            <span><CheckCircle2 aria-hidden="true" /> {t("stats.items.experience.value")} {t("stats.items.experience.label")}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal className="hero-visual" delay={0.08}>
          <div className="hero-visual__panel">
            <img
              alt="AL-FAHMU students learning together"
              className="hero-visual__photo"
              src="/aktivitipembelajaran/programcutisekolah.png"
            />
            <div className="hero-visual__card">
              <span className="hero-visual__card-label">{t("hero.badge")}</span>
              <h2>{t("hero.cardTitle")}</h2>
              <p>{t("hero.cardDescription")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
