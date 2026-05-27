import { ArrowLeft, CalendarDays, ClipboardList, FileBarChart2, GraduationCap, LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function StudentPortalPage() {
  const { t } = useTranslation();
  const capabilities = [
    { icon: CalendarDays, key: "portal.capabilities.schedule" },
    { icon: ClipboardList, key: "portal.capabilities.assignments" },
    { icon: FileBarChart2, key: "portal.capabilities.reports" },
    { icon: LayoutDashboard, key: "portal.capabilities.attendance" },
  ];

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex rounded-full border border-brand-300/20 bg-brand-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-100">
            Future portal
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t("portal.student")}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            {t("portal.studentDescription")}
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-brand-100">
          <GraduationCap className="h-8 w-8" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {capabilities.map((item) => {
          const Icon = item.icon;
          return (
            <article
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10"
              key={item.key}
            >
              <div className="inline-flex rounded-2xl bg-brand-300/10 p-3 text-brand-100">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{t(item.key)}</p>
            </article>
          );
        })}
      </div>

      <Link
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        to="/"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("portal.backToHome")}
      </Link>
    </section>
  );
}
