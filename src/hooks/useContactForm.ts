import { useState } from "react";
import type { FormEvent } from "react";
import type { ContactPayload } from "../utils/contact";
import { submitContactForm } from "../utils/contact";

type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

type ValidationMessages = {
  requiredName: string;
  requiredPhone: string;
  requiredEmail: string;
  requiredMessage: string;
  invalidEmail: string;
};

type UseContactFormOptions = {
  messages?: ValidationMessages;
};

const defaultMessages: ValidationMessages = {
  requiredName: "Nama diperlukan",
  requiredPhone: "Nombor telefon diperlukan",
  requiredEmail: "Emel diperlukan",
  requiredMessage: "Mesej diperlukan",
  invalidEmail: "Masukkan emel yang sah",
};

const initialValues: ContactPayload = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const messages = options.messages ?? defaultMessages;
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  function setFieldValue(field: keyof ContactPayload, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitState("idle");
  }

  function validate(currentValues: ContactPayload) {
    const nextErrors: ContactErrors = {};

    if (!currentValues.name.trim()) nextErrors.name = messages.requiredName;
    if (!currentValues.phone.trim()) nextErrors.phone = messages.requiredPhone;
    if (!currentValues.email.trim()) nextErrors.email = messages.requiredEmail;
    if (!currentValues.message.trim()) nextErrors.message = messages.requiredMessage;
    if (currentValues.email.trim() && !isValidEmail(currentValues.email.trim())) {
      nextErrors.email = messages.invalidEmail;
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitState("idle");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      const result = await submitContactForm(values);
      if (!result.ok) {
        setSubmitState("error");
        return;
      }

      setValues(initialValues);
      setErrors({});
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    submitState,
    setFieldValue,
    handleSubmit,
  };
}
