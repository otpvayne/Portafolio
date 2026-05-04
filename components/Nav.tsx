"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const rootPath = `/${locale}`;

  const links = useMemo(
    () => [
      { href: `${rootPath}/#about`, label: t("about") },
      { href: `${rootPath}/#projects`, label: t("projects") },
      { href: `${rootPath}/#experience`, label: t("experience") },
      { href: `${rootPath}/#tools`, label: t("stack") },
      { href: `${rootPath}/fyq`, label: t("faq") },
      { href: `${rootPath}/contacto`, label: t("contact") },
    ],
    [rootPath, t]
  );

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    const segments = pathname.split("/");

    if (segments[1] === "es" || segments[1] === "en") {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }

    router.push(segments.join("/") || "/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-[var(--color-surface-muted)] bg-white/95 shadow-[var(--shadow-subtle)] backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md"
        }`}
      >
        <a href={rootPath} className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[var(--color-surface-muted)] bg-white shadow-sm">
            <Image
              src="/assets/logo.svg"
              alt="Logo Diego Medina"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Diego Medina</p>
            <p className="text-xs text-[var(--color-text-tertiary)]">{t("tagline")}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleLocale}
            className="btn-tertiary text-xs"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <a
            href={`${rootPath}/contacto`}
            className="btn-primary inline-flex gap-2"
          >
            {t("cta")}
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLocale}
            className="btn-tertiary text-xs"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <button
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            className="btn-tertiary p-2"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav-enter mx-auto mt-3 flex max-w-7xl flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--color-surface-muted)] bg-white p-4 shadow-[var(--shadow-subtle)] backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius-lg)] px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-light)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`${rootPath}/contacto`}
            onClick={() => setOpen(false)}
            className="btn-primary inline-flex justify-center gap-2"
          >
            {t("cta")}
            <ArrowUpRight size={15} />
          </a>
        </nav>
      )}
    </header>
  );
}
