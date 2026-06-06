import { SiteChrome } from "@/components/home/SiteChrome";
import { Footer } from "@/components/home/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <SiteChrome />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
