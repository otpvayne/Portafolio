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
      <div className="card-base p-4">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-lg)] py-3.5 pl-11 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-[var(--color-accent)] focus:bg-white"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-sm)] px-5 py-8 text-center text-sm text-[var(--color-text-secondary)]">
          {t("noResults")}
        </p>
      )}

      <div className="grid gap-4">
        {filtered.map((item, index) => {
          const isOpen = open === index;
          const num = String(index + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="card-base overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white">
                  {num}
                </span>
                <span className="flex-1 text-base font-semibold text-[var(--color-text-primary)]">{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} className="text-[var(--color-text-secondary)]" />
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
                    <p className="px-5 pb-5 pl-[4.6rem] text-sm leading-7 text-[var(--color-text-secondary)]">
                      {item.a}
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
