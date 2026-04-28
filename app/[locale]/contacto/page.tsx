"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, Clock, Github, Linkedin, Mail, Zap } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

const ICONS = [Clock, Zap, CheckCircle2];

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const highlights = t.raw("highlights") as string[];

  return (
    <>
      <Nav />
      <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="section-shell">
          <div className="section-divider mb-12" />

          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <section className="space-y-7">
              <span className="eyebrow">Contact</span>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">
                  {t("title")}
                </h1>
                <p className="max-w-xl text-lg leading-8 text-[var(--text-muted)]">{t("subtitle")}</p>
              </div>

              <ul className="grid gap-4">
                {highlights.map((highlight, index) => {
                  const Icon = ICONS[index] ?? CheckCircle2;

                  return (
                    <li
                      key={highlight}
                      className="flex gap-4 rounded-[24px] border border-[var(--line)] bg-white/68 p-4"
                    >
                      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[var(--surface-ink)] text-white">
                        <Icon size={16} />
                      </span>
                      <span
                        className="text-sm leading-7 text-[var(--text-muted)]"
                        dangerouslySetInnerHTML={{
                          __html: highlight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text)]">$1</strong>'),
                        }}
                      />
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-[28px] bg-[var(--surface-ink)] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">Direct links</p>
                <div className="mt-5 grid gap-3">
                  <a
                    href="mailto:generalboomsycol@gmail.com"
                    className="inline-flex items-center gap-3 text-sm text-white/82 transition-colors hover:text-white"
                  >
                    <Mail size={16} />
                    generalboomsycol@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/diego-medina-software"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-3 text-sm text-white/82 transition-colors hover:text-white"
                  >
                    <Linkedin size={16} />
                    linkedin.com/in/diego-medina-software
                  </a>
                  <a
                    href="https://github.com/otpvayne"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-3 text-sm text-white/82 transition-colors hover:text-white"
                  >
                    <Github size={16} />
                    github.com/otpvayne
                  </a>
                </div>
              </div>
            </section>

            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
