import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { HeroGrainient } from "../components/ui/HeroGrainient";
import { buttonVariants } from "../components/ui/Button";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-section" id="home">
      <HeroGrainient />
      <div className="container hero-section__grid">
        <ScrollReveal className="hero-copy">
          <span className="hero-copy__badge">{t("hero.badge")}</span>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
          <div className="hero-copy__actions">
            <a className={buttonVariants("primary")} href="#contact">
              {t("hero.primaryCta")}
            </a>
            <a className={buttonVariants("secondary")} href="#about">
              {t("hero.secondaryCta")}
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal className="hero-visual" delay={0.08}>
          <div className="hero-visual__panel">
            <div className="hero-visual__floating hero-visual__floating--one">
              <BookOpen aria-hidden="true" />
            </div>
            <div className="hero-visual__floating hero-visual__floating--two">
              <GraduationCap aria-hidden="true" />
            </div>
            <div className="hero-visual__shape" />
            <div className="hero-visual__card">
              <Sparkles aria-hidden="true" />
              <h2>{t("hero.cardTitle")}</h2>
              <p>{t("hero.cardDescription")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
