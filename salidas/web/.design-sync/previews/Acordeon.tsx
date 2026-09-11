import { Acordeon } from "web";

const FAQ = [
  {
    pregunta: "¿Qué tamaño tiene el área de trabajo?",
    respuesta:
      "La CNC Magia Roja v3 ofrece un área útil de trabajo de 500 × 500 mm.",
  },
  {
    pregunta: "¿Qué materiales puede trabajar?",
    respuesta:
      "El cabezal K30 permite cortar y grabar madera, contrachapado, MDF, papel, cartón, cuero natural y acrílicos oscuros compatibles.",
  },
  {
    pregunta: "¿Puede cortar metal o acrílico transparente?",
    respuesta:
      "No. Esta configuración está orientada a materiales compatibles con láser de diodo azul.",
  },
  {
    pregunta: "¿Qué software utiliza?",
    respuesta:
      "La plataforma GRBL es compatible con herramientas conocidas como LightBurn y LaserGRBL.",
  },
  {
    pregunta: "¿Incluye mantenimiento?",
    respuesta:
      "Sí. Incluye cobertura de mantenimiento durante seis meses, con un servicio cada dos meses.",
  },
];

export function PreguntasFrecuentes() {
  return <Acordeon items={FAQ} />;
}
