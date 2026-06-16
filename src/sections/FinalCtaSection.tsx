import { useTranslation } from "react-i18next";
import { buttonVariants } from "../components/ui/Button";
import { cn } from "../utils/cn";

export function FinalCtaSection() {
  const { t } = useTranslation();

  return (
    <section className="section">
      <div className="container">
        <div className="final-cta">
          <h2>{t("finalCta.title")}</h2>
          <p>{t("finalCta.description")}</p>
          <div className="final-cta__actions">
            <a className={cn(buttonVariants("secondary"), "final-cta__button")} href="https://wa.me/60120000000">
              {t("finalCta.primaryCta")}
            </a>
            <a className={cn(buttonVariants("primary"), "final-cta__button")} href="#contact">
              {t("finalCta.secondaryCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
