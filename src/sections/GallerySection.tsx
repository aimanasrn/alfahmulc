import { useTranslation } from "react-i18next";
import { galleryKeys } from "../data/landingPage";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

const activityImageByKey = {
  classroomLearning: "/aktivitipembelajaran/pembelajarandalamkelas.png",
  quranSession: "/aktivitipembelajaran/sesialquran.png",
  groupActivity: "/aktivitipembelajaran/kerjaberkumpulan.png",
  readingSession: "/aktivitipembelajaran/sesimembaca.png",
  examWorkshop: "/aktivitipembelajaran/bengkelpeperiksaan.png",
  holidayProgram: "/aktivitipembelajaran/programcutisekolah.png",
} as const;

const miniGalleryImages = [
  "/minigaleri/03.jpg",
  "/minigaleri/04.jpg",
  "/minigaleri/05.png",
  "/minigaleri/06.png",
  "/minigaleri/07.png",
  "/minigaleri/08.png",
  "/minigaleri/09.jpg",
  "/minigaleri/kelasmembaca.jpg",
] as const;

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

        <ScrollReveal className="gallery-video" delay={0.04}>
          <div className="gallery-video__media">
            <video
              aria-label={t("gallery.video.label")}
              controls
              preload="metadata"
              poster="/aktivitipembelajaran/pembelajarandalamkelas.png"
            >
              <source src="/alfahmu%20web%20mp4.mp4" type="video/mp4" />
              {t("gallery.video.fallback")}
            </video>
          </div>
          <div className="gallery-video__copy">
            <p className="gallery-video__eyebrow">{t("gallery.video.eyebrow")}</p>
            <h3>{t("gallery.video.title")}</h3>
            <p>{t("gallery.video.description")}</p>
          </div>
        </ScrollReveal>

        <div className="gallery-grid">
          {galleryKeys.map((key, index) => (
            <ScrollReveal key={key} className="gallery-card" delay={index * 0.05}>
              <div className="gallery-card__image">
                <img
                  alt={`${t(`gallery.items.${key}`)} activity`}
                  className="gallery-card__photo"
                  src={activityImageByKey[key]}
                />
              </div>
              <h3>{t(`gallery.items.${key}`)}</h3>
            </ScrollReveal>
          ))}
        </div>

        <div aria-label={t("gallery.carousel.regionLabel")} className="mini-gallery" role="region">
          <div className="mini-gallery__header">
            <div>
              <p className="mini-gallery__eyebrow">{t("gallery.carousel.eyebrow")}</p>
              <h3>{t("gallery.carousel.title")}</h3>
            </div>
          </div>

          <p className="mini-gallery__description">{t("gallery.carousel.description")}</p>

          <div className="mini-gallery__masonry">
            {miniGalleryImages.map((imagePath, index) => (
              <article
                key={imagePath}
                className={`mini-gallery__item mini-gallery__item--${(index % 3) + 1}`}
              >
                <div className="mini-gallery__image">
                  <img
                    alt={`${t("gallery.carousel.title")} ${index + 1}`}
                    className="mini-gallery__photo"
                    src={imagePath}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
