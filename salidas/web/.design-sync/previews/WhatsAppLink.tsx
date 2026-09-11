import { WhatsAppLink } from "web";

export function Primario() {
  return (
    <WhatsAppLink location="hero" variante="primario">
      Habla con nosotros
    </WhatsAppLink>
  );
}

export function CompactoSinIcono() {
  return (
    <WhatsAppLink location="header" showIcon={false} variante="compacto">
      Hablemos
    </WhatsAppLink>
  );
}

export function Secundario() {
  return (
    <WhatsAppLink
      location="maintenance"
      interest="el plan de mantenimiento"
      variante="secundario"
    >
      Consultar el plan
    </WhatsAppLink>
  );
}
