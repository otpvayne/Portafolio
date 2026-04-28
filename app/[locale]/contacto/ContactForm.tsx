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
    <form onSubmit={handleSubmit} noValidate className="card-base p-6 sm:p-8">
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
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-md)] px-4 py-3.5 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-[var(--color-accent)] focus:bg-white"
          />
        </Field>

        <Field label={t("email")} id="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-md)] px-4 py-3.5 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-[var(--color-accent)] focus:bg-white"
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
            className="w-full resize-none rounded-[20px] border border-[var(--line)] bg-white/80 px-4 py-3.5 text-sm leading-7 text-[var(--text)] outline-none transition-all focus:border-[var(--accent)] focus:bg-white"
          />
        </Field>
      </div>

      <div className="mt-6 space-y-4">
        {status === "success" && <p className="text-sm text-emerald-700">{t("success")}</p>}
        {status === "error" && <p className="text-sm text-red-700">{t("error")}</p>}

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="btn-primary w-full"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send size={16} />
              {t("send")}
            </>
          )}
        </button>

        <p className="text-sm leading-7 text-[var(--color-text-secondary)]">{t("privacy")}</p>
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
