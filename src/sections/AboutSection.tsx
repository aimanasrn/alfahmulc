import {
  LayoutGrid,
  LineChart,
  MessagesSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { aboutFeatures } from "../data/aboutFeatures";
import { SectionTitle } from "../components/ui/SectionTitle";
import { ScrollReveal } from "../components/ui/ScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  "layout-grid": LayoutGrid,
  sparkles: Sparkles,
  "messages-square": MessagesSquare,
  "line-chart": LineChart,
};

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24" id="about">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-50 via-cream-50 to-white" />
      <div className="absolute left-0 top-12 -z-10 h-56 w-56 rounded-full bg-accent-200/35 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-64 w-64 rounded-full bg-brand-100/30 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionTitle
            align="center"
            description={t("about.description")}
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {aboutFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <ScrollReveal key={feature.titleKey}>
                <article className="group h-full rounded-[2rem] border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-gradient-to-br hover:from-brand-100 hover:via-white hover:to-accent-100 hover:shadow-2xl hover:shadow-brand-900/15">
                  <div className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600 ring-1 ring-brand-100 transition duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:ring-brand-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{t(feature.titleKey)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {t(feature.descriptionKey)}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
