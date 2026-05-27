import { useTranslation } from "react-i18next";

export default function TeacherPortalPage() {
  const { t } = useTranslation();

  return <h1>{t("portal.teacher")}</h1>;
}
