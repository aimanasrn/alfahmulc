import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { testimonialKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <SectionTitle
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />

        <div className="testimonial-grid">
          {testimonialKeys.map((key, index) => (
            <ScrollReveal key={key} className="testimonial-card" delay={index * 0.06}>
              <div className="testimonial-card__stars">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} aria-hidden="true" />
                ))}
              </div>
              <p className="testimonial-card__quote">“{t(`testimonials.items.${key}.quote`)}”</p>
              <strong>{t(`testimonials.items.${key}.name`)}</strong>
              <span>
                {t("testimonials.childProgramLabel")}: {t(`testimonials.items.${key}.program`)}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
