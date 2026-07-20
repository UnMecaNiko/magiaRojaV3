# D-0010 — Soft limits apagados hasta instalar fin de carrera en Z

- **Fecha**: 2026-07-20
- **Ámbito**: Máquina (GRBL)
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez
- **Reemplaza a**: [D-0009](D-0009-z-sin-fin-de-carrera-soft-limits.md)

## Contexto

[D-0009](D-0009-z-sin-fin-de-carrera-soft-limits.md) proponía mantener `$20=1` (soft limits) globalmente y neutralizar el chequeo en Z fijando `$132` a un valor enorme. Al revisar el uso real, esa propuesta resultó **insuficiente**: el chequeo de soft limits de GRBL (`system_check_travel_limits()` en `system.c`) siempre deja **un lado del eje fijo exactamente en la posición de máquina `0`**, sin importar el valor de `$130`/`$131`/`$132` — ese valor solo gobierna el otro lado. Código exacto (`gnea/grbl`, rama master, consultado 2026-07-20):

```c
#ifdef HOMING_FORCE_SET_ORIGIN
  if (bit_istrue(settings.homing_dir_mask,bit(idx))) {
    if (target[idx] < 0 || target[idx] > -settings.max_travel[idx]) { return(true); }
  } else {
    if (target[idx] > 0 || target[idx] < settings.max_travel[idx]) { return(true); }
  }
#else
  if (target[idx] > 0 || target[idx] < settings.max_travel[idx]) { return(true); }
#endif
```

Como Z no tiene fin de carrera, su posición de máquina "0" es arbitraria (donde haya quedado el eje físicamente al encender/resetear el Arduino), no un límite real. Resultado: moviendo Z desde la mitad de su recorrido, un lado queda libre (el gobernado por `$132`, ya agrandado) pero el otro se bloquea de inmediato al cruzar ese "0" arbitrario — justo el problema reportado al usar la máquina. No existe combinación de `$23`/`$132`/`HOMING_FORCE_SET_ORIGIN` que libere ambos lados a la vez mientras `$20=1`.

## Decisión

**Se apagan los soft limits por completo: `$20=0`.** Es la única opción de las evaluadas que no depende de disciplina manual ni dejaba a Z con un bloqueo aleatorio en un sentido. Se acepta perder la protección de soft limits también en X/Y como costo de esta decisión.

- `$21=1` (hard limits) **se mantiene** — es independiente de este problema; el pin de límite de Z sin switch queda en pull-up interno (no disparado), sin puente físico necesario.
- `$22` (homing) y el ciclo de homing sin Z (`config.h`) **se mantienen como en D-0009** — X/Y sí tienen switch y sí se homean; Z sigue fuera del ciclo porque no tiene switch. Esta parte de D-0009 no se revierte, solo la parte de soft limits.
- `$132` deja de tener el rol de "neutralizar" el chequeo (ya no aplica, con `$20=0` no se evalúa ningún eje) — queda como dato pendiente real de Z, no como valor artificial.

## Pendiente

- ⏳ **Instalar fin de carrera físico en Z.** Cuando exista: Z se incorpora al ciclo de homing (`config.h`), `$132` se fija a su recorrido real medido, y se reevalúa reactivar `$20=1` — en ese escenario los tres ejes estarían homeados y el soft limit ya no tendría el problema del "lado fijo en 0 arbitrario" descrito arriba. Ítem en [plan-de-trabajo.md](../../../harness/planeacion/plan-de-trabajo.md).

## Consecuencias

- Ningún eje queda protegido por software contra excederse del área de trabajo — solo hard limits (y solo en los ejes con switch: X/Y). Z no tiene ninguna protección de límite mientras no tenga switch propio.
- El operador debe tener cuidado manual al mover Z, especialmente cerca de los extremos mecánicos del husillo (riesgo de forzar el motor/transmisión contra un tope físico).
- `$20=0` es reversible sin más costo que reactivarlo cuando se instale el switch de Z.
