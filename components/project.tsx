"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project as ProjectData } from "@/lib/data";
import { useI18n } from "@/context/i18n-context";
import { format } from "@/lib/i18n";

type ProjectProps = ProjectData & {
  className?: string;
  stageClassName?: string;
  sizes?: string;
};

export default function Project({
  title,
  category,
  description,
  tags,
  imageUrl,
  link,
  className,
  stageClassName = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw",
}: ProjectProps) {
  const { locale, t } = useI18n();

  return (
    <article
      className={clsx(
        "group relative flex flex-col rounded-[1.5rem] border border-line bg-surface p-2.5 transition-colors",
        link && "hover:border-ink/25",
        className
      )}
    >
      <div
        className={clsx(
          "relative overflow-hidden rounded-[1.1rem] bg-sunken",
          stageClassName
        )}
      >
        <Image
          src={imageUrl}
          alt={format(t.work.screenshotAlt, { title })}
          fill
          sizes={sizes}
          quality={90}
          placeholder="blur"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">{category[locale]}</p>
            <h3 className="stretch-semi mt-1 text-2xl font-bold tracking-tight">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stretched-link"
                >
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>
          </div>
          {link && (
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-on-signal"
            >
              <FiArrowUpRight className="h-[1.1rem] w-[1.1rem]" />
            </span>
          )}
        </div>

        <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">
          {description[locale]}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line px-2 py-0.5 text-[0.8125rem] text-ink/75"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
