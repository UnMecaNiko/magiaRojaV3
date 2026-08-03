import Image from "next/image";
import { applications } from "@/content/applications";
import { faqItems } from "@/content/faq";
import { materialGroups, specifications } from "@/content/specifications";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import styles from "./page.module.css";

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
        <a className={styles.brand} href="#inicio" aria-label="VELO inc, inicio">
          <span className={styles.brandMark}>V</span>
          <span>
            VELO <small>inc</small>
          </span>
        </a>

        <nav aria-label="Navegación principal">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <WhatsAppLink
          className={styles.headerCta}
          location="header"
          showIcon={false}
        >
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
              <WhatsAppLink
                className={styles.primaryButton}
                location="hero"
              >
                Habla con nosotros
              </WhatsAppLink>
              <a className={styles.textLink} href="#posibilidades">
                Explorar posibilidades <span aria-hidden="true">↓</span>
              </a>
            </div>
            <dl className={styles.heroFacts}>
              <div>
                <dt>30 W</dt>
                <dd>Potencia óptica</dd>
              </div>
              <div>
                <dt>500 × 500</dt>
                <dd>Área útil en mm</dd>
              </div>
              <div>
                <dt>X · Y · Z</dt>
                <dd>Movimiento motorizado</dd>
              </div>
            </dl>
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
              <article
                className={`${styles.applicationCard} ${
                  index === 0 || index === 3 ? styles.applicationCardWide : ""
                }`}
                key={application.id}
                id={application.id}
              >
                <Image
                  src={application.image}
                  alt={application.alt}
                  fill
                  sizes={
                    index === 0 || index === 3
                      ? "(max-width: 760px) 100vw, 66vw"
                      : "(max-width: 760px) 100vw, 33vw"
                  }
                />
                <div className={styles.cardShade} />
                <div className={styles.cardContent}>
                  <p>{application.eyebrow}</p>
                  <h3>{application.title}</h3>
                  <ul>
                    {application.products.slice(0, 3).map((product) => (
                      <li key={product}>{product}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.materials} id="materiales">
          <div className={styles.materialsImage}>
            <Image
              src="/images/aplicaciones/materiales-muestrario-16x9.png"
              alt="Muestrario de materiales grabados y cortados"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>
          <div className={styles.materialsCopy}>
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
            <small>
              No corta metal ni acrílico transparente, blanco o azul.
            </small>
          </div>
        </section>

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
            {[
              ["01", "Diseña", "Prepara el archivo vectorial."],
              ["02", "Configura", "Ajusta el trabajo al material."],
              ["03", "Corta o graba", "La máquina ejecuta el diseño."],
              ["04", "Termina", "Ensambla y presenta tu producto."],
            ].map(([number, title, text]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.machine} id="maquina">
          <div className={styles.machineCopy}>
            <p className="eyebrow">Magia Roja v3</p>
            <h2>La máquina detrás de las posibilidades.</h2>
            <p>
              Una plataforma CNC de escritorio con control abierto, movimiento
              en tres ejes y un cabezal láser pensado para convertir diseños en
              piezas precisas.
            </p>
            <dl className={styles.specGrid}>
              {specifications.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.machineImage}>
            <Image
              src="/images/maquina/hero-maquina-cerrada-vertical-4x5.png"
              alt="CNC Magia Roja v3 con su tapa roja cerrada"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
        </section>

        <section className={styles.company}>
          <div className={styles.companyImage}>
            <Image
              src="/images/proceso/velo-inc-ensamble-cnc-16x9.png"
              alt="Verificación técnica de una CNC Magia Roja"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>
          <div className={styles.companyCopy}>
            <p className={styles.companyLogo}>VELO <small>inc</small></p>
            <h2>Diseñamos y fabricamos máquinas CNC.</h2>
            <p>
              Creamos herramientas para que empresas, talleres e instituciones
              transformen ideas digitales en productos físicos.
            </p>
          </div>
        </section>

        <section className={styles.maintenance} id="mantenimiento">
          <div className={styles.maintenanceCopy}>
            <p className="eyebrow">Mantenimiento incluido</p>
            <h2>La relación continúa después de ponerla en marcha.</h2>
            <p>
              La CNC Magia Roja v3 incluye un plan de mantenimiento durante sus
              primeros seis meses.
            </p>
            <div className={styles.maintenanceNumbers}>
              <div>
                <strong>6</strong>
                <span>meses de cobertura</span>
              </div>
              <div>
                <strong>3</strong>
                <span>servicios incluidos</span>
              </div>
              <div>
                <strong>2</strong>
                <span>meses entre servicios</span>
              </div>
            </div>
            <WhatsAppLink
              className={styles.secondaryButton}
              location="maintenance"
              interest="el plan de mantenimiento"
            >
              Consultar el plan
            </WhatsAppLink>
          </div>
          <div className={styles.maintenanceImage}>
            <Image
              src="/images/proceso/mantenimiento-tecnico-4x3.png"
              alt="Servicio de mantenimiento de la CNC Magia Roja"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </section>

        <section className={styles.faq}>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo esencial, antes de conversar."
          />
          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
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
            <p>
              Cuéntanos el tipo de producto o material que tienes en mente.
            </p>
            <WhatsAppLink
              className={styles.primaryButton}
              location="final_cta"
            >
              Escribir por WhatsApp
            </WhatsAppLink>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#inicio">
          <span className={styles.brandMark}>V</span>
          <span>
            VELO <small>inc</small>
          </span>
        </a>
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
