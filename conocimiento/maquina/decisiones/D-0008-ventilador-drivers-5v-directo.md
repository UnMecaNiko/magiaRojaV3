# D-0008 — Ventilador de drivers conectado directo a 5V (no a Cool.En/GRBL)

- **Fecha**: 2026-07-20
- **Ámbito**: Máquina
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

Los drivers DRV8825 ([D-0007](D-0007-drivers-drv8825.md)) requieren refrigeración activa con los motores de X/Y (1.7 A) y sobre todo Z (2 A), lección heredada de v2 (ver [electronica.md](../subsistemas/electronica.md)). Se investigó usar el pin **Cool.En (A3)** de la CNC Shield, controlado por GRBL vía `M8`/`M9`, para encender el ventilador solo mientras la máquina trabaja. La investigación encontró dos caminos posibles:

1. Automatizar `M8`/`M9` al inicio/fin de cada trabajo — inviable en **LaserGRBL** (que es lo que usa Nicolas): a diferencia de LightBurn, no tiene campo de G-code de inicio/fin; la única forma sería un botón personalizado manual (confirmado como limitación conocida y sin resolver en [arkypita/LaserGRBL#617](https://github.com/arkypita/LaserGRBL/issues/617), consultado 2026-07-20).
2. Cablear el ventilador al pin de **Enable compartido de los drivers** (D8), que GRBL activa/desactiva automáticamente según `$1` (step idle delay) sin depender del sender — pero con riesgo de parpadeo si `$1` es bajo.

Ambos caminos requerían además un módulo MOSFET/relé intermedio, porque tanto A3 como D8 son salidas lógicas de 5V/baja corriente, incapaces de alimentar un ventilador directamente.

## Decisión

El ventilador de refrigeración de los drivers se conecta **directo al riel de 5V** de la controladora (Arduino/CNC Shield), sin pasar por GRBL ni por ningún pin de control. Corre de forma continua mientras la controladora tenga alimentación, sin importar si la máquina está en un trabajo o no.

## Motivos

- El ventilador elegido es de **5V** — coincide exactamente con el riel ya disponible en la placa, sin necesidad de regulador ni de step-down.
- Evita el módulo MOSFET/relé que sí harían falta para controlarlo desde A3 o D8.
- Elimina la dependencia de LaserGRBL (que no soporta automatizar `M8`/`M9`) y de la lógica de `$1`, que podía causar parpadeo del ventilador entre movimientos cortos.
- Refrigeración de drivers es una función de protección térmica, no una que dependa del estado del trabajo — tenerla siempre activa mientras hay alimentación no tiene una desventaja real para este caso.

## Consecuencias

- ✅ Resuelve el pendiente 5 de [electronica.md](../subsistemas/electronica.md) ("sistema de ventilación/refrigeración de drivers") sin hardware adicional (MOSFET/relé) ni cambios de firmware.
- ✅ El pin **Cool.En (A3)** queda libre para un uso futuro real de coolant/air-assist del láser K30, si se decide agregarlo.
- ⚠️ El ventilador ya no se apaga nunca mientras el equipo esté encendido (incluso en reposo) — a diferencia de lo que se buscaba originalmente ("que se active cuando la máquina esté trabajando"). Aceptado como trade-off por la simplicidad.
- ⏳ PENDIENTE: confirmar el consumo (mA) del ventilador específico contra la capacidad del regulador de 5V de la placa antes de energizarlo, para no sobrecargar el riel que también alimenta la lógica de control.
