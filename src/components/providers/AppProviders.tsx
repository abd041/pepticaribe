"use client";

import type { ReactNode } from "react";
import type { Language } from "@/data/translations";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
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
      <CartProvider>
        <VerificationGate initialVerified={initialVerified}>{children}</VerificationGate>
      </CartProvider>
    </LanguageProvider>
  );
}
