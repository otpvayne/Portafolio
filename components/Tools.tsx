"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type Tool = { icon: string; name: string; level: number };
type Tabs = "mainstack" | "frontend" | "backend" | "devops";

const TOOLS: Record<Tabs, Tool[]> = {
  mainstack: [
    { icon: "devicon-html5-plain colored",        name: "HTML5",         level: 95 },
    { icon: "devicon-css3-plain colored",         name: "CSS3",          level: 90 },
    { icon: "devicon-javascript-plain colored",   name: "JavaScript",    level: 90 },
    { icon: "devicon-typescript-plain colored",   name: "TypeScript",    level: 80 },
    { icon: "devicon-react-original colored",     name: "React",         level: 78 },
    { icon: "devicon-nodejs-plain colored",       name: "Node.js",       level: 88 },
    { icon: "devicon-postgresql-plain colored",   name: "PostgreSQL",    level: 85 },
    { icon: "devicon-python-plain colored",       name: "Python",        level: 72 },
  ],
  frontend: [
    { icon: "devicon-tailwindcss-plain colored",  name: "Tailwind CSS",  level: 90 },
    { icon: "devicon-nextjs-plain",               name: "Next.js",       level: 78 },
    { icon: "devicon-vitejs-plain colored",       name: "Vite",          level: 70 },
    { icon: "devicon-framermotion-original",      name: "Framer Motion", level: 68 },
  ],
  backend: [
    { icon: "devicon-nodejs-plain colored",       name: "Node.js",       level: 88 },
    { icon: "devicon-express-original",           name: "Express",       level: 85 },
    { icon: "devicon-fastapi-plain colored",      name: "FastAPI",       level: 74 },
    { icon: "devicon-nestjs-plain colored",       name: "NestJS",        level: 56 },
  ],
  devops: [
    { icon: "devicon-git-plain colored",          name: "Git",           level: 90 },
    { icon: "devicon-github-original",            name: "GitHub",        level: 95 },
    { icon: "devicon-docker-plain colored",       name: "Docker",        level: 62 },
    { icon: "devicon-vercel-original",            name: "Vercel",        level: 86 },
    { icon: "devicon-linux-plain colored",        name: "Linux CLI",     level: 52 },
  ],
};

export default function Tools() {
  const t = useTranslations("tools");
  const [tab, setTab] = useState<Tabs>("mainstack");

  return (
    <section id="tools" className="py-48 px-4 sm:px-8 lg:px-16 bg-[var(--bg-card)]/30 relative">
      {/* Subtle separator top */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="w-full max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>

        {/* Tab bar */}
        <div className="flex justify-center gap-3 flex-wrap mb-16">
          {(["mainstack", "frontend", "backend", "devops"] as Tabs[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === k
                  ? "bg-[var(--accent)] text-white shadow-[0_0_16px_var(--accent)]/30"
                  : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent2)]"
              }`}
            >
              {t(`tabs.${k}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {TOOLS[tab].map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-5 flex flex-col items-center gap-4 card-glow group"
              >
                <i className={`${tool.icon} text-5xl transition-transform duration-300 group-hover:scale-110`} />
                <div className="w-full text-center">
                  <p className="text-sm font-semibold text-white mb-1">{tool.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-2">{tool.level}%</p>
                  <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.05 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle separator bottom */}
      <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  );
}
