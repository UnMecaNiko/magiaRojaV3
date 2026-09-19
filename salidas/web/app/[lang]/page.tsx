import Image from "next/image";
import { notFound } from "next/navigation";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { isLocale } from "@/lib/locale";
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
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import styles from "../page.module.css";

/** Las tarjetas 1 y 4 ocupan dos columnas y marcan el ritmo de la rejilla. */
const TARJETAS_ANCHAS = new Set([0, 3]);

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = copy[lang];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.company,
        url: siteConfig.url,
        description: t.meta.organizationDescription,
      },
      {
        "@type": "Product",
        name: siteConfig.product,
        brand: { "@type": "Brand", name: siteConfig.company },
        description: t.meta.description,
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
        mainEntity: t.faq.items.map((item) => ({
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
        <Marca aria-label={t.homeAria} />

        <nav aria-label={t.navAria}>
          {t.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <LanguageSwitcher locale={lang} />
          <WhatsAppLink
            location="header"
            showIcon={false}
            variante="compacto"
            message={t.whatsapp.generic}
            aria-label={`${t.headerCta} ${t.whatsapp.ariaSuffix}`}
          >
            {t.headerCta}
          </WhatsAppLink>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroCopy}>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>
              {t.hero.titleBefore}
              <br />
              {t.hero.titleMid} <em>{t.hero.titleAccent}</em>
            </h1>
            <p className={styles.heroLead}>{t.hero.lead}</p>
            <div className={styles.heroActions}>
              <WhatsAppLink
                location="hero"
                variante="primario"
                message={t.whatsapp.generic}
                aria-label={`${t.hero.primaryCta} ${t.whatsapp.ariaSuffix}`}
              >
                {t.hero.primaryCta}
              </WhatsAppLink>
              <EnlaceTexto href="#posibilidades" icono="↓">
                {t.hero.secondaryCta}
              </EnlaceTexto>
            </div>
            <ListaDatos datos={t.hero.stats} variante="destacados" />
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroGlow} />
            <Image
              src="/images/maquina/hero-maquina-abierta-4x3.png"
              alt={t.hero.imageAlt}
              width={1024}
              height={768}
              priority
              sizes="(max-width: 900px) 100vw, 56vw"
            />
            <div className={styles.heroLabel}>
              <span />
              <p>
                <strong>{t.hero.labelTitle}</strong>
                <small>{t.hero.labelCaption}</small>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.introStrip}>
          <p>{t.intro.title}</p>
          <div>
            {t.intro.materials.map((material) => (
              <span key={material}>{material}</span>
            ))}
          </div>
        </section>

        <section className={styles.possibilities} id="posibilidades">
          <SectionHeading
            eyebrow={t.possibilities.eyebrow}
            title={t.possibilities.title}
            description={t.possibilities.description}
          />

          <div className={styles.applicationGrid}>
            {t.applications.map((application, index) => (
              <TarjetaAplicacion
                key={application.id}
                id={application.id}
                eyebrow={application.eyebrow}
                titulo={application.title}
                imagen={application.image}
                alt={application.alt}
                etiquetas={application.products}
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
          alt={t.materials.imageAlt}
        >
          <p className="eyebrow">{t.materials.eyebrow}</p>
          <h2>{t.materials.title}</h2>
          <p>{t.materials.lead}</p>
          <div className={styles.materialGroups}>
            {t.materials.groups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <small className={styles.notaMateriales}>{t.materials.note}</small>
        </SeccionPartida>

        <section className={styles.process}>
          <SectionHeading
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            align="center"
          />
          <div className={styles.processVisual}>
            <Image
              src="/images/proceso/flujo-diseno-producto-16x9.png"
              alt={t.process.imageAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
          <ol className={styles.processSteps}>
            {t.process.steps.map(([number, title, text]) => (
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
          alt={t.machine.imageAlt}
        >
          <p className="eyebrow">{t.machine.eyebrow}</p>
          <h2>{t.machine.title}</h2>
          <p>{t.machine.lead}</p>
          <ListaDatos datos={t.machine.specs} />
        </SeccionPartida>

        <SeccionPartida
          tono="oscuro"
          ladoImagen="izquierda"
          imagen="/images/proceso/velo-inc-ensamble-cnc-16x9.png"
          alt={t.company.imageAlt}
        >
          <p className={styles.companyLogo}>
            VELO <small>inc</small>
          </p>
          <h2>{t.company.title}</h2>
          <p>{t.company.lead}</p>
        </SeccionPartida>

        <SeccionPartida
          id="mantenimiento"
          tono="claro"
          ladoImagen="derecha"
          imagen="/images/proceso/mantenimiento-tecnico-4x3.png"
          alt={t.maintenance.imageAlt}
        >
          <p className="eyebrow">{t.maintenance.eyebrow}</p>
          <h2>{t.maintenance.title}</h2>
          <p>{t.maintenance.lead}</p>
          <Cifras cifras={t.maintenance.stats} />
          <WhatsAppLink
            location="maintenance"
            interest="el plan de mantenimiento"
            variante="secundario"
            message={t.whatsapp.maintenance}
            aria-label={`${t.maintenance.cta} ${t.whatsapp.ariaSuffix}`}
          >
            {t.maintenance.cta}
          </WhatsAppLink>
        </SeccionPartida>

        <section className={styles.faq}>
          <SectionHeading
            eyebrow={t.faq.eyebrow}
            title={t.faq.title}
          />
          <Acordeon
            items={t.faq.items.map((item) => ({
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
            <p className="eyebrow">{t.finalCta.eyebrow}</p>
            <h2>{t.finalCta.title}</h2>
            <p>{t.finalCta.lead}</p>
            <WhatsAppLink
              location="final_cta"
              variante="primario"
              message={t.whatsapp.generic}
            >
              {t.finalCta.cta}
            </WhatsAppLink>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Marca />
        <p data-deploy="gha">{t.footer.text}</p>
        <a href="#inicio">{t.footer.back}</a>
      </footer>

      <WhatsAppLink
        className={styles.floatingWhatsapp}
        location="floating"
        interest="la CNC Magia Roja v3"
        message={t.whatsapp.floating}
      >
        {t.whatsapp.floatingLabel}
      </WhatsAppLink>
    </>
  );
}
