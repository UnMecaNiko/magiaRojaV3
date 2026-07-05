# Subsistema: Control (GRBL)

> **Estado: 🔧 En desarrollo**
> Última actualización: 2026-07-04

## Resumen

Control de movimiento por **GRBL** sobre **Arduino + CNC Shield**, la plataforma que la línea Magia Roja usa desde la v1. Conexión USB directa al PC.

## Configuración

- **Firmware**: GRBL — ⏳ PENDIENTE: versión exacta a instalar en v3.
- **Placa**: Arduino + CNC Shield (v1 usó Arduino Uno + CNC Shield V3).
- **Drivers**: ⏳ PENDIENTE: confirmar (v1: A4988; v2: TMC2209 refrigerados).
- **Ejes**: X, Y, Z — la v3 usa por primera vez el eje Z motorizado, lo que implica configurar `$102` (pasos/mm Z), `$112` (velocidad máx Z) y `$122` (aceleración Z).

## Parámetros

La configuración GRBL vigente, su histórico y el porqué de cada cambio viven en [parametros/grbl/](../parametros/grbl/):

- `grbl-actual.yaml` — config vigente anotada.
- `historico/` — snapshots fechados (dump `$$` crudo + YAML).
- `CHANGELOG.md` — bitácora de cambios con su motivo.

## Retos conocidos de la plataforma (experiencia v1/v2)

- Calibración de corriente de drivers: crítico para evitar pérdida de pasos y sobrecalentamiento.
- Ajuste de aceleraciones y velocidades para mitigar vibración.
- GRBL estándar en Arduino Uno soporta 3 ejes — suficiente para X/Y/Z de la v3.

## Puntos a investigar (regla: consultar internet y citar)

⏳ PENDIENTE:

1. Modo láser de GRBL (`$32=1`) y comportamiento de M4 (potencia dinámica) con el K30.
2. Conmutación de perfiles GRBL entre modo láser y modo fresado (aceleraciones y velocidades distintas; posible par de configs versionadas en `parametros/perfiles/`).
3. Límites y homing con el nuevo eje Z.

## Software de operación

| Software | Uso |
|---|---|
| LightBurn | Flujo principal de láser (diseño + control) |
| LaserGRBL | Alternativa libre para láser |
| UGS (Universal G-code Sender) | Operación CNC general / fresado |
