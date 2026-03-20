"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

type Tool = { icon: string; name: string; level: number };
type Tabs = "mainstack" | "frontend" | "backend" | "devops";

const TOOLS: Record<Tabs, Tool[]> = {
  mainstack: [
    { icon: "devicon-html5-plain colored", name: "HTML5", level: 95 },
    { icon: "devicon-css3-plain colored", name: "CSS3", level: 90 },
    { icon: "devicon-javascript-plain colored", name: "JavaScript", level: 90 },
    { icon: "devicon-typescript-plain colored", name: "TypeScript", level: 80 },
    { icon: "devicon-react-original colored", name: "React", level: 75 },
    { icon: "devicon-nodejs-plain colored", name: "Node.js", level: 88 },
    { icon: "devicon-postgresql-plain colored", name: "PostgreSQL", level: 85 },
    { icon: "devicon-python-plain colored", name: "Python/Django", level: 70 },
  ],
  frontend: [
    { icon: "devicon-tailwindcss-plain colored", name: "Tailwind CSS", level: 90 },
    { icon: "devicon-nextjs-plain", name: "Next.js", level: 75 },
    { icon: "devicon-vitejs-plain colored", name: "Vite", level: 70 },
    { icon: "devicon-framermotion-original", name: "Framer Motion", level: 65 },
  ],
  backend: [
    { icon: "devicon-nodejs-plain colored", name: "Node.js", level: 88 },
    { icon: "devicon-express-original", name: "Express", level: 85 },
    { icon: "devicon-fastapi-plain colored", name: "FastAPI", level: 72 },
    { icon: "devicon-nestjs-plain colored", name: "NestJS", level: 55 },
  ],
  devops: [
    { icon: "devicon-git-plain colored", name: "Git", level: 90 },
    { icon: "devicon-github-original", name: "GitHub", level: 95 },
    { icon: "devicon-docker-plain colored", name: "Docker", level: 60 },
    { icon: "devicon-vercel-original", name: "Vercel", level: 85 },
    { icon: "devicon-linux-plain colored", name: "Linux CLI", level: 50 },
  ],
};

export default function Tools() {
  const t = useTranslations("tools");
  const [tab, setTab] = useState<Tabs>("mainstack");

  return (
    <section id="tools" className="py-32 px-6 bg-[var(--bg-card)]/40">
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>

        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {(["mainstack", "frontend", "backend", "devops"] as Tabs[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === k
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
              }`}
            >
              {t(`tabs.${k}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {TOOLS[tab].map((tool) => (
              <div key={tool.name} className="glass rounded-xl p-4 flex flex-col items-center gap-3 card-glow">
                <i className={`${tool.icon} text-4xl`} />
                <p className="text-sm font-semibold text-white">{tool.name}</p>
                <div className="w-full h-1.5 rounded-full bg-[var(--border)]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
