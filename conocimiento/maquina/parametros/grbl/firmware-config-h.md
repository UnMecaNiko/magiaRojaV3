# Firmware GRBL — cambios no estándar en `config.h`

> El firmware compilado NO vive en este repo. Fuente en la máquina del responsable:
> `C:\Users\DELL\Documents\Arduino\libraries\grbl` (GRBL clásico, base 2021; `config.h` modificado).
> Este archivo documenta las diferencias respecto al `config.h` de stock para que el fork no se pierda.
> ⚠️ Cambiar `config.h` **requiere recompilar y reflashear** el Arduino; no se aplica solo con `$$`.

## Defines relevantes (estado 2026-08-17)

| Define | Valor en esta máquina | Stock GRBL | Nota |
|---|---|---|---|
| `HOMING_CYCLE_0` | `(1<<Z_AXIS)` | `(1<<Z_AXIS)` | **Corregido 2026-08-17**: antes estaba en `((1<<X_AXIS)|(1<<Y_AXIS))`, lo que dejaba a Z **fuera del homing** (herencia v2). Ahora Z homea primero (sube al switch de arriba) — cierra pendiente #5 de D-0011. |
| `HOMING_CYCLE_1` | `((1<<X_AXIS)\|(1<<Y_AXIS))` | igual | **Descomentado 2026-08-17**. Luego homea X e Y juntos (horizontal). |
| `HOMING_FORCE_SET_ORIGIN` | **habilitado** (línea 129) | comentado (deshabilitado) | Con esto, tras homear, el origen (0) se fija **en la posición del switch**. Como el switch de Z está **arriba**, el cero de Z queda arriba y el espacio de trabajo va negativo hacia abajo (0 arriba → −$132 abajo). **Decidido 2026-08-17: se acepta esta convención (Z=0 arriba, negativo hacia el material)** — el responsable descartó "0 abajo/+50 arriba" para no tocar `limits.c`/`system.c`. |
| `HOMING_INIT_LOCK` | deshabilitado (comentado, línea 88) | habilitado | La máquina no obliga a homear antes de operar. |

## Consecuencia de coordenadas (importante)

Con `HOMING_FORCE_SET_ORIGIN` activo + switch de Z arriba:

- Tras `$H`: **MPos Z = 0 en el tope superior**, y baja a valores **negativos** hacia el material (convención CNC clásica).
- Para lograr en cambio "**cero abajo, +50 arriba en coordenadas de máquina**" NO basta el orden de homing: haría falta editar también `limits.c` (`limits_go_home`, valor de `sys_position` tras homear) y `system.c` (`system_check_travel_limits`, que asume rango `[-$132, 0]`). Alternativa sin fork: usar un sistema de coordenadas de trabajo (G54/G92) con el cero de pieza abajo.

## `defaults.h` — perfil `DEFAULTS_GENERIC` personalizado (2026-08-17)

El bloque `#ifdef DEFAULTS_GENERIC` de `defaults.h` se reescribió con **los valores reales de esta máquina** (snapshot `$$` 2026-08-17), para que un `$RST=$` restaure la Magia Roja v3 en vez de los genéricos de GRBL. Incluye **`DEFAULT_Z_MAX_TRAVEL 80.0`** (recorrido real de Z = 85 mm; límite 80 con ~5 mm de margen). Todos los `DEFAULT_*` reflejan [grbl-actual.yaml](grbl-actual.yaml).

⚠️ Estos defaults solo se escriben en EEPROM al **recompilar + reflashear y luego ejecutar `$RST=$`** (o en un Arduino con EEPROM virgen). Un flasheo normal NO sobrescribe la EEPROM existente.

## Estado (2026-08-17)

- ✅ **Recompilado y reflasheado.**
- ✅ **`$H` probado con Z en el ciclo**: Z sube primero (dirección correcta) y luego homean X/Y. Ver [prueba](../pruebas/2026-08-17-homing-z-primero-ok.md).

## Pendientes

- ⏳ Revisar el resto de `config.h` (49 KB) por si hay más diferencias vs stock sin documentar.
- ⏳ Validar Z bajo carga (peso del cabezal de fresado) sin pérdida de pasos con el Vref actual.

## Fuentes

- `config.h` local de la máquina (revisado y editado 2026-08-17).
- Referencia de defines de homing: comentarios del propio `config.h` de gnea/grbl.
