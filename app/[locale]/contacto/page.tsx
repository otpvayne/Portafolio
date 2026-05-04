"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, Clock, Zap } from "lucide-react";
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
      <main className="px-4 pb-20 pt-40 sm:px-8 sm:pt-48 lg:px-20 lg:pb-32" style={{ paddingTop: 'clamp(128px, 16vw, 192px)' }}>
        <div className="section-shell">
          <div className="section-divider mb-12" />

          <div className="grid gap-normal lg:grid-cols-2 lg:items-start">
            {/* Left Column */}
            <section className="space-y-8">
              <div className="space-y-4">
                <span className="eyebrow">{t("contactLabel")}</span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                  {t("title")}
                </h1>
                <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
                  {t("subtitle")}
                </p>
              </div>

              {/* Highlights */}
              <ul className="space-y-3">
                {highlights.map((highlight, index) => {
                  const Icon = ICONS[index] ?? CheckCircle2;

                  return (
                    <li
                      key={highlight}
                      className="card-base flex gap-4 card-px-sm rounded-xl"
                    >
                      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
                        <Icon size={18} />
                      </span>
                      <span
                        className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
                        dangerouslySetInnerHTML={{
                          __html: highlight.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[var(--color-text-primary)]">$1</strong>'),
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Right Column: Form */}
            <div className="lg:sticky lg:top-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
