import { TarjetaAplicacion } from "web";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23bdbdb7'/%3E%3C/svg%3E";

export function Simple() {
  return (
    <TarjetaAplicacion
      eyebrow="Decoración y hogar"
      titulo="Convierte superficies planas en piezas con identidad"
      imagen={PLACEHOLDER}
      alt="CNC Magia Roja junto a una colección de arte mural cortado en madera"
      etiquetas={["Arte mural por capas", "Letreros y números", "Cajas y organizadores"]}
    />
  );
}

export function Ancha() {
  return (
    <TarjetaAplicacion
      eyebrow="Publicidad y marca"
      titulo="Haz visible una empresa en cada punto de contacto"
      imagen={PLACEHOLDER}
      alt="Colección de señalización corporativa junto a la CNC Magia Roja"
      etiquetas={["Señalización y placas", "Letras por capas", "Exhibidores y portamenús"]}
      ancha
    />
  );
}
