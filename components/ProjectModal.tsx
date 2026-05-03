"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";

type CaseStudy = {
  problem: string;
  solution: string;
  impact: string;
  gallery: string[];
  description?: string;
  techChallenge?: string;
  whatBuilt?: string;
  result?: string;
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
  const gallery = project?.caseStudy?.gallery ?? [];

  useEffect(() => {
    if (!project) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    setImgIndex(0);
  }, [project?.id]);

  const prev = () => setImgIndex((value) => (value - 1 + gallery.length) % gallery.length);
  const next = () => setImgIndex((value) => (value + 1) % gallery.length);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-[rgba(23,32,51,0.56)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-end p-0 md:items-center md:justify-center md:p-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              className="card-base relative max-h-[92vh] w-full overflow-y-auto rounded-t-[var(--radius-xl)] md:max-w-5xl md:rounded-[var(--radius-xl)]"
            >
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[rgba(23,32,51,0.68)] text-white transition-all hover:bg-[rgba(23,32,51,0.86)]"
              >
                <X size={16} />
              </button>

              {gallery.length > 0 && (
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-primary)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={imgIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={gallery[imgIndex]}
                        alt={`${project.title} screenshot ${imgIndex + 1} of ${gallery.length}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 90vw"
                        quality={80}
                        priority={imgIndex === 0}
                        loading={imgIndex === 0 ? "eager" : "lazy"}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,32,51,0.84)] via-transparent to-transparent" />

                  {/* Counter */}
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-[rgba(23,32,51,0.7)] px-3 py-1.5 text-xs font-medium text-white">
                    <span>{imgIndex + 1}</span>
                    <span className="text-white/60">/</span>
                    <span>{gallery.length}</span>
                  </div>

                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Imagen anterior"
                        className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(23,32,51,0.6)] text-white transition-all hover:bg-[rgba(23,32,51,0.86)] focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Siguiente imagen"
                        className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(23,32,51,0.6)] text-white transition-all hover:bg-[rgba(23,32,51,0.86)] focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {gallery.length > 1 && (
                    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                      {gallery.map((item, index) => (
                        <button
                          key={`${item}-${index}`}
                          onClick={() => setImgIndex(index)}
                          aria-label={`Ir a imagen ${index + 1}`}
                          aria-current={index === imgIndex ? "true" : "false"}
                          className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                            index === imgIndex ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-8 p-6 sm:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                      {t("caseStudy")}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{project.title}</h2>
                    <p className="text-base leading-8 text-[var(--color-text-secondary)]">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener"
                        className="btn-primary inline-flex gap-2 !text-sm"
                      >
                        <ExternalLink size={15} />
                        {t("live")}
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener"
                        className="btn-secondary inline-flex gap-2 !text-sm"
                      >
                        <Github size={15} />
                        {t("repo")}
                      </a>
                    )}
                  </div>
                </div>

                {project.caseStudy && (
                  <div className="space-y-8">
                    {/* Introduction Description */}
                    {project.caseStudy.description && (
                      <div className="space-y-3">
                        <p className="text-sm leading-7 text-[var(--color-text-secondary)] whitespace-pre-wrap">
                          {project.caseStudy.description}
                        </p>
                      </div>
                    )}

                    {/* Problem & Tech Challenge */}
                    {(project.caseStudy.problem || project.caseStudy.techChallenge) && (
                      <div className="space-y-4">
                        {project.caseStudy.problem && (
                          <div className="rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-md)] p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                              {t("problem")}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--color-text-primary)] break-words">
                              {project.caseStudy.problem}
                            </p>
                          </div>
                        )}
                        {project.caseStudy.techChallenge && (
                          <div className="rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-md)] p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                              Reto Técnico
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--color-text-primary)] break-words">
                              {project.caseStudy.techChallenge}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* What Was Built */}
                    {project.caseStudy.whatBuilt && (
                      <div className="rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-md)] p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                          Lo que construí
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-text-primary)] break-words whitespace-pre-wrap">
                          {project.caseStudy.whatBuilt}
                        </p>
                      </div>
                    )}

                    {/* Solution & Impact Grid */}
                    {(project.caseStudy.solution || project.caseStudy.impact) && (
                      <div className="grid gap-4 md:grid-cols-2">
                        {project.caseStudy.solution && (
                          <div className="rounded-[var(--radius-md)] bg-[var(--color-primary)] p-5 text-white">
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/85">
                              {t("solution")}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-white/95 break-words">
                              {project.caseStudy.solution}
                            </p>
                          </div>
                        )}
                        {project.caseStudy.impact && (
                          <div className="rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-md)] p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                              {t("impact")}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--color-text-primary)] break-words">
                              {project.caseStudy.impact}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Result */}
                    {project.caseStudy.result && (
                      <div className="rounded-[var(--radius-md)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                          Resultado
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[var(--color-text-primary)] break-words">
                          {project.caseStudy.result}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                    {t("stackLabel")}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="chip"
                      >
                        {item}
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
