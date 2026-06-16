import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { testimonialKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { ScrollVelocity } from "../components/ui/ScrollVelocity";
import { SectionTitle } from "../components/ui/SectionTitle";

export function TestimonialsSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const marqueeCards = testimonialKeys.map((key) => {
    const name = t(`testimonials.items.${key}.name`);
    const quote = t(`testimonials.items.${key}.quote`);
    const preview = quote.length > 132 ? `${quote.slice(0, 129).trimEnd()}...` : quote;

    return (
      <article key={key} className="testimonial-marquee-card">
        <div className="testimonial-marquee-card__stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star key={starIndex} />
          ))}
        </div>
        <p>{preview}</p>
        <strong>{name}</strong>
      </article>
    );
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonialKeys.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonialKeys.length) % testimonialKeys.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonialKeys.length);
  };

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <SectionTitle
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        />

        <ScrollReveal className="testimonial-carousel">
          <div className="testimonial-marquee" aria-hidden="true">
            <ScrollVelocity items={marqueeCards} baseVelocity={-34} />
            <ScrollVelocity items={[...marqueeCards].reverse()} baseVelocity={34} />
          </div>

          <div className="testimonial-carousel__viewport">
            <div
              className="testimonial-carousel__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonialKeys.map((key) => (
                <article key={key} className="testimonial-card testimonial-card--carousel">
                  <div className="testimonial-card__top">
                    <div className="testimonial-card__avatar">
                      {t(`testimonials.items.${key}.name`).slice(0, 1)}
                    </div>
                    <div>
                      <strong>{t(`testimonials.items.${key}.name`)}</strong>
                      <p className="testimonial-card__meta">{t(`testimonials.items.${key}.time`)}</p>
                    </div>
                  </div>

                  <div className="testimonial-card__stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} aria-hidden="true" />
                    ))}
                  </div>

                  <p className="testimonial-card__quote">"{t(`testimonials.items.${key}.quote`)}"</p>
                  <span>
                    {t("testimonials.childProgramLabel")}: {t(`testimonials.items.${key}.program`)}
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="testimonial-carousel__controls">
            <button
              aria-label={t("testimonials.previous")}
              className="testimonial-carousel__button"
              onClick={goToPrevious}
              type="button"
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <div className="testimonial-carousel__dots">
              {testimonialKeys.map((key, index) => (
                <button
                  key={key}
                  aria-label={t("testimonials.goTo", { number: index + 1 })}
                  aria-pressed={activeIndex === index}
                  className={
                    activeIndex === index
                      ? "testimonial-carousel__dot is-active"
                      : "testimonial-carousel__dot"
                  }
                  onClick={() => goToSlide(index)}
                  type="button"
                />
              ))}
            </div>

            <button
              aria-label={t("testimonials.next")}
              className="testimonial-carousel__button"
              onClick={goToNext}
              type="button"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
