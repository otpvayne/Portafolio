import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-6 px-6 text-center text-xs text-[var(--text-muted)]">
      © {year} Diego Medina — {t("rights")}
    </footer>
  );
}
