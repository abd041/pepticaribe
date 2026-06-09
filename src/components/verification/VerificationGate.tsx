"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ArrowRight, Check } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { setVerificationCookie } from "@/app/actions/verification";
import { CINEMATIC_EASE, SPRING_EASE, isReducedMotion } from "@/lib/gsap/motion";
import { GateBackground } from "./GateBackground";

interface VerificationGateProps {
  children: ReactNode;
  initialVerified?: boolean;
}

type GateCheckboxProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
};

function GateCheckbox({ id, checked, onChange, label }: GateCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`group flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2.5 transition-colors duration-300 focus-within:ring-2 focus-within:ring-teal-400/35 sm:px-3.5 sm:py-3 ${
        checked
          ? "border-teal-500/45 bg-teal-500/10"
          : "border-white/8 bg-white/3 hover:border-white/16 hover:bg-white/5"
      }`}
    >
      <span className="relative mt-px flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span
          className={`flex h-4 w-4 items-center justify-center rounded border transition-colors duration-300 ${
            checked
              ? "border-teal-400 bg-teal-500"
              : "border-white/20 bg-navy-800 group-hover:border-white/35"
          } ${checked ? "gate-check-pop" : ""}`}
          aria-hidden
        >
          {checked ? <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} /> : null}
        </span>
      </span>
      <span
        className={`text-left text-[0.8125rem] leading-relaxed transition-colors duration-300 sm:text-sm ${
          checked ? "text-white" : "text-white/80 group-hover:text-white/90"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export function VerificationGate({
  children,
  initialVerified = false,
}: VerificationGateProps) {
  const { t } = useLanguage();
  const [verified, setVerifiedState] = useState(initialVerified);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [researchConfirmed, setResearchConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();
  const ageInputId = useId();
  const researchInputId = useId();

  const completedCount = Number(ageConfirmed) + Number(researchConfirmed);
  const allConfirmed = ageConfirmed && researchConfirmed;

  const trustChips = [
    t("gate.trustIso"),
    t("gate.trustCoa"),
    t("gate.trustRuo"),
  ] as const;

  const progressLabel = allConfirmed
    ? t("gate.progressReady")
    : t("gate.progressCount").replace("{count}", String(completedCount));

  useEffect(() => {
    if (verified) return;
    const prevOverflow = document.body.style.overflow;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.overflow = "hidden";
    document.body.style.backgroundColor = "#050a14";
    document.documentElement.style.backgroundColor = "#050a14";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
    };
  }, [verified]);

  useEffect(() => {
    if (verified) return;
    dialogRef.current?.focus();
  }, [verified]);

  useLayoutEffect(() => {
    if (verified || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: CINEMATIC_EASE } });

      tl.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
        .fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 16, scale: 0.98 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 },
          0.08,
        )
        .from(".gate-enter-item", { autoAlpha: 0, y: 8, duration: 0.35, stagger: 0.04 }, 0.14);

      gsap.to(".gate-logo-glow", {
        autoAlpha: 0.45,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, [verified]);

  useEffect(() => {
    if (!progressRef.current) return;
    gsap.to(progressRef.current, {
      width: `${(completedCount / 2) * 100}%`,
      duration: 0.45,
      ease: CINEMATIC_EASE,
    });
  }, [completedCount]);

  useEffect(() => {
    if (!glowRef.current || !enterBtnRef.current) return;

    if (allConfirmed && !isReducedMotion()) {
      gsap.to(glowRef.current, {
        autoAlpha: 0.65,
        scale: 1.04,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(enterBtnRef.current, {
        scale: 1.02,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    } else {
      gsap.killTweensOf([glowRef.current, enterBtnRef.current]);
      gsap.set([glowRef.current, enterBtnRef.current], { clearProps: "all" });
    }
  }, [allConfirmed]);

  const handleEnter = useCallback(async () => {
    if (!allConfirmed) {
      setShowError(true);
      if (panelRef.current && !isReducedMotion()) {
        gsap.fromTo(panelRef.current, { x: -6 }, { x: 0, duration: 0.35, ease: SPRING_EASE });
      }
      return;
    }
    await setVerificationCookie();
    setVerifiedState(true);
  }, [allConfirmed]);

  const handleExit = useCallback(() => {
    if (window.confirm(t("gate.exitConfirm"))) {
      window.location.href = "https://www.google.com";
    }
  }, [t]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && allConfirmed && e.target instanceof HTMLButtonElement) {
        handleEnter();
      }
    },
    [allConfirmed, handleEnter],
  );

  if (verified) {
    return <>{children}</>;
  }

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 flex h-dvh items-center justify-center overflow-hidden p-2.5 sm:p-4"
      onKeyDown={handleKeyDown}
    >
      <GateBackground />

      <div
        ref={(el) => {
          dialogRef.current = el;
          panelRef.current = el;
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="gate-dialog relative z-10 w-full max-w-md outline-none sm:max-w-lg"
      >
        <div className="gate-gradient-border shadow-2xl shadow-black/50">
          <div className="relative overflow-hidden rounded-2xl bg-navy-900/94 backdrop-blur-xl sm:rounded-3xl">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-transparent" />

            <div className="gate-lang-bar gate-enter-item">
              <LanguageToggle />
            </div>

            <div className="gate-dialog-body relative max-h-[calc(100dvh-1.25rem)] overflow-y-auto overscroll-contain px-3.5 py-2.5 sm:max-h-[calc(100dvh-2rem)] sm:px-5 sm:py-3">
              <div className="flex flex-col items-center text-center">
                <div className="gate-enter-item relative">
                  <span
                    className="gate-logo-glow absolute inset-0 -m-3 rounded-2xl bg-teal-400/20 blur-xl"
                    aria-hidden
                  />
                  <BrandLogo size="sm" className="relative" />
                </div>

                <p className="gate-enter-item gate-eyebrow">{t("gate.eyebrow")}</p>

                <h1
                  id={titleId}
                  className="gate-enter-item font-display mt-1 text-lg font-bold text-white sm:text-xl"
                >
                  {t("gate.title")}
                </h1>

                <p
                  id={descId}
                  className="gate-enter-item mt-2 max-w-[22rem] text-sm leading-relaxed text-white/75 sm:max-w-[26rem]"
                >
                  {t("gate.subtitle")}
                </p>

                <ul className="gate-enter-item gate-trust-chips" aria-label="Trust indicators">
                  {trustChips.map((label) => (
                    <li key={label} className="gate-trust-chip">
                      <span className="gate-trust-chip-dot" aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="gate-enter-item mt-3 sm:mt-4"
                role="progressbar"
                aria-valuenow={completedCount}
                aria-valuemin={0}
                aria-valuemax={2}
                aria-label={progressLabel}
              >
                <div className="flex items-center justify-end">
                  <span
                    className={`text-xs font-semibold tabular-nums tracking-wide ${
                      allConfirmed ? "text-teal-300" : "text-white/65"
                    }`}
                  >
                    {progressLabel}
                  </span>
                </div>
                <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-white/6">
                  <div
                    ref={progressRef}
                    className="h-full w-0 rounded-full bg-linear-to-r from-teal-600 to-teal-400"
                  />
                </div>
              </div>

              <fieldset className="gate-enter-item gate-checkbox-stack mt-3 sm:mt-3.5">
                <legend className="sr-only">{t("gate.title")}</legend>
                <GateCheckbox
                  id={ageInputId}
                  checked={ageConfirmed}
                  onChange={() => {
                    setAgeConfirmed((prev) => !prev);
                    setShowError(false);
                  }}
                  label={t("gate.checkboxAge")}
                />
                <GateCheckbox
                  id={researchInputId}
                  checked={researchConfirmed}
                  onChange={() => {
                    setResearchConfirmed((prev) => !prev);
                    setShowError(false);
                  }}
                  label={t("gate.checkboxResearch")}
                />
              </fieldset>

              {showError && !allConfirmed ? (
                <p role="alert" className="mt-2 text-center text-xs font-medium text-amber-300">
                  {t("gate.allRequired")}
                </p>
              ) : null}

              <div className="gate-enter-item mt-3 sm:mt-4">
                <div className="relative">
                  {allConfirmed ? (
                    <span
                      ref={glowRef}
                      className="pointer-events-none absolute -inset-1 rounded-full bg-teal-400/30 blur-md opacity-0"
                      aria-hidden
                    />
                  ) : null}
                  <button
                    ref={enterBtnRef}
                    type="button"
                    onClick={handleEnter}
                    disabled={!allConfirmed}
                    className={`group relative w-full overflow-hidden rounded-full px-4 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
                      allConfirmed
                        ? "bg-linear-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/35 hover:scale-[1.02]"
                        : "cursor-not-allowed bg-navy-800/90 text-white/45 ring-1 ring-inset ring-white/10"
                    }`}
                  >
                    <span className="relative flex items-center justify-center gap-1.5">
                      {t("gate.enterButton")}
                      <ArrowRight
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          allConfirmed ? "group-hover:translate-x-0.5" : "opacity-25"
                        }`}
                        aria-hidden
                      />
                    </span>
                  </button>
                </div>
              </div>

              <p className="gate-enter-item mt-3 text-center text-xs leading-relaxed text-white/58 sm:mt-4">
                {t("gate.footerDisclaimer")}
              </p>

              <p className="gate-enter-item mt-3 pb-1 text-center text-sm text-white/65 sm:pb-2">
                {t("gate.exitPrompt")}{" "}
                <button
                  type="button"
                  onClick={handleExit}
                  className="font-semibold text-teal-300 underline-offset-2 transition-colors hover:text-teal-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
                >
                  {t("gate.exitButton")}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
