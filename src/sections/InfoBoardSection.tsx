import {
  BookOpenText,
  CalendarRange,
  CheckCircle2,
  MessagesSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { infoBoardCards } from "../data/infoBoardCards";

const iconMap: Record<string, LucideIcon> = {
  "book-open-text": BookOpenText,
  "calendar-range": CalendarRange,
  "messages-square": MessagesSquare,
};

export function InfoBoardSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24" id="info-board">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fffaf0_0%,#ffffff_42%,#f4f8ff_100%)]" />
      <div className="absolute left-0 top-12 -z-10 h-56 w-56 rounded-full bg-accent-200/45 blur-3xl" />
      <div className="absolute right-0 top-16 -z-10 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-white blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500">
                {t("infoBoard.eyebrow")}
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-[2.9rem] lg:leading-[1.08]">
                {t("infoBoard.title")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {t("infoBoard.description")}
              </p>
            </div>

            <div className="rounded-[2rem] border border-brand-100 bg-[linear-gradient(180deg,#1556d8_0%,#0d3ea3_58%,#0b2c69_100%)] p-6 text-white shadow-2xl shadow-brand-900/15">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/95 ring-1 ring-white/10">
                <Sparkles className="h-4 w-4 text-accent-300" />
                <span>{t("infoBoard.note")}</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
                    {t("infoBoard.footerStrip.responseLabel")}
                  </p>
                  <p className="mt-2 text-base font-bold leading-7">
                    {t("infoBoard.footerStrip.responseValue")}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
                    {t("infoBoard.footerStrip.modeLabel")}
                  </p>
                  <p className="mt-2 text-base font-bold leading-7">
                    {t("infoBoard.footerStrip.modeValue")}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
                    {t("infoBoard.footerStrip.locationLabel")}
                  </p>
                  <p className="mt-2 text-base font-bold leading-7">
                    {t("infoBoard.footerStrip.locationValue")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {infoBoardCards.map((card) => {
            const Icon = iconMap[card.icon];

            return (
              <ScrollReveal key={card.titleKey}>
                <article className="group h-full rounded-[2rem] border border-slate-200 bg-white p-7 text-slate-950 shadow-xl shadow-slate-900/6 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:bg-gradient-to-br hover:from-white hover:via-brand-50 hover:to-accent-50 hover:shadow-2xl hover:shadow-brand-900/12">
                  <div className="inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600 ring-1 ring-brand-100 transition duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-accent-300 group-hover:text-white group-hover:ring-brand-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black leading-tight">{t(card.titleKey)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{t(card.descriptionKey)}</p>

                  <ul className="mt-6 space-y-3">
                    {card.pointsKeys.map((pointKey) => (
                      <li className="flex items-start gap-3 text-sm leading-6 text-slate-700" key={pointKey}>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        <span>{t(pointKey)}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <div className="mt-8 grid gap-4 rounded-[2rem] border border-brand-100 bg-white p-5 text-slate-950 shadow-xl shadow-slate-900/6 md:grid-cols-3 md:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                {t("infoBoard.footerStrip.responseLabel")}
              </p>
              <p className="mt-2 text-base font-bold">{t("infoBoard.footerStrip.responseValue")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                {t("infoBoard.footerStrip.modeLabel")}
              </p>
              <p className="mt-2 text-base font-bold">{t("infoBoard.footerStrip.modeValue")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                {t("infoBoard.footerStrip.locationLabel")}
              </p>
              <p className="mt-2 text-base font-bold">{t("infoBoard.footerStrip.locationValue")}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
