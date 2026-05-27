import { MessageCircleMore } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FloatingWhatsAppButton() {
  const { t } = useTranslation();

  return (
    <a
      aria-label={t("floatingWhatsApp.label")}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/30 transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      href="https://wa.me/60123456789"
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircleMore className="h-5 w-5" />
      <span>{t("floatingWhatsApp.text")}</span>
    </a>
  );
}
