"use client";

import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useI18n } from "@/context/i18n-context";
import { locales, localeNames, LOCALE_COOKIE } from "@/lib/i18n";

export default function LanguageSwitch({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() ?? "/";
  // Same page in the other language: /fr/blog/x -> /en/blog/x
  const rest = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={clsx(
        "items-center rounded-full border border-line p-0.5",
        className
      )}
    >
      {locales.map((target) => {
        const active = target === locale;
        return (
          // A plain <a> on purpose: the language is a param of the root layout, so a
          // client-side <Link> would rebuild <html> and <head> in the browser
          // (React then warns about the theme script). A full page load also
          // brings the right <html lang>, title and metadata from the server.
          <a
            key={target}
            href={`/${target}${rest}`}
            hrefLang={target}
            lang={target}
            aria-label={localeNames[target]}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              // Remembered by the proxy when the visitor comes back to "/".
              document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
            }}
            className={clsx(
              "grid h-8 min-w-[2.25rem] place-items-center rounded-full px-2 text-[0.8rem] font-semibold uppercase transition-colors",
              active ? "bg-ink text-paper" : "text-muted hover:text-ink"
            )}
          >
            {target}
          </a>
        );
      })}
    </div>
  );
}
