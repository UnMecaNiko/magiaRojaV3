import estilos from "./marca.module.css";

type MarcaProps = {
  /** Destino del enlace. Por defecto vuelve al inicio. */
  href?: string;
  /** Sobre fondo oscuro el logotipo se invierte. */
  tono?: "claro" | "oscuro";
  "aria-label"?: string;
};

/** Logotipo de VELO inc: el símbolo y el nombre, como una sola unidad. */
export function Marca({
  href = "#inicio",
  tono = "claro",
  "aria-label": ariaLabel,
}: MarcaProps) {
  const clase = [estilos.marca, tono === "oscuro" ? estilos.sobreOscuro : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={clase} href={href} aria-label={ariaLabel}>
      <span className={estilos.simbolo}>V</span>
      <span>
        VELO <small>inc</small>
      </span>
    </a>
  );
}
