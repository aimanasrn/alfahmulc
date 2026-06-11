import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { testimonials } from "../data/testimonials";

const accentClassMap = {
  brand: {
    chip: "bg-brand-50 text-brand-700 ring-brand-100",
    glow: "from-brand-50 via-white to-white",
  },
  accent: {
    chip: "bg-accent-100 text-accent-500 ring-accent-100",
    glow: "from-cream-100 via-white to-white",
  },
  sky: {
    chip: "bg-sky-100 text-brand-700 ring-sky-100",
    glow: "from-sky-100 via-white to-white",
  },
} as const;

export function TestimonialsSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const activeTestimonial = testimonials[activeIndex];
  const activeAccent = accentClassMap[activeTestimonial.accent];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    if (isAutoPlayPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isAutoPlayPaused]);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24" id="testimonials">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0b2c69_0%,#1149bf_52%,#0b2c69_100%)]" />
      <div className="absolute left-0 top-16 -z-10 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute right-0 bottom-10 -z-10 h-72 w-72 rounded-full bg-accent-300/18 blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <SectionTitle
            align="center"
            description={t("testimonials.description")}
            eyebrow={t("testimonials.eyebrow")}
            title={t("testimonials.title")}
          />
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="mt-12 overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 transition duration-300 hover:border-brand-300 hover:bg-gradient-to-br hover:from-white hover:via-brand-50 hover:to-accent-100 hover:shadow-2xl hover:shadow-brand-900/15 sm:p-6"
            onFocusCapture={() => setIsAutoPlayPaused(true)}
            onBlurCapture={() => setIsAutoPlayPaused(false)}
            onMouseEnter={() => setIsAutoPlayPaused(true)}
            onMouseLeave={() => setIsAutoPlayPaused(false)}
          >
            <div className="lg:hidden">
              <AnimatePresence mode="wait">
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-[2rem] border border-slate-200 bg-gradient-to-br ${activeAccent.glow} p-5 shadow-lg shadow-slate-900/5`}
                  exit={{ opacity: 0, y: -20 }}
                  initial={{ opacity: 0, y: 20 }}
                  key={`${activeTestimonial.nameKey}-mobile`}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                        {t(activeTestimonial.timeKey)}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-slate-950">
                        {t(activeTestimonial.nameKey)}
                      </h3>
                    </div>
                    <div className={`inline-flex shrink-0 rounded-2xl p-3 ring-1 ${activeAccent.chip}`}>
                      <Quote className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-accent-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star className="h-4 w-4 fill-current" key={index} />
                    ))}
                  </div>

                  <p className="mt-5 text-base leading-8 text-slate-700">
                    "{t(activeTestimonial.quoteKey)}"
                  </p>

                  <div className="mt-6 rounded-[1.5rem] bg-[linear-gradient(180deg,#1556d8_0%,#0d3ea3_58%,#0b2c69_100%)] px-4 py-4 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">
                      Student / Parent
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/90">
                      {t(activeTestimonial.roleKey)}
                    </p>
                  </div>
                </motion.article>
              </AnimatePresence>

              <div className="mt-5 flex items-center justify-between gap-4">
                <button
                  aria-label={t("testimonials.previous")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 shadow-sm transition hover:border-accent-300 hover:bg-gradient-to-br hover:from-brand-100 hover:to-accent-100"
                  onClick={goToPrevious}
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {testimonials.map((testimonial, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        aria-label={t("testimonials.goTo", { number: index + 1 })}
                        aria-pressed={isActive}
                        className={`h-2.5 rounded-full transition ${
                          isActive ? "w-10 bg-accent-300" : "w-2.5 bg-slate-300 hover:bg-brand-300"
                        }`}
                        key={`${testimonial.nameKey}-mobile-dot`}
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      />
                    );
                  })}
                </div>

                <button
                  aria-label={t("testimonials.next")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 shadow-sm transition hover:border-accent-300 hover:bg-gradient-to-br hover:from-brand-100 hover:to-accent-100"
                  onClick={goToNext}
                  type="button"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="hidden gap-6 lg:grid lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] lg:items-stretch">
              <div className="rounded-[2rem] bg-[linear-gradient(180deg,#1556d8_0%,#0d3ea3_58%,#0b2c69_100%)] p-6 text-white sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-200">
                  {t("testimonials.eyebrow")}
                </p>
                <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                  {t("testimonials.title")}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  {t("testimonials.description")}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <button
                    aria-label={t("testimonials.previous")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-accent-300/60 hover:bg-gradient-to-br hover:from-brand-500/25 hover:to-accent-300/35"
                    onClick={goToPrevious}
                    type="button"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    aria-label={t("testimonials.next")}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-accent-300/60 hover:bg-gradient-to-br hover:from-brand-500/25 hover:to-accent-300/35"
                    onClick={goToNext}
                    type="button"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {testimonials.map((testimonial, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <button
                        aria-label={t("testimonials.goTo", { number: index + 1 })}
                        aria-pressed={isActive}
                        className={`h-2.5 rounded-full transition ${
                          isActive ? "w-10 bg-accent-300" : "w-2.5 bg-white/25 hover:bg-white/45"
                        }`}
                        key={testimonial.nameKey}
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      />
                    );
                  })}
                </div>
              </div>

              <div className="relative min-h-[24rem]">
                <AnimatePresence mode="wait">
                  <motion.article
                    animate={{ opacity: 1, x: 0 }}
                    className={`h-full rounded-[2rem] border border-slate-200 bg-gradient-to-br ${activeAccent.glow} p-7 shadow-lg shadow-slate-900/5 transition duration-300 hover:border-brand-300 hover:bg-gradient-to-br hover:from-brand-50 hover:via-white hover:to-accent-100 hover:shadow-2xl hover:shadow-brand-900/15 sm:p-8`}
                    exit={{ opacity: 0, x: -32 }}
                    initial={{ opacity: 0, x: 32 }}
                    key={activeTestimonial.nameKey}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`inline-flex rounded-2xl p-3 ring-1 transition duration-300 hover:bg-gradient-to-br hover:from-brand-500 hover:to-accent-300 hover:text-white ${activeAccent.chip}`}>
                          <Quote className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-500">
                            {t(activeTestimonial.timeKey)}
                          </p>
                          <p className="mt-1 text-lg font-bold text-slate-950 sm:text-xl">
                            {t(activeTestimonial.nameKey)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-accent-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star className="h-4 w-4 fill-current" key={index} />
                        ))}
                      </div>
                    </div>

                    <p className="mt-8 text-lg leading-9 text-slate-700 sm:text-[1.35rem]">
                      "{t(activeTestimonial.quoteKey)}"
                    </p>

                    <div className="mt-10 border-t border-slate-200/80 pt-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Student / Parent
                      </p>
                      <p className="mt-2 text-base text-slate-600 sm:text-lg">
                        {t(activeTestimonial.roleKey)}
                      </p>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
