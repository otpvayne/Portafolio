import { useTranslations } from "next-intl";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FaqClient from "./FaqClient";

export default function FaqPage() {
  const t = useTranslations("faq");
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">{t("title")}</h1>
          <p className="text-[var(--text-muted)] mb-10">{t("subtitle")}</p>
          <FaqClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
