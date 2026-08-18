# Changelog de configuración GRBL — Magia Roja v3

Bitácora humana de cambios de configuración. Cada entrada responde: **qué cambió, cuándo y por qué**. El dump crudo correspondiente vive en `historico/`.

Formato de entrada:

```
## AAAA-MM-DD — <resumen del cambio>
- Cambios: $XXX: <antes> → <después>
- Motivo: <por qué se hizo>
- Resultado: <qué se observó después>
- Snapshot: historico/AAAA-MM-DD_dump.txt
```

---

## 2026-08-17 — Homing con Z incluido + defaults.h con valores de la máquina (firmware)

- Cambios (en el firmware, no solo `$$`):
  - `config.h`: `HOMING_CYCLE_0` de `X|Y` → `(1<<Z_AXIS)`; `HOMING_CYCLE_1` descomentado a `X|Y`. Antes Z quedaba **fuera** del ciclo de homing (herencia v2).
  - `defaults.h` (perfil `DEFAULTS_GENERIC`): reescrito con todos los valores reales de esta máquina, para que `$RST=$` restaure la Magia Roja v3. Incluye `DEFAULT_Z_MAX_TRAVEL 80.0`.
  - `$132`: recorrido real de Z medido = **85 mm**; límite fijado en **80 mm** (~5 mm de margen).
- Motivo: instalado el switch físico de Z (D12/SpnEn), incorporar Z al homing para que suba primero y despeje el área antes de homear X/Y; y no depender de los defaults genéricos de GRBL.
- Resultado: ✅ Recompilado y reflasheado. `$H` probado: **Z sube primero y luego X/Y** ("funcionó de maravilla"). Convención Z=0 arriba aceptada (`HOMING_FORCE_SET_ORIGIN`).
- Detalle: [firmware-config-h.md](firmware-config-h.md), prueba [2026-08-17-homing-z-primero-ok](../../pruebas/2026-08-17-homing-z-primero-ok.md).

## 2026-08-17 — Primera configuración completa: soft/hard limits, homing, área real

- Cambios: `$5`: 0 → 1 (finales NC); `$20`: 0 → 1 (soft limits); `$21`: 0 → 1 (hard limits); `$22`: 0 → 1 (homing); `$23`=3; `$24`: 200 → 1000; `$25`: 500 → 1500; `$110`/`$111`: 2500 → 3000; `$130`: 400 → **505**; `$131`: 400 → **490**.
- Motivo: puesta en marcha real tras instalar switches (X-, Y-, Y+, Z+ en D12), calibrar drivers y medir el área de trabajo empírica.
- Resultado: ✅ Motores y finales de carrera funcionando; homing OK. Área real 505×490 mm ([D-0017](../../decisiones/D-0017-area-trabajo-empirica-505x490.md)).
- Snapshot: [historico/2026-08-17-homing.txt](historico/2026-08-17-homing.txt) (y el previo del mismo día en [historico/2026-08-17.txt](historico/2026-08-17.txt)).
