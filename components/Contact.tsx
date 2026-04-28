"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Copy, Check, Mail, MessageCircle, MapPin, Github, Linkedin } from "lucide-react";

const EMAIL = "generalboomsycol@gmail.com";
const WA_NUMBER = "573017472421";

export default function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in srgb, var(--accent) 12%, transparent), transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-[var(--text-muted)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          className="grid sm:grid-cols-3 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {/* Email card */}
          <div className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 card-glow hover:border-[var(--accent)]/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
              <Mail size={18} className="text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm text-white break-all">{EMAIL}</p>
            </div>
            <div className="flex gap-2 mt-auto w-full">
              <button
                onClick={copyEmail}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all"
              >
                {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                {copied ? t("copied") : t("copyEmail")}
              </button>
              <a
                href={`mailto:${EMAIL}?subject=Proyecto`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent2)] transition-colors"
              >
                <Mail size={12} /> {t("email")}
              </a>
            </div>
          </div>

          {/* WhatsApp card */}
          <div className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 card-glow hover:border-green-500/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <MessageCircle size={18} className="text-green-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">WhatsApp</p>
              <p className="text-sm text-white">+57 301 747 2421</p>
            </div>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola%20Diego%2C%20vi%20tu%20portafolio`}
              target="_blank"
              rel="noopener"
              className="mt-auto w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
            >
              <MessageCircle size={12} /> {t("whatsapp")}
            </a>
          </div>

          {/* Location + Socials card */}
          <div className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 card-glow hover:border-[var(--accent)]/40 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
              <MapPin size={18} className="text-[var(--accent)]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                {t("basedIn")}
              </p>
              <p className="text-sm text-white">{t("location")}</p>
            </div>
            <div className="mt-auto flex gap-3">
              <a
                href="https://github.com/otpvayne"
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-[var(--bg-card2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent2)] hover:border-[var(--accent)] transition-all"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/diego-medina-software/"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-[var(--bg-card2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent2)] hover:border-[var(--accent)] transition-all"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA link */}
        <motion.p
          className="text-center text-sm text-[var(--text-muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t("orEmail")}{" "}
          <a href="/contacto" className="text-[var(--accent2)] hover:underline font-semibold">
            /contacto
          </a>
        </motion.p>
      </div>
    </section>
  );
}
