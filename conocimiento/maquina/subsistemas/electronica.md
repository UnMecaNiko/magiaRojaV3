# Subsistema: Electrónica

> **Estado: 🔧 En desarrollo** (responsable: Nicolas Velasquez)
> Última actualización: 2026-07-04

## Resumen

Cerebro de la máquina: controladora, drivers, y la integración de señales del láser, el eje Z y el futuro cabezal de fresado. Es la **fase actual** del proyecto v3.

## Arquitectura definida

- **Controladora**: Arduino + CNC Shield con firmware **GRBL** (se mantiene la plataforma probada en v1/v2). Ver [control-grbl.md](control-grbl.md).
- **Drivers**: **DRV8825**, Rsense 0.1 Ω confirmado (ver [D-0007](../decisiones/D-0007-drivers-drv8825.md) y [ficha](../componentes/fichas/driver-drv8825.md); v2 usó TMC2209 con refrigeración activa).
- **Motores**: NEMA 17 en X, Y y Z — 1.7 A (X/Y) y 2 A (Z) (ver [ficha](../componentes/fichas/motor-nema17.md)).
- **Láser**: Laser Tree K30 con **fuente propia de 24V/5A** — la señal de control (PWM/TTL) viene de la controladora. Ver [laser.md](laser.md).

## Lecciones heredadas (v1/v2)

- **Refrigeración activa de drivers** (v2): esencial para sesiones largas — mantener en v3.
- **Calibración de corriente de drivers** (v1): uno de los mayores retos; documentar el procedimiento esta vez como paso de tutorial.
- **Ventilación asistida** de la zona de control (v2): mantener.

## Trabajo pendiente (fase actual)

⏳ PENDIENTE — a medida que se desarrolle, documentar cada paso en [proceso-construccion](../../proceso-construccion/) y las decisiones en [decisiones/](../decisiones/):

1. Calibrar físicamente la corriente por eje (targets calculados en [calibracion-corriente.yaml](../parametros/drivers/calibracion-corriente.yaml)) y registrar como prueba.
2. Integrar señal de control del K30 (PWM 24V — verificar niveles con la ficha del fabricante).
3. Cablear eje Z y configurar GRBL para 3 ejes.
4. Definir la conmutación eléctrica del cabezal intercambiable (láser ↔ fresado).
5. ~~Sistema de ventilación/refrigeración de drivers.~~ Resuelto: ventilador de 5V cableado directo al riel de 5V de la controladora, sin pasar por GRBL — ver [D-0008](../decisiones/D-0008-ventilador-drivers-5v-directo.md). Queda pendiente confirmar el consumo del ventilador contra la capacidad del regulador.
6. Protecciones: paro de emergencia, protección de sobrecarga (heredadas de v2).

## Relación con otros subsistemas

- Alimentación y cableado → [electrica.md](electrica.md)
- Firmware y parámetros → [control-grbl.md](control-grbl.md) y [parametros/grbl/](../parametros/grbl/)
