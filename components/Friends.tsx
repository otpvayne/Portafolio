"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

type FriendItem = { name: string; role: string; url: string; theme: string };

const THEME_STYLES: Record<string, string> = {
  ice: "from-blue-500/10 to-cyan-500/10 border-blue-500/30 hover:border-blue-400/60",
  sunset: "from-orange-500/10 to-pink-500/10 border-orange-500/30 hover:border-orange-400/60",
};

export default function Friends() {
  const t = useTranslations("friends");
  const items = t.raw("items") as FriendItem[];

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">{t("title")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {items.map((f, i) => (
            <motion.a
              key={i}
              href={f.url}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex-1 max-w-xs flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-br ${THEME_STYLES[f.theme] || THEME_STYLES.ice} transition-all`}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--bg-card2)] flex items-center justify-center text-lg font-bold text-[var(--accent2)]">
                {f.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{f.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{f.role}</p>
              </div>
              <ExternalLink size={14} className="text-[var(--text-muted)] shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
