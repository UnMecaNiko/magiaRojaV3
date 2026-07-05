# Guía: cómo investigar

**Principio fundamental del repositorio: ante cualquier dato técnico dudoso, se consulta internet.** Nunca se documenta de memoria lo que se puede verificar.

## Por qué esta regla existe (caso real)

Al iniciar el repo, el láser de la v3 se recordaba como "tri-j30". Una búsqueda reveló que el modelo real es **Laser Tree K30** — y de paso, que requiere **24V/5A**, incompatible con el riel de 12V planeado. Un dato de memoria habría producido documentación falsa *y* un error de diseño eléctrico. La búsqueda evitó ambos.

## Procedimiento

1. **Identificar el dato dudoso**: modelo de componente, especificación, concepto técnico, parámetro de partida.
2. **Buscar priorizando fuentes primarias**:
   - Fabricante (página oficial, datasheet, manual) > distribuidores > foros/comunidad.
   - Para GRBL/software: documentación oficial (github.com/gnea/grbl, docs.lightburnsoftware.com).
3. **Contrastar al menos 2 fuentes** cuando el dato sea crítico (seguridad, eléctrica, compras).
4. **Registrar siempre**:
   - La URL de cada fuente.
   - La **fecha de consulta** (las páginas cambian).
   - Si el dato es de fabricante y no está validado por el equipo → marcarlo (`validado: false` en YAML, "dato del fabricante" en Markdown).
5. **Dato no encontrado** → se marca `⏳ PENDIENTE` con nota de qué se buscó. Jamás se inventa.

## Dónde queda lo investigado

| Tipo de hallazgo | Destino |
|---|---|
| Specs de un componente | Ficha en `conocimiento/maquina/componentes/fichas/` |
| Concepto técnico nuevo | Entrada en `conocimiento/glosario.md` |
| Parámetro de partida (no validado) | YAML con `validado: false` y URL en `fuente` |
| Comparativas/mercado | `comercial/` con fuentes |
| Hallazgo que cambia una decisión | Nuevo ADR en `decisiones/` |

## Temas abiertos que requieren investigación

Lista viva — agregar aquí lo que surja:

- [x] ~~Atenuación del acrílico rojo a 450 nm / 30W~~ → **resuelto 2026-07-04**: el rojo genérico no certifica; se requiere acrílico naranja con OD para 405–450 nm. Hallazgo en [seguridad.md](../../conocimiento/maquina/subsistemas/seguridad.md)
- [ ] Pinout y niveles PWM/TTL del K30 (manual del fabricante)
- [ ] Calibres de cable AWG para 12V/10A y 24V/5A
- [ ] Modo láser GRBL (`$32`, M3 vs M4) con módulos de diodo
- [ ] CAM y sender para el flujo de fresado
- [ ] Competencia: xTool, Atomstack, Sculpfun, kits CNC (para comercial)
