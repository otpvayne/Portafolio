"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail, MapPin, MessageCircle, MoveRight } from "lucide-react";

const EMAIL = "generalboomsycol@gmail.com";
const WA_NUMBER = "573017472421";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const rootPath = `/${locale}`;
  const [copied, setCopied] = useState(false);
  const process = t.raw("process") as string[];

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="px-4 py-64 sm:px-8 lg:px-20">
      <div className="section-shell">
        <div className="section-divider mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="card-base p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <span className="eyebrow">{t("kicker")}</span>
              <div className="space-y-4">
                <h2 className="max-w-xl text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
                  {t("title")}
                </h2>
                <p className="max-w-xl text-lg leading-8 text-[var(--text-muted)]">{t("subtitle")}</p>
              </div>

              <div className="rounded-[var(--radius-xl)] bg-[var(--color-primary)] p-6 text-white">
                <p className="text-label text-white">{t("responseLabel")}</p>
                <p className="mt-4 text-lg leading-8">{t("responseBody")}</p>
              </div>

              <ul className="grid gap-3">
                {process.map((item) => (
                  <li
                    key={item}
                    className="rounded-[22px] border border-[var(--line)] bg-white/85 px-4 py-4 text-sm leading-7 text-[var(--text)] break-words"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="card-base p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-primary)] text-white">
                    <Mail size={18} />
                  </div>
                  <p className="text-label">{t("email")}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">{EMAIL}</p>
                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={copyEmail}
                      className="btn-secondary flex-1 text-sm"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      {copied ? t("copied") : t("copyEmail")}
                    </button>
                  </div>
                </div>

                <div className="card-base p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] text-white">
                    <MessageCircle size={18} />
                  </div>
                  <p className="text-label text-[var(--color-accent)]">WhatsApp</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text)]">+57 301 747 2421</p>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=Hola%20Diego%2C%20vi%20tu%20portafolio`}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#128c7e] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0f766e]"
                  >
                    {t("whatsapp")}
                    <MoveRight size={15} />
                  </a>
                </div>
              </div>

              <div className="glass rounded-[28px] p-5">
                <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr] sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
                      {t("basedIn")}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[var(--text)]">
                      <MapPin size={17} className="text-[var(--accent)]" />
                      <span className="text-sm font-medium">{t("location")}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:generalboomsycol@gmail.com?subject=Proyecto"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/85 px-4 py-3 text-sm font-semibold text-[var(--text)] transition-all hover:border-[var(--accent)]"
                    >
                      <Mail size={15} />
                      {t("emailCta")}
                    </a>
                    <a
                      href={`${rootPath}/contacto`}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-ink)] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--accent-strong)]"
                    >
                      {t("formCta")}
                      <MoveRight size={15} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/otpvayne"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/78 px-4 py-3 text-sm font-semibold text-[var(--text)] transition-all hover:border-[var(--accent)]"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/diego-medina-software/"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/78 px-4 py-3 text-sm font-semibold text-[var(--text)] transition-all hover:border-[var(--accent)]"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
