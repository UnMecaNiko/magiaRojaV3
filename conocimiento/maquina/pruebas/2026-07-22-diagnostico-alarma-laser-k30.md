# Prueba: Diagnóstico de "LaserGRBL detectó un problema con tu placa" al usar el K30 — 2026-07-22

- **Fecha**: 2026-07-22
- **Quién**: Nicolas Velasquez
- **Subsistema/tema**: electrónica / control GRBL / láser K30
- **Resultado global**: ✅ Éxito (causa raíz identificada)

## Objetivo

Diagnosticar por qué LaserGRBL mostraba la advertencia "LaserGRBL detectó un problema con tu placa" a mitad de trabajo, siempre al usar el K30 por encima de ~50% de potencia.

## Montaje / condiciones

- Arduino + CNC Shield, drivers DRV8825 (X/Y/Z), GRBL con `$32=1` (modo láser).
- K30 conectado al terminal **"Z-"** de la CNC Shield (señal PWM/TTL) — fuente propia 24V/5A del K30 a toma de 110V independiente.
- `$21=1` (hard limits activos) en el momento de las primeras pruebas; Z sin fin de carrera físico (contexto: [D-0009](../decisiones/D-0009-z-sin-fin-de-carrera-soft-limits.md)/[D-0010](../decisiones/D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md)).

## Procedimiento y resultados

| # | Prueba | Resultado |
|---|---|---|
| 1 | Solo láser trabajando (motores paso a paso desconectados), mismo trabajo de siempre | ❌ Reapareció el aviso al 75% del trabajo |
| 2 | Solo motores trabajando (láser desconectado), mismo trabajo | ✅ Terminó sin problema |
| 3 | `$21=0` (hard limits apagados) + láser al 90% de potencia | ✅ Terminó al 100% sin problema |

## Conclusiones y acciones

**Causa raíz identificada** — conflicto de pines de GRBL en Arduino Uno con modo láser activo:

- Con `$32=1` (modo láser), GRBL requiere `VARIABLE_SPINDLE` compilado. En `cpu_map.h`, esto **reasigna el límite de Z de D11 a D12** para liberar D11 (que tiene timer de hardware) como salida PWM:
  ```c
  #ifdef VARIABLE_SPINDLE // Z Limit pin y spindle enable SE INTERCAMBIAN para acceder al PWM de hardware en el Pin 11.
    #define Z_LIMIT_BIT  4 // Uno Digital Pin 12
  #else
    #define Z_LIMIT_BIT  3 // Uno Digital Pin 11
  #endif
  ```
- El terminal "Z-" de la CNC Shield está cableado físicamente a D11 — por eso el K30 sí recibe bien el PWM ahí (confirmado empíricamente: el control de potencia funciona bien por debajo del umbral de falla).
- Pero esto deja **D12 (el límite real de Z en este modo) sin nada conectado** — flotando, sostenido solo por el pull-up interno de GRBL.
- Con `$21=1`, GRBL vigila D12 por interrupción de cambio de pin (`LIMIT_PCMSK`, ver `limits.c`). El ruido EMI del driver interno del K30 (que conmuta más corriente cuanto mayor la potencia pedida) se acopla a ese pin flotante y GRBL lo interpreta como "switch de Z activado" → **alarma de hard limit** → la máquina se detiene → LaserGRBL reporta "problema con la placa".
- La prueba 3 (`$21=0` elimina el falso disparo) confirma la causa al 100%. Las pruebas 1 y 2 habían descartado ya a los motores/drivers de paso como causa.

**Por qué los láseres de menor potencia nunca dieron este problema**: el mecanismo (pin flotante + hard limits) siempre existió, pero un driver de menor corriente genera mucho menos EMI — nunca cruzó el umbral de disparo. El K30, con bastante más corriente en su driver, sí lo cruza.

**Decisión tomada**: instalar un fin de carrera físico en Z (posición Z+, arriba/retraído), cableado al header D12 ("SpnEn") de la shield — no al terminal "Z-" (ocupado por el PWM del láser). Esto resuelve la causa raíz de forma permanente. Registrado en [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md).

Mientras tanto: `$21=0` (además de `$20=0` ya apagado por D-0010) — sin protección de hard limit en ningún eje hasta que el switch esté instalado.

Alternativas evaluadas y descartadas por ahora (documentadas por si se necesitan de respaldo):
- Capacitor de desacople (100nF) entre D12 y GND — mitiga el ruido sin resolver la causa (D12 seguiría sin switch real).
- Excluir a Z de `LIMIT_MASK` en `cpu_map.h` (recompilar firmware) — resuelve el síntoma pero dejaría a Z permanentemente sin ninguna protección de hard limit, en vez de resolverlo con un switch real.

## Fuentes (consultadas 2026-07-22)

- [gnea/grbl, `grbl/cpu_map.h`](https://github.com/gnea/grbl/blob/master/grbl/cpu_map.h) — mapeo de pines Uno, sección `VARIABLE_SPINDLE`.
- [gnea/grbl, `grbl/limits.c`](https://github.com/gnea/grbl/blob/master/grbl/limits.c) — uso de `LIMIT_MASK` en la inicialización y la interrupción de límites.
- [gnea/grbl, `grbl/spindle_control.c`](https://github.com/gnea/grbl/blob/master/grbl/spindle_control.c) — generación de PWM por Timer2 (frecuencia ~0.98kHz, resolución 8 bits).
- [gnea/grbl wiki, "Connecting Grbl"](https://github.com/gnea/grbl/wiki/Connecting-Grbl) — confirma el intercambio D11/D12 documentado por el propio proyecto.
- [arkypita/LaserGRBL, `LaserGRBL/Core/GrblCore.cs`](https://github.com/arkypita/LaserGRBL/blob/master/LaserGRBL/Core/GrblCore.cs) y [`ResumeJobForm.es.resx`](https://github.com/arkypita/LaserGRBL/blob/master/LaserGRBL/ResumeJobForm.es.resx) — origen exacto del aviso "problema con tu placa" (diálogo "Reanudar Trabajo", causas `StopResponding`/`UnexpectedReset`/`UnexpectedDisconnect`/`MachineAlarm`).

## Media

_(sin fotos/video de esta sesión de diagnóstico)_
