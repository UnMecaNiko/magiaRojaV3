import type { ReactNode } from "react";
import estilos from "./enlace-texto.module.css";

type EnlaceTextoProps = {
  children: ReactNode;
  href: string;
  /** Glifo decorativo al final (una flecha, por ejemplo). Se oculta a lectores. */
  icono?: string;
};

/** Enlace secundario: acompaña a un botón sin competir con él. */
export function EnlaceTexto({ children, href, icono }: EnlaceTextoProps) {
  return (
    <a className={estilos.enlace} href={href}>
      {children}
      {icono && (
        <span className={estilos.icono} aria-hidden="true">
          {icono}
        </span>
      )}
    </a>
  );
}
