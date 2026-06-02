import { ArrowRight, CheckCircle2, MessageCircleMore } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "../components/ui/Button";
import { cn } from "../utils/cn";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10"
      id="home"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-hero-gradient opacity-90" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], x: [0, 30, 0], y: [0, -18, 0] }}
        className="absolute left-[-6rem] top-20 -z-10 h-64 w-64 rounded-full bg-brand-200/45 blur-3xl"
        transition={{ duration: 14, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -26, 0], y: [0, 22, 0] }}
        className="absolute right-[-4rem] top-12 -z-10 h-72 w-72 rounded-full bg-accent-400/38 blur-3xl"
        transition={{ duration: 16, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center lg:gap-10">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur">
            <CheckCircle2 className="h-4 w-4 text-brand-500" />
            <span className="leading-5">{t("hero.badge")}</span>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-xl sm:leading-8">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              className={cn(
                buttonVariants("primary"),
                "gap-2 px-6 py-4 text-sm focus-visible:ring-offset-white sm:text-base",
              )}
              href="https://wa.me/60179535676"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircleMore className="h-5 w-5" />
              {t("hero.primaryCta")}
            </a>
            <a
              className={cn(
                buttonVariants("secondary"),
                "gap-2 px-6 py-4 text-sm focus-visible:ring-offset-white sm:text-base",
              )}
              href="#subjects"
            >
              {t("hero.secondaryCta")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["hero.highlights.structured", "hero.highlights.personal", "hero.highlights.progress"].map(
              (key) => (
                <div
                  key={key}
                  className="rounded-3xl border border-white/70 bg-white/75 px-5 py-4 shadow-lg shadow-slate-900/5 backdrop-blur"
                >
                  <p className="text-sm font-semibold text-slate-900">{t(`${key}.title`)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{t(`${key}.description`)}</p>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-6 rounded-[2rem] bg-brand-500/12 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-900/20 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,179,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,196,0,0.22),transparent_28%)]" />
            <div className="relative space-y-6 sm:space-y-8">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm uppercase tracking-[0.28em] text-brand-200">
                    {t("hero.panel.eyebrow")}
                  </p>
                  <h2 className="mt-2 text-xl font-bold leading-tight sm:text-2xl">{t("hero.panel.title")}</h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs sm:text-sm">
                  {t("hero.panel.tag")}
                </div>
              </div>

              <div className="grid gap-4">
                {["hero.panel.points.0", "hero.panel.points.1", "hero.panel.points.2"].map((key) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-brand-400/20 p-2 text-brand-100">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <p className="text-sm leading-6 text-slate-100">{t(key)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
                  {t("hero.panel.quoteLabel")}
                </p>
                <p className="mt-3 text-lg font-medium leading-8 text-white">
                  {t("hero.panel.quote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
