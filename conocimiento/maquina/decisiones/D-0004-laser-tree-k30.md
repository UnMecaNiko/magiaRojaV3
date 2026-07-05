# D-0004 — Láser Laser Tree K30 para la v3

- **Fecha**: 2026-07 (adquisición); registrado 2026-07-04
- **Ámbito**: Máquina
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

La v2 usaba un láser de 80W eléctricos / 10W ópticos con FAC. Para la v3 se buscó más capacidad de corte real como parte del salto comercial de la máquina.

## Decisión

Usar el **Laser Tree K30**: 30W ópticos reales (6 diodos de 5.5W con compresión de haz), 450 nm, air assist integrado, fuente propia 24V/5A. Ver [ficha completa con fuentes](../componentes/fichas/laser-tree-k30.md).

## Consecuencias

- ✅ ~3× potencia óptica vs. v2 → corta en una pasada materiales que antes requerían varias.
- ✅ Air assist integrado simplifica la instalación (v2 usaba bomba externa).
- ⚠️ Requiere **fuente propia de 24V** → arquitectura de dos rieles ([D-0005](D-0005-fuentes-separadas.md)).
- ⚠️ Mayor potencia exige revalidar la seguridad ocular (domo) para 30W @ 450 nm.
- Nota de proceso: la referencia inicial se recordaba como "tri-j30"; la búsqueda en internet la corrigió a **Laser Tree K30** — ejemplo de por qué la regla "consultar internet siempre" existe.
