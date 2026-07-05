# Ficha de componente: Motores NEMA 17 (X, Y, Z)

> Especificaciones leídas directamente de la etiqueta/ficha de compra de los motores por Nicolas Velasquez el **2026-07-04** (fuente primaria — no requiere validación cruzada en internet). Fabricante y número de parte exactos quedan pendientes.

## Identificación

| Campo | Valor |
|---|---|
| Fabricante | ⏳ PENDIENTE — no visible/no registrado en la etiqueta |
| Modelo | ⏳ PENDIENTE — número de parte exacto no confirmado |
| Tipo | Motor paso a paso bipolar, tamaño NEMA 17, 4 cables |
| Rol en la máquina | Movimiento de los tres ejes (X, Y, Z) |

## Especificaciones técnicas

Hay **dos variantes** en la máquina — mismo estándar NEMA 17, distinta corriente/torque:

| Parámetro | Motores X / Y | Motor Z |
|---|---|---|
| Corriente nominal por fase | **1.7 A** | **2.0 A** |
| Par de sujeción (holding torque) | 0.45 Nm (64 oz·in) | 59 Ncm (84 oz·in) |
| Ángulo de paso | 1.8° ± 5% (200 pasos/rotación) | ⏳ PENDIENTE (asumir 1.8°, estándar NEMA 17, sin confirmar en etiqueta) |
| Fases | 2 (bipolar, 4 hilos) | 2 (bipolar, 4 hilos) |
| Tamaño de cuerpo (frente) | 1.575 in (40 mm) | 1.9 in (48 mm) |

## Notas de integración en la Magia Roja v3

- Eje Z motorizado es **nuevo en v3** (ver [eje-z.md](../../subsistemas/eje-z.md)); el motor de mayor corriente/torque (2 A) va ahí por la carga a levantar (cabezal + husillo).
- Driver: **DRV8825** (ver [D-0007](../../decisiones/D-0007-drivers-drv8825.md) y [ficha del driver](driver-drv8825.md)). Corrientes de calibración (Vref) calculadas en [parametros/drivers/calibracion-corriente.yaml](../../parametros/drivers/calibracion-corriente.yaml).
- Ambas corrientes nominales (1.7 A y 2 A) superan el límite de ~1.5 A sin refrigeración del DRV8825 → **refrigeración activa obligatoria** en los tres drivers.
- ⏳ PENDIENTE: fotografiar/transcribir la etiqueta completa del motor (fabricante, número de parte, inductancia por fase) para completar esta ficha y poder cotejarla con un datasheet oficial.

## Fuentes (consultadas 2026-07-04)

- Etiqueta física / especificación de compra de los motores instalados en la máquina (dato provisto directamente por Nicolas Velasquez, no una fuente externa).
