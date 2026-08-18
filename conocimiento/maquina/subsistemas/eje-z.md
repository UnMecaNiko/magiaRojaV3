# Subsistema: Eje Z motorizado

> **Estado: mecánica ✅ / electrónica ✅ / homing ✅**
> Última actualización: 2026-08-17

## Resumen

**Novedad de la v3.** Las versiones anteriores tenían la herramienta a altura fija (el foco se ajustaba manualmente). La v3 incorpora un eje Z motorizado que sube y baja el cabezal, lo que habilita:

1. **Enfoque automático/repetible del láser** — ajustar la distancia focal (40 mm en el K30) por comando en vez de a mano.
2. **Fresado real** — el fresado exige control de profundidad por pasadas; sin Z motorizado el cabezal de fresado no tendría sentido.
3. Adaptación a materiales de distinto espesor sin recalibrar a mano.

## Lo que se sabe

- Motor: **NEMA 17** de 2.0 A (el de mayor torque de la máquina, por la carga a levantar) — ver [ficha del motor](../componentes/fichas/motor-nema17.md).
- Driver **DRV8825** con Vref ~0.70 V (~1.4 A, ~70% del nominal). Z **no ha perdido pasos** en las pruebas hasta 2026-08-17 (ver [calibración](../pruebas/2026-08-17-calibracion-vref-drivers-700mv.md)).
- La mecánica del eje ya está construida (fase mecánica terminada).
- **Final de carrera físico instalado** (NC) en la posición **Z+ (arriba)**, cableado a **D12 (SpnEn)** de la CNC Shield — resuelve [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md).
- **Recorrido real de Z = 85 mm** (medido 2026-08-17). Soft limit `$132` fijado en **80 mm** (~5 mm de margen).
- **Homing de Z funcionando** (2026-08-17): el ciclo `$H` sube Z primero (`HOMING_CYCLE_0=Z`) y luego homea X/Y. Ver [prueba](../pruebas/2026-08-17-homing-z-primero-ok.md).
- Convención de coordenadas: **Z=0 arriba** (en el switch), negativo hacia el material — `HOMING_FORCE_SET_ORIGIN` activo. Ver [firmware-config-h.md](../parametros/grbl/firmware-config-h.md).

## Pendientes

1. Tipo de transmisión del Z (husillo/tornillo) y paso real → validar `$102` (hoy asumido 200 pasos/mm, sin confirmar el avance real del husillo).
2. Peso máximo de cabezal que el Z soporta sin perder pasos con el Vref actual (~1.4 A) — probar con K30 y sobre todo con el **motor de fresado** (suele pesar más). Si pierde pasos, subir Vref de Z hacia 0.80–0.90 V.
3. Confirmar `$132` definitivo tras uso real (hoy 80 mm con margen sobre los 85 medidos).
