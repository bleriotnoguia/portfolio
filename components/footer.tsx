"use client";

import React from "react";
import { useI18n } from "@/context/i18n-context";

const footerLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bleriotnoguia/" },
  { label: "GitHub", href: "https://github.com/bleriotnoguia" },
  { label: "Blog", href: "https://blog.bleriotnoguia.com" },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=237672077465",
  },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mx-auto max-w-page px-4 pb-10 sm:px-6">
      <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="stretch-semi text-lg font-bold tracking-tight">
            Blériot Noguia
          </p>
          <p className="mt-1 max-w-[52ch] text-sm text-muted">
            {t.footer.builtWith}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-sm text-muted">
        &copy; {new Date().getFullYear()} Blériot Noguia
      </p>
    </footer>
  );
}
