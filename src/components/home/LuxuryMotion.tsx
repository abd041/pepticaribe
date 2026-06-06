"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollReady } from "@/components/home/SmoothScrollProvider";

/** GSAP luxury motion — homepage only, respects reduced motion */
export function LuxuryMotion() {
  const scrollReady = useSmoothScrollReady();

  useEffect(() => {
    if (!scrollReady) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(".lux-hero-animate, .lux-hero-product, .lux-hero-glow", {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".lux-hero-animate", { opacity: 0, y: 32 });
      gsap.set(".lux-hero-product", { opacity: 0, y: 24, scale: 0.96 });
      gsap.set(".lux-hero-glow", { opacity: 0, scale: 0.88 });
      gsap.set(".lux-pp-volumetric", { opacity: 0.6, scale: 0.94 });

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .to(".lux-hero-glow", { opacity: 1, scale: 1, duration: 1.5 })
        .to(".lux-pp-volumetric", { opacity: 0.95, scale: 1, duration: 1.35 }, "-=1.35")
        .to(".lux-hero-animate-eyebrow", { opacity: 1, y: 0, duration: 0.85 }, "-=1.1")
        .to(".lux-hero-animate-headline", { opacity: 1, y: 0, duration: 1.05 }, "-=0.65")
        .to(".lux-hero-animate-lead", { opacity: 1, y: 0, duration: 0.75 }, "-=0.55")
        .to(".lux-hero-animate-cta", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.45")
        .to(".lux-hero-animate-badges", { opacity: 1, y: 0, duration: 0.65 }, "-=0.35")
        .to(".lux-hero-product", { opacity: 1, y: 0, scale: 1, duration: 1.15 }, "-=1");

      gsap.to(".lux-hero-float", {
        y: -10,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".lux-hero-glow", {
        scale: 1.04,
        opacity: 0.92,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".lux-pp-spotlight-core", {
        scale: 1.06,
        opacity: 0.95,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

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

      /* BPC-157 Apple-style showcase */
      const featuredTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".ref-featured-compound",
          start: "top 68%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      featuredTl
        .from(".lux-featured-vial", {
          y: 56,
          opacity: 0,
          scale: 0.92,
          duration: 1.35,
        })
        .from(
          ".lux-featured-halo-ring--outer",
          { scale: 0.78, opacity: 0, duration: 1.2 },
          "-=1.1",
        )
        .from(
          ".lux-featured-halo-ring--mid",
          { scale: 0.82, opacity: 0, duration: 1.15 },
          "-=1",
        )
        .from(
          ".lux-featured-halo-ring--inner",
          { scale: 0.86, opacity: 0, duration: 1.1 },
          "-=0.95",
        )
        .from(
          ".lux-featured-lab-spotlight",
          { opacity: 0, duration: 1.25 },
          "-=1.2",
        )
        .from(
          ".lux-featured-spec",
          { x: 40, opacity: 0, duration: 1.05 },
          "-=0.85",
        )
        .from(
          ".lux-featured-copy > *",
          { y: 28, opacity: 0, duration: 0.85, stagger: 0.07 },
          "-=0.95",
        );

      gsap.to(".lux-featured-halo-ring--outer", {
        rotation: 360,
        duration: 48,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".lux-featured-halo-ring--mid", {
        rotation: -360,
        duration: 36,
        ease: "none",
        repeat: -1,
      });

      gsap.to(".lux-featured-halo-ring--inner", {
        scale: 1.03,
        opacity: 0.85,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".lux-featured-vial-float", {
        y: -12,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".lux-featured-lab-beam", {
        opacity: 0.95,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* Purity counter — animates to existing 99%+ copy */
      const purityEl = document.querySelector(".lux-purity-counter-value");
      if (purityEl) {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: 99,
          duration: 1.8,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: ".lux-featured-spec",
            start: "top 78%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            purityEl.textContent = String(Math.round(counter.val));
          },
        });
      }

      /* COA document vault reveal */
      gsap.from(".art-coa-document", {
        scrollTrigger: {
          trigger: ".art-coa-vault",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        rotation: -12,
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".art-coa-seal", {
        scrollTrigger: {
          trigger: ".art-coa-vault",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        scale: 0.65,
        opacity: 0,
        duration: 0.9,
        delay: 0.12,
        ease: "back.out(1.35)",
      });

      gsap.utils.toArray<HTMLElement>(".lux-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 36,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>(".lux-stagger-item").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el.closest(".lux-stagger-group") ?? el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 28,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.06,
          ease: "power3.out",
        });
      });
    });

    return () => ctx.revert();
  }, [scrollReady]);

  return null;
}
