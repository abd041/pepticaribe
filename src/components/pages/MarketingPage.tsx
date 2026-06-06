import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type MarketingPageProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
  backHref?: string;
  backLabel?: string;
};

/** Shared inner-page shell — lightweight, no homepage animation stack */
export function MarketingPage({
  eyebrow,
  title,
  description,
  children,
  backHref = "/",
  backLabel = "Back to Home",
}: MarketingPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Link
        href={backHref}
        className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--soft-ivory)]/55 transition-colors hover:text-[var(--ocean-blue)]"
      >
        <ArrowLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          aria-hidden
        />
        {backLabel}
      </Link>

      {eyebrow ? (
        <p className="premium-eyebrow-gold font-display mt-8">{eyebrow}</p>
      ) : null}

      <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-[var(--soft-ivory)] sm:text-4xl">
        {title}
      </h1>

      <p className="section-caption mt-5 max-w-2xl text-base leading-relaxed">{description}</p>

      {children ? <div className="mt-10">{children}</div> : null}
    </div>
  );
}
