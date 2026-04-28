"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useTranslations } from "next-intl";

type CaseStudy = {
  problem: string;
  solution: string;
  impact: string;
  gallery: string[];
};

type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  live?: string;
  repo?: string;
  caseStudy?: CaseStudy;
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const t = useTranslations("projects");
  const [imgIndex, setImgIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = !!project;
  const gallery = project?.caseStudy?.gallery ?? [];

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset image index when project changes
  useEffect(() => { setImgIndex(0); }, [project?.id]);

  const prev = () => setImgIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setImgIndex((i) => (i + 1) % gallery.length);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-0 md:p-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div
              ref={scrollRef}
              className="relative w-full md:max-w-4xl max-h-[92vh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-[var(--bg-card)] border border-[var(--border)]"
              style={{ scrollbarWidth: "thin" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle (mobile) */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[var(--bg-card2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--accent)] transition-all"
                aria-label={t("close")}
              >
                <X size={14} />
              </button>

              {/* Image gallery */}
              {gallery.length > 0 && (
                <div className="relative w-full aspect-video overflow-hidden bg-[var(--bg)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.35 }}
                    >
                      <Image
                        src={gallery[imgIndex]}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

                  {/* Navigation arrows */}
                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-black/70 transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Dot indicators */}
                  {gallery.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIndex(i)}
                          className={`rounded-full transition-all ${
                            i === imgIndex ? "w-5 h-1.5 bg-[var(--accent)]" : "w-1.5 h-1.5 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Title + links */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-[var(--accent2)] mb-1 uppercase tracking-widest">
                      {t("caseStudy")}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent2)] transition-colors"
                      >
                        <ExternalLink size={12} /> {t("live")}
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener"
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent2)] transition-all"
                      >
                        <Github size={12} /> {t("repo")}
                      </a>
                    )}
                  </div>
                </div>

                {/* Problem / Solution / Impact */}
                {project.caseStudy && (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: t("problem"), text: project.caseStudy.problem, color: "text-red-400", bg: "bg-red-500/5 border-red-500/20" },
                      { label: t("solution"), text: project.caseStudy.solution, color: "text-[var(--accent2)]", bg: "bg-[var(--accent)]/5 border-[var(--accent)]/20" },
                      { label: t("impact"), text: project.caseStudy.impact, color: "text-green-400", bg: "bg-green-500/5 border-green-500/20" },
                    ].map(({ label, text, color, bg }) => (
                      <div key={label} className={`rounded-xl p-4 border ${bg}`}>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${color}`}>{label}</p>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stack */}
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-card2)] border border-[var(--border)] text-[var(--accent2)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
