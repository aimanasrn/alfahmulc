import { Facebook, Instagram, MessageCircleMore } from "lucide-react";
import { useTranslation } from "react-i18next";

const quickLinks = [
  { key: "nav.home", href: "#home" },
  { key: "nav.about", href: "#about" },
  { key: "nav.subjects", href: "#subjects" },
  { key: "nav.futurePortal", href: "#future-portal" },
];

const portalLinks = [
  { key: "portal.student", href: "/portal/student" },
  { key: "portal.teacher", href: "/portal/teacher" },
  { key: "portal.admin", href: "/portal/admin" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6" id="contact">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.8fr))]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
            {t("brand.name")}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{t("footer.tagline")}</p>

          <div className="mt-6 flex gap-3">
            <a
              aria-label={t("footer.social.whatsapp")}
              className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-brand-200 hover:text-brand-600"
              href="https://wa.me/60123456789"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircleMore className="h-5 w-5" />
            </a>
            <a
              aria-label={t("footer.social.instagram")}
              className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-brand-200 hover:text-brand-600"
              href="/"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              aria-label={t("footer.social.facebook")}
              className="rounded-full border border-slate-200 p-3 text-slate-600 transition hover:border-brand-200 hover:text-brand-600"
              href="/"
            >
              <Facebook className="h-5 w-5" />
            </a>
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
            {t("footer.portals")}
          </h2>
          <div className="mt-5 space-y-3">
            {portalLinks.map((link) => (
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
