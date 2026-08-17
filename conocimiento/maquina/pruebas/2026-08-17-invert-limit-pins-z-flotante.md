# Prueba: `$5=1` (invert limit pins) dispara alarma por D12 (Z) flotante — 2026-08-17

- **Fecha**: 2026-08-17
- **Quién**: Nicolas Velasquez
- **Subsistema/tema**: control GRBL / finales de carrera
- **Resultado global**: ✅ Éxito (causa raíz confirmada por una segunda vía)

## Objetivo

Configurar la placa para trabajar con finales de carrera **normalmente cerrados (NC)** invirtiendo los pines de límite (`$5=1`), y entender por qué la máquina cae en alarma al hacerlo.

## Montaje / condiciones

- Arduino UNO + CNC Shield, **GRBL 1.1h** (confirmado en el banner del Serial Monitor, COM5).
- `$32=1` (modo láser) → `VARIABLE_SPINDLE` → el límite de Z está en **D12**, no en D11 (ver [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md)).
- Z **sin fin de carrera físico**; D12 sostenido solo por el pull-up interno de GRBL.
- Se colocaron jumpers en los switches disponibles (X/Y) y se puso `$5=1` para probar lógica NC.

## Procedimiento y resultados

- Al invertir los pines de límite (`$5=1`), la máquina cae en alarma.
- El status report (`?`) devuelve:
  ```
  <Idle|MPos:0.000,0.000,0.000|FS:0,0|Pn:Z|WCO:0.000,0.000,0.000>
  ```
- El campo **`Pn:Z`** confirma que el único pin de límite leído como activo es **Z**. X e Y (con jumper/switch cerrado = LOW) no aparecen.

## Conclusiones

- En GRBL clásico `$5` es un **booleano global**: invierte los tres ejes a la vez, no se puede invertir solo X/Y.
- Con `$5=1` la lógica pasa a NC: GRBL espera cada pin en **LOW (aterrizado) en reposo** y lee **HIGH = disparado**.
- Como D12 (límite de Z en modo láser) está **flotando**, el pull-up interno lo mantiene en HIGH → con `$5=1` se interpreta como "Z disparado" → `Pn:Z` → alarma.
- Es la **misma causa raíz de [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md)** (D12 flotante), confirmada ahora por una vía distinta a la del ruido EMI del K30 documentada en la prueba [2026-07-22](2026-07-22-diagnostico-alarma-laser-k30.md).

## Acciones / implicaciones

- Para usar NC (`$5=1`) con `$21=1`, **todos** los pines de límite deben estar en LOW en reposo. Mientras Z no tenga switch, D12 debe:
  - **Parche temporal**: aterrizarse a GND (jumper D12→GND) — emula un NC cerrado; `Pn:` debe quedar vacío tras el cambio. Se pierde protección de límite en Z (que hoy no existe de todos modos).
  - **Fix definitivo**: instalar el fin de carrera NC en Z cableado a D12, tal como decide [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md).
- Refuerza el pendiente #2 de D-0011: elegir switch NC define `$5=1`, pero **solo es viable una vez que los tres pines (incl. D12) tengan un nivel definido en reposo**.

## Fuentes (consultadas 2026-08-17)

- [gnea/grbl, `doc/markdown/settings.md` — `$5` invert limit pins](https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md#5---invert-limit-pins-boolean)
- [gnea/grbl, `doc/markdown/interface.md` — campo `Pn:` del status report](https://github.com/gnea/grbl/blob/master/doc/markdown/interface.md#pin-state)

## Media

_(captura del Serial Monitor con `Pn:Z` compartida por el usuario; no almacenada en el repo)_
