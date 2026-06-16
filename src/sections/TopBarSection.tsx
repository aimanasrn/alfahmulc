import { MapPin, Clock3, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TopBarSection() {
  const { t } = useTranslation();

  return (
    <div className="top-bar">
      <div className="container top-bar__inner">
        <p>
          <Phone aria-hidden="true" />
          <span>{t("topBar.phone")}</span>
        </p>
        <p>
          <MapPin aria-hidden="true" />
          <span>{t("topBar.location")}</span>
        </p>
        <p>
          <Clock3 aria-hidden="true" />
          <span>{t("topBar.hours")}</span>
        </p>
      </div>
    </div>
  );
}
