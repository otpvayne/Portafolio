"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type ExperienceItem = {
  date: string;
  role: string;
  company: string;
  bullets: string[];
  stack: string[];
};

export default function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExperienceItem[];

  return (
    <section id="experience" className="py-32 px-6">
      <div className="w-full max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>

        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`md:w-[47%] ${i % 2 === 0 ? "md:self-start" : "md:self-end"}`}
              >
                {/* Dot */}
                <div className={`hidden md:block absolute w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)] top-6 ${i % 2 === 0 ? "left-[calc(50%-6px)]" : "left-[calc(50%-6px)]"}`} />

                <div className="glass rounded-2xl p-6 card-glow">
                  <span className="text-xs font-mono text-[var(--accent2)] mb-2 block">{item.date}</span>
                  <h3 className="text-lg font-bold text-white">{item.role}</h3>
                  <p className="text-sm text-[var(--accent)] font-semibold mb-4">{item.company}</p>
                  <ul className="space-y-2 mb-5">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm text-[var(--text-muted)]">
                        <span className="text-[var(--accent)] mt-1 shrink-0">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-xs bg-[var(--bg-card2)] border border-[var(--border)] text-[var(--accent2)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
