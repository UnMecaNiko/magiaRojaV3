import { ListaDatos } from "web";

const DATOS_HERO = [
  { etiqueta: "Potencia óptica", valor: "30 W" },
  { etiqueta: "Área útil en mm", valor: "500 × 500" },
  { etiqueta: "Movimiento motorizado", valor: "X · Y · Z" },
];

const ESPECIFICACIONES = [
  { etiqueta: "Dimensiones externas", valor: "500 × 500 mm" },
  { etiqueta: "Área de trabajo", valor: "500 × 500 mm" },
  { etiqueta: "Potencia óptica", valor: "30 W" },
  { etiqueta: "Longitud de onda", valor: "450 nm" },
  { etiqueta: "Cabezal", valor: "Laser Tree K30" },
  { etiqueta: "Asistencia de aire", valor: "Integrada" },
  { etiqueta: "Movimiento", valor: "Ejes X, Y y Z motorizado" },
  { etiqueta: "Control", valor: "Arduino + CNC Shield + GRBL" },
];

export function Destacados() {
  return <ListaDatos datos={DATOS_HERO} variante="destacados" />;
}

export function Especificaciones() {
  return <ListaDatos datos={ESPECIFICACIONES} variante="especificaciones" />;
}
