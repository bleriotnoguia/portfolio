"use client";

import React from "react";
import Image from "next/image";
import { stackData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useI18n } from "@/context/i18n-context";

export default function About() {
  const { ref } = useSectionInView("About", 0.3);
  const { t } = useI18n();
  const [first, ...rest] = t.about.paragraphs;

  return (
    <section
      ref={ref}
      id="about"
      className="mx-auto max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="h-section text-[clamp(2.25rem,1.4rem+3vw,3.75rem)]">
            {t.about.title}
          </h2>
          <Image
            src="/profile.png"
            alt={t.about.portraitAlt}
            width={400}
            height={400}
            className="mt-8 aspect-square w-full max-w-[18rem] rounded-[1.5rem] object-cover"
          />
        </div>

        <div className="lg:col-span-8 lg:pt-2">
          <div className="max-w-[60ch] space-y-5 text-lg leading-relaxed lg:text-xl lg:leading-relaxed">
            <p>{first}</p>
            {rest.map((paragraph) => (
              <p key={paragraph} className="text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <h3 className="stretch-semi mt-14 text-xl font-bold tracking-tight">
            {t.about.stackTitle}
          </h3>
          <dl className="mt-5 border-t border-line">
            {stackData.map(({ group, items }) => (
              <div
                key={group}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="text-muted">{t.about.stackGroups[group]}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
