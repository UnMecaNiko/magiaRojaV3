export const siteConfig = {
  company: "VELO inc",
  product: "CNC Magia Roja v3",
  url:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
    "http://localhost:3000",
  whatsappNumber:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ||
    "",
} as const;
