import Link from "next/link";
import { SiteChrome } from "@/components/home/SiteChrome";
import { Footer } from "@/components/home/Footer";

export default function NotFound() {
  return (
    <div className="site-chrome-offset min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <SiteChrome />
      <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:py-32">
        <p className="premium-eyebrow-gold">404</p>
        <h1 className="font-display mt-4 text-3xl font-bold text-[var(--soft-ivory)]">
          Page Not Found
        </h1>
        <p className="section-caption mt-4">
          The page you requested does not exist or may have moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-primary rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="btn-outline-gold rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em]"
          >
            View Products
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
