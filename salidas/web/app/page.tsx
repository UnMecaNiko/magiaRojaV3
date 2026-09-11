import Image from "next/image";
import { applications } from "@/content/applications";
import { faqItems } from "@/content/faq";
import { materialGroups, specifications } from "@/content/specifications";
import { siteConfig } from "@/content/site";
import {
  Acordeon,
  Cifras,
  EnlaceTexto,
  ListaDatos,
  Marca,
  SeccionPartida,
  SectionHeading,
  TarjetaAplicacion,
  WhatsAppLink,
} from "@/components/ui";
import styles from "./page.module.css";

/** Las tarjetas 1 y 4 ocupan dos columnas y marcan el ritmo de la rejilla. */
const TARJETAS_ANCHAS = new Set([0, 3]);

const PASOS = [
  ["01", "Diseña", "Prepara el archivo vectorial."],
  ["02", "Configura", "Ajusta el trabajo al material."],
  ["03", "Corta o graba", "La máquina ejecuta el diseño."],
  ["04", "Termina", "Ensambla y presenta tu producto."],
];

const DATOS_HERO = [
  { etiqueta: "Potencia óptica", valor: "30 W" },
  { etiqueta: "Área útil en mm", valor: "500 × 500" },
  { etiqueta: "Movimiento motorizado", valor: "X · Y · Z" },
];

const CIFRAS_MANTENIMIENTO = [
  { numero: "6", etiqueta: "meses de cobertura" },
  { numero: "3", etiqueta: "servicios incluidos" },
  { numero: "2", etiqueta: "meses entre servicios" },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.company,
        url: siteConfig.url,
        description: "Compañía dedicada a diseñar y fabricar máquinas CNC.",
      },
      {
        "@type": "Product",
        name: siteConfig.product,
        brand: { "@type": "Brand", name: siteConfig.company },
        description: siteConfig.description,
        image: `${siteConfig.url}/images/detalles/og-social-1200x630.png`,
        width: {
          "@type": "QuantitativeValue",
          value: 500,
          unitCode: "MMT",
        },
        depth: {
          "@type": "QuantitativeValue",
          value: 500,
          unitCode: "MMT",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className={styles.siteHeader}>
        <Marca aria-label="VELO inc, inicio" />

        <nav aria-label="Navegación principal">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <WhatsAppLink location="header" showIcon={false} variante="compacto">
          Hablemos
        </WhatsAppLink>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroCopy}>
            <p className="eyebrow">Corte + grabado CNC</p>
            <h1>
              De una idea
              <br />
              a un <em>producto real.</em>
            </h1>
            <p className={styles.heroLead}>
              Explora nuevas formas de crear decoración, señalización,
              invitaciones, accesorios y material educativo con una máquina
              diseñada por VELO inc.
            </p>
            <div className={styles.heroActions}>
              <WhatsAppLink location="hero" variante="primario">
                Habla con nosotros
              </WhatsAppLink>
              <EnlaceTexto href="#posibilidades" icono="↓">
                Explorar posibilidades
              </EnlaceTexto>
            </div>
            <ListaDatos datos={DATOS_HERO} variante="destacados" />
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroGlow} />
            <Image
              src="/images/maquina/hero-maquina-abierta-4x3.png"
              alt="CNC Magia Roja v3 de VELO inc con tapa roja abierta"
              width={1024}
              height={768}
              priority
              sizes="(max-width: 900px) 100vw, 56vw"
            />
            <div className={styles.heroLabel}>
              <span />
              <p>
                <strong>Magia Roja v3</strong>
                <small>Diseñada por VELO inc</small>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.introStrip}>
          <p>Una sola plataforma.</p>
          <div>
            <span>Madera</span>
            <span>Cuero</span>
            <span>Papel</span>
            <span>Acrílico oscuro</span>
            <span>Metal marcado</span>
          </div>
        </section>

        <section className={styles.possibilities} id="posibilidades">
          <SectionHeading
            eyebrow="Posibilidades"
            title="Una máquina. Muchos caminos."
            description="No empieces por la especificación técnica. Empieza por el producto que quieres poner en manos de tus clientes."
          />

          <div className={styles.applicationGrid}>
            {applications.map((application, index) => (
              <TarjetaAplicacion
                key={application.id}
                id={application.id}
                eyebrow={application.eyebrow}
                titulo={application.title}
                imagen={application.image}
                alt={application.alt}
                etiquetas={application.products.slice(0, 3)}
                ancha={TARJETAS_ANCHAS.has(index)}
              />
            ))}
          </div>
        </section>

        <SeccionPartida
          id="materiales"
          tono="tinta"
          ladoImagen="izquierda"
          alturaMinima={750}
          imagen="/images/aplicaciones/materiales-muestrario-16x9.png"
          alt="Muestrario de materiales grabados y cortados"
        >
          <p className="eyebrow">Materiales</p>
          <h2>La potencia se entiende mejor cuando se convierte en opciones.</h2>
          <p>
            El Laser Tree K30 combina 30 W ópticos, una longitud de onda de
            450 nm y asistencia de aire integrada para trabajar materiales
            compatibles con precisión.
          </p>
          <div className={styles.materialGroups}>
            {materialGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <small className={styles.notaMateriales}>
            No corta metal ni acrílico transparente, blanco o azul.
          </small>
        </SeccionPartida>

        <section className={styles.process}>
          <SectionHeading
            eyebrow="Del diseño al producto"
            title="Tu archivo digital se convierte en algo que se puede tocar."
            align="center"
          />
          <div className={styles.processVisual}>
            <Image
              src="/images/proceso/flujo-diseno-producto-16x9.png"
              alt="Flujo desde un diseño vectorial hasta un producto cortado"
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
          <ol className={styles.processSteps}>
            {PASOS.map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <SeccionPartida
          id="maquina"
          tono="crema"
          ladoImagen="derecha"
          imagen="/images/maquina/hero-maquina-cerrada-vertical-4x5.png"
          alt="CNC Magia Roja v3 con su tapa roja cerrada"
        >
          <p className="eyebrow">Magia Roja v3</p>
          <h2>La máquina detrás de las posibilidades.</h2>
          <p>
            Una plataforma CNC de escritorio con control abierto, movimiento en
            tres ejes y un cabezal láser pensado para convertir diseños en
            piezas precisas.
          </p>
          <ListaDatos
            datos={specifications.map((spec) => ({
              etiqueta: spec.label,
              valor: spec.value,
            }))}
          />
        </SeccionPartida>

        <SeccionPartida
          tono="oscuro"
          ladoImagen="izquierda"
          imagen="/images/proceso/velo-inc-ensamble-cnc-16x9.png"
          alt="Verificación técnica de una CNC Magia Roja"
        >
          <p className={styles.companyLogo}>
            VELO <small>inc</small>
          </p>
          <h2>Diseñamos y fabricamos máquinas CNC.</h2>
          <p>
            Creamos herramientas para que empresas, talleres e instituciones
            transformen ideas digitales en productos físicos.
          </p>
        </SeccionPartida>

        <SeccionPartida
          id="mantenimiento"
          tono="claro"
          ladoImagen="derecha"
          imagen="/images/proceso/mantenimiento-tecnico-4x3.png"
          alt="Servicio de mantenimiento de la CNC Magia Roja"
        >
          <p className="eyebrow">Mantenimiento incluido</p>
          <h2>La relación continúa después de ponerla en marcha.</h2>
          <p>
            La CNC Magia Roja v3 incluye un plan de mantenimiento durante sus
            primeros seis meses.
          </p>
          <Cifras cifras={CIFRAS_MANTENIMIENTO} />
          <WhatsAppLink
            location="maintenance"
            interest="el plan de mantenimiento"
            variante="secundario"
          >
            Consultar el plan
          </WhatsAppLink>
        </SeccionPartida>

        <section className={styles.faq}>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo esencial, antes de conversar."
          />
          <Acordeon
            items={faqItems.map((item) => ({
              pregunta: item.question,
              respuesta: item.answer,
            }))}
          />
        </section>

        <section className={styles.finalCta}>
          <Image
            src="/images/detalles/whatsapp-cierre-4x3.png"
            alt=""
            fill
            sizes="100vw"
          />
          <div className={styles.finalShade} />
          <div className={styles.finalContent}>
            <p className="eyebrow">Hablemos de tu idea</p>
            <h2>¿Qué quieres crear con tu CNC?</h2>
            <p>Cuéntanos el tipo de producto o material que tienes en mente.</p>
            <WhatsAppLink location="final_cta" variante="primario">
              Escribir por WhatsApp
            </WhatsAppLink>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Marca />
        <p>CNC Magia Roja v3 · Diseñada y fabricada por VELO inc.</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>

      <WhatsAppLink
        className={styles.floatingWhatsapp}
        location="floating"
        interest="la CNC Magia Roja v3"
      >
        WhatsApp
      </WhatsAppLink>
    </>
  );
}
