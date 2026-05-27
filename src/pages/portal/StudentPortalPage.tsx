import { useTranslation } from "react-i18next";

export default function StudentPortalPage() {
  const { t } = useTranslation();

  return <h1>{t("portal.student")}</h1>;
}
