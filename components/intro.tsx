"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { clientsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useI18n } from "@/context/i18n-context";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bleriotnoguia/",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/bleriotnoguia",
    icon: FaGithub,
  },
  {
    label: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=237672077465",
    icon: FaWhatsapp,
  },
];

function HeadlineLines({
  lines,
  className,
}: {
  lines: string[];
  className: string;
}) {
  return (
    <span aria-hidden="true" className={className}>
      {lines.map((line, index) => (
        <span
          key={line}
          className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
        >
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.8, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { t } = useI18n();
  // The same sentence broken for wide screens and for phones, so each line
  // can be revealed on its own without the browser re-wrapping it.
  const { headline } = t.hero;

  return (
    <section
      ref={ref}
      id="home"
      className="mx-auto max-w-page scroll-mt-28 px-4 pb-8 pt-32 sm:px-6 sm:pt-40"
    >
      <motion.p
        className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-3 pr-4 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        {t.hero.available}
      </motion.p>

      <h1 className="h-display mt-8 text-[clamp(2.25rem,0.75rem+6.6vw,6.5rem)]">
        <span className="sr-only">{headline.wide.join(" ")}</span>
        <HeadlineLines lines={headline.narrow} className="sm:hidden" />
        <HeadlineLines lines={headline.wide} className="hidden sm:block" />
      </h1>

      <motion.div
        className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease }}
      >
        <p className="max-w-[52ch] text-lg leading-relaxed text-muted lg:col-span-6 lg:text-xl">
          {t.hero.lead}
        </p>

        <div className="flex flex-wrap items-center gap-3 lg:col-span-6 lg:justify-end">
          <Link
            href="#contact"
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
            }}
            className="inline-flex h-12 items-center rounded-full bg-signal px-5 font-semibold text-on-signal transition hover:brightness-95 sm:px-6"
          >
            {t.hero.cta}
          </Link>
          <a
            href={t.hero.cvFile}
            download={t.hero.cvFileName}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-5 font-semibold transition-colors hover:border-ink/30 sm:px-6"
          >
            {t.hero.cv}
            <FiDownload aria-hidden className="h-4 w-4" />
          </a>
          <ul className="flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink/80 transition-colors hover:border-ink/30 hover:text-ink"
                >
                  <Icon className="h-[1.1rem] w-[1.1rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:gap-10 lg:mt-24">
        <p className="shrink-0 text-sm text-muted">{t.hero.clients}</p>
        <ul className="stretch-semi flex flex-wrap gap-x-8 gap-y-2 text-lg font-semibold tracking-tight text-ink/70">
          {clientsData.map((client) => (
            <li key={client}>{client}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
