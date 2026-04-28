"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
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
  const featured = projects.slice(0, 2);
  const [active, setActive] = useState<string>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = active === "all" ? projects : projects.filter((project) => project.tags.includes(active));

  return (
    <section id="projects" className="px-4 py-48 sm:px-8 lg:px-20">
      <div className="section-shell">
        <div className="section-divider mb-12" />

        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <span className="eyebrow">{t("kicker")}</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-8 text-[var(--text-muted)]">{t("intro")}</p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/85 px-5 py-4 text-sm text-[var(--text-muted)] shadow-sm backdrop-blur-sm">
            <span className="font-semibold text-[var(--text)]">{t("featuredLabel")}</span> {t("featuredBody")}
          </div>
        </div>

        <div className="mb-10 grid gap-5 lg:grid-cols-2">
          {featured.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setSelected(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="panel group overflow-hidden rounded-[32px] text-left"
            >
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[260px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,32,51,0.76)] via-transparent to-transparent" />
                </div>
                <div className="flex flex-col gap-5 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
                      {t("featuredBadge")}
                    </p>
                    <ArrowUpRight size={18} className="text-[var(--text-muted)]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-[var(--text)]">{project.title}</h3>
                    <p className="text-sm leading-7 text-[var(--text-muted)]">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line)] bg-white/85 px-3 py-1.5 text-xs font-medium text-[var(--text)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              aria-pressed={active === key}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active === key
                  ? "bg-[var(--surface-ink)] text-white"
                  : "border border-[var(--line)] bg-white/72 text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
              }`}
            >
              {t(`filters.${key}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.28, delay: index * 0.03 }}
              >
                <GlowCard className="h-full overflow-hidden rounded-[28px]">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,32,51,0.84)] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 1).map((tag) => (
                        <span
                          key={`${project.id}-${tag}`}
                          className="rounded-full bg-white/88 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--surface-ink)]"
                        >
                          {t(`filters.${tag}`)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex h-full flex-col gap-5 p-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">{project.title}</h3>
                      <p className="text-sm leading-7 text-[var(--text-muted)]">{project.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--line)] bg-white/85 px-3 py-1.5 text-xs font-medium text-[var(--text)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-3 pt-2">
                      {project.caseStudy && (
                        <button
                          type="button"
                          onClick={() => setSelected(project)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-strong)] transition-colors hover:text-[var(--accent)]"
                        >
                          {t("openCaseStudy")}
                          <ArrowUpRight size={15} />
                        </button>
                      )}
                      <div className="ml-auto flex items-center gap-2">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/80 text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--text)]"
                            aria-label={t("live")}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/80 text-[var(--text-muted)] transition-all hover:border-[var(--accent)] hover:text-[var(--text)]"
                            aria-label={t("repo")}
                          >
                            <Github size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
