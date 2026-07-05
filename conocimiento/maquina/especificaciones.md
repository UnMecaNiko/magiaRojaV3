# Especificaciones — CNC Magia Roja v3

> Documento vivo. Los valores pendientes se completan a medida que avanza el desarrollo.
> Última actualización: 2026-07-04

## Dimensiones y estructura

| Especificación | Valor |
|---|---|
| Área de trabajo | ⏳ PENDIENTE — mayor que los 400×400 mm de la v2; medir cuando se cierre el diseño |
| Dimensiones externas | ⏳ PENDIENTE |
| Peso | ⏳ PENDIENTE |
| Materiales estructurales | ⏳ PENDIENTE — confirmar si se mantiene la receta v2 (acero 1045, aluminio extruido, lámina calibre 18, acrílico rojo 5 mm) |

## Movimiento

| Especificación | Valor |
|---|---|
| Ejes | X, Y, **Z motorizado** (nuevo en v3) |
| Motores | NEMA 17 en todos los ejes |
| Transmisión X/Y | ⏳ PENDIENTE — confirmar si se mantienen tornillos helicoidales + bujes lineales (receta v2) |
| Transmisión Z | ⏳ PENDIENTE — definir husillo y recorrido |

## Herramientas (cabezal intercambiable)

| Herramienta | Detalle |
|---|---|
| Láser | **Laser Tree K30** — 30W ópticos, 450 nm, air assist integrado. Ver [ficha](componentes/fichas/laser-tree-k30.md) |
| Motor de fresado | Para grabado/fresado sobre material. ⏳ PENDIENTE: modelo (definido como no prioritario por ahora) |

## Electrónica y control

| Especificación | Valor |
|---|---|
| Controladora | Arduino + CNC Shield, firmware GRBL |
| Drivers | Los de la controladora — ⏳ PENDIENTE: confirmar modelo (v2 usaba TMC2209 refrigerados) |
| Fuente principal | 12 V / 10 A (control, motores, ventilación) |
| Fuente del láser | Propia del K30: 24 V / 5 A |
| Software | LightBurn, LaserGRBL, UGS (por confirmar el flujo de fresado) |

## Comparativa de línea

| | v1 | v2 | v3 |
|---|---|---|---|
| Área de trabajo | 270×340 mm | 400×400 mm | ⏳ (mayor) |
| Ejes motorizados | X/Y (Y dual) | X/Y | X/Y/Z |
| Láser (óptico) | ~10W | 10W (FAC) | **30W** |
| Fresado | Motor rotativo | — | Cabezal intercambiable |
| Transmisión | Correas | Tornillo helicoidal | ⏳ (por confirmar) |
| Controladora | Arduino Uno + Shield V3 + A4988 | GRBL + TMC2209 | Arduino + CNC Shield |
