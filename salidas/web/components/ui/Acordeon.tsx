import estilos from "./acordeon.module.css";

export type ItemAcordeon = {
  pregunta: string;
  respuesta: string;
};

type AcordeonProps = {
  items: ItemAcordeon[];
  /** Índice del item que arranca abierto. `null` los deja todos cerrados. */
  abiertoPorDefecto?: number | null;
};

/**
 * Lista de preguntas y respuestas.
 *
 * Usa `<details>` nativo a propósito: funciona sin JavaScript y el estado
 * abierto/cerrado ya lo anuncian los lectores de pantalla sin ARIA extra.
 */
export function Acordeon({ items, abiertoPorDefecto = 0 }: AcordeonProps) {
  return (
    <div className={estilos.acordeon}>
      {items.map((item, indice) => (
        <details key={item.pregunta} open={indice === abiertoPorDefecto}>
          <summary>
            {item.pregunta}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{item.respuesta}</p>
        </details>
      ))}
    </div>
  );
}
