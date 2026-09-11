import { SectionHeading } from "web";

export function Izquierda() {
  return (
    <SectionHeading
      eyebrow="Posibilidades"
      title="Una máquina. Muchos caminos."
      description="No empieces por la especificación técnica. Empieza por el producto que quieres poner en manos de tus clientes."
    />
  );
}

export function Centrado() {
  return (
    <SectionHeading
      eyebrow="Preguntas frecuentes"
      title="Lo esencial, antes de conversar."
      align="center"
    />
  );
}
