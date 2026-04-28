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
      <main className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="section-shell">
          <div className="section-divider mb-12" />

          <section className="space-y-5">
            <span className="eyebrow">{t("kicker")}</span>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl">{t("title")}</h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">{t("subtitle")}</p>
          </section>

          <div className="mt-10">
            <FaqClient />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
