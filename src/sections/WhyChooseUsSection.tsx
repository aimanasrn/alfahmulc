import { CheckCircle2, HeartHandshake } from "lucide-react";
import { useTranslation } from "react-i18next";
import { whyChooseUsKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

export function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section className="section section--dark" aria-labelledby="why-choose-us-title">
      <div className="container why-choose-us">
        <ScrollReveal className="why-choose-us__copy">
          <SectionTitle
            align="left"
            eyebrow={t("whyChooseUs.eyebrow")}
            title={t("whyChooseUs.title")}
            description={t("whyChooseUs.description")}
            titleId="why-choose-us-title"
          />
          <div className="why-choose-us__visual">
            <HeartHandshake aria-hidden="true" />
          </div>
        </ScrollReveal>

        <div className="why-choose-us__grid">
          {whyChooseUsKeys.map((key, index) => (
            <ScrollReveal key={key} className="why-choose-us__item" delay={index * 0.05}>
              <CheckCircle2 aria-hidden="true" />
              <span>{t(`whyChooseUs.items.${key}`)}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
