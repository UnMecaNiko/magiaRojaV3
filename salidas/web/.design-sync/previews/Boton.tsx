import { Boton } from "web";

export function Primario() {
  return <Boton variante="primario">Habla con nosotros</Boton>;
}

export function Secundario() {
  return <Boton variante="secundario">Consultar el plan</Boton>;
}

export function Compacto() {
  return <Boton variante="compacto">Hablemos</Boton>;
}

export function ComoEnlace() {
  return (
    <Boton variante="primario" href="#posibilidades">
      Explorar posibilidades
    </Boton>
  );
}
