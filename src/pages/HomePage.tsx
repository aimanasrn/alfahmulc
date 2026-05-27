import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main>
      <section className="px-6 py-24">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.subtitle")}</p>
      </section>
    </main>
  );
}
