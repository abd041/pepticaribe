"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { EXHIBIT_CANVAS } from "@/lib/productImagery";

type COALibraryVialThumbProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

/** Compact vial thumbnail — centered object-contain, never cropped */
export function COALibraryVialThumb({ src, alt, priority = false }: COALibraryVialThumbProps) {
  return (
    <div className="coa-library-vial-thumb">
      <div className="coa-library-vial-thumb-chamber" aria-hidden />
      <div className="coa-library-vial-thumb-glow" aria-hidden />
      <div className="coa-library-vial-thumb-pedestal" aria-hidden />
      <OptimizedImage
        src={src}
        alt={alt}
        width={EXHIBIT_CANVAS.width}
        height={EXHIBIT_CANVAS.height}
        priority={priority}
        sizes="(max-width: 640px) 28vw, 140px"
        className="coa-library-vial-thumb-image"
      />
    </div>
  );
}
