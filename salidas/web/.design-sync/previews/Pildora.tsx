import { Pildora } from "web";

export function Aislada() {
  return (
    <div
      style={{
        background: "var(--fondo-seccion-oscura)",
        padding: "var(--espacio-6)",
        borderRadius: "var(--radio-md)",
      }}
    >
      <Pildora>Arte mural por capas</Pildora>
    </div>
  );
}

export function EnLista() {
  return (
    <ul
      style={{
        display: "flex",
        gap: "var(--espacio-2)",
        flexWrap: "wrap",
        listStyle: "none",
        margin: 0,
        padding: "var(--espacio-6)",
        background: "var(--fondo-seccion-oscura)",
        borderRadius: "var(--radio-md)",
      }}
    >
      <Pildora como="li">Parches de cuero natural</Pildora>
      <Pildora como="li">Etiquetas de denim</Pildora>
      <Pildora como="li">Apliques de fieltro</Pildora>
    </ul>
  );
}
