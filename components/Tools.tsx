"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

type Tool = { icon: string; name: string; level: number };
type Tabs = "mainstack" | "frontend" | "backend" | "devops";

const TOOLS: Record<Tabs, Tool[]> = {
  mainstack: [
    { icon: "devicon-typescript-plain colored", name: "TypeScript", level: 86 },
    { icon: "devicon-react-original colored", name: "React", level: 82 },
    { icon: "devicon-nextjs-plain", name: "Next.js", level: 79 },
    { icon: "devicon-nodejs-plain colored", name: "Node.js", level: 85 },
    { icon: "devicon-postgresql-plain colored", name: "PostgreSQL", level: 84 },
    { icon: "devicon-python-plain colored", name: "Python", level: 72 },
  ],
  frontend: [
    { icon: "devicon-html5-plain colored", name: "HTML5", level: 95 },
    { icon: "devicon-css3-plain colored", name: "CSS3", level: 91 },
    { icon: "devicon-tailwindcss-plain colored", name: "Tailwind CSS", level: 90 },
    { icon: "devicon-vitejs-plain colored", name: "Vite", level: 74 },
    { icon: "devicon-framermotion-original", name: "Framer Motion", level: 70 },
  ],
  backend: [
    { icon: "devicon-express-original", name: "Express", level: 84 },
    { icon: "devicon-fastapi-plain colored", name: "FastAPI", level: 74 },
    { icon: "devicon-java-plain colored", name: "Java", level: 73 },
    { icon: "devicon-mysql-plain colored", name: "MySQL", level: 79 },
    { icon: "devicon-mongodb-plain colored", name: "MongoDB", level: 72 },
  ],
  devops: [
    { icon: "devicon-git-plain colored", name: "Git", level: 90 },
    { icon: "devicon-github-original", name: "GitHub", level: 94 },
    { icon: "devicon-docker-plain colored", name: "Docker", level: 64 },
    { icon: "devicon-vercel-original", name: "Vercel", level: 87 },
    { icon: "devicon-linux-plain colored", name: "Linux CLI", level: 58 },
  ],
};

export default function Tools() {
  const t = useTranslations("tools");
  const [tab, setTab] = useState<Tabs>("mainstack");
  const capabilities = t.raw("capabilities") as string[];

  return (
    <section id="tools" className="px-4 py-48 sm:px-8 lg:px-20">
      <div className="section-shell">
        <div className="section-divider mb-12" />

        <div className="mb-12 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="space-y-5">
            <span className="eyebrow">{t("kicker")}</span>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-8 text-[var(--text-muted)]">{t("intro")}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {capabilities.map((item) => (
              <div key={item} className="rounded-[24px] border border-[var(--border-light)] bg-white/85 px-4 py-4 text-sm leading-6 text-[var(--text)] transition-colors hover:border-[var(--border-medium)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {(["mainstack", "frontend", "backend", "devops"] as Tabs[]).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                tab === key
                  ? "bg-[var(--surface-ink)] text-white shadow-md"
                  : "border border-[var(--border-light)] bg-white/85 text-[var(--text)] hover:border-[var(--accent)] hover:bg-white"
              }`}
            >
              {t(`tabs.${key}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {TOOLS[tab].map((tool, index) => (
              <motion.article
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="glass card-glow rounded-[28px] p-5"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-white/90 shadow-sm">
                    <i className={`${tool.icon} text-3xl`} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[var(--text)]">{tool.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{t("confidenceLabel")}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-muted)]">{t("coverageLabel")}</span>
                    <span className="font-semibold text-[var(--surface-ink)]">{tool.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-strong)]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-soft)] to-[var(--accent-alt)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.04 }}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
