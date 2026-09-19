import Link from "next/link";
import { copy } from "@/content/copy";
import type { Locale } from "@/lib/locale";
import styles from "./language-switcher.module.css";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <nav className={styles.langSwitch} aria-label={t.langAria}>
      <Link
        href="/es"
        hrefLang="es"
        lang="es"
        aria-current={locale === "es" ? "page" : undefined}
      >
        ES
      </Link>
      <span aria-hidden="true">·</span>
      <Link
        href="/en"
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </Link>
    </nav>
  );
}
