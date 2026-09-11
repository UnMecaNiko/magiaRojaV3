import type { CSSProperties, ReactNode } from "react";
import estilos from "./seccion-partida.module.css";

export type TonoSeccion = "claro" | "crema" | "oscuro" | "tinta";

type SeccionPartidaProps = {
  children: ReactNode;
  imagen: string;
  alt: string;
  id?: string;
  /** Lado en que se ve la imagen en escritorio. En móvil siempre va debajo. */
  ladoImagen?: "izquierda" | "derecha";
  /** Fondo de la sección. `oscuro` y `tinta` invierten el color del texto. */
  tono?: TonoSeccion;
  alturaMinima?: number;
};

/**
 * Sección de dos columnas: una fotografía a sangre y una columna de texto.
 *
 * Reemplaza cuatro bloques que eran este mismo patrón repetido —materiales,
 * máquina, compañía y mantenimiento—, cada uno con su propio CSS.
 *
 * El texto va primero en el DOM siempre; `ladoImagen` solo cambia lo que se ve.
 */
export function SeccionPartida({
  children,
  imagen,
  alt,
  id,
  ladoImagen = "derecha",
  tono = "claro",
  alturaMinima,
}: SeccionPartidaProps) {
  const clase = [
    estilos.seccion,
    estilos[tono],
    ladoImagen === "izquierda" ? estilos.imagenIzquierda : estilos.imagenDerecha,
  ].join(" ");

  const estiloEnLinea = alturaMinima
    ? ({ "--altura-minima": `${alturaMinima}px` } as CSSProperties)
    : undefined;

  return (
    <section className={clase} id={id} style={estiloEnLinea}>
      <div className={estilos.copia}>{children}</div>
      <div className={estilos.imagen}>
        <img src={imagen} alt={alt} loading="lazy" />
      </div>
    </section>
  );
}
