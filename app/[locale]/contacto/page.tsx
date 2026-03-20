import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { useTranslations } from "next-intl";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const highlights = t.raw("highlights") as string[];

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{t("title")} 🚀</h1>
              <p className="text-[var(--text-muted)] mb-8 leading-relaxed">{t("subtitle")}</p>
              <ul className="space-y-3 mb-10">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: h.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 text-sm text-[var(--text-muted)]">
                <a href="mailto:generalboomsycol@gmail.com" className="flex items-center gap-2 hover:text-[var(--accent2)] transition-colors">
                  <Mail size={14} className="text-[var(--accent)]" /> generalboomsycol@gmail.com
                </a>
                <a href="https://linkedin.com/in/diego-medina-software" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-[var(--accent2)] transition-colors">
                  <Linkedin size={14} className="text-[var(--accent)]" /> linkedin.com/in/diego-medina-software
                </a>
                <a href="https://github.com/otpvayne" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-[var(--accent2)] transition-colors">
                  <Github size={14} className="text-[var(--accent)]" /> github.com/otpvayne
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
