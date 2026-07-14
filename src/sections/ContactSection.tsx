import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/Button";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { SectionTitle } from "../components/ui/SectionTitle";

type ContactValues = {
  name: string;
  phone: string;
  childAge: string;
  message: string;
};

const initialValues: ContactValues = {
  name: "",
  phone: "",
  childAge: "",
  message: "",
};

const whatsappNumber = "601119815754";

export function ContactSection() {
  const { t } = useTranslation();
  const [values, setValues] = useState<ContactValues>(initialValues);

  const handleChange = (field: keyof ContactValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      "Assalamualaikum AL-FAHMU Learning Centre.",
      "Saya ingin bertanya tentang pendaftaran/program.",
      "",
      `${t("contact.form.name")}: ${values.name.trim()}`,
      `${t("contact.form.phone")}: ${values.phone.trim()}`,
      `${t("contact.form.childAge")}: ${values.childAge.trim()}`,
      `${t("contact.form.message")}: ${values.message.trim()}`,
    ].join("\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setValues(initialValues);
  };

  return (
    <section className="section section--surface" id="contact">
      <div className="container contact-section">
        <ScrollReveal className="contact-section__info">
          <SectionTitle
            align="left"
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
            description={t("contact.description")}
          />

          <div className="contact-list">
            <p>
              <Phone aria-hidden="true" />
              <span>
                <strong>{t("contact.phoneLabel")}</strong>
                {t("contact.phoneValue")}
              </span>
            </p>
            <p>
              <MapPin aria-hidden="true" />
              <span>
                <strong>{t("contact.addressLabel")}</strong>
                {t("contact.addressValue")}
              </span>
            </p>
            <p>
              <Mail aria-hidden="true" />
              <span>
                <strong>{t("contact.emailLabel")}</strong>
                {t("contact.emailValue")}
              </span>
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="contact-form-card" delay={0.08}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>{t("contact.form.name")}</span>
              <input
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder={t("contact.form.namePlaceholder")}
                required
                value={values.name}
              />
            </label>
            <label>
              <span>{t("contact.form.phone")}</span>
              <input
                onChange={(event) => handleChange("phone", event.target.value)}
                placeholder={t("contact.form.phonePlaceholder")}
                required
                value={values.phone}
              />
            </label>
            <label>
              <span>{t("contact.form.childAge")}</span>
              <input
                onChange={(event) => handleChange("childAge", event.target.value)}
                placeholder={t("contact.form.childAgePlaceholder")}
                required
                value={values.childAge}
              />
            </label>
            <label>
              <span>{t("contact.form.message")}</span>
              <textarea
                onChange={(event) => handleChange("message", event.target.value)}
                placeholder={t("contact.form.messagePlaceholder")}
                required
                rows={5}
                value={values.message}
              />
            </label>
            <Button type="submit">{t("contact.form.submit")}</Button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
