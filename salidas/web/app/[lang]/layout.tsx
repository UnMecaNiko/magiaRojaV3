import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { isLocale, locales, type Locale } from "@/lib/locale";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

function localeUrl(locale: Locale) {
  return `${siteConfig.url}/${locale}`;
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const t = copy[lang];
  const canonical = localeUrl(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: siteConfig.product,
    manifest: "/manifest.webmanifest",
    keywords: [...t.meta.keywords],
    alternates: {
      canonical,
      languages: {
        es: localeUrl("es"),
        en: localeUrl("en"),
        "x-default": localeUrl("en"),
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_CO" : "en_US",
      alternateLocale: lang === "es" ? ["en_US"] : ["es_CO"],
      url: canonical,
      siteName: siteConfig.company,
      title: t.meta.title,
      description: t.meta.description,
      images: [
        {
          url: "/images/detalles/og-social-1200x630.png",
          width: 1200,
          height: 630,
          alt: t.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/detalles/og-social-1200x630.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = copy[lang];

  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${cormorant.variable}`}
    >
      <body>
        {children}
        <AnalyticsConsent
          ariaLabel={t.analytics.aria}
          text={t.analytics.text}
          rejectLabel={t.analytics.reject}
          acceptLabel={t.analytics.accept}
        />
      </body>
    </html>
  );
}
