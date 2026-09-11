import estilos from "./cifras.module.css";

export type Cifra = {
  numero: string;
  etiqueta: string;
};

type CifrasProps = {
  cifras: Cifra[];
};

/**
 * Cifras destacadas en rojo con su etiqueta debajo.
 *
 * El número usa `--acento-texto`, no `--acento`: es texto sobre fondo claro y
 * el rojo de marca no alcanza el mínimo AA a ese tamaño de cuerpo.
 */
export function Cifras({ cifras }: CifrasProps) {
  return (
    <div className={estilos.cifras}>
      {cifras.map((cifra) => (
        <div className={estilos.fila} key={cifra.etiqueta}>
          <strong className={estilos.numero}>{cifra.numero}</strong>
          <span className={estilos.etiqueta}>{cifra.etiqueta}</span>
        </div>
      ))}
    </div>
  );
}
