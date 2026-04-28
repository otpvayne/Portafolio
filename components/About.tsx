"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const CHIPS = ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "CI/CD"];
const SLIDES = [
  { img: "/assets/images/me-1.webp", alt: "Diego Medina Frontend" },
  { img: "/assets/images/me-2.webp", alt: "Diego Medina Backend" },
  { img: "/assets/images/me-3.webp", alt: "Diego Medina DevOps" },
  { img: "/assets/images/me-4.webp", alt: "Diego Medina Data" },
];

export default function About() {
  const t = useTranslations("about");
  const slides = t.raw("slides") as string[];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="py-48 px-4 sm:px-8 lg:px-16 relative">
      {/* Subtle separator top */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

      <div className="w-full max-w-6xl mx-auto">

        {/* Título centrado */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>

        {/* Grid centrado: texto izq, foto der */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Columna texto — centrada dentro de su celda */}
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--text-muted)] leading-relaxed mb-8 max-w-md">
              {t("body")}
            </p>
            <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
              {CHIPS.map((c) => (
                <li
                  key={c}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-card2)] border border-[var(--border)] text-[var(--accent2)]"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna foto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-80 md:h-96"
          >
            {SLIDES.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] card-glow">
                  <Image src={s.img} alt={s.alt} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 px-4 py-3">
                    <p className="text-sm text-[var(--accent2)] font-semibold">{slides[i]}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[var(--accent)] w-6" : "bg-[var(--border)]"}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle separator bottom */}
      <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  );
}
