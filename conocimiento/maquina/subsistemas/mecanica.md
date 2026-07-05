# Subsistema: Mecánica

> **Estado: ✅ Desarrollada** (diseño y construcción: Saul Velasquez)
> Última actualización: 2026-07-04

## Resumen

Estructura de la v3, más grande que la v2, con tres ejes motorizados (X, Y y el nuevo Z). Hereda la filosofía mecánica de la v2: rigidez estructural para minimizar flexión y vibración, que son los enemigos de la precisión en grabado.

## Lo que se sabe

- La mecánica está **terminada** — fue la primera fase del build v3.
- Área de trabajo mayor que los 400×400 mm de la v2.
- Motores NEMA 17 en todos los ejes.
- Nuevo **eje Z motorizado** para subir/bajar la herramienta (ver [eje-z.md](eje-z.md)).
- Soporte de **cabezal intercambiable**: láser ↔ motor de fresado (ver [cabezal-fresado.md](cabezal-fresado.md)).

## Herencia de la v2 (por confirmar en v3)

⏳ PENDIENTE: confirmar cuáles de estos elementos de la v2 se mantienen en la v3:

- Tornillos helicoidales + bujes lineales en X/Y (en vez de correas) — clave de precisión de la v2.
- Estructura de acero 1045 + aluminio extruido + lámina calibre 18.
- Domo de acrílico rojo translúcido 5 mm (protección ocular).
- Parrilla de corte tipo panal (honeycomb).
- Sistema de extracción de humos.

## Pendientes de documentación

⏳ PENDIENTE — capturar de la máquina física:

1. Medidas del área de trabajo y dimensiones externas.
2. Tipo de transmisión por eje (tornillo/correa, paso del tornillo).
3. Fotos del proceso de construcción mecánica → subir a S3 y enlazar aquí y en [proceso-construccion](../../proceso-construccion/).
4. Detalle del mecanismo de intercambio de cabezal.

## Mantenimiento asociado

Ver [mantenimiento.md](../../mantenimiento.md) — en v2: lubricación mensual de tornillos y bujes.
