"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { VerificationGate } from "@/components/verification/VerificationGate";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <VerificationGate>{children}</VerificationGate>
    </LanguageProvider>
  );
}
