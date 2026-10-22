"use client";

import React from "react";
import Link from "next/link";
import SectionHeading from "./section-heading";
import PostCard from "./post-card";
import type { PostMeta } from "@/lib/blog";
import { useSectionInView } from "@/lib/hooks";
import { useI18n } from "@/context/i18n-context";

export default function BlogSection({ posts }: { posts: PostMeta[] }) {
  const { ref } = useSectionInView("Blog", 0.3);
  const { locale, t } = useI18n();

  if (posts.length === 0) return null;

  return (
    <section
      ref={ref}
      id="blog"
      className="mx-auto max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
    >
      <SectionHeading
        intro={t.blog.homeIntro}
        aside={
          <Link
            href={`/${locale}/blog`}
            className="shrink-0 font-semibold underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            {t.blog.seeAll}
          </Link>
        }
      >
        {t.blog.title}
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            locale={locale}
            readingTimeLabel={t.blog.readingTime}
          />
        ))}
      </div>
    </section>
  );
}
