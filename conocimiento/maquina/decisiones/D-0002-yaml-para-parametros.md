# D-0002 — YAML para parámetros, Markdown para narrativa

- **Fecha**: 2026-07-04
- **Ámbito**: Repositorio
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

La propuesta inicial contemplaba una `plantilla-parametro.md`. Markdown es excelente para humanos, pero los parámetros técnicos (velocidad, potencia, pasadas, config GRBL) son **datos**: deben poder procesarse por scripts, convertirse en librerías de materiales de LightBurn, alimentar tablas web y seguir siendo legibles por humanos e IAs.

## Decisión

> **Markdown para lo que un humano lee. YAML para lo que una máquina ejecuta.**

- Parámetros de materiales, configuración GRBL y BOM → **YAML** con esquemas definidos en [parametros/README.md](../parametros/README.md).
- Narrativa (decisiones, pruebas, historia, subsistemas) → Markdown.

## Consecuencias

- ✅ Un `material.yaml` puede convertirse por script en librería de LightBurn (meta en el roadmap).
- ✅ Los YAML mantienen trazabilidad vía campo `fuente` → prueba que los respalda.
- La plantilla de parámetros es YAML ([plantilla-material.yaml](../../../harness/plantillas/plantilla-material.yaml)), no Markdown.
