"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const FAQS_ES = [
  { q: "¿Cuánto cuesta un proyecto?", a: "Depende del alcance, tecnología y plazos. Ofrezco presupuestos personalizados gratuitos. Escríbeme y en 24h te doy una estimación." },
  { q: "¿Trabajas de forma remota?", a: "Sí, 100% remoto. Trabajo con equipos en Colombia, Latinoamérica y Estados Unidos sin problema." },
  { q: "¿Cuánto tiempo toma desarrollar una app?", a: "Un MVP sencillo puede estar listo en 2–4 semanas. Una plataforma completa puede tomar 2–4 meses según la complejidad." },
  { q: "¿Qué tecnologías usas?", a: "React, TypeScript, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Docker y más. Elijo el stack según las necesidades reales del proyecto." },
  { q: "¿Puedo contratar solo consultoría?", a: "Sí. Ofrezco sesiones de consultoría técnica para revisión de arquitectura, code review o asesoría en stack." },
  { q: "¿Tienes experiencia con integraciones de pagos?", a: "Sí. He integrado la API de Credinbanco para pagos con datáfono en producción en 18 sucursales." },
];

const FAQS_EN = [
  { q: "How much does a project cost?", a: "It depends on scope, technology and deadlines. I offer free custom quotes. Reach out and I'll give you an estimate within 24h." },
  { q: "Do you work remotely?", a: "Yes, 100% remote. I work with teams in Colombia, Latin America and the United States without any issues." },
  { q: "How long does it take to build an app?", a: "A simple MVP can be ready in 2–4 weeks. A full platform can take 2–4 months depending on complexity." },
  { q: "What technologies do you use?", a: "React, TypeScript, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Docker and more. I choose the stack based on the project's real needs." },
  { q: "Can I hire you just for consulting?", a: "Yes. I offer technical consulting sessions for architecture review, code review or stack advice." },
  { q: "Do you have experience with payment integrations?", a: "Yes. I've integrated the Credinbanco API for card terminal payments currently running in production across 18 branches." },
];

export default function FaqClient() {
  const t = useTranslations("faq");
  // Detect locale from document lang attribute
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  // Simple locale detection via html lang
  const isEn = typeof document !== "undefined" && document.documentElement.lang === "en";
  const faqs = isEn ? FAQS_EN : FAQS_ES;

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] py-8">{t("noResults")}</p>
      )}

      <div className="space-y-3">
        {filtered.map((f, i) => (
          <div key={i} className="glass rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-semibold text-white pr-4">{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={18} className="text-[var(--accent2)] shrink-0" />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
}
