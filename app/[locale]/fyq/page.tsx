"use client";

import { useTranslations } from "next-intl";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqClient from "./FaqClient";

export default function FaqPage() {
  const t = useTranslations("faq");

  return (
    <>
      <Nav />
      <main className="px-4 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-20 lg:pb-32 lg:pt-40">
        <div className="section-shell">
          <div className="section-divider mb-12" />

          <section className="space-y-6 mb-12">
            <span className="eyebrow">{t("kicker")}</span>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                {t("title")}
              </h1>
              <p className="text-lg leading-relaxed text-[var(--color-text-secondary)] max-w-3xl">
                {t("subtitle")}
              </p>
            </div>
          </section>

          <div className="max-w-3xl mx-auto">
            <FaqClient />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
