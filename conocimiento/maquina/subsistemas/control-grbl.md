# Subsistema: Control (GRBL)

> **Estado: 🔧 En desarrollo**
> Última actualización: 2026-07-04

## Resumen

Control de movimiento por **GRBL** sobre **Arduino + CNC Shield**, la plataforma que la línea Magia Roja usa desde la v1. Conexión USB directa al PC.

## Configuración

- **Firmware**: GRBL — ⏳ PENDIENTE: versión exacta a instalar en v3.
- **Placa**: Arduino + CNC Shield (v1 usó Arduino Uno + CNC Shield V3).
- **Drivers**: **DRV8825** (confirmado, ver [D-0007](../decisiones/D-0007-drivers-drv8825.md); v1 usó A4988, v2 usó TMC2209 refrigerados).
- **Ejes**: X, Y, Z — la v3 usa por primera vez el eje Z motorizado, lo que implica configurar `$102` (pasos/mm Z), `$112` (velocidad máx Z) y `$122` (aceleración Z).

## Parámetros

La configuración GRBL vigente, su histórico y el porqué de cada cambio viven en [parametros/grbl/](../parametros/grbl/):

- `grbl-actual.yaml` — config vigente anotada.
- `historico/` — snapshots fechados (dump `$$` crudo + YAML).
- `CHANGELOG.md` — bitácora de cambios con su motivo.

## Pines de control auxiliares de la CNC Shield

Investigado 2026-07-20 a raíz de buscar cómo alimentar un ventilador de refrigeración de drivers (decisión final en [D-0008](../decisiones/D-0008-ventilador-drivers-5v-directo.md): se optó por 5V directo, no por estos pines).

- **Cool.En (A3)** — salida `COOLANT_FLOOD`, controlada por `M8` (on) / `M9` (off). Salida lógica de 5V y baja corriente: no alimenta directamente una bomba, ventilador o solenoide, requiere un módulo MOSFET o relé intermedio.
- **A4** — salida `COOLANT_MIST`, controlada por `M7` / `M9`. Solo funciona si el firmware se compiló con `#define ENABLE_M7` (viene **deshabilitado por defecto** en GRBL mainline). Libre para un futuro air-assist real del K30.
- **Enable compartido de drivers (D8)** — GRBL lo activa automáticamente para sostener/mover los ejes y lo desactiva tras el tiempo de `$1` (Step idle delay) en reposo total; no depende de `M8`/`M9` ni del sender. Su polaridad se ajusta con `$4` (Invert step enable pin).
- La lógica activo-alto/activo-bajo de Cool.En/Mist se puede invertir en `config.h` con `#define INVERT_COOLANT_FLOOD_PIN` (útil para relés activo-bajo).
- GRBL apaga coolant y spindle automáticamente ante cualquier reset o fin de programa (`M2`/`M30`), por seguridad.
- **LaserGRBL no soporta** inyectar G-code de inicio/fin automático (a diferencia de LightBurn) — activar `M8`/`M9` en cada trabajo desde LaserGRBL requiere un botón personalizado manual (ver [tutorial de botones](software.md#tutorial-botones-de-subirbajar-z-en-lasergrbl) para el mecanismo). Confirmado como limitación conocida y sin resolver en [arkypita/LaserGRBL#617](https://github.com/arkypita/LaserGRBL/issues/617) (consultado 2026-07-20).

Fuentes: [gnea/grbl cpu_map.h](https://github.com/gnea/grbl/blob/master/grbl/cpu_map.h), [gnea/grbl config.h](https://github.com/gnea/grbl/blob/master/grbl/config.h), [Grbl v1.1 Commands](https://github.com/gnea/grbl/wiki/Grbl-v1.1-Commands), [grbl/grbl issue #1753](https://github.com/grbl/grbl/issues/1753) — todas consultadas 2026-07-20.

## Retos conocidos de la plataforma (experiencia v1/v2)

- Calibración de corriente de drivers: crítico para evitar pérdida de pasos y sobrecalentamiento.
- Ajuste de aceleraciones y velocidades para mitigar vibración.
- GRBL estándar en Arduino Uno soporta 3 ejes — suficiente para X/Y/Z de la v3.

## Puntos a investigar (regla: consultar internet y citar)

✅ **Resuelto (2026-07-20)**: Límites y homing con el nuevo eje Z. La v3 no tiene fin de carrera físico en Z (solo X/Y), y GRBL no permite soft/hard limits por eje individual (son *flags* globales de 3 ejes). Decisión: Z queda fuera del ciclo de homing (`config.h`, igual que la máquina anterior) y `$132` (recorrido máx. Z) se fija a un valor deliberadamente enorme para neutralizar en la práctica el chequeo de soft limit en ese eje, mientras X/Y quedan protegidos con sus valores reales. Detalle completo, código fuente citado y consecuencias en [D-0009](../decisiones/D-0009-z-sin-fin-de-carrera-soft-limits.md).

⏳ PENDIENTE:

1. Modo láser de GRBL (`$32=1`) y comportamiento de M4 (potencia dinámica) con el K30.
2. Conmutación de perfiles GRBL entre modo láser y modo fresado (aceleraciones y velocidades distintas; posible par de configs versionadas en `parametros/perfiles/`).

## Software de operación

| Software | Uso |
|---|---|
| LightBurn | Flujo principal de láser (diseño + control) |
| LaserGRBL | Alternativa libre para láser |
| UGS (Universal G-code Sender) | Operación CNC general / fresado |
