"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contactPage");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const nextErrors: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (name.length < 2) nextErrors.name = t("nameError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("emailError");
    if (message.length < 10) nextErrors.message = t("messageError");

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setStatus(response.ok ? "success" : "error");
      if (response.ok) form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card-base card-px-lg rounded-2xl">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="space-y-6">
        <Field label={t("name")} id="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            placeholder="Tu nombre"
            className="input-field w-full"
          />
        </Field>

        <Field label={t("email")} id="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@email.com"
            className="input-field w-full"
          />
        </Field>

        <Field label={t("message")} id="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            minLength={10}
            maxLength={1000}
            placeholder="Cuéntame sobre tu proyecto..."
            className="input-field w-full resize-none"
          />
        </Field>
      </div>

      <div className="mt-8 space-y-4">
        {status === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm font-medium text-emerald-800">{t("success")}</p>
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-medium text-red-800">{t("error")}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="btn-primary w-full justify-center gap-2 disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin flex-shrink-0" />
              <span>{t("sending")}</span>
            </>
          ) : (
            <>
              <Send size={16} className="flex-shrink-0" />
              <span>{t("send")}</span>
            </>
          )}
        </button>

        <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
          {t("privacy")}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--color-text-primary)]">
        {label}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}
