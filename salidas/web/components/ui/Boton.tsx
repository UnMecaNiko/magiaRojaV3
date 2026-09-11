import type { ReactNode } from "react";
import estilos from "./boton.module.css";

export type VarianteBoton = "primario" | "secundario" | "compacto";

export function clasesBoton(
  variante: VarianteBoton = "primario",
  extra?: string,
): string {
  return [estilos.base, estilos[variante], extra].filter(Boolean).join(" ");
}

type BotonProps = {
  children: ReactNode;
  /** Por defecto "primario": la acción principal, roja y con sombra. */
  variante?: VarianteBoton;
  /** Con `href` se renderiza un enlace; sin él, un botón. */
  href?: string;
  className?: string;
};

/**
 * Botón del sistema. Los CTA que abren WhatsApp no usan este componente sino
 * `WhatsAppLink`, que comparte estas mismas clases a través de `clasesBoton`:
 * necesita construir la URL y registrar la analítica, y envolverlo acá habría
 * duplicado esa lógica.
 */
export function Boton({
  children,
  variante = "primario",
  href,
  className,
}: BotonProps) {
  const clase = clasesBoton(variante, className);

  if (href) {
    return (
      <a className={clase} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={clase} type="button">
      {children}
    </button>
  );
}
