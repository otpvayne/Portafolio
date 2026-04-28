"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import ProjectModal from "@/components/ProjectModal";

type CaseStudy = {
  problem: string;
  solution: string;
  impact: string;
  gallery: string[];
};

type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  tags: string[];
  live?: string;
  repo?: string;
  image: string;
  caseStudy?: CaseStudy;
};

const FILTER_KEYS = ["all", "web", "pos", "fintech", "erp", "api", "python"] as const;

export default function Projects() {
  const t = useTranslations("projects");
  const projects = t.raw("items") as Project[];
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible =
    active === "all" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="py-40 px-4 sm:px-6 relative">
      {/* Subtle separator top */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="w-full max-w-7xl mx-auto">

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {FILTER_KEYS.map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              aria-pressed={active === k}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                active === k
                  ? "bg-[var(--accent)] text-white shadow-[0_0_14px_var(--accent)] shadow-[var(--accent)]/30"
                  : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent2)]"
              }`}
            >
              {t(`filters.${k}`)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => p.caseStudy && setSelected(p)}
                className={p.caseStudy ? "cursor-pointer" : ""}
              >
                <GlowCard className="h-full group" glowColor="purple">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl shrink-0">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/10 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <h3 className="text-base font-bold text-white leading-snug">{p.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{p.description}</p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2">
                      {p.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded text-[10px] font-semibold bg-[var(--bg-card2)] border border-[var(--border)] text-[var(--accent2)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5 pt-2">
                      {p.live && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all"
                        >
                          <ExternalLink size={13} /> {t("live")}
                        </a>
                      )}
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-auto text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case study modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* Subtle separator bottom */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  );
}
