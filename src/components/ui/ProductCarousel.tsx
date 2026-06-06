"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode } from "react";

interface ProductCarouselProps {
  children: ReactNode;
  label?: string;
}

export function ProductCarousel({ children, label = "Featured products" }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
  }, []);

  const scrollBy = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slug]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
    window.setTimeout(updateArrows, 350);
  }, [updateArrows]);

  return (
    <div className="pc-product-carousel relative">
      <button
        type="button"
        className="pc-carousel-nav pc-carousel-nav--prev"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        aria-label={`Scroll ${label} left`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={trackRef}
        className="pc-carousel-track ref-product-grid qa-product-grid mt-10 sm:mt-12"
        onScroll={updateArrows}
      >
        {children}
      </div>

      <button
        type="button"
        className="pc-carousel-nav pc-carousel-nav--next"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        aria-label={`Scroll ${label} right`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
