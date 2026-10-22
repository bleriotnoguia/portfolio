"use client";

import React from "react";
import clsx from "clsx";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { useI18n } from "@/context/i18n-context";

export default function Services() {
  const { ref } = useSectionInView("Services", 0.4);
  const { t } = useI18n();

  return (
    <section
      ref={ref}
      id="services"
      className="mx-auto max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <SectionHeading intro={t.services.intro}>
        {t.services.title}
      </SectionHeading>

      <ul className="grid gap-x-8 md:grid-cols-3">
        {t.services.items.map((service) => (
          <li
            key={service.title}
            className={clsx(
              "flex flex-col border-t py-8",
              // The AI offer is the one to notice, so it carries the accent rule.
              service.highlight ? "border-t-4 border-signal" : "border-line"
            )}
          >
            <h3 className="stretch-semi text-2xl font-bold tracking-tight">
              {service.title}
            </h3>
            <p className="mt-3 max-w-[42ch] leading-relaxed text-muted">
              {service.text}
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="rounded-md border border-line px-2 py-0.5 text-[0.8125rem] text-ink/75"
                >
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
