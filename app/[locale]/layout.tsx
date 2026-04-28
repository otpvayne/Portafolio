import type { Metadata } from "next";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";
import "../globals.css";

export const metadata: Metadata = {
  title: "Diego Medina | Software Engineer",
  description:
    "Portafolio profesional de Diego Medina, software engineer enfocado en productos web, sistemas internos y experiencias digitales de alta calidad.",
  openGraph: {
    title: "Diego Medina | Software Engineer",
    description: "Software engineer | React | Node.js | PostgreSQL",
    type: "website",
  },
};

const messagesByLocale = {
  en: enMessages,
  es: esMessages,
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "es" | "en")) notFound();

  const messages = messagesByLocale[locale as keyof typeof messagesByLocale] as unknown as AbstractIntlMessages;

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Sora:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
