"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contactPage");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    if (name.length < 2) errs.name = t("nameError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t("emailError");
    if (message.length < 10) errs.message = t("messageError");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass rounded-2xl p-6 md:p-8 flex flex-col gap-5"
    >
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <Field label={t("name")} id="name" error={errors.name}>
        <input
          id="name" name="name" type="text" required minLength={2} maxLength={100}
          placeholder=" "
          className="peer w-full bg-[var(--bg-card2)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </Field>

      <Field label={t("email")} id="email" error={errors.email}>
        <input
          id="email" name="email" type="email" required placeholder=" "
          className="peer w-full bg-[var(--bg-card2)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </Field>

      <Field label={t("message")} id="message" error={errors.message}>
        <textarea
          id="message" name="message" required minLength={10} maxLength={1000} rows={5} placeholder=" "
          className="peer w-full bg-[var(--bg-card2)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-white placeholder-transparent focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </Field>

      {status === "success" && (
        <p className="text-sm text-green-400 text-center">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400 text-center">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:bg-[var(--accent2)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><Loader2 size={16} className="animate-spin" /> {t("sending")}</>
        ) : (
          <><Send size={16} /> {t("send")}</>
        )}
      </button>

      <p className="text-xs text-[var(--text-muted)] text-center">{t("privacy")}</p>
    </form>
  );
}

function Field({ label, id, error, children }: {
  label: string; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-[var(--text-muted)]">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
