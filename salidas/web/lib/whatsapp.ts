import { siteConfig } from "@/content/site";

export function buildWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(message || siteConfig.whatsappMessage);
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");

  return number
    ? `https://wa.me/${number}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
