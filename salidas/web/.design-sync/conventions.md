## Magia Roja v3 — sistema de diseño de VELO inc.

**Sin wrapper ni provider.** Los 11 componentes son funciones sin estado que no
leen ningún contexto de React: no hay `ThemeProvider` ni proveedor equivalente
que envolver. Basta con que `styles.css` esté cargado en la página — de ahí
salen los tokens, la tipografía y el CSS de cada componente.

**El idioma de estilos es tokens CSS (custom properties), no clases utilitarias.**
Cada componente ya trae su propio CSS y consume solo tokens semánticos — nunca
un valor crudo. Al maquetar layout NUEVO alrededor de estos componentes (el
espaciado entre secciones, un contenedor propio, etc.), usa esas mismas
variables en vez de valores hardcodeados:

| Categoría | Tokens de ejemplo |
|---|---|
| Color | `--fondo`, `--fondo-seccion`, `--fondo-oscuro`, `--texto`, `--texto-secundario`, `--acento`, `--acento-texto`, `--borde` |
| Espaciado | `--espacio-1` … `--espacio-32` (escala en rem) |
| Tipografía | `--tamano-xs` … `--tamano-display-xl`, `--peso-regular` (400) … `--peso-marca` (820), `--fuente-sans`, `--fuente-serif` |
| Radios / sombras | `--radio-sm`, `--radio-md`, `--radio-lg`, `--radio-pastilla`, `--sombra-acento-md`, `--sombra-flotante` |

Además hay clases de **rol tipográfico** listas para usar directamente en
cualquier texto nuevo (no solo dentro de los componentes): `.t-display-hero`,
`.t-display-seccion`, `.t-cuerpo`, `.t-entrada`, `.t-boton`, `.t-versales`,
`.t-marca`. Y tres clases globales de layout que `SectionHeading` usa pero que
son reutilizables sueltas: `.eyebrow` (rótulo corto en mayúsculas, color de
marca), `.section-heading` / `.section-heading--center`, `.section-description`.

**Dos familias tipográficas, ya resueltas:** `--fuente-sans` (Manrope, variable
200–800) para todo el texto de interfaz, y `--fuente-serif` (Cormorant
Garamond, 500/600) reservada para titulares display grandes.

**Dónde está la verdad:** `styles.css` (importa `_ds_bundle.css`, que trae todo
el CSS de los 11 componentes más los tokens) y el `.prompt.md` de cada
componente en `components/general/<Nombre>/`. Antes de escribir estilos
nuevos, lee `_ds_bundle.css` — ahí están todos los tokens y clases reales.

**Composición típica** (patrón real del sitio: encabezado de sección + datos +
CTA):

```tsx
<SectionHeading
  eyebrow="Mantenimiento incluido"
  title="La relación continúa después de ponerla en marcha."
  align="left"
/>
<Cifras
  cifras={[
    { numero: "6", etiqueta: "meses de cobertura" },
    { numero: "3", etiqueta: "servicios incluidos" },
  ]}
/>
<WhatsAppLink location="maintenance" interest="el plan de mantenimiento" variante="secundario">
  Consultar el plan
</WhatsAppLink>
```

Los componentes con foto (`SeccionPartida`, `TarjetaAplicacion`) reciben la
imagen por prop (`imagen`, `alt`) — no traen ninguna imagen propia.
