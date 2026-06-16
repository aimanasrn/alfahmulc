import { useTranslation } from "react-i18next";
import { galleryKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

export function GallerySection() {
  const { t } = useTranslation();

  return (
    <section className="section section--surface" id="activities">
      <div className="container">
        <SectionTitle
          eyebrow={t("gallery.eyebrow")}
          title={t("gallery.title")}
          description={t("gallery.description")}
        />

        <div className="gallery-grid">
          {galleryKeys.map((key, index) => (
            <ScrollReveal key={key} className="gallery-card" delay={index * 0.05}>
              <div className="gallery-card__image" />
              <h3>{t(`gallery.items.${key}`)}</h3>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
