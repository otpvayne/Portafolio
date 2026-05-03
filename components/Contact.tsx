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
    <section id="contact" className="px-4 sm:px-8 lg:px-20" style={{ paddingTop: '40px', paddingBottom: '30px' }}>
      <div className="section-shell">
        <div className="section-divider mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-6">
            <span className="eyebrow">{t("kicker")}</span>
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
                {t("title")}
              </h2>
              <p className="text-lg leading-relaxed text-[var(--text-muted)]">
                {t("subtitle")}
              </p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: Process & Info */}
            <div className="space-y-6">
              {/* Response Info */}
              <div className="card-base bg-[var(--color-primary)] card-px-lg rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-900">
                  {t("responseLabel")}
                </p>
                <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-900">
                  {t("responseBody")}
                </p>
              </div>

              {/* Process List */}
              <ul className="space-y-3">
                {process.map((item) => (
                  <li
                    key={item}
                    className="card-base p-4 text-sm leading-relaxed text-[var(--text)] break-words rounded-xl"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Contact Cards */}
            <div className="space-y-4">
              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Card */}
                <div className="card-base p-5 sm:p-6 rounded-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white mb-4">
                    <Mail size={20} className="flex-shrink-0" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                    {t("email")}
                  </p>
                  <p className="mt-3 text-sm break-words text-[var(--text)]">
                    {EMAIL}
                  </p>
                  <button
                    onClick={copyEmail}
                    className="btn-secondary w-full mt-4 text-xs sm:text-sm gap-2 justify-center"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="flex-shrink-0" />
                        <span>{t("copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="flex-shrink-0" />
                        <span>{t("copyEmail")}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Card */}
                <div className="card-base p-5 sm:p-6 rounded-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white mb-4">
                    <MessageCircle size={20} className="flex-shrink-0" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                    WhatsApp
                  </p>
                  <p className="mt-3 text-sm break-words text-[var(--text)]">
                    +57 301 747 2421
                  </p>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=Hola%20Diego%2C%20vi%20tu%20portafolio`}
                    target="_blank"
                    rel="noopener"
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 btn-primary text-xs sm:text-sm"
                  >
                    <span>{t("whatsapp")}</span>
                    <MoveRight size={14} className="flex-shrink-0" />
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="card-base p-5 sm:p-6 rounded-xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  {t("basedIn")}
                </p>
                <div className="mt-4 flex items-center gap-3 text-[var(--text)]">
                  <MapPin size={18} className="text-[var(--color-accent)] flex-shrink-0" />
                  <span className="text-sm font-medium">{t("location")}</span>
                </div>
              </div>

              {/* Social & Form Links */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="mailto:generalboomsycol@gmail.com?subject=Proyecto"
                    className="inline-flex items-center justify-center gap-2 btn-secondary text-xs sm:text-sm"
                  >
                    <Mail size={16} className="flex-shrink-0" />
                    <span className="break-words">{t("emailCta")}</span>
                  </a>
                  <a
                    href={`${rootPath}/contacto`}
                    className="inline-flex items-center justify-center gap-2 btn-primary text-xs sm:text-sm whitespace-nowrap"
                  >
                    <span>{t("formCta")}</span>
                    <MoveRight size={16} className="flex-shrink-0" />
                  </a>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href="https://github.com/otpvayne"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex flex-1 items-center justify-center gap-2 btn-secondary text-xs sm:text-sm"
                  >
                    <Github size={16} className="flex-shrink-0" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/diego-medina-software/"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex flex-1 items-center justify-center gap-2 btn-secondary text-xs sm:text-sm"
                  >
                    <Linkedin size={16} className="flex-shrink-0" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
