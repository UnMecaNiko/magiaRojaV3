import { getCampaign } from "@/lib/campaign";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, payload);
}

export function trackWhatsAppClick(
  ctaLocation: string,
  interest: string,
) {
  const campaign = getCampaign();
  const payload = {
    cta_location: ctaLocation,
    interest,
    page_path: window.location.pathname,
    ...campaign,
  };

  trackEvent("whatsapp_click", payload);
  window.fbq?.("track", "Contact", payload);
}
