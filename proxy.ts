import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  locales,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n";

// The visitor's explicit choice wins, then their browser languages in order.
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  const match = ranked.find(({ language }) => isLocale(language));
  return match ? (match.language as Locale) : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${
    pathname === "/" ? "" : pathname
  }`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, CV.pdf…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
