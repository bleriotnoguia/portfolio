import type { Metadata } from "next";
import Header from "@/components/header";
import "../globals.css";
import { Archivo } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import ThemeContextProvider from "@/context/theme-context";
import I18nProvider from "@/context/i18n-context";
import ReducedMotion from "@/components/reduced-motion";
import { getDictionary } from "@/dictionaries";
import { notFound } from "next/navigation";
import { isLocale, locales, SITE_URL } from "@/lib/i18n";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Applies the saved or system theme before first paint to avoid a flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

// Only /en and /fr exist; the proxy redirects everything else.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

type LayoutParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={archivo.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="font-sans">
        <I18nProvider locale={lang} dictionary={getDictionary(lang)}>
          <ThemeContextProvider>
            <ActiveSectionContextProvider>
              <ReducedMotion>
                <Header />
                {children}
                <Footer />
              </ReducedMotion>
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: "rgb(var(--surface))",
                    color: "rgb(var(--ink))",
                    border: "1px solid rgb(var(--line))",
                    borderRadius: "14px",
                    fontSize: "15px",
                  },
                }}
              />
            </ActiveSectionContextProvider>
          </ThemeContextProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
