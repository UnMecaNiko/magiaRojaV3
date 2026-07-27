export const specifications = [
  { label: "Dimensiones externas", value: "500 × 500 mm" },
  { label: "Área de trabajo", value: "400 × 400 mm" },
  { label: "Potencia óptica", value: "30 W" },
  { label: "Longitud de onda", value: "450 nm" },
  { label: "Cabezal", value: "Laser Tree K30" },
  { label: "Asistencia de aire", value: "Integrada" },
  { label: "Movimiento", value: "Ejes X, Y y Z motorizado" },
  { label: "Control", value: "Arduino + CNC Shield + GRBL" },
] as const;

export const materialGroups = [
  {
    title: "Corta y graba",
    materials: [
      "Madera",
      "Contrachapado",
      "MDF",
      "Papel",
      "Cartón",
      "Cuero natural",
      "Acrílico oscuro compatible",
    ],
  },
  {
    title: "Graba o marca",
    materials: [
      "Bambú",
      "Aluminio anodizado",
      "Metal pintado",
      "Metal recubierto",
      "Acero inoxidable",
    ],
  },
] as const;
