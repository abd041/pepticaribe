"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";
import { ProductVideo } from "@/components/ui/ProductVideo";
import { ProductCoaPreviewCard } from "@/components/products/ProductCoaPreviewCard";
import type { CompoundProfile } from "@/lib/productImagery";
import { getProductVideoPath } from "@/lib/videoAssets";
import type { COABatch, Product, ProductVariant } from "@/types/product";
import { useLanguage } from "@/context/LanguageContext";

type SlideId = "vial" | "coa" | "video";

type ProductDetailMediaProps = {
  product: Product;
  profile: CompoundProfile;
  selectedVariant?: ProductVariant;
  coaBatch?: COABatch;
  onCoaExpand?: () => void;
};

export function ProductDetailMedia({
  product,
  profile,
  selectedVariant,
  coaBatch,
  onCoaExpand,
}: ProductDetailMediaProps) {
  const { t } = useLanguage();
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const videoSrc = getProductVideoPath(product.slug) ?? product.video;
  const poster = selectedVariant?.image ?? product.image;
  const hasVideo = Boolean(videoSrc) && !videoFailed;

  const slides = useMemo(() => {
    const list: { id: SlideId; label: string }[] = [
      { id: "vial", label: t("products.mediaSlideVial") },
    ];
    if (coaBatch) {
      list.push({ id: "coa", label: t("products.mediaSlideCoa") });
    }
    if (hasVideo) {
      list.push({ id: "video", label: t("products.mediaSlideVideo") });
    }
    return list;
  }, [coaBatch, hasVideo, t]);

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  const activeSlide = slides[activeIndex] ?? slides[0];
  const showNav = slides.length > 1;

  const goPrev = () => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((index) => (index + 1) % slides.length);
  };

  return (
    <div
      className="product-detail-media product-detail-media-carousel"
      aria-roledescription="carousel"
      aria-label={t("products.mediaCarouselLabel")}
    >
      <div
        className={`product-detail-media-frame product-detail-media-frame--carousel${activeSlide?.id === "video" ? " product-detail-media-frame--video" : ""}`}
      >
        {showNav ? (
          <>
            <button
              type="button"
              className="product-detail-media-nav product-detail-media-nav--prev"
              onClick={goPrev}
              aria-label={t("products.mediaPrev")}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className="product-detail-media-nav product-detail-media-nav--next"
              onClick={goNext}
              aria-label={t("products.mediaNext")}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}

        <div className="product-detail-media-stage">
          {activeSlide?.id === "vial" ? (
            <div className="product-detail-media-slide product-detail-media-slide--vial">
              <LuxuryProductPresentation
                variant="featured"
                alt={product.displayName}
                exhibit={profile.exhibit}
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="product-detail-presentation"
              />
            </div>
          ) : null}

          {activeSlide?.id === "coa" && coaBatch ? (
            <div className="product-detail-media-slide product-detail-media-slide--coa">
              <ProductCoaPreviewCard
                productName={product.displayName}
                batch={coaBatch}
                variant="carousel"
                onActivate={onCoaExpand}
              />
            </div>
          ) : null}

          {activeSlide?.id === "video" && videoSrc ? (
            <div className="product-detail-media-slide product-detail-media-slide--video">
              <ProductVideo
                key={`${videoSrc}-${poster}`}
                src={videoSrc}
                poster={poster}
                className="product-detail-video"
                ariaLabel={`${product.displayName} ${t("products.mediaSlideVideo")}`}
                onError={() => setVideoFailed(true)}
              />
            </div>
          ) : null}
        </div>
      </div>

      {showNav ? (
        <div className="product-detail-media-footer">
          <p className="product-detail-media-slide-label">{activeSlide?.label}</p>
          <div
            className="product-detail-media-dots"
            role="tablist"
            aria-label={t("products.mediaCarouselLabel")}
          >
            {slides.map((slide, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={slide.label}
                  className={`product-detail-media-dot${active ? " is-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
