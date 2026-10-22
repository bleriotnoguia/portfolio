import React from "react";
import Link from "next/link";
import clsx from "clsx";
import BlogCover from "./blog-cover";
import type { PostMeta } from "@/lib/blog";
import { format, formatDate, type Locale } from "@/lib/i18n";

type PostCardProps = {
  post: PostMeta;
  locale: Locale;
  readingTimeLabel: string;
  className?: string;
};

export default function PostCard({
  post,
  locale,
  readingTimeLabel,
  className,
}: PostCardProps) {
  return (
    <article
      className={clsx(
        "group relative flex flex-col rounded-[1.5rem] border border-line bg-surface p-2.5 transition-colors hover:border-ink/25",
        className
      )}
    >
      <BlogCover
        slug={post.slug}
        locale={locale}
        className="aspect-[40/21] w-full overflow-hidden rounded-[1.1rem]"
      />
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5 sm:px-4">
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(locale, post.date)}</time>
          <span>
            {format(readingTimeLabel, { minutes: post.readingMinutes })}
          </span>
        </p>
        <h3 className="stretch-semi mt-2 text-xl font-bold leading-snug tracking-tight">
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="stretched-link"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{post.description}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {post.tags.map((tag) => (
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
