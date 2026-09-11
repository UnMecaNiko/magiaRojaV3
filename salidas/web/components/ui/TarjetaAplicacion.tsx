import Image from "next/image";
import { Pildora } from "./Pildora";
import estilos from "./tarjeta-aplicacion.module.css";

type TarjetaAplicacionProps = {
  id?: string;
  eyebrow: string;
  titulo: string;
  imagen: string;
  /** Texto alternativo de la imagen. Obligatorio: la tarjeta es contenido, no adorno. */
  alt: string;
  /** Etiquetas cortas que se muestran al pie. */
  etiquetas?: string[];
  /** Ocupa dos columnas de la rejilla. En móvil vuelve a una. */
  ancha?: boolean;
};

/**
 * Tarjeta de aplicación: una fotografía a sangre con el texto encima,
 * protegido por un velo oscuro.
 */
export function TarjetaAplicacion({
  id,
  eyebrow,
  titulo,
  imagen,
  alt,
  etiquetas = [],
  ancha = false,
}: TarjetaAplicacionProps) {
  return (
    <article
      className={[estilos.tarjeta, ancha ? estilos.ancha : ""]
        .filter(Boolean)
        .join(" ")}
      id={id}
    >
      <Image
        src={imagen}
        alt={alt}
        fill
        sizes={
          ancha
            ? "(max-width: 760px) 100vw, 66vw"
            : "(max-width: 760px) 100vw, 33vw"
        }
      />
      <div className={estilos.velo} />
      <div className={estilos.contenido}>
        <p className={estilos.eyebrow}>{eyebrow}</p>
        <h3 className={estilos.titulo}>{titulo}</h3>
        {etiquetas.length > 0 && (
          <ul className={estilos.etiquetas}>
            {etiquetas.map((etiqueta) => (
              <Pildora key={etiqueta} como="li">
                {etiqueta}
              </Pildora>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
