"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    // swap locale prefix in pathname
    const segments = pathname.split("/");
    if (segments[1] === "es" || segments[1] === "en") {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || "/");
  };

  const links = [
    { href: "/#about", label: t("about") },
    { href: "/#projects", label: t("projects") },
    { href: "/#experience", label: t("experience") },
    { href: "/#tools", label: t("stack") },
    { href: "/fyq", label: t("faq") },
    { href: "/contacto", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0f]/95 backdrop-blur shadow-lg shadow-black/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <Image src="/assets/images/logo.webp" alt="Logo Diego Medina" width={36} height={36} className="rounded-full" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={toggleLocale}
            className="ml-2 px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--accent2)] hover:bg-[var(--accent)]/20 transition-colors"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={toggleLocale} className="px-2 py-1 rounded-full border border-[var(--border)] text-xs text-[var(--accent2)]">
            {locale === "es" ? "EN" : "ES"}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menú" className="text-[var(--text)]">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-[#12121a] border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
