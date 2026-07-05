# Roadmap — desarrollos a futuro

> Qué viene después, en orden aproximado. Se revisa al cerrar cada fase. Última revisión: 2026-07-04.

## Fase actual: Electrónica y eléctrica (v3)

Ver [plan-de-trabajo.md](plan-de-trabajo.md) para el detalle accionable.

## Horizonte 1 — terminar la máquina

- [ ] Electrónica y eléctrica completa (fase en curso)
- [ ] Configuración GRBL inicial + calibración (drivers, pasos/mm, aceleraciones)
- [ ] Integración y pruebas del K30 (potencia, foco con eje Z)
- [ ] Pruebas de materiales → primera librería de parámetros validados
- [ ] Seguridad: validar protección ocular para 30W @ 450 nm, extracción de humos
- [ ] Definir e integrar el motor de fresado (hoy no prioritario)

## Horizonte 2 — conocimiento completo

- [ ] Reconstruir documentación de la fase mecánica (con Saul): medidas, materiales, fotos, lecciones
- [ ] Esquemático eléctrico formal
- [ ] Completar BOM con proveedores
- [ ] Subir media v3 a almacenamiento externo y enlazarla

## Horizonte 3 — derivados

- [ ] Script YAML → librería de materiales LightBurn
- [ ] Skills de investigación en `skills/` (investigar-componente, comparar contra competencia, buscar parámetros de partida)
- [ ] Primer artículo del proceso (candidato: "de la v2 vendida a la v3")
- [ ] Página web de la máquina (generada desde `conocimiento/` + `comercial/`)
- [ ] Corpus + chatbot de preguntas y respuestas
- [ ] Análisis de competencia con fuentes (para `comercial/propuesta-valor.md`)

## Horizonte 4 — ideas sin compromiso

- Traducción al inglés (generada en `salidas/`, D-0001)
- ¿4º eje rotativo? (requeriría revisar D-0006 — límite de 3 ejes de GRBL/Uno)
- ¿Producción en serie de la v3 para venta?
