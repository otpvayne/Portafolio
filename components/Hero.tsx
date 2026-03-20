"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const WORDS = ["SOFTWARE ENGINEER", "FULL STACK DEV", "FREELANCER", "STARTUP BUILDER"];

export default function Hero() {
  const t = useTranslations("hero");
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <section className="hero-bg relative min-h-screen flex items-center justify-center text-center px-6">
      <div className="absolute inset-0 bg-[#0a0a0f]/70" />
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-widest text-white mb-4">
          DIEGO MEDINA
        </h1>
        <h2 className="text-xl md:text-2xl font-mono text-[var(--accent2)] mb-8 h-8">
          {displayed}
          <span className="cursor text-[var(--accent)]">|</span>
        </h2>
        <a
          href="/assets/docs/CV_Diego_Medina_v2.pdf"
          download
          className="inline-block px-8 py-3 rounded-full border border-[var(--accent)] text-[var(--accent2)] font-semibold text-sm tracking-widest hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
        >
          {t("resume")}
        </a>
      </motion.div>
    </section>
  );
}
