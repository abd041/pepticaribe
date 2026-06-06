"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/coa", label: "COA Library" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
];

const mobileExtra = [{ href: "/membership", label: "Membership" }];

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
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
                  className={`concept-nav-link nav-link-premium ref-nav-link uppercase ${
                    active ? "concept-nav-link-active" : ""
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-1 sm:gap-2">
            <button
              type="button"
              className="concept-cart-btn nav-icon-btn relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.5} />
              <span className="concept-cart-badge cart-badge absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full px-0.5 text-[10px] font-extrabold leading-none">
                0
              </span>
            </button>
            <button
              type="button"
              className="nav-icon-btn lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gradient-to-b from-[var(--surface-dark)] to-[var(--deep-navy)] p-6 text-white lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <span className="premium-eyebrow-gold font-display">Menu</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {[...navLinks, ...mobileExtra].map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-lg font-medium tracking-wide text-[var(--soft-ivory)]/85 transition-colors hover:bg-white/5 hover:text-[var(--soft-ivory)]"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex flex-col gap-1">
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-white/5"
                >
                  <User className="h-5 w-5 text-[var(--luxury-gold)]" />
                  My Account
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-lg font-medium transition-colors hover:bg-white/5"
                >
                  <ShoppingBag className="h-5 w-5 text-[var(--luxury-gold)]" />
                  Cart
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
