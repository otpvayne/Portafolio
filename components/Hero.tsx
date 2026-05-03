"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight, Download, Sparkles } from "lucide-react";

const CelestialSphere = dynamic(
  () => import("@/components/ui/celestial-sphere").then((module) => module.CelestialSphere),
  { ssr: false }
);

const WORDS = [
  "PRODUCT THINKING",
  "FULL STACK BUILDING",
  "OPERATIONS SOFTWARE",
  "UX THAT FEELS SHARP",
];

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const rootPath = `/${locale}`;
  const metrics = t.raw("metrics") as Array<{ value: string; label: string }>;
  const highlights = t.raw("highlights") as string[];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 58);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1700);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 32);
    } else {
      setDeleting(false);
      setWordIndex((currentIndex) => (currentIndex + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [deleting, displayed, wordIndex]);

  return (
    <section className="relative overflow-hidden px-4 py-28 sm:px-8 lg:px-20 lg:py-40">
      <div className="section-shell">
        <div className="grid gap-normal lg:grid-cols-2 items-center">
          {/* Left Column: Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <span className="eyebrow">{t("eyebrow")}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.08 }}
              className="space-y-6"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Diego Medina
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
                {t("headline")}
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-[var(--text-muted)]">
                {t("subheadline")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.16 }}
              className="mt-8 flex items-center gap-3 text-sm sm:text-base font-semibold uppercase tracking-wider text-[var(--accent-strong)]"
            >
              <Sparkles size={18} className="flex-shrink-0" />
              <span className="whitespace-nowrap">{displayed}</span>
              <span className="cursor text-[var(--accent)]">|</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.24 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 flex-wrap"
            >
              <a
                href={`${rootPath}/#projects`}
                className="btn-primary inline-flex gap-2 whitespace-nowrap"
              >
                {t("primaryCta")}
                <ArrowRight size={16} className="flex-shrink-0" />
              </a>
              <a
                href="/assets/docs/CV_Diego_Medina_v2.pdf"
                download
                className="btn-secondary inline-flex gap-2 whitespace-nowrap"
              >
                <Download size={16} className="flex-shrink-0" />
                {t("resume")}
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.82, delay: 0.32 }}
              className="mt-10 flex flex-col sm:grid sm:grid-cols-2 gap-3 text-sm"
            >
              {highlights.map((item) => (
                <li
                  key={item}
                  className="chip-accent px-4 py-3 flex items-center gap-3"
                >
                  <span className="h-2 w-2 rounded-full bg-current flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right Column: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.88, delay: 0.18 }}
            className="relative z-10"
          >
            <div className="panel soft-ring relative rounded-3xl card-px-md bg-white/95 backdrop-blur">
              <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-[var(--accent-soft)]/10 blur-3xl" />
              <div className="absolute inset-0 opacity-50 rounded-3xl overflow-hidden">
                <CelestialSphere
                  hue={34}
                  speed={0.22}
                  zoom={1.15}
                  particleSize={2.4}
                  className="w-full h-full"
                />
              </div>

              <div className="relative z-10 space-y-4">
                {/* Photo Card */}
                <div className="glass rounded-2xl card-px-sm">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[var(--surface-strong)]">
                    <Image
                      src="/assets/images/me-4.webp"
                      alt="Diego Medina portrait"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,32,51,0.9)] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white text-center">
                      <p className="text-sm font-semibold">{t("photoTitle")}</p>
                      <p className="text-xs text-white/70 mt-1">{t("photoBody")}</p>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((item) => (
                    <div key={item.label} className="glass rounded-xl p-4 flex flex-col justify-center min-h-[100px]">
                      <p className="text-2xl sm:text-3xl font-extrabold text-[var(--surface-ink)] leading-tight">
                        {item.value}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Snapshot Card */}
                <div className="glass rounded-2xl card-px-sm">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-strong)]">
                    {t("snapshotLabel")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {t("snapshotBody")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
