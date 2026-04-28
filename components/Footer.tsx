"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 py-12 sm:px-8 lg:px-20">
      <div className="section-shell">
        <div className="section-divider mb-6" />
        <div className="flex flex-col gap-3 text-sm text-[var(--color-text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-[var(--color-text-primary)]">Diego Medina</p>
          <p>
            {year} | {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
