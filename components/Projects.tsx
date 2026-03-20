"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  tags: string[];
  live?: string;
  repo?: string;
  image: string;
};

export default function Projects() {
  const t = useTranslations("projects");
  const projects = t.raw("items") as Project[];
  const [active, setActive] = useState("all");

  const filterKeys = ["all", "web", "pos", "fintech", "erp", "api"] as const;

  const visible = active === "all"
    ? projects
    : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="py-32 px-6 bg-[var(--bg-card)]/40">
      <div className="w-full max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <ul className="flex flex-wrap justify-center gap-2" role="tablist">
            {filterKeys.map((k) => (
              <li key={k}>
                <button
                  role="tab"
                  aria-selected={active === k}
                  onClick={() => setActive(k)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    active === k
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent2)]"
                  }`}
                >
                  {t(`filters.${k}`)}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden card-glow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">{p.description}</p>
                  <ul className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.map((s) => (
                      <li key={s} className="px-2 py-0.5 rounded text-xs bg-[var(--bg-card2)] border border-[var(--border)] text-[var(--accent2)]">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent2)] transition-colors">
                        <ExternalLink size={13} /> {t("live")}
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noopener" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent2)] hover:border-[var(--accent)] transition-colors">
                        <Github size={13} /> {t("repo")}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
