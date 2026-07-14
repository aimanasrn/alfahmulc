import { MessageCircleMore } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FloatingWhatsAppButton() {
  const { t } = useTranslation();

  return (
    <a
      aria-label={t("floatingWhatsApp.label")}
      className="floating-whatsapp"
      href="https://wa.me/601119815754"
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircleMore className="h-5 w-5" />
      <span>{t("floatingWhatsApp.text")}</span>
    </a>
  );
}
