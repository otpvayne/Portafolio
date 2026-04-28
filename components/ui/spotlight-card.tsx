"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green";
}

const colorMap = {
  blue:   { base: 220, spread: 180 },
  purple: { base: 260, spread: 260 },
  green:  { base: 140, spread: 180 },
};

export function GlowCard({ children, className = "", glowColor = "purple" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = (e: PointerEvent) => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty("--x",  e.clientX.toFixed(1));
      cardRef.current.style.setProperty("--y",  e.clientY.toFixed(1));
      cardRef.current.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(3));
      cardRef.current.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(3));
    };
    document.addEventListener("pointermove", sync);
    return () => document.removeEventListener("pointermove", sync);
  }, []);

  const { base, spread } = colorMap[glowColor];

  return (
    <div
      ref={cardRef}
      data-glow
      className={`glow-card relative flex flex-col rounded-2xl ${className}`}
      style={{
        "--base":    base,
        "--spread":  spread,
        "--radius":  "16",
        "--border":  "1",
        "--size":    "280",
        "--outer":   "1",
        "--hue":     `calc(${base} + var(--xp, 0) * ${spread})`,
      } as React.CSSProperties}
    >
      {/* inner glow layer */}
      <div data-glow className="glow-inner" />
      {children}
    </div>
  );
}
