import { useTranslation } from "react-i18next";

export default function AdminPortalPage() {
  const { t } = useTranslation();

  return <h1>{t("portal.admin")}</h1>;
}
