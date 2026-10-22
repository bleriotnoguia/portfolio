// Server-only: reads Markdown articles from content/blog/<slug>/<locale>.md.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import hljs from "highlight.js/lib/common";
import type { Locale } from "./i18n";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const markdown = new Marked({
  gfm: true,
  renderer: {
    // Highlighting happens at build time, so no JavaScript ships for it.
    code({ text, lang }: Tokens.Code) {
      const language = lang && hljs.getLanguage(lang) ? lang : undefined;
      const html = language
        ? hljs.highlight(text, { language }).value
        : escapeHtml(text);
      return `<pre><code class="hljs${
        language ? ` language-${language}` : ""
      }">${html}</code></pre>\n`;
    },
    // Anchors on headings so sections can be linked to.
    heading({ tokens, depth, text }: Tokens.Heading) {
      const id = slugify(text);
      return `<h${depth} id="${id}">${this.parser.parseInline(
        tokens
      )}</h${depth}>\n`;
    },
  },
});

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function readPost(locale: Locale, slug: string) {
  const file = path.join(BLOG_DIR, slug, `${locale}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const words = content.split(/\s+/).filter(Boolean).length;

  const meta: PostMeta = {
    slug,
    title: String(data.title),
    description: String(data.description),
    // gray-matter turns unquoted YAML dates into Date objects.
    date:
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };

  return { meta, content };
}

export function getPosts(locale: Locale): PostMeta[] {
  return getPostSlugs()
    .map((slug) => readPost(locale, slug).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(locale: Locale, slug: string): Post | null {
  if (!getPostSlugs().includes(slug)) return null;
  const { meta, content } = readPost(locale, slug);
  return { ...meta, html: markdown.parse(content) as string };
}
