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
    <section id="about" className="px-4 py-28 sm:px-8 lg:px-20 lg:py-40">
      <div className="section-shell">
        <div className="section-divider mb-12" />

        <div className="space-y-16 lg:space-y-20">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-8"
          >
            <span className="eyebrow">{t("kicker")}</span>
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
                {t("title")}
              </h2>
              <p className="text-lg leading-relaxed text-[var(--text-muted)] max-w-2xl">
                {t("body")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="card-base p-5 sm:p-6">
                  <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Image & Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6 lg:gap-8 lg:grid-cols-2 items-start"
          >
            {/* Carousel */}
            <div className="card-base p-4 sm:p-6 rounded-2xl">
              <div className="relative w-full aspect-square sm:aspect-video rounded-xl overflow-hidden bg-[var(--surface-strong)]">
                {SLIDES.map((slide, index) => (
                  <div
                    key={slide.img}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === current ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={slide.img}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,32,51,0.85)] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                      <p className="text-sm font-semibold break-words">{slides[index]}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="mt-4 flex gap-2 justify-center">
                {SLIDES.map((slide, index) => (
                  <button
                    key={slide.img}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-8 bg-[var(--color-primary)]"
                        : "w-2 bg-[var(--color-surface-muted)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Focus Card */}
              <div className="card-base bg-[var(--color-primary)] p-5 sm:p-6 rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-white/90">
                  {t("focusTitle")}
                </p>
                <p className="mt-4 text-base sm:text-lg leading-relaxed break-words text-white">
                  {t("focusBody")}
                </p>
              </div>

              {/* Approach Card */}
              <div className="card-base p-5 sm:p-6 rounded-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                  {t("approachTitle")}
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] break-words">
                  {t("approachBody")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
