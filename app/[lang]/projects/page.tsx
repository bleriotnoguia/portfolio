import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Project from "@/components/project";
import ActiveSection from "@/components/active-section";
import { projectsData } from "@/lib/data";
import { getDictionary } from "@/dictionaries";
import { format, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    title: `${t.projectsPage.title} | Blériot Noguia`,
    description: format(t.projectsPage.intro, { count: projectsData.length }),
    alternates: {
      canonical: `/${lang}/projects`,
      languages: { en: "/en/projects", fr: "/fr/projects" },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <main className="mx-auto max-w-page px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <ActiveSection name="Work" />
      <Link
        href={`/${lang}#work`}
        className="inline-flex items-center gap-2 text-[0.95rem] text-muted transition-colors hover:text-ink"
      >
        <FiArrowLeft aria-hidden className="h-4 w-4" />
        {t.projectsPage.back}
      </Link>
      <h1 className="h-display mt-6 text-[clamp(2.5rem,1rem+5vw,5.5rem)]">
        {t.projectsPage.title}
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
        {format(t.projectsPage.intro, { count: projectsData.length })}
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <Project
            key={project.title}
            {...project}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          />
        ))}
      </div>
    </main>
  );
}
