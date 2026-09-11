import { EnlaceTexto } from "web";

export function ConIcono() {
  return (
    <EnlaceTexto href="#posibilidades" icono="↓">
      Explorar posibilidades
    </EnlaceTexto>
  );
}

export function SinIcono() {
  return <EnlaceTexto href="#inicio">Volver arriba</EnlaceTexto>;
}
