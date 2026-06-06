"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  LogOut,
  Shield,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useLanguage } from "@/context/LanguageContext";
import { isVerified, setVerified } from "@/lib/storage";
import { setVerificationCookie } from "@/app/actions/verification";
import type { Language } from "@/data/translations";
import { GateBackground } from "./GateBackground";

interface VerificationGateProps {
  children: ReactNode;
  initialVerified?: boolean;
}

type CheckboxKey = "age" | "ruo" | "noHuman";

const CHECKBOX_KEYS: CheckboxKey[] = ["age", "ruo", "noHuman"];

export function VerificationGate({
  children,
  initialVerified = false,
}: VerificationGateProps) {
  const { language, setLanguage, t } = useLanguage();
  const [verified, setVerifiedState] = useState(initialVerified);
  const [checks, setChecks] = useState<Record<CheckboxKey, boolean>>({
    age: false,
    ruo: false,
    noHuman: false,
  });
  const [showError, setShowError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const checkedCount = CHECKBOX_KEYS.filter((k) => checks[k]).length;
  const allChecked = checkedCount === 3;

  useEffect(() => {
    const storedVerified = isVerified();
    if (storedVerified) {
      setVerifiedState(true);
      void setVerificationCookie();
    } else if (initialVerified) {
      setVerified();
      setVerifiedState(true);
    }
  }, [initialVerified]);

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

  const toggleCheck = useCallback((key: CheckboxKey) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
    setShowError(false);
  }, []);

  const handleEnter = useCallback(() => {
    if (!allChecked) {
      setShowError(true);
      return;
    }
    setVerified();
    void setVerificationCookie();
    setVerifiedState(true);
  }, [allChecked]);

  const handleExit = useCallback(() => {
    if (window.confirm(t("gate.exitConfirm"))) {
      window.location.href = "https://www.google.com";
    }
  }, [t]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && allChecked && e.target instanceof HTMLButtonElement) {
        handleEnter();
      }
    },
    [allChecked, handleEnter]
  );

  if (verified) {
    return <>{children}</>;
  }

  const checkboxItems: { key: CheckboxKey; label: string }[] = [
    { key: "age", label: t("gate.checkboxAge") },
    { key: "ruo", label: t("gate.checkboxRuo") },
    { key: "noHuman", label: t("gate.checkboxNoHuman") },
  ];

  const progressLabel = allChecked ? "✓ Ready" : `${checkedCount}/3 Complete`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="verification-gate"
        className="fixed inset-0 z-100 flex h-dvh items-center justify-center overflow-hidden p-2.5 sm:p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onKeyDown={handleKeyDown}
      >
        <GateBackground />

        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
          className="relative z-10 w-full max-w-[400px] outline-none"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="gate-gradient-border shadow-2xl shadow-black/50">
            <div className="relative overflow-hidden rounded-2xl bg-navy-900/94 backdrop-blur-xl sm:rounded-3xl">
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-transparent" />

              {/* Language toggle */}
              <div className="relative flex items-center justify-end gap-1 border-b border-white/5 px-3.5 py-1.5">
                <span className="sr-only">{t("common.language")}</span>
                {(["en", "es"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${
                      language === lang
                        ? "bg-teal-500 text-white shadow-sm shadow-teal-500/25"
                        : "text-white/40 hover:bg-white/5 hover:text-white/70"
                    }`}
                    aria-pressed={language === lang}
                    aria-label={lang === "en" ? t("common.english") : t("common.spanish")}
                  >
                    {lang === "en" ? "EN" : "ES"}
                  </button>
                ))}
              </div>

              <div className="relative max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain px-3.5 py-2 sm:px-4 sm:py-2.5">
                {/* Brand */}
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="relative"
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 22 }}
                  >
                    <motion.div
                      className="absolute inset-0 -m-3 rounded-2xl bg-teal-400/20 blur-xl"
                      animate={{ opacity: [0.25, 0.5, 0.25] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden
                    />
                    <BrandLogo size="xs" className="relative" />
                  </motion.div>

                  <motion.span
                    className="brand-badge-premium mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-px text-[9px] font-semibold uppercase tracking-widest text-teal-400/90"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Shield className="h-2 w-2" aria-hidden />
                    {t("gate.badge")}
                  </motion.span>

                  <motion.h1
                    id={titleId}
                    className="font-display mt-1.5 text-lg font-bold text-white sm:text-xl"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {t("common.brandName")}
                  </motion.h1>

                  <motion.p
                    className="font-display mt-px text-xs font-semibold text-teal-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {t("gate.title")}
                  </motion.p>

                  <motion.p
                    id={descId}
                    className="mt-1.5 line-clamp-2 max-w-[18rem] text-[11px] leading-snug text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {t("gate.subtitle")}
                  </motion.p>
                </div>

                {/* Trust badges */}
                <motion.div
                  className="mt-2 flex flex-wrap justify-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {[t("gate.isoBadge"), t("gate.secureBadge"), t("common.researchUseOnly")].map(
                    (badge, i) => (
                      <span
                        key={badge}
                        className={`rounded-full px-1.5 py-px text-[9px] font-medium ${
                          i === 2
                            ? "bg-teal-500/8 text-teal-400/85"
                            : "bg-white/4 text-white/40"
                        }`}
                      >
                        {badge}
                      </span>
                    )
                  )}
                </motion.div>

                {/* Progress indicator */}
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  role="progressbar"
                  aria-valuenow={checkedCount}
                  aria-valuemin={0}
                  aria-valuemax={3}
                  aria-label={progressLabel}
                >
                  <div className="flex items-center justify-end">
                    <motion.span
                      key={progressLabel}
                      className={`text-[11px] font-semibold tabular-nums tracking-wide ${
                        allChecked ? "text-teal-400" : "text-white/45"
                      }`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {progressLabel}
                    </motion.span>
                  </div>
                  <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-white/6">
                    <motion.div
                      className="h-full rounded-full bg-linear-to-r from-teal-600 to-teal-400"
                      initial={false}
                      animate={{ width: `${(checkedCount / 3) * 100}%` }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>

                {/* Checkboxes */}
                <motion.fieldset
                  className="mt-2 space-y-1.5"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46 }}
                >
                  <legend className="sr-only">{t("gate.title")}</legend>
                  {checkboxItems.map((item, i) => {
                    const inputId = `gate-check-${item.key}`;
                    const isChecked = checks[item.key];
                    return (
                      <motion.label
                        key={item.key}
                        htmlFor={inputId}
                        layout
                        className={`group flex cursor-pointer items-start gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300 focus-within:ring-2 focus-within:ring-teal-400/35 ${
                          isChecked
                            ? "border-teal-500/45 bg-teal-500/10"
                            : "border-white/8 bg-white/3 hover:border-white/16 hover:bg-white/5"
                        }`}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.48 + i * 0.03 }}
                        whileHover={{ scale: 1.003 }}
                        whileTap={{ scale: 0.997 }}
                      >
                        <span className="relative mt-px flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                          <input
                            id={inputId}
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(item.key)}
                            className="peer sr-only"
                          />
                          <motion.span
                            className={`flex h-3.5 w-3.5 items-center justify-center rounded border transition-colors duration-300 ${
                              isChecked
                                ? "border-teal-400 bg-teal-500"
                                : "border-white/20 bg-navy-800 group-hover:border-white/35"
                            }`}
                            animate={isChecked ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                            transition={{ duration: 0.28 }}
                            aria-hidden
                          >
                            <AnimatePresence>
                              {isChecked && (
                                <motion.span
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 520, damping: 26 }}
                                >
                                  <Check className="h-2 w-2 text-white" strokeWidth={3} />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.span>
                        </span>
                        <span
                          className={`text-[11px] leading-snug transition-colors duration-300 ${
                            isChecked ? "text-white/88" : "text-white/58 group-hover:text-white/72"
                          }`}
                        >
                          {item.label}
                        </span>
                      </motion.label>
                    );
                  })}
                </motion.fieldset>

                <AnimatePresence>
                  {showError && !allChecked && (
                    <motion.p
                      role="alert"
                      className="mt-1.5 text-center text-[10px] font-medium text-amber-400"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {t("gate.allRequired")}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <motion.div
                  className="mt-2 flex flex-col gap-1.5 sm:flex-row"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58 }}
                >
                  <div className="relative flex-1">
                    <AnimatePresence>
                      {allChecked && (
                        <motion.span
                          className="pointer-events-none absolute -inset-1 rounded-full bg-teal-400/30 blur-md"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.98, 1.04, 0.98] }}
                          exit={{ opacity: 0 }}
                          transition={{
                            opacity: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                            scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                          }}
                          aria-hidden
                        />
                      )}
                    </AnimatePresence>
                    <motion.button
                      type="button"
                      onClick={handleEnter}
                      disabled={!allChecked}
                      className={`group relative w-full overflow-hidden rounded-full px-4 py-2 text-[11px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 sm:text-xs ${
                        allChecked
                          ? "bg-linear-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-500/35"
                          : "cursor-not-allowed bg-navy-800/90 text-white/22 ring-1 ring-inset ring-white/6"
                      }`}
                      initial={false}
                      animate={
                        allChecked
                          ? { scale: [1, 1.02, 1] }
                          : { scale: 1 }
                      }
                      transition={
                        allChecked
                          ? { scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
                          : undefined
                      }
                      whileHover={
                        allChecked
                          ? {
                              scale: 1.04,
                              boxShadow: "0 6px 32px rgba(20,184,166,0.45)",
                            }
                          : undefined
                      }
                      whileTap={allChecked ? { scale: 0.97 } : undefined}
                    >
                      {allChecked && (
                        <motion.span
                          className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.55, ease: "easeInOut" }}
                          aria-hidden
                        />
                      )}
                      <span className="relative flex items-center justify-center gap-1.5">
                        {t("gate.enterButton")}
                        <ArrowRight
                          className={`h-3 w-3 transition-transform duration-300 ${
                            allChecked ? "group-hover:translate-x-0.5" : "opacity-25"
                          }`}
                          aria-hidden
                        />
                      </span>
                    </motion.button>
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleExit}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-[11px] font-semibold text-white/50 transition-all duration-300 hover:border-white/18 hover:bg-white/5 hover:text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35 sm:text-xs"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <LogOut className="h-3 w-3" aria-hidden />
                    {t("gate.exitButton")}
                  </motion.button>
                </motion.div>

                <motion.p
                  className="mt-2 text-center text-[9px] leading-snug text-white/28"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                >
                  {t("gate.footerDisclaimer")}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
