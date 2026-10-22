import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import BlogCover from "@/components/blog-cover";
import PostCard from "@/components/post-card";
import ActiveSection from "@/components/active-section";
import { getPost, getPostSlugs, getPosts } from "@/lib/blog";
import { getDictionary } from "@/dictionaries";
import { format, formatDate, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = getPost(lang, slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blériot Noguia`,
    description: post.description,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: { en: `/en/blog/${slug}`, fr: `/fr/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ["Blériot Noguia"],
      tags: post.tags,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = getPost(lang, slug);
  if (!post) notFound();

  const t = getDictionary(lang);
  const others = getPosts(lang)
    .filter((other) => other.slug !== slug)
    .slice(0, 2);

  return (
    <main className="mx-auto max-w-page px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
      <ActiveSection name="Blog" />
      <Link
        href={`/${lang}/blog`}
        className="inline-flex items-center gap-2 text-[0.95rem] text-muted transition-colors hover:text-ink"
      >
        <FiArrowLeft aria-hidden className="h-4 w-4" />
        {t.blog.backToBlog}
      </Link>

      <header className="mt-8 max-w-4xl">
        <ul className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line px-2 py-0.5 text-[0.8125rem] text-ink/75"
            >
              {tag}
            </li>
          ))}
        </ul>
        <h1 className="h-section mt-5 text-[clamp(2.25rem,1.1rem+3.6vw,4.25rem)] leading-[1.02]">
          {post.title}
        </h1>
        <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted">
          {post.description}
        </p>
        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(lang, post.date)}</time>
          <span>
            {format(t.blog.readingTime, { minutes: post.readingMinutes })}
          </span>
        </p>
      </header>

      <BlogCover
        slug={post.slug}
        locale={lang}
        className="mt-10 aspect-[40/21] w-full overflow-hidden rounded-[1.5rem]"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <article
          className="prose prose-lg min-w-0 lg:col-span-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <aside className="lg:col-span-4">
          <div className="rounded-[1.5rem] border border-line bg-surface p-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <Image
                src="/profile.png"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="stretch-semi font-bold tracking-tight">
                  Blériot Noguia
                </p>
                <p className="text-sm text-muted">{t.blog.authorRole}</p>
              </div>
            </div>
            <p className="stretch-semi mt-6 text-xl font-bold tracking-tight">
              {t.blog.ctaTitle}
            </p>
            <p className="mt-2 leading-relaxed text-muted">{t.blog.ctaText}</p>
            <Link
              href={`/${lang}#contact`}
              className="mt-5 inline-flex h-11 items-center rounded-full bg-signal px-5 font-semibold text-on-signal transition hover:brightness-95"
            >
              {t.blog.ctaButton}
            </Link>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-24 border-t border-line pt-12">
          <h2 className="h-section text-[clamp(1.75rem,1.2rem+2vw,2.75rem)]">
            {t.blog.moreTitle}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((other) => (
              <PostCard
                key={other.slug}
                post={other}
                locale={lang}
                readingTimeLabel={t.blog.readingTime}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
