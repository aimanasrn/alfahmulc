import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://alfahmulc.com";
const SITE_NAME = "AL-FAHMU Learning Centre";
const HOME_TITLE = `${SITE_NAME} | Pusat Pembelajaran di Seri Kembangan`;
const HOME_DESCRIPTION =
  "AL-FAHMU Learning Centre di Seri Kembangan, Selangor menawarkan kelas tuisyen akademik, Al-Quran, membaca, persediaan peperiksaan dan bimbingan kerja rumah untuk anak-anak.";
const PORTAL_DESCRIPTION =
  "Portal AL-FAHMU Learning Centre untuk pelajar, guru dan pentadbir.";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

export function SeoHead() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const isPortalRoute = location.pathname.startsWith("/portal");
    const language = i18n.resolvedLanguage === "en" ? "en-MY" : "ms-MY";
    const canonicalUrl = isPortalRoute
      ? `${SITE_URL}${location.pathname}`
      : `${SITE_URL}/`;
    const title = isPortalRoute
      ? `${SITE_NAME} Portal`
      : HOME_TITLE;
    const description = isPortalRoute ? PORTAL_DESCRIPTION : HOME_DESCRIPTION;
    const robots = isPortalRoute ? "noindex, nofollow" : "index, follow";

    document.documentElement.lang = language;
    document.title = title;

    upsertCanonical(canonicalUrl);
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:locale", language === "en-MY" ? "en_MY" : "ms_MY");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
  }, [i18n.resolvedLanguage, location.pathname]);

  return null;
}
