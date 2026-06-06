import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import {
  LANGUAGE_COOKIE,
  VERIFICATION_COOKIE,
  parseLanguageCookie,
} from "@/lib/storage";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pepticaribe.com";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PeptiCaribe | Premium Research-Grade Peptides",
    template: "%s | PeptiCaribe",
  },
  description:
    "Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, ISO 17025 third-party tested. Research Use Only.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PeptiCaribe",
    title: "PeptiCaribe | Premium Research-Grade Peptides",
    description:
      "Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, ISO 17025 third-party tested.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeptiCaribe | Premium Research-Grade Peptides",
    description:
      "Research-grade peptides with Certificate of Analysis on every batch. 99%+ identity purity, ISO 17025 third-party tested.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/pepticaribe-logo.svg",
    apple: "/brand/pepticaribe-logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialVerified = cookieStore.get(VERIFICATION_COOKIE)?.value === "1";
  const initialLanguage = parseLanguageCookie(
    cookieStore.get(LANGUAGE_COOKIE)?.value,
  );

  return (
    <html
      lang={initialLanguage}
      className={`${plusJakarta.variable} ${cinzel.variable} min-h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteJsonLd />
        <AppProviders
          initialVerified={initialVerified}
          initialLanguage={initialLanguage}
        >
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
