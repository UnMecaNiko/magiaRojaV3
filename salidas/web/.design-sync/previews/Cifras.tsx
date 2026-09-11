import { Cifras } from "web";

const CIFRAS_MANTENIMIENTO = [
  { numero: "6", etiqueta: "meses de cobertura" },
  { numero: "3", etiqueta: "servicios incluidos" },
  { numero: "2", etiqueta: "meses entre servicios" },
];

export function Mantenimiento() {
  return <Cifras cifras={CIFRAS_MANTENIMIENTO} />;
}
