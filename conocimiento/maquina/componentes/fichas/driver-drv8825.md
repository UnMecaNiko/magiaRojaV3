# Ficha de componente: Driver DRV8825

> Ficha investigada en internet el **2026-07-04** siguiendo [la guía de investigación](../../../../harness/guias/como-investigar.md). Fuentes al final.

## Identificación

| Campo | Valor |
|---|---|
| Fabricante | Texas Instruments (chip); placa portadora tipo Pololu/StepStick |
| Modelo | DRV8825 |
| Tipo | Driver de motor paso a paso bipolar (chopper de corriente) |
| Rol en la máquina | Controla la corriente de los motores NEMA 17 de X, Y y Z sobre la CNC Shield |

## Especificaciones técnicas

| Parámetro | Valor |
|---|---|
| Resistencias sensoras (Rsense) | **0.1 Ω** (marcado "R100" en la placa) — confirmado físicamente en las placas de esta máquina |
| Fórmula de límite de corriente | `Límite de corriente = Vref × 2` (equivalente a `Vref = Ilímite / (5 × Rsense)` con Rsense = 0.1 Ω) |
| Corriente máx. continua sin refrigeración | ~1.5 A por fase |
| Corriente máx. con disipador + aire forzado | 2.2 A por fase (límite físico de las resistencias sensoras) |
| Microstepping soportado | Full, 1/2, 1/4, 1/8, 1/16, 1/32 |
| Punto de medición de Vref | Via marcado con un círculo en la serigrafía inferior de la placa, respecto a GND |
| Compatibilidad de pinout | Casi idéntico al A4988 (drop-in en la mayoría de casos; hay diferencias de pines/timing) |

## Notas de integración en la Magia Roja v3

- Modelo confirmado para v3 en [D-0007](../../decisiones/D-0007-drivers-drv8825.md), reemplazando el pendiente que dejó [D-0006](../../decisiones/D-0006-mantener-plataforma-grbl.md).
- Los tres ejes usan motores NEMA 17 de 1.7 A (X/Y) y 2 A (Z) — ver [ficha del motor](motor-nema17.md). Estas corrientes están cerca o por encima del límite de 1.5 A sin refrigeración, por lo que **la refrigeración activa de los drivers es obligatoria** (lección heredada de v2, ver [electronica.md](../../subsistemas/electronica.md)).
- Targets de Vref calculados para esta máquina: [parametros/drivers/calibracion-corriente.yaml](../../parametros/drivers/calibracion-corriente.yaml). ⏳ PENDIENTE: verificar en banco con multímetro y registrar como prueba.
- Microstepping elegido para los tres ejes: **1/8 (octavo de paso)**. Tabla de jumpers MODE0/1/2 y detalle en [parametros/drivers/microstepping.yaml](../../parametros/drivers/microstepping.yaml). ⏳ PENDIENTE: confirmar físicamente los jumpers en la CNC Shield.
- ⚠️ Nunca medir la corriente en la fuente de alimentación: la corriente de bobina no se corresponde con la corriente de la fuente. Medir Vref en el via marcado, o la corriente en serie con una bobina del motor.

## Fuentes (consultadas 2026-07-04)

- Página oficial del producto (Pololu): https://www.pololu.com/product/2133
