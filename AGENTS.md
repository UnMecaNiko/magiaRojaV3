# AGENTS.md — Contexto principal del repositorio

> **Este es el archivo de contexto principal.** Todo agente (Claude Code, chatbot, generador de contenido) y todo humano que trabaje en este repositorio debe leer este archivo primero. `CLAUDE.md` solo referencia a este archivo.

## Qué es este repositorio

La **base de conocimiento central y única** de la **CNC Magia Roja v3**, una máquina CNC de escritorio con láser Laser Tree K30 (30W ópticos) y cabezal intercambiable para fresado, construida por Saul Velasquez (mecánica) y Nicolas Velasquez (electrónica y control) como equipo emprendedor padre-hijo.

Aquí **no se desarrolla código de producto**: se organiza información del mundo físico. Los agentes que trabajan sobre este repo típicamente **consumen** la fuente de conocimiento para producir salidas (web, artículos, tutoriales, corpus de chatbot, material comercial).

## Arquitectura de dos capas

1. **`conocimiento/` — la fuente de la verdad.** Todo dato original sobre la máquina vive aquí y solo aquí. Nunca contiene material generado.
2. **`salidas/` — lo derivado.** Artículos, contenido web y corpus de chatbot se *generan* desde la fuente. Si hay conflicto entre una salida y la fuente, **la fuente gana** y la salida se regenera.

## Reglas para agentes

### 1. Consulta internet, siempre
- Ante cualquier dato técnico dudoso, concepto poco claro o especificación de componente: **buscar en internet, validar y citar la fuente** (URL + fecha de consulta).
- Nunca asumir especificaciones de memoria. Ejemplo real: el láser "tri-j30" resultó ser el **Laser Tree K30**, con alimentación 24V/5A — dato crítico que se confirmó buscando la referencia oficial.
- Las fichas de componentes (`conocimiento/maquina/componentes/fichas/`) siempre llevan sección de fuentes.
- Ver [harness/guias/como-investigar.md](harness/guias/como-investigar.md).

### 2. Idioma
- **Todo en español.** Es la lengua de la fuente de la verdad.
- Traducciones (futuro) se generan en `salidas/`, nunca se traduce la fuente.

### 3. Markdown para narrativa, YAML para datos
- Lo que un humano **lee** (historia, decisiones, explicaciones) → Markdown.
- Lo que una máquina **ejecuta o procesa** (parámetros de corte, config GRBL, BOM) → **YAML**.
- Un YAML bien estructurado se convierte por script en librerías de materiales de LightBurn, tablas web, etc.

### 4. Trazabilidad
- Todo parámetro enlaza a la **prueba** que lo respalda (campo `fuente`).
- Toda decisión técnica se registra en `conocimiento/maquina/decisiones/` con su porqué (formato ADR).
- Todo cambio de configuración GRBL se snapshotea en `conocimiento/maquina/parametros/grbl/historico/` y se anota en su `CHANGELOG.md`.

### 5. Datos pendientes
- Lo que aún no se conoce se marca explícito: `> ⏳ PENDIENTE: <qué falta y cómo obtenerlo>`.
- Nunca inventar medidas, modelos ni valores. Un dato pendiente marcado vale más que un dato inventado.

### 6. Comercial sin precios
- `comercial/` contiene propuesta de valor, mercado objetivo, casos de uso y material de venta. **Nunca precios.**

### 7. Archivos pesados fuera del repo
- CAD, fotos, videos → almacenamiento externo (S3/Supabase). En el repo solo la **URL + descripción**.
- La media de v1 y v2 ya vive en Supabase (ver `conocimiento/historia/`).

### 8. Paso a paso para tutoriales
- El proceso de construcción se documenta como **pasos atómicos** en `conocimiento/proceso-construccion/`, usando [la plantilla](harness/plantillas/plantilla-paso-tutorial.md).
- Cada paso captura: objetivo, materiales/herramientas, procedimiento, fotos (URLs), errores cometidos y lecciones. Este es el **insumo directo** para generar tutoriales en `salidas/`.
- Cuando se documente trabajo nuevo en la máquina, registrarlo también como paso aquí — no solo en los subsistemas.

### 9. Mantener la planeación viva
- Al terminar trabajo: actualizar [harness/planeacion/changelog.md](harness/planeacion/changelog.md) y mover ítems de [plan-de-trabajo.md](harness/planeacion/plan-de-trabajo.md) a [completado.md](harness/planeacion/completado.md).
- Las metas y el roadmap se revisan cuando cambia el rumbo, no en cada commit.

## Mapa del repositorio

```
AGENTS.md                        ← estás aquí (contexto principal)
CLAUDE.md                        ← referencia a este archivo
conocimiento/                    ── CAPA 1: fuente de la verdad ──
├── maquina/                     La v3 en detalle
│   ├── vision-general.md
│   ├── especificaciones.md
│   ├── subsistemas/             mecánica, electrónica, eléctrica, control GRBL,
│   │                            láser, eje Z, cabezal fresado, software
│   ├── componentes/             bom.yaml + fichas/ (una por componente, con fuentes)
│   ├── parametros/              materiales/ (YAML), grbl/ (actual + histórico + changelog)
│   ├── pruebas/                 bitácora de pruebas técnicas
│   └── decisiones/              registro de decisiones (ADR)
├── proceso-construccion/        paso a paso del build → insumo de tutoriales
├── historia/                    v1.md, v2.md, evolucion.md (linaje completo)
├── mantenimiento.md
└── glosario.md
comercial/                       propuesta de valor, mercado, casos de uso (SIN precios)
harness/                         ── CAPA 2: harness agéntico ──
├── planeacion/                  metas, roadmap, plan-de-trabajo, completado, changelog
├── guias/                       como-investigar, estilo-redaccion
└── plantillas/                  decisión, prueba, material, ficha, paso-tutorial
skills/                          skills de investigación
salidas/                         ── GENERADO desde la fuente ──
├── articulos/  ├── web/  └── chatbot/
```

## Estado del proyecto (actualizado 2026-07-04)

- **v3 en desarrollo.** Mecánica ✅ terminada (diseño de Saul). Electrónica y eléctrica 🔧 en curso (Nicolas).
- La **v2 se vendió** en 2026; la v3 es su sucesora más grande y capaz.
- Cambios clave v2 → v3: área de trabajo mayor (medidas pendientes), **eje Z motorizado** (NEMA 17), **cabezal intercambiable** láser ↔ motor de fresado, láser **Laser Tree K30** (30W ópticos, fuente propia 24V), fuente de 12V/10A para control, mejora de la conexión eléctrica.
- Plataforma de control: se mantiene **Arduino + CNC Shield + GRBL** con drivers de la controladora.

## Flujos de trabajo frecuentes

| Quiero… | Entonces… |
|---|---|
| Registrar una decisión técnica | Copiar `harness/plantillas/plantilla-decision.md` → `conocimiento/maquina/decisiones/D-XXXX-titulo.md` |
| Registrar una prueba | Plantilla de prueba → `conocimiento/maquina/pruebas/AAAA-MM-DD-titulo.md` |
| Guardar parámetros de un material | Plantilla YAML → `conocimiento/maquina/parametros/materiales/material-espesor.yaml` |
| Cambiar config GRBL | Dump `$$` crudo + YAML anotado en `grbl/historico/`, actualizar `grbl-actual.yaml` y `grbl/CHANGELOG.md` |
| Documentar un paso del build | Plantilla paso-tutorial → `conocimiento/proceso-construccion/v3/NN-titulo.md` |
| Escribir un artículo/página/tutorial | Leer la fuente en `conocimiento/`, generar en `salidas/`, seguir `harness/guias/estilo-redaccion.md` |
| Investigar un componente | Seguir `harness/guias/como-investigar.md`, crear ficha en `componentes/fichas/` |
