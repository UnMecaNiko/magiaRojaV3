import type { ReactNode } from "react";
import estilos from "./pildora.module.css";

type PildoraProps = {
  children: ReactNode;
  /** Etiqueta dentro de una lista: se renderiza como <li>. */
  como?: "li" | "span";
};

/** Etiqueta corta sobre fondo oscuro o fotografía. */
export function Pildora({ children, como = "span" }: PildoraProps) {
  const Etiqueta = como;
  return <Etiqueta className={estilos.pildora}>{children}</Etiqueta>;
}
