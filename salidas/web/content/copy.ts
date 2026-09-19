import type { Locale } from "@/lib/locale";

const es = {
  meta: {
    title: "CNC Magia Roja v3 | Corte y grabado láser",
    description:
      "Descubre todo lo que puedes crear con la CNC Magia Roja v3 de VELO inc: decoración, publicidad, invitaciones, textiles y educación.",
    keywords: [
      "máquina CNC",
      "corte láser",
      "grabado láser",
      "CNC 30W",
      "máquina para letreros",
      "CNC para publicidad",
      "VELO inc",
    ],
    ogAlt: "CNC Magia Roja v3 y productos creados con corte láser",
    organizationDescription:
      "Compañía dedicada a diseñar y fabricar máquinas CNC.",
  },
  navAria: "Navegación principal",
  langAria: "Idioma",
  homeAria: "VELO inc, inicio",
  navigation: [
    { label: "Posibilidades", href: "#posibilidades" },
    { label: "Materiales", href: "#materiales" },
    { label: "La máquina", href: "#maquina" },
    { label: "Mantenimiento", href: "#mantenimiento" },
  ],
  headerCta: "Hablemos",
  hero: {
    eyebrow: "Corte + grabado CNC",
    titleBefore: "De una idea",
    titleAccent: "producto real.",
    titleMid: "a un",
    lead: "Explora nuevas formas de crear decoración, señalización, invitaciones, accesorios y material educativo con una máquina diseñada por VELO inc.",
    primaryCta: "Habla con nosotros",
    secondaryCta: "Explorar posibilidades",
    stats: [
      { etiqueta: "Potencia óptica", valor: "30 W" },
      { etiqueta: "Área útil en mm", valor: "500 × 500" },
      { etiqueta: "Movimiento motorizado", valor: "X · Y · Z" },
    ],
    imageAlt: "CNC Magia Roja v3 de VELO inc con tapa roja abierta",
    labelTitle: "Magia Roja v3",
    labelCaption: "Diseñada por VELO inc",
  },
  intro: {
    title: "Una sola plataforma.",
    materials: [
      "Madera",
      "Cuero",
      "Papel",
      "Acrílico oscuro",
      "Metal marcado",
    ],
  },
  possibilities: {
    eyebrow: "Posibilidades",
    title: "Una máquina. Muchos caminos.",
    description:
      "No empieces por la especificación técnica. Empieza por el producto que quieres poner en manos de tus clientes.",
  },
  applications: [
    {
      id: "decoracion",
      eyebrow: "Decoración y hogar",
      title: "Convierte superficies planas en piezas con identidad",
      products: [
        "Arte mural por capas",
        "Letreros y números",
        "Cajas y organizadores",
      ],
      image: "/images/aplicaciones/decoracion-arte-mural-4x3.png",
      alt: "CNC Magia Roja junto a una colección de arte mural cortado en madera",
    },
    {
      id: "textil",
      eyebrow: "Ropa y accesorios",
      title: "Detalles que hacen reconocible una marca",
      products: [
        "Parches de cuero natural",
        "Etiquetas de denim",
        "Apliques de fieltro",
      ],
      image: "/images/aplicaciones/textil-parches-cuero-4x3.png",
      alt: "Parches de cuero grabados frente a la CNC Magia Roja",
    },
    {
      id: "eventos",
      eyebrow: "Invitaciones y eventos",
      title: "Presentaciones que comienzan antes del evento",
      products: ["Invitaciones caladas", "Números de mesa", "Marcasitios"],
      image: "/images/aplicaciones/eventos-invitacion-papel-4x3.png",
      alt: "Invitaciones de papel calado producidas con la CNC Magia Roja",
    },
    {
      id: "publicidad",
      eyebrow: "Publicidad y marca",
      title: "Haz visible una empresa en cada punto de contacto",
      products: [
        "Señalización y placas",
        "Letras por capas",
        "Exhibidores y portamenús",
      ],
      image:
        "/images/aplicaciones/publicidad-senalizacion-corporativa-16x9.png",
      alt: "Colección de señalización corporativa junto a la CNC Magia Roja",
    },
    {
      id: "educacion",
      eyebrow: "Educación y fabricación digital",
      title: "Lleva los diseños de la pantalla al mundo físico",
      products: [
        "Modelos STEM",
        "Rompecabezas y mecanismos",
        "Maquetas arquitectónicas",
      ],
      image: "/images/aplicaciones/educacion-modelos-stem-4x3.png",
      alt: "Modelos educativos de madera creados con la CNC Magia Roja",
    },
  ],
  materials: {
    eyebrow: "Materiales",
    title: "La potencia se entiende mejor cuando se convierte en opciones.",
    lead: "El Laser Tree K30 combina 30 W ópticos, una longitud de onda de 450 nm y asistencia de aire integrada para trabajar materiales compatibles con precisión.",
    imageAlt: "Muestrario de materiales grabados y cortados",
    note: "No corta metal ni acrílico transparente, blanco o azul.",
    groups: [
      {
        title: "Corta y graba",
        items: [
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
        items: [
          "Bambú",
          "Aluminio anodizado",
          "Metal pintado",
          "Metal recubierto",
          "Acero inoxidable",
        ],
      },
    ],
  },
  process: {
    eyebrow: "Del diseño al producto",
    title: "Tu archivo digital se convierte en algo que se puede tocar.",
    imageAlt: "Flujo desde un diseño vectorial hasta un producto cortado",
    steps: [
      ["01", "Diseña", "Prepara el archivo vectorial."],
      ["02", "Configura", "Ajusta el trabajo al material."],
      ["03", "Corta o graba", "La máquina ejecuta el diseño."],
      ["04", "Termina", "Ensambla y presenta tu producto."],
    ] as [string, string, string][],
  },
  machine: {
    eyebrow: "Magia Roja v3",
    title: "La máquina detrás de las posibilidades.",
    lead: "Una plataforma CNC de escritorio con control abierto, movimiento en tres ejes y un cabezal láser pensado para convertir diseños en piezas precisas.",
    imageAlt: "CNC Magia Roja v3 con su tapa roja cerrada",
    specs: [
      { etiqueta: "Dimensiones externas", valor: "500 × 500 mm" },
      { etiqueta: "Área de trabajo", valor: "500 × 500 mm" },
      { etiqueta: "Potencia óptica", valor: "30 W" },
      { etiqueta: "Longitud de onda", valor: "450 nm" },
      { etiqueta: "Cabezal", valor: "Laser Tree K30" },
      { etiqueta: "Asistencia de aire", valor: "Integrada" },
      { etiqueta: "Movimiento", valor: "Ejes X, Y y Z motorizado" },
      { etiqueta: "Control", valor: "Arduino + CNC Shield + GRBL" },
    ],
  },
  company: {
    title: "Diseñamos y fabricamos máquinas CNC.",
    lead: "Creamos herramientas para que empresas, talleres e instituciones transformen ideas digitales en productos físicos.",
    imageAlt: "Verificación técnica de una CNC Magia Roja",
  },
  maintenance: {
    eyebrow: "Mantenimiento incluido",
    title: "La relación continúa después de ponerla en marcha.",
    lead: "La CNC Magia Roja v3 incluye un plan de mantenimiento durante sus primeros seis meses.",
    imageAlt: "Servicio de mantenimiento de la CNC Magia Roja",
    cta: "Consultar el plan",
    stats: [
      { numero: "6", etiqueta: "meses de cobertura" },
      { numero: "3", etiqueta: "servicios incluidos" },
      { numero: "2", etiqueta: "meses entre servicios" },
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo esencial, antes de conversar.",
    items: [
      {
        question: "¿Qué tamaño tiene el área de trabajo?",
        answer:
          "La CNC Magia Roja v3 ofrece un área útil de trabajo de 500 × 500 mm.",
      },
      {
        question: "¿Qué materiales puede trabajar?",
        answer:
          "El cabezal K30 permite cortar y grabar madera, contrachapado, MDF, papel, cartón, cuero natural y acrílicos oscuros compatibles. También permite marcar aluminio anodizado, metales pintados o recubiertos y acero inoxidable.",
      },
      {
        question: "¿Puede cortar metal o acrílico transparente?",
        answer:
          "No. Esta configuración está orientada a materiales compatibles con láser de diodo azul. No se presenta como cortadora de metal y no corta acrílico transparente, blanco o azul.",
      },
      {
        question: "¿Qué software utiliza?",
        answer:
          "La plataforma GRBL es compatible con herramientas conocidas como LightBurn y LaserGRBL.",
      },
      {
        question: "¿Incluye mantenimiento?",
        answer:
          "Sí. Incluye cobertura de mantenimiento durante seis meses, con un servicio cada dos meses: tres servicios en total.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Hablemos de tu idea",
    title: "¿Qué quieres crear con tu CNC?",
    lead: "Cuéntanos el tipo de producto o material que tienes en mente.",
    cta: "Escribir por WhatsApp",
  },
  footer: {
    text: "CNC Magia Roja v3 · Diseñada y fabricada por VELO inc. · 2026",
    back: "Volver arriba ↑",
  },
  whatsapp: {
    generic:
      "Hola, quiero conocer más sobre la CNC Magia Roja v3 y sus aplicaciones.",
    maintenance:
      "Hola, quiero conocer más sobre la CNC Magia Roja v3 para el plan de mantenimiento.",
    floating: "Hola, quiero conocer más sobre la CNC Magia Roja v3.",
    floatingLabel: "WhatsApp",
    ariaSuffix: "por WhatsApp",
  },
  analytics: {
    aria: "Preferencias de analítica",
    text: "Usamos analítica para saber qué contenidos llevan a una consulta por WhatsApp. No vemos el contenido de la conversación.",
    reject: "Solo esenciales",
    accept: "Aceptar analítica",
  },
};

const en: typeof es = {
  meta: {
    title: "Magia Roja v3 CNC | Laser cutting and engraving",
    description:
      "See what you can make with VELO inc’s Magia Roja v3 CNC: décor, signage, invitations, textiles, and education.",
    keywords: [
      "CNC machine",
      "laser cutting",
      "laser engraving",
      "30W CNC",
      "sign-making machine",
      "CNC for advertising",
      "VELO inc",
    ],
    ogAlt: "Magia Roja v3 CNC and products made with laser cutting",
    organizationDescription: "A company that designs and builds CNC machines.",
  },
  navAria: "Primary navigation",
  langAria: "Language",
  homeAria: "VELO inc, home",
  navigation: [
    { label: "Possibilities", href: "#posibilidades" },
    { label: "Materials", href: "#materiales" },
    { label: "The machine", href: "#maquina" },
    { label: "Maintenance", href: "#mantenimiento" },
  ],
  headerCta: "Let’s talk",
  hero: {
    eyebrow: "CNC cutting + engraving",
    titleBefore: "From an idea",
    titleAccent: "real product.",
    titleMid: "to a",
    lead: "Explore new ways to make décor, signage, invitations, accessories, and educational pieces with a machine designed by VELO inc.",
    primaryCta: "Talk with us",
    secondaryCta: "Explore possibilities",
    stats: [
      { etiqueta: "Optical power", valor: "30 W" },
      { etiqueta: "Usable area in mm", valor: "500 × 500" },
      { etiqueta: "Motorized motion", valor: "X · Y · Z" },
    ],
    imageAlt: "VELO inc Magia Roja v3 CNC with its red lid open",
    labelTitle: "Magia Roja v3",
    labelCaption: "Designed by VELO inc",
  },
  intro: {
    title: "One platform.",
    materials: [
      "Wood",
      "Leather",
      "Paper",
      "Dark acrylic",
      "Marked metal",
    ],
  },
  possibilities: {
    eyebrow: "Possibilities",
    title: "One machine. Many paths.",
    description:
      "Don’t start with the spec sheet. Start with the product you want to put in your customers’ hands.",
  },
  applications: [
    {
      id: "decoracion",
      eyebrow: "Home and décor",
      title: "Turn flat surfaces into pieces with identity",
      products: ["Layered wall art", "Signs and numbers", "Boxes and organizers"],
      image: "/images/aplicaciones/decoracion-arte-mural-4x3.png",
      alt: "Magia Roja CNC beside a collection of layered wood wall art",
    },
    {
      id: "textil",
      eyebrow: "Apparel and accessories",
      title: "Details that make a brand recognizable",
      products: [
        "Natural leather patches",
        "Denim labels",
        "Felt appliqués",
      ],
      image: "/images/aplicaciones/textil-parches-cuero-4x3.png",
      alt: "Engraved leather patches in front of the Magia Roja CNC",
    },
    {
      id: "eventos",
      eyebrow: "Invitations and events",
      title: "Presentations that start before the event",
      products: ["Cut-out invitations", "Table numbers", "Place cards"],
      image: "/images/aplicaciones/eventos-invitacion-papel-4x3.png",
      alt: "Cut-out paper invitations made with the Magia Roja CNC",
    },
    {
      id: "publicidad",
      eyebrow: "Advertising and brand",
      title: "Make a company visible at every touchpoint",
      products: [
        "Signage and plaques",
        "Layered lettering",
        "Displays and menu holders",
      ],
      image:
        "/images/aplicaciones/publicidad-senalizacion-corporativa-16x9.png",
      alt: "Corporate signage collection beside the Magia Roja CNC",
    },
    {
      id: "educacion",
      eyebrow: "Education and digital fabrication",
      title: "Take designs from the screen into the physical world",
      products: [
        "STEM models",
        "Puzzles and mechanisms",
        "Architectural models",
      ],
      image: "/images/aplicaciones/educacion-modelos-stem-4x3.png",
      alt: "Wooden educational models made with the Magia Roja CNC",
    },
  ],
  materials: {
    eyebrow: "Materials",
    title: "Power makes more sense when it turns into options.",
    lead: "The Laser Tree K30 combines 30 W of optical power, a 450 nm wavelength, and built-in air assist to work compatible materials with precision.",
    imageAlt: "Sample board of engraved and cut materials",
    note: "It does not cut metal or clear, white, or blue acrylic.",
    groups: [
      {
        title: "Cut and engrave",
        items: [
          "Wood",
          "Plywood",
          "MDF",
          "Paper",
          "Cardboard",
          "Natural leather",
          "Compatible dark acrylic",
        ],
      },
      {
        title: "Engrave or mark",
        items: [
          "Bamboo",
          "Anodized aluminum",
          "Painted metal",
          "Coated metal",
          "Stainless steel",
        ],
      },
    ],
  },
  process: {
    eyebrow: "From design to product",
    title: "Your digital file becomes something you can hold.",
    imageAlt: "Flow from a vector design to a cut product",
    steps: [
      ["01", "Design", "Prepare the vector file."],
      ["02", "Set up", "Match the job to the material."],
      ["03", "Cut or engrave", "The machine runs the design."],
      ["04", "Finish", "Assemble and present your product."],
    ],
  },
  machine: {
    eyebrow: "Magia Roja v3",
    title: "The machine behind the possibilities.",
    lead: "A desktop CNC platform with open control, three-axis motion, and a laser head built to turn designs into precise parts.",
    imageAlt: "Magia Roja v3 CNC with its red lid closed",
    specs: [
      { etiqueta: "External dimensions", valor: "500 × 500 mm" },
      { etiqueta: "Work area", valor: "500 × 500 mm" },
      { etiqueta: "Optical power", valor: "30 W" },
      { etiqueta: "Wavelength", valor: "450 nm" },
      { etiqueta: "Head", valor: "Laser Tree K30" },
      { etiqueta: "Air assist", valor: "Built in" },
      { etiqueta: "Motion", valor: "Motorized X, Y, and Z axes" },
      { etiqueta: "Control", valor: "Arduino + CNC Shield + GRBL" },
    ],
  },
  company: {
    title: "We design and build CNC machines.",
    lead: "We make tools so companies, workshops, and institutions can turn digital ideas into physical products.",
    imageAlt: "Technical inspection of a Magia Roja CNC",
  },
  maintenance: {
    eyebrow: "Maintenance included",
    title: "The relationship continues after you turn it on.",
    lead: "The Magia Roja v3 CNC includes a maintenance plan for its first six months.",
    imageAlt: "Maintenance service on the Magia Roja CNC",
    cta: "Ask about the plan",
    stats: [
      { numero: "6", etiqueta: "months of coverage" },
      { numero: "3", etiqueta: "services included" },
      { numero: "2", etiqueta: "months between services" },
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "The essentials, before we talk.",
    items: [
      {
        question: "How large is the work area?",
        answer:
          "The Magia Roja v3 CNC has a usable work area of 500 × 500 mm.",
      },
      {
        question: "What materials can it work?",
        answer:
          "The K30 head can cut and engrave wood, plywood, MDF, paper, cardboard, natural leather, and compatible dark acrylics. It can also mark anodized aluminum, painted or coated metals, and stainless steel.",
      },
      {
        question: "Can it cut metal or clear acrylic?",
        answer:
          "No. This setup is meant for materials compatible with a blue diode laser. It is not presented as a metal cutter, and it does not cut clear, white, or blue acrylic.",
      },
      {
        question: "What software does it use?",
        answer:
          "The GRBL platform works with well-known tools such as LightBurn and LaserGRBL.",
      },
      {
        question: "Does it include maintenance?",
        answer:
          "Yes. It includes six months of maintenance coverage, with a service every two months: three services in total.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Let’s talk about your idea",
    title: "What do you want to make with your CNC?",
    lead: "Tell us the kind of product or material you have in mind.",
    cta: "Write on WhatsApp",
  },
  footer: {
    text: "Magia Roja v3 CNC · Designed and built by VELO inc. · 2026",
    back: "Back to top ↑",
  },
  whatsapp: {
    generic:
      "Hi, I’d like to learn more about the Magia Roja v3 CNC and what it can make.",
    maintenance:
      "Hi, I’d like to learn more about the Magia Roja v3 CNC maintenance plan.",
    floating:
      "Hi, I’d like to learn more about the Magia Roja v3 CNC.",
    floatingLabel: "WhatsApp",
    ariaSuffix: "on WhatsApp",
  },
  analytics: {
    aria: "Analytics preferences",
    text: "We use analytics to see which content leads to a WhatsApp inquiry. We do not see the conversation itself.",
    reject: "Essentials only",
    accept: "Accept analytics",
  },
};

export const copy: Record<Locale, typeof es> = { es, en };
