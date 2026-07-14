import { Facebook, Instagram, MessageCircleMore } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navigationIds } from "../../data/landingPage";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <img alt="AL-FAHMU Learning Centre logo" className="site-footer__logo" src="/logo.png" />
          <p className="site-footer__brand">{t("brand.name")}</p>
          <p className="site-footer__description">{t("footer.description")}</p>
        </div>

        <div>
          <h2>{t("footer.quickLinks")}</h2>
          <div className="site-footer__links">
            {navigationIds.map((id) => (
              <a key={id} href={`#${id}`}>
                {t(`nav.${id}`)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2>{t("footer.contactTitle")}</h2>
          <div className="site-footer__contact">
            <p>{t("contact.phoneValue")}</p>
            <p>{t("contact.emailValue")}</p>
            <p>{t("contact.addressValue")}</p>
          </div>
        </div>

        <div>
          <h2>{t("footer.socialTitle")}</h2>
          <div className="site-footer__social">
            <a aria-label={t("floatingWhatsApp.label")} href="https://wa.me/601119815754" rel="noreferrer" target="_blank">
              <MessageCircleMore aria-hidden="true" />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/pusattuisyenalfahmu?igsh=MThvcXZ5MDhsOHNkYw=="
              rel="noreferrer"
              target="_blank"
            >
              <Instagram aria-hidden="true" />
            </a>
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/share/15P8gFzadk/"
              rel="noreferrer"
              target="_blank"
            >
              <Facebook aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
