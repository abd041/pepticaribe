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
      gsap.set(".lux-hero-animate, .lux-hero-product", {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* Hero — transform-first; copy stays visible for LCP */
      const heroTl = gsap.timeline({
        defaults: { ease: CINEMATIC_EASE },
        delay: 0.05,
      });

      heroTl
        .from(".lux-pp-volumetric", {
          opacity: 0.72,
          scale: 0.96,
          duration: 1.1,
          immediateRender: false,
        })
        .from(
          ".lux-hero-animate-eyebrow",
          { y: 20, duration: 0.65, immediateRender: false },
          "-=0.85",
        )
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
          y: -8,
          duration: 5,
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

      /* COA — single vault reveal (no section-level lux-reveal overlap) */
      const coaVault = document.querySelector(".art-coa-vault");
      if (coaVault) {
        gsap.from(".art-coa-copy", {
          scrollTrigger: {
            trigger: coaVault,
            start: MOTION.revealStart,
            toggleActions: "play none none none",
          },
          y: MOTION.revealY,
          opacity: 0,
          duration: MOTION.reveal,
          ease: CINEMATIC_EASE,
        });

        gsap.from(".art-coa-document", {
          scrollTrigger: {
            trigger: coaVault,
            start: MOTION.revealStart,
            toggleActions: "play none none none",
          },
          rotation: -8,
          y: 16,
          opacity: 0,
          duration: 0.85,
          ease: CINEMATIC_EASE,
        });

        gsap.from(".art-coa-seal", {
          scrollTrigger: {
            trigger: coaVault,
            start: MOTION.revealStart,
            toggleActions: "play none none none",
          },
          scale: 0.88,
          opacity: 0,
          duration: 0.65,
          delay: 0.1,
          ease: CINEMATIC_EASE,
        });
      }

      gsap.utils.toArray<Element>(".lux-reveal").forEach((el) => {
        bindLuxReveal(el);
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
