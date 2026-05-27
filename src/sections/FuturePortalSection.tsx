import {
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { portalCards } from "../data/portalCards";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { buttonVariants } from "../components/ui/Button";

const iconMap: Record<string, LucideIcon> = {
  "graduation-cap": GraduationCap,
  "briefcase-business": BriefcaseBusiness,
  "shield-check": ShieldCheck,
};

export function FuturePortalSection() {
  const { t } = useTranslation();

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24" id="future-portal">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-slate-900/20 sm:px-10 sm:py-16">
        <ScrollReveal>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-200">
              {t("futurePortal.eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("futurePortal.title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              {t("futurePortal.description")}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
          <Sparkles className="h-4 w-4 text-accent-300" />
          <span>{t("futurePortal.note")}</span>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portalCards.map((card) => {
            const Icon = iconMap[card.icon];

            return (
              <ScrollReveal key={card.titleKey}>
                <article className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
                  <div className="inline-flex rounded-2xl bg-white/10 p-3 text-brand-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-white">{t(card.titleKey)}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">
                    {t(card.descriptionKey)}
                  </p>
                  <Link
                    className={buttonVariants("ghost", "mt-6 self-start bg-white/10 text-white hover:bg-white/15")}
                    to={card.href}
                  >
                    {t("futurePortal.cardCta")}
                  </Link>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
