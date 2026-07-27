export type Application = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  products: string[];
  image: string;
  alt: string;
};

export const applications: Application[] = [
  {
    id: "decoracion",
    eyebrow: "Decoración y hogar",
    title: "Convierte superficies planas en piezas con identidad",
    description:
      "Crea colecciones decorativas con cortes precisos, relieves visuales y combinaciones de materiales que elevan cualquier espacio.",
    products: [
      "Arte mural por capas",
      "Letreros y números",
      "Cajas y organizadores",
      "Lámparas y portarretratos",
    ],
    image: "/images/aplicaciones/decoracion-arte-mural-4x3.png",
    alt: "CNC Magia Roja junto a una colección de arte mural cortado en madera",
  },
  {
    id: "textil",
    eyebrow: "Ropa y accesorios",
    title: "Detalles que hacen reconocible una marca",
    description:
      "Personaliza materiales aptos para láser y desarrolla accesorios con acabados definidos para prendas, bolsos y colecciones.",
    products: [
      "Parches de cuero natural",
      "Etiquetas de denim",
      "Apliques de fieltro",
      "Plantillas textiles",
    ],
    image: "/images/aplicaciones/textil-parches-cuero-4x3.png",
    alt: "Parches de cuero grabados frente a la CNC Magia Roja",
  },
  {
    id: "eventos",
    eyebrow: "Invitaciones y eventos",
    title: "Presentaciones que comienzan antes del evento",
    description:
      "Produce piezas coordinadas con cortes finos y detalles personalizados para celebraciones, lanzamientos y experiencias de marca.",
    products: [
      "Invitaciones caladas",
      "Números de mesa",
      "Marcasitios",
      "Cake toppers y recuerdos",
    ],
    image: "/images/aplicaciones/eventos-invitacion-papel-4x3.png",
    alt: "Invitaciones de papel calado producidas con la CNC Magia Roja",
  },
  {
    id: "publicidad",
    eyebrow: "Publicidad y marca",
    title: "Haz visible una empresa en cada punto de contacto",
    description:
      "Construye una familia visual coherente para mostradores, oficinas, eventos y productos promocionales.",
    products: [
      "Señalización y placas",
      "Letras por capas",
      "Exhibidores y portamenús",
      "Premios y promocionales",
    ],
    image:
      "/images/aplicaciones/publicidad-senalizacion-corporativa-16x9.png",
    alt: "Colección de señalización corporativa junto a la CNC Magia Roja",
  },
  {
    id: "educacion",
    eyebrow: "Educación y fabricación digital",
    title: "Lleva los diseños de la pantalla al mundo físico",
    description:
      "Materializa conceptos de ciencia, diseño, arquitectura y tecnología con piezas que invitan a construir y experimentar.",
    products: [
      "Modelos STEM",
      "Rompecabezas y mecanismos",
      "Maquetas arquitectónicas",
      "Plantillas didácticas",
    ],
    image: "/images/aplicaciones/educacion-modelos-stem-4x3.png",
    alt: "Modelos educativos de madera creados con la CNC Magia Roja",
  },
];
