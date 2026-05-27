import { Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { FormField } from "../components/ui/FormField";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";
import { TextAreaField } from "../components/ui/TextAreaField";
import { useContactForm } from "../hooks/useContactForm";

const contactItems = [
  { icon: Phone, labelKey: "contact.phoneLabel", valueKey: "contact.phoneValue", href: "tel:+60179535676" },
  { icon: Mail, labelKey: "contact.emailLabel", valueKey: "contact.emailValue", href: "mailto:aimanasrn@gmail.com" },
  { icon: MapPin, labelKey: "contact.addressLabel", valueKey: "contact.addressValue", href: undefined },
] as const;

export function ContactSection() {
  const { t } = useTranslation();
  const form = useContactForm({
    messages: {
      requiredName: t("contact.form.errors.requiredName"),
      requiredPhone: t("contact.form.errors.requiredPhone"),
      requiredEmail: t("contact.form.errors.requiredEmail"),
      requiredMessage: t("contact.form.errors.requiredMessage"),
      invalidEmail: t("contact.form.errors.invalidEmail"),
    },
  });

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24" id="contact">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <ScrollReveal>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
            <SectionTitle
              description={t("contact.description")}
              eyebrow={t("contact.eyebrow")}
              title={t("contact.title")}
            />

            <div className="mt-8 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const value = t(item.valueKey);

                return (
                  <div
                    className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 px-4 py-4"
                    key={item.labelKey}
                  >
                    <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t(item.labelKey)}</p>
                      {item.href ? (
                        <a
                          className="mt-1 block rounded-md text-sm leading-6 text-slate-600 outline-none transition hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                          href={item.href}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm leading-6 text-slate-600">{value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-500/20 p-3 text-brand-200">
                  <MessageCircleMore className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-200">
                    WhatsApp
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-200">{t("contact.whatsAppPrompt")}</p>
                </div>
              </div>
              <a
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                href="https://wa.me/60179535676"
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircleMore className="h-4 w-4" />
                {t("contact.whatsAppCta")}
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
            <form className="space-y-5" noValidate onSubmit={form.handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  autoComplete="name"
                  error={form.errors.name}
                  id="contact-name"
                  label={t("contact.form.name")}
                  name="name"
                  onChange={(value) => form.setFieldValue("name", value)}
                  placeholder={t("contact.form.namePlaceholder")}
                  value={form.values.name}
                />
                <FormField
                  autoComplete="tel"
                  error={form.errors.phone}
                  id="contact-phone"
                  label={t("contact.form.phone")}
                  name="phone"
                  onChange={(value) => form.setFieldValue("phone", value)}
                  placeholder={t("contact.form.phonePlaceholder")}
                  type="tel"
                  value={form.values.phone}
                />
              </div>

              <FormField
                autoComplete="email"
                error={form.errors.email}
                id="contact-email"
                label={t("contact.form.email")}
                name="email"
                onChange={(value) => form.setFieldValue("email", value)}
                placeholder={t("contact.form.emailPlaceholder")}
                type="email"
                value={form.values.email}
              />

              <TextAreaField
                error={form.errors.message}
                id="contact-message"
                label={t("contact.form.message")}
                name="message"
                onChange={(value) => form.setFieldValue("message", value)}
                placeholder={t("contact.form.messagePlaceholder")}
                value={form.values.message}
              />

              {form.submitState === "success" ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {t("contact.form.success")}
                </p>
              ) : null}

              {form.submitState === "error" ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {t("contact.form.failure")}
                </p>
              ) : null}

              <Button className="w-full justify-center py-4 text-base" type="submit">
                {form.isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
