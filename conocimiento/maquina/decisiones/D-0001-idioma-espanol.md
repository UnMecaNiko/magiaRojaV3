# D-0001 — Base de conocimiento en español

- **Fecha**: 2026-07-04
- **Ámbito**: Repositorio
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

La documentación de v1 y v2 se escribió en inglés (para portafolio). El autor escribe y piensa en español, y el chatbot/artículos atenderán principalmente público hispanohablante, además del uso técnico propio.

## Decisión

Toda la **fuente de la verdad** (`conocimiento/`, `harness/`, `comercial/`) se escribe en **español**.

## Consecuencias

- ✅ Menos fricción al documentar; la fuente refleja el idioma de trabajo real.
- ✅ El chatbot para clientes hispanohablantes se alimenta sin traducción.
- Las traducciones (p. ej. inglés para alcance internacional) se **generan en `salidas/`** cuando se necesiten — nunca se traduce la fuente.
- Los docs históricos de v1/v2 en inglés se conservan como referencia en `conocimiento/historia/` con resumen en español.
