"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { captureCampaign } from "@/lib/campaign";
import styles from "./analytics-consent.module.css";

const CONSENT_KEY = "velo_analytics_consent";

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    captureCampaign();
    const frame = requestAnimationFrame(() => {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "rejected") {
        setConsent(stored);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  function choose(value: "accepted" | "rejected") {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent === "accepted" && pixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {consent === null && (gaId || pixelId) && (
        <aside className={styles.banner} aria-label="Preferencias de analítica">
          <p>
            Usamos analítica para saber qué contenidos llevan a una consulta por
            WhatsApp. No vemos el contenido de la conversación.
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={() => choose("rejected")}>
              Solo esenciales
            </button>
            <button
              className={styles.accept}
              type="button"
              onClick={() => choose("accepted")}
            >
              Aceptar analítica
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
