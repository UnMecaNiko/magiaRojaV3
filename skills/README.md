# Skills

Skills de investigación y trabajo para agentes (formato skill de Claude Code: una carpeta por skill con su `SKILL.md`).

## Skills previstas (⏳ por crear — ver [roadmap](../harness/planeacion/roadmap.md))

| Skill | Qué haría |
|---|---|
| `investigar-componente` | Dada una referencia (aunque sea aproximada, como "tri-j30"), buscar en internet, contrastar fuentes y generar la ficha en `componentes/fichas/` + entrada en BOM |
| `parametros-de-partida` | Buscar en internet parámetros de corte/grabado de un material para láseres similares al K30 y generar YAML con `validado: false` |
| `comparar-competencia` | Investigar máquinas comparables y actualizar el análisis en `comercial/` con fuentes |
| `generar-articulo` | Leer `conocimiento/` + `proceso-construccion/` y redactar un artículo en `salidas/articulos/` según la guía de estilo |
| `snapshot-grbl` | Dado un dump `$$`, generar el par de archivos de `historico/`, actualizar `grbl-actual.yaml` y pedir el porqué para el CHANGELOG |

## Reglas para toda skill de este repo

1. Respetar [AGENTS.md](../AGENTS.md): español, fuentes citadas con fecha, YAML para datos, nada inventado.
2. Las skills que investigan **siempre** terminan citando URLs y fecha de consulta.
3. Las skills que generan contenido escriben **solo en `salidas/`**; las que documentan la máquina escriben en `conocimiento/` usando las plantillas.
