import Image from "next/image";
import Link from "next/link";

const LOGO_PATH = "/brand/pepticaribe-logo.svg" as const;

/** PeptiCaribe emblem — SVG preferred, PNG fallback */
const LOGO_NATURAL = { width: 892, height: 670 } as const;

const SIZES = {
  xs: { height: 28, width: 37 },
  sm: { height: 36, width: 48 },
  md: { height: 48, width: 64 },
  lg: { height: 72, width: 96 },
  xl: { height: 88, width: 117 },
  "2xl": { height: 112, width: 149 },
} as const;

interface BrandLogoProps {
  size?: keyof typeof SIZES;
  className?: string;
  href?: string;
  priority?: boolean;
}

export function BrandLogo({
  size = "sm",
  className = "",
  href,
  priority = false,
}: BrandLogoProps) {
  const dims = SIZES[size];

  const image = (
    <Image
      src={LOGO_PATH}
      alt="PeptiCaribe Research"
      width={LOGO_NATURAL.width}
      height={LOGO_NATURAL.height}
      priority={priority}
      className={`h-auto w-auto object-contain ${className}`}
      style={{ maxHeight: dims.height, height: "auto", width: "auto", maxWidth: dims.width }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {image}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{image}</span>;
}

/** Text wordmark matching logo color split — Pepti (teal) + Caribe (gold) */
export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className="text-neutral-200">Pepti</span>
      <span className="text-[#F3E5AB]">Caribe</span>
    </span>
  );
}
