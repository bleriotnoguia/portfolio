"use client";

import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useI18n } from "@/context/i18n-context";
import { formatMonth } from "@/lib/i18n";

export default function Experience() {
  const { ref } = useSectionInView("Experience", 0.3);
  const { locale, t } = useI18n();

  return (
    <section
      id="experience"
      ref={ref}
      className="mx-auto max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <SectionHeading intro={t.experience.intro}>
        {t.experience.title}
      </SectionHeading>

      <ol className="border-t border-line">
        {experiencesData.map((item) => {
          const current = item.end === null;
          const dates = `${formatMonth(locale, item.start)} – ${
            item.end ? formatMonth(locale, item.end) : t.experience.present
          }`;

          return (
            <li
              key={`${item.company}-${item.start}`}
              className="grid gap-x-8 gap-y-3 border-b border-line py-8 md:grid-cols-12"
            >
              <div className="flex flex-wrap items-center gap-3 md:col-span-3 md:flex-col md:items-start md:gap-2 md:pt-1">
                <p className="tabular text-sm text-muted">{dates}</p>
                {current && (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-signal px-2.5 py-0.5 text-xs font-semibold text-on-signal">
                    {t.experience.current}
                  </p>
                )}
              </div>

              <div className="md:col-span-4">
                <h3 className="stretch-semi text-xl font-bold tracking-tight">
                  {item.title[locale]}
                </h3>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {item.company}
                    <FiArrowUpRight aria-hidden className="h-4 w-4" />
                  </a>
                ) : (
                  <p className="mt-1">{item.company}</p>
                )}
              </div>

              <p
                className="max-w-[60ch] leading-relaxed text-muted md:col-span-5 [&_a]:text-ink [&_a]:underline-offset-4"
                dangerouslySetInnerHTML={{ __html: item.description[locale] }}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
