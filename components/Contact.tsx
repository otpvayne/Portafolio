"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Copy, Check, Mail, MessageCircle, MapPin, Github, Linkedin } from "lucide-react";

const EMAIL = "generalboomsycol@gmail.com";
const WA_NUMBER = "573001234567"; // Reemplaza con tu número real

export default function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-[var(--text-muted)] text-lg mb-10 max-w-xl mx-auto">{t("subtitle")}</p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--border)] text-sm font-semibold text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all"
            >
              {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
              {copied ? t("copied") : t("copyEmail")}
            </button>
            <a
              href={`mailto:${EMAIL}?subject=Project%20inquiry`}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent2)] transition-colors"
            >
              <Mail size={15} /> {t("email")}
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hola%20Diego%2C%20vi%20tu%20portafolio`}
              target="_blank" rel="noopener"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--border)] text-sm font-semibold text-[var(--text-muted)] hover:border-green-500 hover:text-green-400 transition-all"
            >
              <MessageCircle size={15} /> {t("whatsapp")}
            </a>
          </div>

          <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row justify-center gap-6 items-center">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Mail size={14} className="text-[var(--accent)]" />
              <a href={`mailto:${EMAIL}`} className="hover:text-[var(--accent2)] transition-colors">{EMAIL}</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <MapPin size={14} className="text-[var(--accent)]" />
              {t("location")}
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/otpvayne" target="_blank" rel="noopener" aria-label="GitHub" className="text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/diego-medina-software/" target="_blank" rel="noopener" aria-label="LinkedIn" className="text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
