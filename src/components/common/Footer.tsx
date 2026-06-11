import { Facebook, Instagram, MessageCircleMore } from "lucide-react";
import { useTranslation } from "react-i18next";

const quickLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.subjects", href: "#subjects" },
  { key: "nav.infoBoard", href: "#info-board" },
];

const actionLinks = [
  { key: "footer.actions.items.testimonials", href: "#testimonials" },
  { key: "footer.actions.items.infoBoard", href: "#info-board" },
  { key: "footer.actions.items.contact", href: "#contact" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.8fr))]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
            {t("brand.name")}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{t("footer.tagline")}</p>

          <div className="mt-6 flex gap-3">
            <a
              aria-label={t("footer.social.whatsapp")}
              className="rounded-full border border-slate-200 p-3 text-slate-600 transition duration-300 hover:border-brand-300 hover:bg-gradient-to-br hover:from-brand-100 hover:to-accent-200 hover:text-brand-700 hover:shadow-lg hover:shadow-brand-900/10"
              href="https://wa.me/60179535676"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircleMore className="h-5 w-5" />
            </a>
            <span
              aria-label={t("footer.social.instagram")}
              className="rounded-full border border-dashed border-slate-200 p-3 text-slate-400"
              title={t("footer.social.comingSoon")}
            >
              <Instagram className="h-5 w-5" />
            </span>
            <span
              aria-label={t("footer.social.facebook")}
              className="rounded-full border border-dashed border-slate-200 p-3 text-slate-400"
              title={t("footer.social.comingSoon")}
            >
              <Facebook className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            {t("footer.quickLinks")}
          </h2>
          <div className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                className="block text-sm text-slate-600 transition hover:text-slate-950"
                href={link.href}
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            {t("footer.actions.title")}
          </h2>
          <div className="mt-5 space-y-3">
            {actionLinks.map((link) => (
              <a
                key={link.href}
                className="block text-sm text-slate-600 transition hover:text-slate-950"
                href={link.href}
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-500">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
