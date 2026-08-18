# Prueba: homing con Z primero (sube) y luego X/Y — funcionó correctamente — 2026-08-17

- **Fecha**: 2026-08-17
- **Quién**: Nicolas Velasquez
- **Subsistema/tema**: control GRBL / homing / eje Z
- **Resultado global**: ✅ Éxito — el ciclo `$H` sube Z primero y luego homea X/Y horizontal, sin incidentes

## Objetivo

Incorporar Z al ciclo de homing (antes quedaba fuera) para que `$H` **primero suba Z** (despejar el área) y **luego homee X/Y**, y validar que funciona en la dirección correcta.

## Montaje / condiciones

- GRBL clásico (fuente en `C:\Users\DELL\Documents\Arduino\libraries\grbl`), modo láser (`$32=1`).
- Switch de Z físico (NC) en la posición **Z+ (arriba)**, cableado a **D12 (SpnEn)**.
- Cambio en `config.h`: `HOMING_CYCLE_0 = (1<<Z_AXIS)`, `HOMING_CYCLE_1 = ((1<<X_AXIS)|(1<<Y_AXIS))` (antes `HOMING_CYCLE_0` era X|Y y Z quedaba fuera del ciclo). Ver [firmware-config-h.md](../parametros/grbl/firmware-config-h.md).
- **Recompilado y reflasheado** el Arduino antes de la prueba.

## Procedimiento y resultados

- Se ejecutó `$H`.
- **Z subió primero** hacia el switch de arriba (dirección correcta), luego X e Y homearon en horizontal.
- Homing "funcionó de maravilla" (palabras del responsable) — sin falsas alarmas ni dirección invertida.

## Conclusiones

- Cierra el pendiente #5 de [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md): orden de homing correcto con Z incluido.
- Con `HOMING_FORCE_SET_ORIGIN` activo y switch arriba, la máquina-cero de Z queda **arriba** (Z=0 en el switch, negativo hacia el material) — convención aceptada por el responsable (ver [firmware-config-h.md](../parametros/grbl/firmware-config-h.md)).

## Acciones / implicaciones

- Recorrido real de Z medido = **85 mm**; soft limit `$132` fijado en **80 mm** (~5 mm de margen). Valor horneado en `defaults.h` (`DEFAULT_Z_MAX_TRAVEL 80.0`).
- ⏳ Pendiente: validar Z bajo carga real (peso del cabezal de fresado) sin pérdida de pasos con el Vref actual (~1.4 A).

## Fuentes

- Puesta en marcha física directa por Nicolas Velasquez (fuente primaria).
