"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type FriendItem = { name: string; role: string; url: string; theme: string };

const THEME_STYLES: Record<string, string> = {
  ice: "from-cyan-500/10 via-white to-blue-500/10",
  sunset: "from-orange-500/10 via-white to-rose-500/10",
};

export default function Friends() {
  const t = useTranslations("friends");
  const items = t.raw("items") as FriendItem[];

  return (
    <section className="px-4 sm:px-8 lg:px-20" style={{ paddingTop: '40px', paddingBottom: '30px' }}>
      <div className="section-shell">
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-surface-muted)] bg-white/[var(--opacity-sm)] p-6 backdrop-blur-sm">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              {t("title")}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">{t("subtitle")}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {items.map((friend, index) => (
              <motion.a
                key={friend.name}
                href={friend.url}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className={`group flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--color-surface-muted)] bg-gradient-to-r ${THEME_STYLES[friend.theme] || THEME_STYLES.ice} p-4 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)]`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                  {friend.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-[var(--color-text-primary)]">{friend.name}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{friend.role}</p>
                </div>
                <ArrowUpRight size={18} className="text-[var(--color-text-secondary)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
