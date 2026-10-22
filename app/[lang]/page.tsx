import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import Services from "@/components/services";
import BlogSection from "@/components/blog-section";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/blog";
import { isLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const posts = getPosts(lang).slice(0, 3);

  return (
    <main>
      <Intro />
      <Projects />
      <Services />
      <Experience />
      <About />
      <BlogSection posts={posts} />
      <Contact />
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1207669810373228');
          fbq('track', 'PageView');
          `}
      </Script>
      <noscript>
        {/* A plain img on purpose: next/image would fail on this unconfigured host and break server rendering. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          alt=""
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1207669810373228&ev=PageView&noscript=1"
        />
      </noscript>
    </main>
  );
}
