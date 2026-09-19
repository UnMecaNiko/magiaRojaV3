import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { locales } from "@/lib/locale";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    es: `${siteConfig.url}/es`,
    en: `${siteConfig.url}/en`,
  };

  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages },
  }));
}
