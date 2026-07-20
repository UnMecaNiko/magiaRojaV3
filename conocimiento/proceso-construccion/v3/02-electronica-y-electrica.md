# Paso 02 — Electrónica y eléctrica

> **Estado**: 🔧 EN CURSO — este es el paso activo del proyecto
> **Responsable**: Nicolas Velasquez
> **Fecha de inicio**: 2026-07 (aprox.)

## Objetivo

Diseñar e implementar toda la electrónica y eléctrica de la v3: alimentación de dos rieles, cableado de calidad, controladora GRBL, drivers, integración del láser K30 y del eje Z.

## Plan del paso (borrador — refinar sobre la marcha)

- [ ] Diseñar el layout eléctrico ANTES de cablear (lección v1) — dos rieles: 12V/10A y 24V/5A del K30 ([D-0005](../../maquina/decisiones/D-0005-fuentes-separadas.md)).
- [ ] Seleccionar conectores y calibres de cable (investigar en internet, citar fuentes).
- [ ] Montar controladora Arduino + CNC Shield; confirmar drivers.
- [ ] Cablear motores X/Y/Z con gestión de cable para ejes móviles.
- [ ] Integrar señal PWM/TTL del K30 (verificar pinout con el manual).
- [ ] Paro de emergencia que corte ambos rieles + protecciones.
- [ ] Ventilación/refrigeración de drivers (lección v2).

## Bitácora

> Registrar aquí cada sesión de trabajo con fecha: qué se hizo, qué salió mal, qué se aprendió, fotos (URLs). Este material es el corazón del tutorial de electrónica.

### 2026-07-04 — Preparando la subida de GRBL al Arduino

- **Qué se hizo**: antes de compilar y subir el firmware GRBL al Arduino de la v3, se recuperó un `config.h` heredado de una máquina anterior (v1 o v2 — sin confirmar cuál) y se comparó línea por línea contra el `config.h` de stock de GRBL ([gnea/grbl, rama master](https://github.com/gnea/grbl/blob/master/grbl/config.h), consultado 2026-07-04).
- **Hallazgo — 3 diferencias funcionales respecto al stock** (el resto del diff es solo espacios en blanco, sin efecto):
  1. `HOMING_INIT_LOCK` desactivado (comentado) → la máquina no exige homing (`$H`) al encender; arranca directo en Idle en vez de entrar en ALARM.
  2. `HOMING_CYCLE_0` reasignado a `X+Y` y `HOMING_CYCLE_1` (que en el stock homea X+Y) quedó comentado → **el eje Z nunca se referenciaba en el ciclo de homing** de la máquina anterior.
  3. `HOMING_FORCE_SET_ORIGIN` activado → el origen máquina queda fijo en el punto de home, en vez de la convención de stock de dejar todo el espacio de trabajo en coordenadas negativas.
- **Por qué importa para la v3**: la v3 estrena eje Z motorizado (ver [control-grbl.md](../../maquina/subsistemas/control-grbl.md)). El `config.h` heredado asume que Z no se homea — si se reutiliza tal cual, el nuevo Z quedaría fuera del ciclo `$H`.
- **Queda pendiente** (sin resolver, a discutir en la próxima sesión):
  - ¿Se agrega Z al ciclo de homing (típicamente `HOMING_CYCLE_0`, para que suba y despeje el área antes de mover X/Y) o se mantiene sin homear como antes?
  - ¿Se conservan `HOMING_INIT_LOCK` desactivado y `HOMING_FORCE_SET_ORIGIN` activado, o se vuelve al comportamiento por defecto de GRBL ahora que la máquina cambió?
- **Lección**: ninguno de estos 3 cambios quedó documentado cuando se hicieron originalmente — se perdió el motivo. Para la v3, todo cambio a `config.h` se anota aquí (o en el changelog de GRBL) con su fecha y su porqué apenas se decida.
- **Decisión adicional de la sesión**: los tres drivers DRV8825 (X, Y, Z) se configuran a **1/8 de paso (octavo)**. Tabla de jumpers MODE0/1/2 y detalle en [parametros/drivers/microstepping.yaml](../../maquina/parametros/drivers/microstepping.yaml). Con esto más el avance mecánico de cada eje (aún pendiente) se podrán calcular los `$100`/`$101`/`$102` de GRBL.

### 2026-07-20 — Resuelto: Z sin fin de carrera queda fuera del homing y de los soft limits reales

- **Qué se decidió**: la v3 no va a tener fin de carrera físico en Z. Se confirmó que GRBL no permite soft limits (`$20`) ni hard limits (`$21`) por eje individual — son *flags* globales a los 3 ejes (código fuente citado en [D-0009](../../maquina/decisiones/D-0009-z-sin-fin-de-carrera-soft-limits.md)). Respuesta a la pregunta abierta del 2026-07-04: Z **se mantiene sin homear** (como en el `config.h` heredado), y en vez de recorrido real, `$132` se fija a un valor enorme para neutralizar el chequeo de soft limit en ese eje sin apagarlo para X/Y.
- **Por qué**: era la única forma de tener soft/hard limits activos y útiles en X/Y (que sí tienen switch) sin que la falta de switch en Z bloquee la activación de `$20` (que exige `$22=1`) ni genere falsas alarmas por un eje que nunca se referencía.
- **Detalle completo**: [D-0009](../../maquina/decisiones/D-0009-z-sin-fin-de-carrera-soft-limits.md).

## Salidas esperadas de este paso

- Esquemático eléctrico → [subsistemas/electrica.md](../../maquina/subsistemas/electrica.md)
- Primera config GRBL → [parametros/grbl/](../../maquina/parametros/grbl/) (snapshot + changelog)
- Fichas de componentes nuevos → [componentes/fichas/](../../maquina/componentes/fichas/)
- Decisiones que surjan → [decisiones/](../../maquina/decisiones/)
