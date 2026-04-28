"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const FAQS_ES = [
  { q: "¿Cuánto cuesta un proyecto?",            a: "Depende del alcance, tecnología y plazos. Ofrezco presupuestos personalizados y gratuitos. Escríbeme y en 24h tienes una estimación clara." },
  { q: "¿Trabajas de forma remota?",             a: "Sí, 100% remoto. Trabajo con equipos en Colombia, Latinoamérica y Europa sin ningún problema." },
  { q: "¿Cuánto tiempo tarda un proyecto?",      a: "Un MVP sencillo puede estar listo en 2–4 semanas. Una plataforma completa toma entre 2 y 4 meses según complejidad." },
  { q: "¿Qué tecnologías usas?",                 a: "React, TypeScript, Node.js, Express, FastAPI, PostgreSQL, MongoDB y Docker, entre otras. Elijo el stack según las necesidades reales del proyecto." },
  { q: "¿Puedo contratarte solo para consultoría?", a: "Sí. Ofrezco sesiones de consultoría técnica para revisión de arquitectura, code review o asesoría en elección de stack." },
  { q: "¿Tienes experiencia con integraciones de pago?", a: "Sí. Integré la API de Credinbanco para pagos con datáfono, actualmente en producción en 18 sucursales." },
];

const FAQS_EN = [
  { q: "How much does a project cost?",          a: "It depends on scope, technology and deadlines. I offer free personalized quotes — reach out and I'll give you a clear estimate within 24h." },
  { q: "Do you work remotely?",                  a: "Yes, 100% remote. I work with teams in Colombia, Latin America and Europe without any issues." },
  { q: "How long does it take to build a project?", a: "A simple MVP can be ready in 2–4 weeks. A full platform takes 2–4 months depending on complexity." },
  { q: "What technologies do you use?",          a: "React, TypeScript, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Docker and more. I choose the stack based on the project's real needs." },
  { q: "Can I hire you just for consulting?",    a: "Yes. I offer technical consulting sessions for architecture review, code review or stack advice." },
  { q: "Do you have experience with payment integrations?", a: "Yes. I've integrated the Credinbanco API for card terminal payments, currently running in production across 18 branches." },
];

export default function FaqClient() {
  const t = useTranslations("faq");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const isEn =
    typeof document !== "undefined" && document.documentElement.lang === "en";
  const faqs = isEn ? FAQS_EN : FAQS_ES;

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all text-sm"
        />
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] py-12 text-sm">
          {t("noResults")}
        </p>
      )}

      {/* FAQ items */}
      <div className="space-y-3">
        {filtered.map((f, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isOpen = open === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-2xl overflow-hidden transition-all ${
                isOpen ? "border-[var(--accent)]/30" : "hover:border-[var(--border)]"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left group"
                aria-expanded={isOpen}
              >
                {/* Number badge */}
                <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[10px] font-bold text-[var(--accent2)] font-mono">
                  {num}
                </span>

                <span className="flex-1 font-semibold text-white text-sm leading-snug pr-2">
                  {f.q}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="shrink-0"
                >
                  <ChevronDown
                    size={16}
                    className={`transition-colors ${
                      isOpen ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                    }`}
                  />
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pl-16 text-sm text-[var(--text-muted)] leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
