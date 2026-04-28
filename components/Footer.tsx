"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-10 pt-2 sm:px-6 lg:px-8">
      <div className="section-shell">
        <div className="section-divider mb-6" />
        <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-[var(--text)]">Diego Medina</p>
          <p>
            {year} | {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
