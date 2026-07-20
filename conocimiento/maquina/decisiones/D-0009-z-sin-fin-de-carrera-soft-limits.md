# D-0009 — Eje Z sin fin de carrera: fuera del homing, soft limits neutralizados por $132

- **Fecha**: 2026-07-20
- **Ámbito**: Máquina (GRBL)
- **Estado**: ❌ Reemplazada por [D-0010](D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md)
- **Decisor**: Nicolas Velasquez

> ⚠️ La parte de esta decisión sobre soft limits (punto 2) quedó **reemplazada por [D-0010](D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md)**: fijar `$132` grande no bastaba, porque el chequeo de GRBL deja un lado del eje fijo en la posición `0` sin importar `$132` — ver el porqué técnico en D-0010. El punto 1 (Z fuera del ciclo de homing) y el punto 3 (hard limits sin cambios) **siguen vigentes**, no se revirtieron.

## Contexto

La v3 estrena eje Z motorizado, pero no tiene fin de carrera físico instalado en Z (solo X e Y). Se quiere mantener hard limits y soft limits activos en la máquina, pero GRBL **no permite habilitar/deshabilitar estos límites por eje individual**:

- `$20` (soft limits) y `$21` (hard limits) son *flags* globales de 3 ejes. El chequeo de soft limits (`system_check_travel_limits()` en `system.c`) recorre los `N_AXIS` sin excepción por eje — no existe una máscara para excluir uno. Fuente: [gnea/grbl, rama master, `grbl/system.c`](https://github.com/gnea/grbl/blob/master/grbl/system.c), consultado 2026-07-20.
- `$20` además **requiere `$22=1`** (homing habilitado) para poder activarse — si se intenta poner `$20=1` con homing deshabilitado, GRBL devuelve `STATUS_SOFT_LIMIT_ERROR` y no lo permite. Fuente: [gnea/grbl, rama master, `grbl/settings.c`](https://github.com/gnea/grbl/blob/master/grbl/settings.c), caso `20` de `settings_store_global_setting()`, consultado 2026-07-20. Documentado también en [settings.md](https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md).

Esto retoma el pendiente #3 de [control-grbl.md](../subsistemas/control-grbl.md) ("Límites y homing con el nuevo eje Z").

## Decisión

1. **El ciclo de homing (`$H`) solo homea X e Y.** Z queda fuera del ciclo de homing en `config.h` (`HOMING_CYCLE_0`/`HOMING_CYCLE_1` sin incluir el bit de Z) — igual que en el `config.h` heredado de la máquina anterior (ver bitácora del [paso 02](../../proceso-construccion/v3/02-electronica-y-electrica.md)). `$22=1` se mantiene activo (habilitado porque X/Y sí tienen switch).
2. **`$20=1` (soft limits) se mantiene activo.** Como GRBL no permite excluir un eje del chequeo, la única palanca disponible por eje es su recorrido máximo (`$130`/`$131`/`$132`, ver [system.c citado arriba]). Se deja `$132` (Z) con un valor deliberadamente muy grande (ej. `100000` mm) para que el chequeo de límite en Z nunca se dispare en la práctica, mientras `$130`/`$131` (X/Y) quedan con el recorrido real medido — esos dos ejes sí quedan protegidos de verdad.
3. **`$21=1` (hard limits) se mantiene activo.** El pin de límite de Z en el CNC Shield queda sin switch conectado. Con el pull-up interno que GRBL configura en Arduino, un pin sin cablear permanece en estado "no disparado" (HIGH) sin necesidad de puente físico. ⏳ PENDIENTE: confirmar en el cableado real que el pin Z-limit no quede expuesto a ruido o corto que dispare una alarma falsa de hard limit.

## Consecuencias

- Z **nunca se referencía a un origen de máquina fijo** — el operador debe poner el cero de Z manualmente en cada sesión (flujo típico en fresadoras/láser sin sensor de altura de herramienta o touch-plate).
- Si en el futuro se agrega un sensor/touch-plate para Z, se puede reevaluar esta decisión: agregar Z a un ciclo de homing propio y bajar `$132` a su recorrido real.
- `$132` en [grbl-actual.yaml](../parametros/grbl/grbl-actual.yaml) **no representa el recorrido físico real de Z** a propósito — es un valor "infinito" intencional, no un dato pendiente de medir.
- Resuelve el pendiente #3 de [control-grbl.md](../subsistemas/control-grbl.md).
