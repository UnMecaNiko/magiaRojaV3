# D-0021 — Landing bilingüe según el idioma del navegador

- **Fecha**: 2026-09-18
- **Ámbito**: Repositorio / Comercial
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez Lopez

## Contexto

La landing de la CNC estaba solo en español. Un visitante con el navegador en
inglés —el caso de una camiseta de ROSCon, o de una postulación— veía la
página en español. La misma regla ya está en
[velasquezlopez.com](https://velasquezlopez.com) y en
[presalesagent.unmecaniko.com](https://presalesagent.unmecaniko.com),
confirmada por Nicolas el 2026-09-18. D-0001 reserva el español a la fuente
(`conocimiento/`, `harness/`, `comercial/`) y deja las traducciones en
`salidas/`.

## Decisión

La landing en `salidas/web/` tiene `/es` y `/en`. La raíz (`/`) redirige
**302** según `Accept-Language`: si la **primera** etiqueta empieza por `es`,
español; en cualquier otro caso, inglés. Hay conmutador ES · EN. El
`html lang` sigue al idioma de la ruta. La negociación vive en `proxy.ts` de
Next.js, no en Caddy: esta app sí tiene proceso Node.

## Motivos

Es la misma regla que ya se aplicó en los otros dos sitios propios el mismo
día. No se traduce la fuente: el inglés se genera en `salidas/web/content/copy.ts`.
No se añade Negotiator ni `next-intl`: el criterio es una sola etiqueta, no
una negociación ponderada.

## Consecuencias

- ✅ Un navegador en inglés llega a `/en` sin JavaScript.
- ✅ El español sigue siendo la versión para `es`, `es-CO`, `es-ES`, etc.
- ⚠️ El script de despliegue ya no puede pedir HTTP 200 a la raíz: esa
  respuesta es 302. Verifica `/es` y `/en`.
- ⚠️ `x-default` y el fallback son inglés, igual que en la portada y en
  presalesagent.
