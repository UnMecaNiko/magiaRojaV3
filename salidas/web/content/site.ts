export const siteConfig = {
  company: "VELO inc",
  product: "CNC Magia Roja v3",
  title: "CNC Magia Roja v3 | Corte y grabado láser",
  description:
    "Descubre todo lo que puedes crear con la CNC Magia Roja v3 de VELO inc: decoración, publicidad, invitaciones, textiles y educación.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  whatsappMessage:
    "Hola, quiero conocer más sobre la CNC Magia Roja v3 y sus aplicaciones.",
  navigation: [
    { label: "Posibilidades", href: "#posibilidades" },
    { label: "Materiales", href: "#materiales" },
    { label: "La máquina", href: "#maquina" },
    { label: "Mantenimiento", href: "#mantenimiento" },
  ],
} as const;
