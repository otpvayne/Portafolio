import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { useTranslations } from "next-intl";
import { Mail, Github, Linkedin, Clock, Zap, CheckCircle2 } from "lucide-react";

const ICONS = [Clock, Zap, CheckCircle2];

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const highlights = t.raw("highlights") as string[];

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — Info */}
            <div>
              <p className="text-xs font-mono text-[var(--accent2)] uppercase tracking-widest mb-3">
                Contacto
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {t("title")}
              </h1>
              <p className="text-[var(--text-muted)] mb-10 leading-relaxed text-sm md:text-base">
                {t("subtitle")}
              </p>

              {/* Highlights */}
              <ul className="space-y-4 mb-10">
                {highlights.map((h, i) => {
                  const Icon = ICONS[i] ?? CheckCircle2;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={14} className="text-[var(--accent)]" />
                      </span>
                      <span
                        className="text-sm text-[var(--text-muted)] leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: h.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-white">$1</strong>'
                          ),
                        }}
                      />
                    </li>
                  );
                })}
              </ul>

              {/* Contact links */}
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:generalboomsycol@gmail.com"
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-[var(--bg-card2)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                    <Mail size={13} className="text-[var(--accent)]" />
                  </span>
                  generalboomsycol@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/diego-medina-software"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-[var(--bg-card2)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                    <Linkedin size={13} className="text-[var(--accent)]" />
                  </span>
                  linkedin.com/in/diego-medina-software
                </a>
                <a
                  href="https://github.com/otpvayne"
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--accent2)] transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-[var(--bg-card2)] border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                    <Github size={13} className="text-[var(--accent)]" />
                  </span>
                  github.com/otpvayne
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
