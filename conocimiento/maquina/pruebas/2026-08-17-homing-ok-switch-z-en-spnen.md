# Prueba: motores y finales de carrera funcionando — homing OK con switch de Z en SpnEn (D12) — 2026-08-17

- **Fecha**: 2026-08-17
- **Quién**: Nicolas Velasquez
- **Subsistema/tema**: control GRBL / finales de carrera / homing / drivers
- **Resultado global**: ✅ Éxito — los tres ejes se mueven y el ciclo de homing (`$H`) funciona con finales de carrera NC

## Objetivo

Poner en marcha el movimiento de los tres ejes y validar los finales de carrera y el ciclo de homing, tras calibrar los drivers (ver [calibración de Vref](2026-08-17-calibracion-vref-drivers-700mv.md)) y resolver la lógica de límites (ver [invert limit pins](2026-08-17-invert-limit-pins-z-flotante.md)).

## Montaje / condiciones

- Arduino UNO + CNC Shield, GRBL 1.1h, modo láser (`$32=1`).
- Drivers DRV8825 con Vref ~0,70 V en los tres ejes (~1,4 A).
- Finales de carrera **NC** (`$5=1`).
- Switches conectados en: **X-, Y-, Y+, y Z+**. El de **Z se cableó a SpnEn (D12)**, no al terminal "Z-" — tal como decidía [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md) (en modo láser el límite real de Z está en D12).

## Procedimiento y resultados

- **Motores**: los tres ejes se mueven correctamente con el Vref calibrado (~1,4 A). Sin fallos reportados de movimiento.
- **Finales de carrera**: funcionando en lógica NC (`$5=1`). Al conectar el switch de Z a **D12/SpnEn** el pin queda definido en LOW en reposo (ya no flota) → desaparece la falsa alarma `Pn:Z` que documentaba la prueba de [invert limit pins](2026-08-17-invert-limit-pins-z-flotante.md).
- **Homing (`$H`)**: ✅ funciona y en la dirección correcta.

## Conclusiones

- Se **cierra la causa raíz de [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md)**: D12 ya no está flotando porque tiene el switch físico de Z (Z+) cableado a SpnEn. Esto elimina el jumper temporal a GND que se usaba como parche.
- Con los tres pines de límite definidos en reposo, `$5=1` (NC) y `$21=1` (hard limits) operan sin falsas alarmas.
- El homing confirmó `$22=1`; después se recapturó `$$` con límites/homing activos. El cambio posterior de `$132` a 80 quedó documentado, pero falta un dump crudo final que reúna ambos estados.

## Acciones / implicaciones

- ✅ `$$` recapturado y respaldado en [historico/2026-08-17-homing.txt](../parametros/grbl/historico/2026-08-17-homing.txt) para límites/homing; ⏳ recapturar después de `$132=80`, porque ese dump todavía muestra 200.
- ✅ Recorrido Z medido en 85 mm y límite `$132=80` aplicado con margen; ver [D-0017](../decisiones/D-0017-area-trabajo-empirica-505x490.md).
- ✅ Soft limits reactivados (`$20=1`) junto con hard limits (`$21=1`).
- ⏳ Validar Vref bajo carga, sobre todo en **Z** (al ~70 % del nominal) — pendiente de la [prueba de calibración](2026-08-17-calibracion-vref-drivers-700mv.md).

## Fuentes

- Puesta en marcha física directa por Nicolas Velasquez (fuente primaria).
