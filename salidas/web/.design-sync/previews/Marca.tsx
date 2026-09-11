import { Marca } from "web";

export function Claro() {
  return <Marca aria-label="VELO inc, inicio" />;
}

export function Oscuro() {
  return (
    <div
      style={{
        background: "var(--fondo-oscuro)",
        padding: "var(--espacio-6)",
        borderRadius: "var(--radio-md)",
      }}
    >
      <Marca tono="oscuro" aria-label="VELO inc, inicio" />
    </div>
  );
}
