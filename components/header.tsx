"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { FiMenu, FiX } from "react-icons/fi";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useI18n } from "@/context/i18n-context";
import type { SectionName } from "@/lib/types";
import ThemeSwitch from "./theme-switch";
import LanguageSwitch from "./language-switch";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { locale, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const navLinks: { name: SectionName; label: string; href: string }[] = [
    { name: "Work", label: t.nav.work, href: `/${locale}#work` },
    { name: "Services", label: t.nav.services, href: `/${locale}#services` },
    {
      name: "Experience",
      label: t.nav.experience,
      href: `/${locale}#experience`,
    },
    { name: "About", label: t.nav.about, href: `/${locale}#about` },
    { name: "Blog", label: t.nav.blog, href: `/${locale}/blog` },
  ];

  const goTo = (name: SectionName) => {
    setActiveSection(name);
    setTimeOfLastClick(Date.now());
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <motion.nav
        aria-label={t.nav.main}
        className="mx-auto flex h-14 max-w-page items-center justify-between gap-2 rounded-full border border-line bg-surface/80 px-2 backdrop-blur-md"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href={`/${locale}#home`}
          onClick={() => goTo("Home")}
          className="flex shrink-0 items-center gap-2.5 rounded-full pr-3"
        >
          <Image
            src="/profile.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="stretch-semi text-[0.95rem] font-bold tracking-tight">
            Blériot Noguia
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 text-[0.95rem] lg:flex">
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              <Link
                href={link.href}
                onClick={() => goTo(link.name)}
                aria-current={activeSection === link.name ? "true" : undefined}
                className={clsx(
                  "relative isolate block rounded-full px-3.5 py-2 transition-colors",
                  activeSection === link.name
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                )}
              >
                {link.label}
                {activeSection === link.name && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 -z-10 rounded-full bg-sunken"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LanguageSwitch className="hidden sm:flex" />
          <ThemeSwitch />
          <Link
            href={`/${locale}#contact`}
            onClick={() => goTo("Contact")}
            className="hidden h-10 items-center whitespace-nowrap rounded-full bg-signal px-5 text-[0.95rem] font-semibold text-on-signal transition hover:brightness-95 sm:inline-flex"
          >
            {t.nav.cta}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sunken lg:hidden"
          >
            {menuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mx-auto mt-2 max-w-page rounded-[1.5rem] border border-line bg-surface p-3 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => goTo(link.name)}
                    className="h-section block rounded-2xl px-3 py-3 text-2xl hover:bg-sunken"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center gap-2">
              <Link
                href={`/${locale}#contact`}
                onClick={() => goTo("Contact")}
                className="flex h-12 flex-1 items-center justify-center rounded-full bg-signal font-semibold text-on-signal"
              >
                {t.nav.cta}
              </Link>
              <LanguageSwitch className="flex sm:hidden" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
