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
              className="panel relative max-h-[92vh] w-full overflow-y-auto rounded-t-[32px] border border-[var(--line)] md:max-w-5xl md:rounded-[36px]"
            >
              <button
                onClick={onClose}
                aria-label={t("close")}
                className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[rgba(23,32,51,0.68)] text-white transition-all hover:bg-[rgba(23,32,51,0.86)]"
              >
                <X size={16} />
              </button>

              {gallery.length > 0 && (
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-ink)]">
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
                        alt={`${project.title} image ${imgIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,32,51,0.84)] via-transparent to-transparent" />

                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(23,32,51,0.6)] text-white transition-all hover:bg-[rgba(23,32,51,0.86)]"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[rgba(23,32,51,0.6)] text-white transition-all hover:bg-[rgba(23,32,51,0.86)]"
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
                          className={`h-2 rounded-full transition-all ${
                            index === imgIndex ? "w-10 bg-white" : "w-5 bg-white/40"
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
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
                      {t("caseStudy")}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-[var(--text)]">{project.title}</h2>
                    <p className="text-base leading-8 text-[var(--text-muted)]">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-ink)] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[var(--accent-strong)]"
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
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-3 text-sm font-medium text-[var(--text)] transition-all hover:border-[var(--accent)]"
                      >
                        <Github size={15} />
                        {t("repo")}
                      </a>
                    )}
                  </div>
                </div>

                {project.caseStudy && (
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { label: t("problem"), text: project.caseStudy.problem },
                      { label: t("solution"), text: project.caseStudy.solution },
                      { label: t("impact"), text: project.caseStudy.impact },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className={`rounded-[26px] p-5 ${
                          index === 1
                            ? "bg-[var(--surface-ink)] text-white"
                            : "border border-[var(--line)] bg-white/85"
                        }`}
                      >
                        <p
                          className={`text-xs font-bold uppercase tracking-[0.12em] ${
                            index === 1 ? "text-white/85" : "text-[var(--accent-strong)]"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p
                          className={`mt-3 text-sm leading-7 ${
                            index === 1 ? "text-white/95" : "text-[var(--text)]"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-strong)]">
                    {t("stackLabel")}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line)] bg-white/85 px-3 py-1.5 text-xs font-medium text-[var(--text)]"
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
