# Prueba: Vref de los tres drivers DRV8825 ajustado a ~700 mV — 2026-08-17

- **Fecha**: 2026-08-17
- **Quién**: Nicolas Velasquez
- **Subsistema/tema**: electrónica / calibración de corriente de drivers
- **Resultado global**: 🟡 Parcial — Vref ajustado físicamente, falta validar bajo carga (pérdida de pasos y temperatura)

## Objetivo

Fijar el límite de corriente de los drivers **DRV8825** de X, Y y Z ajustando el potenciómetro de cada uno, partiendo de los targets calculados en [calibracion-corriente.yaml](../parametros/drivers/calibracion-corriente.yaml).

## Montaje / condiciones

- Drivers DRV8825, resistencias sensoras **0,1 Ω** ("R100"), fórmula `Vref = Ilímite / 2` (ver [ficha del driver](../componentes/fichas/driver-drv8825.md)).
- Motores NEMA 17: X/Y **1,7 A** nominal, Z **2,0 A** nominal (ver [ficha del motor](../componentes/fichas/motor-nema17.md)).

## Procedimiento y resultados

- Se ajustó el Vref de **los tres ejes a ~0,70 V** (medida aproximada, "alrededor de 700 mV").
- Corriente de fase resultante: **~1,4 A por fase** en los tres drivers (`I = Vref × 2`).

| Eje | Corriente nominal | Vref medido | Corriente resultante | % del nominal |
|---|---|---|---|---|
| X | 1,7 A | ~0,70 V | ~1,4 A | ~82 % |
| Y | 1,7 A | ~0,70 V | ~1,4 A | ~82 % |
| Z | 2,0 A | ~0,70 V | ~1,4 A | ~70 % |

## Conclusiones

- **X e Y**: punto de arranque conservador y razonable (~82 % del nominal). Por debajo del límite de 1,5 A sin refrigeración, aunque la refrigeración activa sigue siendo obligatoria.
- **Z**: queda al **~70 % de su corriente nominal (2,0 A)**. Es el eje que levanta cabezal + husillo, por lo que este ajuste es el candidato más probable a **perder pasos o "caerse"** bajo carga. Si ocurre, subir el Vref de Z hacia 0,80–0,90 V.

## Acciones / implicaciones

- ⏳ PENDIENTE de validación bajo carga: mover cada eje con carga real y verificar **sin pérdida de pasos** y con **temperatura del driver controlada**. Prestar especial atención a Z al subir.
- Actualizado el campo `medido_v` de cada eje en [calibracion-corriente.yaml](../parametros/drivers/calibracion-corriente.yaml). `validado` sigue en `false` hasta comprobar bajo carga.

## Fuentes

- Medición física directa por Nicolas Velasquez (fuente primaria).
- Fórmula y Rsense: [ficha del driver DRV8825](../componentes/fichas/driver-drv8825.md).
