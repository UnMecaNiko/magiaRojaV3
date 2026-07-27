import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent";
import { siteConfig } from "@/content/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.product,
  manifest: "/manifest.webmanifest",
  keywords: [
    "máquina CNC",
    "corte láser",
    "grabado láser",
    "CNC 30W",
    "máquina para letreros",
    "CNC para publicidad",
    "VELO inc",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: siteConfig.company,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/images/detalles/og-social-1200x630.png",
        width: 1200,
        height: 630,
        alt: "CNC Magia Roja v3 y productos creados con corte láser",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/detalles/og-social-1200x630.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${cormorant.variable}`}
    >
      <body>
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
