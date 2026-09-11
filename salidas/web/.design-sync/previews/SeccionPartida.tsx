import { ListaDatos, SeccionPartida } from "web";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23d7d4ce'/%3E%3C/svg%3E";

export function MaterialesIzquierda() {
  return (
    <SeccionPartida
      tono="tinta"
      ladoImagen="izquierda"
      imagen={PLACEHOLDER}
      alt="Muestrario de materiales grabados y cortados"
    >
      <p className="eyebrow">Materiales</p>
      <h2>La potencia se entiende mejor cuando se convierte en opciones.</h2>
      <p>
        El Laser Tree K30 combina 30 W ópticos, una longitud de onda de 450 nm
        y asistencia de aire integrada para trabajar materiales compatibles
        con precisión.
      </p>
    </SeccionPartida>
  );
}

export function MaquinaDerecha() {
  return (
    <SeccionPartida
      tono="crema"
      ladoImagen="derecha"
      imagen={PLACEHOLDER}
      alt="CNC Magia Roja v3 con su tapa roja cerrada"
    >
      <p className="eyebrow">Magia Roja v3</p>
      <h2>La máquina detrás de las posibilidades.</h2>
      <p>
        Una plataforma CNC de escritorio con control abierto, movimiento en
        tres ejes y un cabezal láser pensado para convertir diseños en piezas
        precisas.
      </p>
      <ListaDatos
        datos={[
          { etiqueta: "Dimensiones externas", valor: "500 × 500 mm" },
          { etiqueta: "Potencia óptica", valor: "30 W" },
          { etiqueta: "Cabezal", valor: "Laser Tree K30" },
        ]}
      />
    </SeccionPartida>
  );
}
