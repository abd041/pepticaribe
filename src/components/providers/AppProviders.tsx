"use client";

import type { ReactNode } from "react";
import type { Language } from "@/data/translations";
import { LanguageProvider } from "@/context/LanguageContext";
import { VerificationGate } from "@/components/verification/VerificationGate";

type AppProvidersProps = {
  children: ReactNode;
  initialVerified?: boolean;
  initialLanguage?: Language;
};

export function AppProviders({
  children,
  initialVerified = false,
  initialLanguage = "en",
}: AppProvidersProps) {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <VerificationGate initialVerified={initialVerified}>{children}</VerificationGate>
    </LanguageProvider>
  );
}
