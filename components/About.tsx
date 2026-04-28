"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const CHIPS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Python",
  "Docker",
  "UX systems",
];

const SLIDES = [
  { img: "/assets/images/me-1.webp", alt: "Diego Medina building interfaces" },
  { img: "/assets/images/me-2.webp", alt: "Diego Medina backend work" },
  { img: "/assets/images/me-3.webp", alt: "Diego Medina product thinking" },
  { img: "/assets/images/me-4.webp", alt: "Diego Medina engineering portrait" },
];

export default function About() {
  const t = useTranslations("about");
  const slides = t.raw("slides") as string[];
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((value) => (value + 1) % SLIDES.length), 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="about" className="px-4 py-56 sm:px-8 lg:px-20">
      <div className="section-shell">
        <div className="section-divider mb-12" />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-7"
          >
            <span className="eyebrow">{t("kicker")}</span>
            <div className="space-y-5">
              <h2 className="max-w-xl text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
                {t("title")}
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">{t("body")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="card-base p-5">
                  <p className="text-2xl font-extrabold text-[var(--color-primary)]">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{stat.label}</p>
                </div>
              ))}
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {CHIPS.map((chip) => (
                <li
                  key={chip}
                  className="chip"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.1 }}
            className="card-base overflow-hidden p-6 sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[400px] overflow-hidden rounded-[var(--radius-xl)]">
                {SLIDES.map((slide, index) => (
                  <div
                    key={slide.img}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === current ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image src={slide.img} alt={slide.alt} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,32,51,0.78)] via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-semibold text-white break-words overflow-hidden">{slides[index]}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="card-base bg-[var(--color-primary)] text-white p-6 sm:p-7">
                  <p className="text-label text-white">
                    {t("focusTitle")}
                  </p>
                  <p className="mt-4 text-lg leading-8">{t("focusBody")}</p>
                </div>

                <div className="card-base p-6 sm:p-7">
                  <p className="text-label">
                    {t("approachTitle")}
                  </p>
                  <p className="mt-4 text-base leading-7 text-[var(--color-text-secondary)]">{t("approachBody")}</p>
                </div>

                <div className="flex gap-3 mt-2">
                  {SLIDES.map((slide, index) => (
                    <button
                      key={slide.img}
                      aria-label={`Slide ${index + 1}`}
                      onClick={() => setCurrent(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === current ? "w-12 bg-[var(--accent)]" : "w-6 bg-[var(--line-strong)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
