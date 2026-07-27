"use client";

import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

type WhatsAppLinkProps = {
  children: ReactNode;
  className?: string;
  location: string;
  interest?: string;
  message?: string;
  showIcon?: boolean;
};

export function WhatsAppLink({
  children,
  className,
  location,
  interest = "general",
  message,
  showIcon = true,
}: WhatsAppLinkProps) {
  const finalMessage =
    message ||
    `Hola, quiero conocer más sobre la CNC Magia Roja v3 para ${interest}.`;

  return (
    <a
      className={className}
      href={buildWhatsAppUrl(finalMessage)}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackWhatsAppClick(location, interest)}
      aria-label={`${String(children)} por WhatsApp`}
    >
      {showIcon && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20.5 11.8a8.5 8.5 0 0 1-12.56 7.46L3 20.5l1.3-4.79A8.5 8.5 0 1 1 20.5 11.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 7.7c.2-.45.4-.46.72-.47h.61c.19 0 .4.07.5.34l.72 1.73c.09.23.05.4-.08.58l-.57.69c-.16.18-.12.35-.02.52.62 1.08 1.45 1.91 2.54 2.51.2.11.36.12.52-.06l.78-.9c.17-.2.36-.22.6-.13l1.68.8c.25.12.42.25.44.44.03.34-.1 1.17-.51 1.57-.43.43-1.16.66-1.89.66-.61 0-1.39-.18-2.65-.73-1.56-.68-3.81-2.54-4.68-4.23-.42-.82-.71-1.7-.67-2.32.03-.48.17-.75.26-.98Z"
            fill="currentColor"
          />
        </svg>
      )}
      <span>{children}</span>
    </a>
  );
}
