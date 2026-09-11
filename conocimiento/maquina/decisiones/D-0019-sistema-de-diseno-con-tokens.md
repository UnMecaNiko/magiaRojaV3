# D-0019 — Sistema de diseño con tokens en `comercial/identidad/`

- **Fecha**: 2026-09-10
- **Ámbito**: Repositorio
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

La web oficial (`salidas/web`) se construyó sin sistema de diseño: `globals.css`
definía 3 variables CSS, mientras `page.module.css` acumulaba 36 colores
hexadecimales, 17 `rgba()`, 15 pesos tipográficos y más de 30 valores de
espaciado, todos escritos a mano en cada sección.

El detonante fue intentar correr `/design-sync` para publicar el sistema en
Claude Design: la herramienta requiere una librería de componentes compilada, y
acá no había ni tokens ni componentes que sincronizar.

Alternativas consideradas:

1. Dejar los tokens dentro de `salidas/web/` — más rápido de arrancar.
2. Adoptar Tailwind o una librería de componentes de terceros.
3. Tokens en `comercial/identidad/` como fuente de la verdad, generando lo
   derivado hacia `salidas/`.

## Decisión

Los tokens de identidad viven en **`comercial/identidad/tokens.yaml`** como
fuente de la verdad, y la librería de componentes será un paquete propio. Lo que
consume la web se **genera** desde ese YAML; nunca se edita en `salidas/`.

Además, la paleta **no se limita a colapsar duplicados**: se corrigieron los
valores que incumplían WCAG 2.2 nivel AA.

## Motivos

- **Un sistema de diseño es un dato, no código.** La regla 3 de AGENTS.md
  (Markdown para narrativa, YAML para datos) lo ubica en YAML, y la arquitectura
  de dos capas lo ubica fuera de `salidas/`: una librería de componentes es
  fuente de la verdad, no material regenerable.
- **La identidad sirve a más que la web.** Material de venta, PDFs, prompts de
  imágenes IA (`media/ia/`) y el chatbot necesitan la misma paleta. Dentro de
  `salidas/web/` habría quedado inservible para todo lo demás, y la primera
  pieza que no fuera la web la habría reinventado.
- **Se descartó Tailwind y las librerías de terceros:** la web ya funciona con
  CSS Modules y el problema medido era de vocabulario, no de herramientas.
  Cambiar de framework habría reescrito todo sin resolver la causa.
- **Accesibilidad medida, no supuesta.** Seis pares texto/fondo incumplían el
  mínimo AA de WCAG 2.2 SC 1.4.3 (4.5:1 texto normal, 3:1 texto grande). El más
  grave era el *eyebrow* que abre cada sección: rojo de marca `#e32636` sobre
  crema a 11.5px, 4.38:1. Se resolvió separando el rojo de marca (relleno) del
  rojo accesible de texto (`#d12332`), en vez de degradar la marca.
  Fuente: [W3C WAI, Understanding SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), consultado 2026-09-10.
- **Piso de 12px.** El original bajaba a 10.7px con contraste insuficiente — la
  peor combinación posible y la señal más clara de trabajo amateur.

El detalle completo de mediciones y fuentes está en
[comercial/identidad/auditoria-2026-09-10.md](../../../comercial/identidad/auditoria-2026-09-10.md).

## Consecuencias

- ✅ Los 15 pares texto/fondo del sistema cumplen WCAG 2.2 AA, sin excepciones.
- ✅ 36 colores → 16 primitivas; 15 pesos → 5; 16 tamaños sueltos → rampa de 5.
- ✅ La identidad queda disponible para material comercial y contenido IA, no
  solo para la web.
- ✅ Con tokens y componentes reales, `/design-sync` pasa a tener sentido.
- ⚠️ **Habrá cambio visual.** No es un refactor invisible: el texto pequeño
  crece (10.7 → 12px mínimo), los grises de etiqueta se oscurecen y el rojo de
  los *eyebrow* se oscurece levemente. Es deliberado.
- ⚠️ `comercial/` no lleva precios (regla 6), y esto no los introduce — pero
  conviene recordar que la carpeta puede ser leída por salidas de cara a
  cliente, así que los tokens no deben acumular notas internas.
- ⏳ Falta el generador `tokens.yaml → tokens.css`, el recableado de
  `page.module.css` y la extracción de componentes (fase 3).
- ⏳ Falta `marca.md`: la narrativa de identidad no se deriva de una auditoría,
  sale de conversación con Saul y Nicolas.
- ⏳ Falta verificar el contraste del texto blanco sobre fotografía (tarjetas de
  aplicación y CTA final), que exige muestrear las imágenes reales.
