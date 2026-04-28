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
    <section id="experience" className="py-40 px-4 sm:px-6 relative">
      {/* Subtle separator top */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="w-full max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>

        <div className="relative pl-6 sm:pl-8">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-4 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent" />

          <div className="flex flex-col gap-10">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="relative"
              >
                {/* Timeline dot */}
                <span className="absolute -left-[25px] sm:-left-[29px] top-5 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)] ring-2 ring-[var(--accent)]/30 shrink-0" />

                <div className="glass rounded-2xl p-5 sm:p-6 card-glow hover:border-[var(--accent)]/40 transition-colors">
                  {/* Date */}
                  <span className="inline-block text-xs font-mono text-[var(--accent2)] bg-[var(--accent)]/10 px-2.5 py-0.5 rounded-full mb-3">
                    {item.date}
                  </span>

                  {/* Role + Company */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white leading-tight">{item.role}</h3>
                    <p className="text-sm text-[var(--accent)] font-semibold mt-0.5">{item.company}</p>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-[var(--text-muted)] leading-relaxed">
                        <span className="text-[var(--accent)] mt-1 shrink-0 text-xs">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-xs bg-[var(--bg-card2)] border border-[var(--border)] text-[var(--accent2)]"
                      >
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

      {/* Subtle separator bottom */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  );
}
