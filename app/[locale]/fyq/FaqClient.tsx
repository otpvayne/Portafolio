"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const FAQS_ES = [
  {
    q: "Cuanto cuesta un proyecto?",
    a: "Depende del alcance, la complejidad y el tiempo esperado. Trabajo con estimaciones claras y propuestas por etapas para que la inversion tenga sentido.",
  },
  {
    q: "Trabajas de forma remota?",
    a: "Si. Trabajo de forma remota con equipos en Colombia y fuera de ella, manteniendo entregas, seguimiento y comunicacion constante.",
  },
  {
    q: "Cuanto tiempo tarda un proyecto?",
    a: "Un MVP sencillo puede estar listo en 2 a 4 semanas. Un sistema con mas flujos, integraciones o paneles administrativos suele requerir 2 a 4 meses.",
  },
  {
    q: "Que tecnologias usas?",
    a: "React, TypeScript, Next.js, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Docker y Java, segun el problema real que haya que resolver.",
  },
  {
    q: "Puedo contratarte solo para consultoria?",
    a: "Si. Tambien hago revisiones de arquitectura, auditorias UI, apoyo tecnico puntual y refinamiento de producto para equipos que ya estan construyendo.",
  },
  {
    q: "Has trabajado con integraciones de pago?",
    a: "Si. Integre la API de Credinbanco para pagos con datafono en un sistema POS operativo en 18 sucursales.",
  },
];

const FAQS_EN = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope, complexity and timeline. I work with clear estimates and phased proposals so the investment stays grounded in value.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. I work remotely with teams in Colombia and abroad, with clear communication, delivery checkpoints and steady follow-through.",
  },
  {
    q: "How long does a project take?",
    a: "A focused MVP can be ready in 2 to 4 weeks. A fuller platform with integrations, back-office tooling or custom workflows usually takes 2 to 4 months.",
  },
  {
    q: "What technologies do you use?",
    a: "React, TypeScript, Next.js, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Docker and Java, depending on the actual problem being solved.",
  },
  {
    q: "Can I hire you only for consulting?",
    a: "Yes. I also support architecture reviews, UI audits, technical decision making and focused product guidance for existing teams.",
  },
  {
    q: "Do you have payment integration experience?",
    a: "Yes. I integrated the Credinbanco API for card terminal payments inside a POS system currently used across 18 branches.",
  },
];

export default function FaqClient() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<number | null>(0);
  const faqs = locale === "en" ? FAQS_EN : FAQS_ES;

  const filtered = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="card-base p-4 rounded-xl">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] flex-shrink-0" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="input-field w-full pl-11"
          />
        </div>
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="card-base p-8 sm:p-12 rounded-xl text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            {t("noResults")}
          </p>
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-3">
        {filtered.map((item, index) => {
          const isOpen = open === index;
          const num = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="card-base rounded-xl overflow-visible"
            >
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center gap-4 p-5 sm:p-6 text-left hover:bg-[var(--color-surface-light)] transition-colors"
                aria-expanded={isOpen}
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                  {num}
                </span>
                <span className="flex-1 text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-[var(--color-text-secondary)]" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-[var(--color-surface-muted)]">
                      <p className="ml-14 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
                        {item.a}
                      </p>
                    </div>
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
