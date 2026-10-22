"use client";

import React from "react";
import Link from "next/link";
import SectionHeading from "./section-heading";
import Project from "./project";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useI18n } from "@/context/i18n-context";
import { format } from "@/lib/i18n";

const FEATURED_COUNT = 6;

// Alternating wide and narrow columns give the grid its rhythm on desktop.
const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5",
];

export default function Projects() {
  const { ref } = useSectionInView("Work", 0.2);
  const { locale, t } = useI18n();

  return (
    <section
      ref={ref}
      id="work"
      className="mx-auto max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <SectionHeading
        intro={t.work.intro}
        aside={
          <Link
            href={`/${locale}/projects`}
            className="shrink-0 font-semibold underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            {format(t.work.seeAll, { count: projectsData.length })}
          </Link>
        }
      >
        {t.work.title}
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
        {projectsData.slice(0, FEATURED_COUNT).map((project, index) => (
          <Project
            key={project.title}
            {...project}
            className={spans[index]}
            stageClassName="aspect-[16/10] lg:aspect-auto lg:h-[22rem]"
            sizes={
              spans[index] === "lg:col-span-7"
                ? "(min-width: 1024px) 700px, (min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
            }
          />
        ))}
      </div>
    </section>
  );
}
