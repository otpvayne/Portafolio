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
    <section className="relative overflow-hidden px-4 pb-32 pt-28 sm:px-8 lg:px-20 lg:pb-40 lg:pt-36">
      <div className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
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
            className="max-w-3xl space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Diego Medina
            </p>
            <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl">
              {t("headline")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)] sm:text-xl">
              {t("subheadline")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.16 }}
            className="mt-7 flex min-h-8 items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)] sm:text-base"
          >
            <Sparkles size={16} />
            <span>{displayed}</span>
            <span className="cursor text-[var(--accent)]">|</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href={`${rootPath}/#projects`}
              className="btn-primary inline-flex gap-2"
            >
              {t("primaryCta")}
              <ArrowRight size={16} />
            </a>
            <a
              href="/assets/docs/CV_Diego_Medina_v2.pdf"
              download
              className="btn-secondary inline-flex gap-2"
            >
              <Download size={16} />
              {t("resume")}
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.32 }}
            className="mt-10 grid gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-2"
          >
            {highlights.map((item) => (
              <li
                key={item}
                className="chip-accent !px-4 !py-3"
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.88, delay: 0.18 }}
          className="relative z-10"
        >
          <div className="panel soft-ring relative overflow-hidden rounded-[32px] p-4 sm:p-5">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--accent-soft)]/18 blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-65">
              <CelestialSphere
                hue={34}
                speed={0.22}
                zoom={1.15}
                particleSize={2.4}
                className="h-full w-full"
              />
            </div>

            <div className="relative z-10 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="glass rounded-[28px] p-5">
                  <div className="relative h-[320px] overflow-hidden rounded-[24px] bg-[var(--surface-strong)]">
                    <Image
                      src="/assets/images/me-4.webp"
                      alt="Diego Medina portrait"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(23,32,51,0.88)] to-transparent p-5">
                      <p className="text-sm font-semibold text-white">{t("photoTitle")}</p>
                      <p className="mt-1 text-sm text-white/74">{t("photoBody")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {metrics.map((item) => (
                    <div key={item.label} className="glass rounded-[24px] p-5">
                      <p className="text-3xl font-extrabold text-[var(--surface-ink)]">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-[28px] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                  {t("snapshotLabel")}
                </p>
                <p className="mt-3 text-base leading-7 text-[var(--text-muted)]">{t("snapshotBody")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
