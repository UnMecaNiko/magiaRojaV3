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
- El homing confirma que `$22=1` está activo en la EEPROM (el último snapshot [grbl-actual.yaml](../parametros/grbl/grbl-actual.yaml) lo tenía en 0 → **quedó desactualizado**, hay que recapturar `$$`).

## Acciones / implicaciones

- ⏳ **Recapturar `$$`** de la controladora y actualizar [grbl-actual.yaml](../parametros/grbl/grbl-actual.yaml) + respaldo crudo en `historico/` — el snapshot vigente es previo a habilitar homing y al switch físico.
- ⏳ Medir el **recorrido real de Z** → `$132` (pendiente #6 de D-0011).
- ⏳ Reevaluar reactivar **soft limits `$20=1`** ahora que los tres ejes homean (ver [D-0010](../decisiones/D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md)); al hacerlo, subir `$130`/`$131` a 500 (área 500×500, D-0015) y fijar `$132` al recorrido medido.
- ⏳ Validar Vref bajo carga, sobre todo en **Z** (al ~70 % del nominal) — pendiente de la [prueba de calibración](2026-08-17-calibracion-vref-drivers-700mv.md).

## Fuentes

- Puesta en marcha física directa por Nicolas Velasquez (fuente primaria).
