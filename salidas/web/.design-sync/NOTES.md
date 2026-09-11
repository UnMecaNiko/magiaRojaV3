# Notas de design-sync

Sincroniza `components/ui/` (11 componentes de la landing) al proyecto
"Magia Roja v3 – Design System" en claude.ai/design. Primer sync: 2026-09-10.

- Este repo NO publica `components/ui` como paquete (no hay `main`/`module`/`exports`
  en `package.json`, ni build de librería — `build` es `next build`, la app entera).
  El converter corre en modo synth-entry desde `cfg.entry` = `components/ui/index.ts`.
- Como no hay `.d.ts` compilado, el listado de componentes no se puede autodetectar
  desde tipos: `cfg.componentSrcMap` lista los 11 a mano (nombre → ruta `.tsx`).
  Si se agrega un componente nuevo a `components/ui/index.ts`, hay que agregarlo
  también ahí o el build no lo va a encontrar (no hay fallback automático sin dist).
- `SeccionPartida` y `TarjetaAplicacion` usaban `next/image`, que en runtime pide
  `/_next/image?...` — una ruta que solo existe dentro de un servidor Next. Se
  cambiaron a `<img>` nativo (con `object-fit`/`position` movidos al CSS module)
  para que sean portables fuera de la app. Esto también quitó el prop `sizes` de
  `SeccionPartida` (ya no tenía efecto sin `next/image`) y sus 4 usos en `app/page.tsx`.
  Cambio aprobado por el usuario 2026-09-10.
- `content/site.ts` leía `process.env.NEXT_PUBLIC_*` a nivel de módulo. Next.js
  reemplaza esa expresión en build time, pero el bundle esbuild del design-sync
  no — `process` no existe en el navegador y tiraba `ReferenceError` en TODO el
  bundle (crashea antes de asignar nada a `window.MagiaRojaUI`). Se envolvió con
  `typeof process !== "undefined" &&` — no cambia el comportamiento dentro de
  Next, y afuera cae al fallback (`""`/localhost) en vez de reventar.
- Las fuentes de marca (Manrope, Cormorant Garamond) se cargan con `next/font/google`
  en `app/layout.tsx`, que las autohospeda y define `--font-sans`/`--font-serif` solo
  en tiempo de build de Next. Fuera de Next no hay `@font-face` que las shipee, así
  que `.design-sync/extra-fonts.css` trae los `@font-face` reales que devuelve
  Google Fonts (subset "latin", suficiente para español) apuntando a
  fonts.gstatic.com, y `cfg.extraFonts` apunta ahí. Sustituto aceptado por el
  usuario: mismas familias, servidas por Google en vez de autohospedadas.
  Si `app/layout.tsx` cambia de familia o de pesos, hay que regenerar este
  archivo a mano (pedir la URL CSS2 de Google Fonts con un user-agent de
  navegador moderno para obtener `@font-face` en woff2, no `@import`: el
  converter solo extrae bloques `@font-face` literales, un `@import` remoto
  no se procesa en shape "package").
- `cfg.cssEntry` NO apunta a `app/globals.css` directo: ese archivo empieza con
  `@import "./tokens.css";`, y el converter solo hace un append de texto crudo
  (no resuelve imports anidados) — el `@import` queda colgando en el bundle
  final. `.design-sync/bundled-styles.css` es la concatenación de
  `app/tokens.css` + `app/globals.css` (sin su `@import`), generada a mano.
  Si cualquiera de esos dos archivos cambia, hay que regenerar este archivo:
  `cat app/tokens.css > .design-sync/bundled-styles.css` seguido del contenido
  de `app/globals.css` sin su primera línea. Ver también la nota del header
  arriba de ese archivo.
- Las 11 previews en `.design-sync/previews/` están autoradas a mano con
  contenido real del sitio (`content/*.ts`, `app/page.tsx`) — no genéricas.
  `SeccionPartida`/`TarjetaAplicacion` usan una imagen placeholder (SVG data URI
  gris) porque las imágenes reales viven fuera del repo (S3/Supabase, per
  AGENTS.md) y no son parte de este sync.
- `SeccionPartida` tiene `cfg.overrides.SeccionPartida.cardMode = "column"`
  porque es una sección de ancho completo (dos columnas, min-height ~600px):
  sin esto se ve comprimida en una celda de grilla normal.

## Riesgos para el próximo re-sync

- Si `comercial/identidad/tokens.yaml` cambia y se regenera `app/tokens.css`,
  regenerar `.design-sync/bundled-styles.css` (ver arriba) antes de re-correr
  el build, o los tokens nuevos no van a aparecer en el bundle.
- El mapeo de fuentes en `.design-sync/extra-fonts.css` es manual: si
  `app/layout.tsx` cambia de familia tipográfica o de pesos, hay que
  regenerarlo a mano.
- `cfg.componentSrcMap` es la única fuente del listado de componentes (no hay
  autodetección): un componente nuevo en `components/ui/index.ts` necesita una
  entrada nueva ahí.
