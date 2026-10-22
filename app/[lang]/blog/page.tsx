import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostCard from "@/components/post-card";
import ActiveSection from "@/components/active-section";
import { getPosts } from "@/lib/blog";
import { getDictionary } from "@/dictionaries";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    title: `${t.blog.indexTitle} | Blériot Noguia`,
    description: t.blog.indexIntro,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: { en: "/en/blog", fr: "/fr/blog" },
    },
  };
}

export default async function BlogIndex({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const posts = getPosts(lang);

  return (
    <main className="mx-auto max-w-page px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <ActiveSection name="Blog" />
      <h1 className="h-display text-[clamp(2.5rem,1rem+5vw,5.5rem)]">
        {t.blog.indexTitle}
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
        {t.blog.indexIntro}
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            locale={lang}
            readingTimeLabel={t.blog.readingTime}
          />
        ))}
      </div>
    </main>
  );
}
