"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BriefcaseBusiness, ChartColumnIncreasing, Workflow } from "lucide-react";

type ExperienceItem = {
  date: string;
  role: string;
  company: string;
  bullets: string[];
  stack: string[];
};

const ICONS = [BriefcaseBusiness, ChartColumnIncreasing, Workflow];

export default function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExperienceItem[];

  return (
    <section id="experience" className="px-4 py-56 sm:px-8 lg:px-20">
      <div className="section-shell">
        <div className="section-divider mb-12" />

        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">{t("kicker")}</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">{t("intro")}</p>
        </div>

        <div className="relative pl-0 lg:pl-10">
          <div className="absolute bottom-0 left-3 top-10 hidden w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-surface-dark)] to-transparent lg:block" />

          <div className="grid gap-6">
            {items.map((item, index) => {
              const Icon = ICONS[index % ICONS.length];

              return (
                <motion.article
                  key={`${item.company}-${item.date}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative lg:pl-12"
                >
                  <span className="absolute left-0 top-9 hidden h-7 w-7 items-center justify-center rounded-full border border-[var(--color-surface-muted)] bg-white text-[var(--color-primary)] shadow-sm lg:inline-flex">
                    <Icon size={15} />
                  </span>

                  <div className="card-base p-6 sm:p-7">
                    <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                      <div className="space-y-4">
                        <span className="inline-flex rounded-full bg-[var(--color-primary)] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
                          {item.date}
                        </span>
                        <div>
                          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{item.role}</h3>
                          <p className="mt-2 text-base font-medium text-[var(--color-primary)]">{item.company}</p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <ul className="grid gap-3">
                          {item.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-3 rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-md)] px-4 py-4 text-sm leading-7 text-[var(--color-text-primary)]"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
                              <span className="break-words">{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {item.stack.map((tool) => (
                            <span
                              key={tool}
                              className="chip"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
