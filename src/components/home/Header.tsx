"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { CINEMATIC_EASE, isReducedMotion } from "@/lib/gsap/motion";

const mobileExtra = [{ href: "/membership", labelKey: "nav.membership" as const }];

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useFocusTrap<HTMLElement>(open);
  const { t } = useLanguage();
  const { itemCount } = useCart();

  const navLinks = useMemo(
    () =>
      [
        { href: "/", labelKey: "nav.home" as const },
        { href: "/products", labelKey: "nav.products" as const },
        { href: "/coa", labelKey: "nav.coa" as const },
        { href: "/about", labelKey: "nav.about" as const },
        { href: "/faq", labelKey: "nav.faq" as const },
        { href: "/contact", labelKey: "nav.contact" as const },
      ] as const,
    [],
  );

  const closeMenu = useCallback(() => {
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;

    if (!drawer || !backdrop || isReducedMotion()) {
      setOpen(false);
      return;
    }

    gsap
      .timeline({
        onComplete: () => setOpen(false),
        defaults: { ease: CINEMATIC_EASE },
      })
      .to(drawer, { x: "100%", duration: 0.28 })
      .to(backdrop, { autoAlpha: 0, duration: 0.22 }, 0);
  }, []);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeMenu]);

  useLayoutEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;
    if (!drawer || !backdrop) return;

    if (isReducedMotion()) {
      gsap.set([drawer, backdrop], { clearProps: "all" });
      gsap.set(backdrop, { autoAlpha: 1 });
      gsap.set(drawer, { x: 0 });
      return;
    }

    gsap.set(drawer, { x: "100%" });
    gsap.set(backdrop, { autoAlpha: 0 });

    gsap
      .timeline({ defaults: { ease: CINEMATIC_EASE } })
      .to(backdrop, { autoAlpha: 1, duration: 0.25 })
      .to(drawer, { x: 0, duration: 0.4 }, 0)
      .fromTo(
        ".mobile-nav-link",
        { autoAlpha: 0, x: 20 },
        { autoAlpha: 1, x: 0, duration: 0.32, stagger: 0.04 },
        0.1,
      );

    return () => {
      gsap.killTweensOf([drawer, backdrop, ".mobile-nav-link"]);
    };
  }, [open]);

  return (
    <>
      <header className="concept-header premium-header ref-header lux-nav-shell">
        <div className="ref-header-inner concept-header-inner mx-auto grid h-[4.5rem] max-w-[90rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:h-[5rem] lg:px-8">
          <BrandLogo
            href="/"
            size="xl"
            priority
            className="concept-header-logo ref-header-logo justify-self-start"
          />

          <nav className="concept-nav ref-header-nav hidden items-center justify-center gap-8 xl:gap-10 lg:flex">
            {navLinks.map((link) => {
              const active = isNavActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`concept-nav-link nav-link-premium ref-nav-link ${
                    active ? "concept-nav-link-active" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-1 sm:gap-2">
            <LanguageToggle className="hidden sm:flex" />
            <Link
              href="/cart"
              className="concept-cart-btn nav-icon-btn relative"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.5} />
              <span
                className="concept-cart-badge cart-badge absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full px-0.5 text-[10px] font-extrabold leading-none"
                aria-hidden={itemCount === 0}
              >
                {itemCount}
              </span>
            </Link>
            <button
              type="button"
              className="nav-icon-btn lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={t("nav.openMenu")}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <>
          <div
            ref={backdropRef}
            className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm lg:hidden"
            onClick={closeMenu}
            aria-hidden
          />
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menu")}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gradient-to-b from-[var(--surface-dark)] to-[var(--deep-navy)] p-6 text-white lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="premium-eyebrow-gold">{t("nav.menu")}</span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  className="rounded-full p-2 hover:bg-white/10"
                  aria-label={t("nav.closeMenu")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {[...navLinks, ...mobileExtra].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="mobile-nav-link block rounded-xl px-4 py-3.5 text-lg font-medium tracking-wide text-[var(--soft-ivory)]/85 transition-colors hover:bg-white/5 hover:text-[var(--soft-ivory)]"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="my-6 h-px bg-white/10" />

            <div className="flex flex-col gap-1">
              <Link
                href="/account"
                onClick={closeMenu}
                className="mobile-nav-link flex items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-white/5"
              >
                <User className="h-5 w-5 text-[var(--luxury-gold)]" />
                {t("nav.myAccount")}
              </Link>
              <Link
                href="/cart"
                onClick={closeMenu}
                className="mobile-nav-link flex items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-white/5"
              >
                <ShoppingBag className="h-5 w-5 text-[var(--luxury-gold)]" />
                {t("nav.cart")}
                {itemCount > 0 ? (
                  <span className="ml-auto rounded-full bg-[var(--ocean-blue)] px-2 py-0.5 text-xs font-bold">
                    {itemCount}
                  </span>
                ) : null}
              </Link>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
