"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const CelestialSphere = dynamic(
  () => import("@/components/ui/celestial-sphere").then((m) => m.CelestialSphere),
  { ssr: false }
);

const WORDS = ["SOFTWARE ENGINEER", "FULL STACK DEV", "BACKEND DEV", "PROBLEM SOLVER"];

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
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* WebGL nebula background */}
      <div className="absolute inset-0 z-0">
        <CelestialSphere
          hue={249}
          speed={0.28}
          zoom={1.4}
          particleSize={2.8}
          className="w-full h-full"
        />
      </div>

      {/* Dark overlay so content stays readable */}
      <div className="absolute inset-0 z-[1] bg-[var(--bg)]/65" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, var(--bg) 100%)" }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-widest text-white"
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.15em" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          DIEGO MEDINA
        </motion.h1>

        <div className="h-8 flex items-center">
          <span className="text-lg sm:text-xl md:text-2xl font-mono text-[var(--accent2)]">
            {displayed}
          </span>
          <span className="cursor text-[var(--accent)] ml-0.5">|</span>
        </div>

        <motion.a
          href="/assets/docs/CV_Diego_Medina_v2.pdf"
          download
          className="mt-2 inline-flex items-center px-8 py-3 rounded-full border border-[var(--accent)]/60 text-[var(--accent2)] font-semibold text-sm tracking-widest hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {t("resume")}
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </motion.div>
    </section>
  );
}
