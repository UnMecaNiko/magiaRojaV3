# Subsistema: Control (GRBL)

> **Estado: ✅ Operativo** (motores, finales de carrera y homing en los tres ejes funcionando)
> Última actualización: 2026-08-17

## Resumen

Control de movimiento por **GRBL** sobre **Arduino + CNC Shield**, la plataforma que la línea Magia Roja usa desde la v1. Conexión USB directa al PC.

## Configuración

- **Firmware**: **GRBL 1.1h** (confirmado en el banner del Serial Monitor). Compilado desde fuente con `config.h` y `defaults.h` **personalizados** (Z en el ciclo de homing, defaults = valores de esta máquina). Detalle en [firmware-config-h.md](../parametros/grbl/firmware-config-h.md).
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

✅ **Resuelto (2026-07-20 → 2026-07-22)**: Límites y homing con el nuevo eje Z. La v3 no tiene fin de carrera físico en Z (solo X/Y), y GRBL no permite soft/hard limits por eje individual (son *flags* globales de 3 ejes) — además, su chequeo de soft limits deja un lado de cada eje fijo en la posición `0` sin importar `$130`/`$131`/`$132`. [D-0010](../decisiones/D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md) apagó `$20` del todo (reemplaza al intento inicial de [D-0009](../decisiones/D-0009-z-sin-fin-de-carrera-soft-limits.md)).

⚠️ **Hallazgo crítico (2026-07-22)**: con `$32=1` (modo láser), GRBL usa `VARIABLE_SPINDLE`, que **reasigna el límite de Z de D11 a D12** para liberar D11 como PWM de hardware. El terminal "Z-" de la CNC Shield está cableado a D11 (por eso el K30 recibe bien el PWM ahí), pero deja **D12 flotando** — con `$21=1` esto causaba una falsa alarma de hard limit al usar el K30 a alta potencia (el ruido EMI del driver, proporcional a la corriente, se leía como "switch de Z activado"), reportada por LaserGRBL como "problema con la placa". Confirmado con tres pruebas controladas — ver [prueba 2026-07-22](../pruebas/2026-07-22-diagnostico-alarma-laser-k30.md). Por eso `$21` también quedó en `0` mientras tanto. Solución definitiva: instalar fin de carrera físico en Z, cableado a D12 (no a "Z-") — ver [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md).

✅ **Resuelto (2026-08-17)**: instalado el fin de carrera físico de Z (Z+, cableado a D12/SpnEn) y **reactivados `$20=1`/`$21=1`**. Con los tres pines de límite definidos en reposo (`$5=1` NC) desaparecen las falsas alarmas. Homing (`$H`) incorpora Z (sube primero) y funciona. Esto **supera a [D-0010](../decisiones/D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md)** (que había apagado `$20`). Ver [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md), [D-0017](../decisiones/D-0017-area-trabajo-empirica-505x490.md) y pruebas del 2026-08-17.

⏳ PENDIENTE:

1. Validar los tres ejes bajo carga real sin pérdida de pasos (Vref ~1.4 A; especial atención a Z al levantar el cabezal de fresado).
2. Comportamiento de M4 (potencia dinámica) con el K30.
3. Conmutación de perfiles GRBL entre modo láser y modo fresado (aceleraciones y velocidades distintas; posible par de configs versionadas en `parametros/perfiles/`).

## Software de operación

| Software | Uso |
|---|---|
| LightBurn | Flujo principal de láser (diseño + control) |
| LaserGRBL | Alternativa libre para láser |
| UGS (Universal G-code Sender) | Operación CNC general / fresado |
