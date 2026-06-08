"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollReady } from "@/components/home/SmoothScrollProvider";
import {
  bindLuxReveal,
  bindLuxStaggerGroups,
  CINEMATIC_EASE,
  MOTION,
  scheduleScrollTriggerRefresh,
} from "@/lib/gsap/motion";

/** GSAP luxury motion — homepage only, respects reduced motion */
export function LuxuryMotion() {
  const scrollReady = useSmoothScrollReady();

  useEffect(() => {
    if (!scrollReady) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(
        ".lux-hero-animate, .lux-hero-product, .ref-coa-showcase .art-coa-copy, .coa-showcase-document-frame, .coa-showcase-document-seal",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
        },
      );
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Hero — transform-first; copy stays visible for LCP */
      const heroTl = gsap.timeline({
        defaults: { ease: CINEMATIC_EASE },
        delay: 0.05,
      });

      heroTl.from(".lux-pp-volumetric", {
        opacity: 0.72,
        scale: 0.96,
        duration: 1.1,
        immediateRender: false,
      });

      if (document.querySelector(".lux-hero-animate-eyebrow")) {
        heroTl.from(
          ".lux-hero-animate-eyebrow",
          { y: 20, duration: 0.65, immediateRender: false },
          "-=0.85",
        );
      }

      heroTl
        .from(
          ".lux-hero-animate-headline",
          { y: 24, duration: 0.8, immediateRender: false },
          "-=0.5",
        )
        .from(
          ".lux-hero-animate-lead",
          { y: 18, duration: 0.6, immediateRender: false },
          "-=0.45",
        )
        .from(
          ".lux-hero-animate-cta",
          { y: 16, duration: 0.55, stagger: 0.08, immediateRender: false },
          "-=0.35",
        )
        .from(
          ".lux-hero-animate-badges",
          { y: 16, duration: 0.55, immediateRender: false },
          "-=0.3",
        )
        .from(
          ".lux-hero-product",
          { y: 20, scale: 0.97, duration: 0.95, immediateRender: false },
          "-=0.75",
        );

      const floatTarget = document.querySelector(".lux-hero-float");
      if (floatTarget) {
        gsap.to(floatTarget, {
          y: -10,
          duration: 6.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      const spotlight = document.querySelector(".lux-pp-spotlight-core");
      if (spotlight) {
        gsap.to(spotlight, {
          scale: 1.04,
          opacity: 0.95,
          duration: 6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const shell = document.querySelector(".lux-nav-shell");
          if (shell) {
            shell.classList.toggle("lux-nav-shell--scrolled", self.scroll() > 20);
          }
        },
      });

      /* Featured compound — matches simplified transparent vial layout */
      const featuredSection = document.querySelector(".ref-featured-compound");
      if (featuredSection) {
        const featuredTl = gsap.timeline({
          scrollTrigger: {
            trigger: featuredSection,
            start: MOTION.featuredStart,
            toggleActions: "play none none none",
          },
          defaults: { ease: CINEMATIC_EASE },
        });

        featuredTl
          .from(".lux-featured-vial", {
            y: 36,
            opacity: 0,
            scale: 0.94,
            duration: 0.9,
          })
          .from(
            ".lux-featured-spec",
            { x: 20, opacity: 0, duration: 0.75 },
            "-=0.55",
          )
          .from(
            ".lux-featured-copy .premium-eyebrow-gold, .lux-featured-copy .ref-featured-title, .lux-featured-copy .section-caption, .lux-featured-copy .ref-featured-trust-list, .lux-featured-copy .polish-featured-cta",
            { y: 18, opacity: 0, duration: 0.7, stagger: 0.06 },
            "-=0.6",
          );

        const purityEl = document.querySelector(".lux-purity-counter-value");
        if (purityEl) {
          const counter = { val: 0 };
          gsap.to(counter, {
            val: 99,
            duration: 1.4,
            ease: "power2.out",
            snap: { val: 1 },
            scrollTrigger: {
              trigger: ".lux-featured-spec",
              start: MOTION.revealStart,
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              purityEl.textContent = String(Math.round(counter.val));
            },
          });
        }
      }

      /* COA showcase — trigger on section so headline is visible with the preview */
      const coaShowcase = document.querySelector(".ref-coa-showcase");
      if (coaShowcase) {
        const coaCopy = coaShowcase.querySelector(".art-coa-copy");
        const coaFrame = coaShowcase.querySelector(".coa-showcase-document-frame");
        const coaSeal = coaShowcase.querySelector(".coa-showcase-document-seal");

        if (coaCopy) {
          gsap.from(coaCopy, {
            scrollTrigger: {
              trigger: coaShowcase,
              start: MOTION.revealStart,
              toggleActions: "play none none none",
            },
            y: 20,
            opacity: 0,
            duration: MOTION.reveal,
            ease: CINEMATIC_EASE,
          });
        }

        if (coaFrame) {
          gsap.from(coaFrame, {
            scrollTrigger: {
              trigger: coaShowcase,
              start: MOTION.revealStart,
              toggleActions: "play none none none",
            },
            rotation: -3,
            y: 14,
            opacity: 0,
            duration: 0.85,
            ease: CINEMATIC_EASE,
          });
        }

        if (coaSeal) {
          gsap.from(coaSeal, {
            scrollTrigger: {
              trigger: coaShowcase,
              start: MOTION.revealStart,
              toggleActions: "play none none none",
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.65,
            delay: 0.12,
            ease: CINEMATIC_EASE,
          });
        }
      }

      /* Quality stats — subtle count-up on scroll */
      const qualitySection = document.querySelector(".ref-quality-stats");
      if (qualitySection) {
        qualitySection.querySelectorAll<HTMLElement>(".lux-stat-counter").forEach((el) => {
          const end = Number(el.dataset.end);
          const numEl = el.querySelector(".lux-stat-counter-num");
          if (!numEl || Number.isNaN(end)) return;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: end,
            duration: 1.6,
            ease: "power2.out",
            snap: { val: 1 },
            scrollTrigger: {
              trigger: el,
              start: MOTION.revealStart,
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              numEl.textContent = String(Math.round(counter.val));
            },
          });
        });
      }

      gsap.utils.toArray<Element>(".lux-reveal").forEach((el) => {
        bindLuxReveal(el, { y: MOTION.revealY, duration: MOTION.reveal });
      });

      bindLuxStaggerGroups();
    });

    const unbindRefresh = scheduleScrollTriggerRefresh();

    return () => {
      unbindRefresh();
      ctx.revert();
    };
  }, [scrollReady]);

  return null;
}
