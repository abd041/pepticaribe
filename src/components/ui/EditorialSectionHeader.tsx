"use client";

import type { ReactNode } from "react";

interface EditorialSectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "ocean" | "gold";
}

/** Editorial section title block — campaign-grade hierarchy */
export function EditorialSectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "ocean",
}: EditorialSectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const eyebrowClass =
    variant === "gold" ? "type-editorial-eyebrow-gold" : "type-editorial-eyebrow";

  return (
    <header className={`editorial-section-header max-w-2xl ${alignClass}`}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className="type-display-section font-display mt-6">{title}</h2>
      {subtitle && (
        <p className="type-scientific-meta mt-5">{subtitle}</p>
      )}
    </header>
  );
}

interface EditorialBlockProps {
  children: ReactNode;
  className?: string;
}

export function EditorialBlock({ children, className = "" }: EditorialBlockProps) {
  return <div className={`editorial-block ${className}`}>{children}</div>;
}
