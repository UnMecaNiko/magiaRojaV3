import estilos from "./lista-datos.module.css";

export type Dato = {
  /** La etiqueta: qué se está midiendo. */
  etiqueta: string;
  /** El valor. */
  valor: string;
};

type ListaDatosProps = {
  datos: Dato[];
  /**
   * `destacados`: fila horizontal con separadores, para cifras de cabecera.
   * `especificaciones`: rejilla de dos columnas con filas, para fichas técnicas.
   */
  variante?: "destacados" | "especificaciones";
};

/** Lista de pares etiqueta/valor. */
export function ListaDatos({
  datos,
  variante = "especificaciones",
}: ListaDatosProps) {
  return (
    <dl className={estilos[variante]}>
      {datos.map((dato) => (
        <div className={estilos.fila} key={dato.etiqueta}>
          <dt>{dato.etiqueta}</dt>
          <dd>{dato.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
