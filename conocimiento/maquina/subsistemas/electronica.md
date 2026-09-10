# Subsistema: Electrónica

> **Estado: 🔧 En desarrollo** (responsable: Nicolas Velasquez)
> Última actualización: 2026-08-24

## Resumen

Cerebro de la máquina: controladora, drivers, y la integración de señales del láser, el eje Z y el futuro cabezal de fresado. Es la **fase actual** del proyecto v3.

## Arquitectura definida

- **Controladora**: Arduino + CNC Shield con firmware **GRBL** (se mantiene la plataforma probada en v1/v2). Ver [control-grbl.md](control-grbl.md).
- **Drivers**: **DRV8825**, Rsense 0.1 Ω confirmado (ver [D-0007](../decisiones/D-0007-drivers-drv8825.md) y [ficha](../componentes/fichas/driver-drv8825.md); v2 usó TMC2209 con refrigeración activa).
- **Motores**: NEMA 17 en X, Y y Z — 1.7 A (X/Y) y 2 A (Z) (ver [ficha](../componentes/fichas/motor-nema17.md)).
- **Láser**: Laser Tree K30 con **fuente propia de 24V/5A** — la señal de control (PWM/TTL) viene de la controladora. Ver [laser.md](laser.md).
- **Finales de carrera**: X−, Y−, Y+ y Z+ en lógica NC (`$5=1`); Y−/Y+ en serie sobre la entrada compartida D10 y Z+ en D12/SpnEn. Ver [D-0018](../decisiones/D-0018-finales-carrera-nc-y-en-serie.md).
- **Corriente medida**: Vref ≈0,70 V en X/Y/Z, equivalente a un límite aproximado de 1,4 A solo porque las placas instaladas tienen Rsense R100. Falta validación térmica y bajo carga.

## Lecciones heredadas (v1/v2)

- **Refrigeración activa de drivers** (v2): esencial para sesiones largas — mantener en v3.
- **Calibración de corriente de drivers** (v1): uno de los mayores retos; documentar el procedimiento esta vez como paso de tutorial.
- **Ventilación asistida** de la zona de control (v2): mantener.

## Trabajo pendiente (fase actual)

⏳ PENDIENTE — a medida que se desarrolle, documentar cada paso en [proceso-construccion](../../proceso-construccion/) y las decisiones en [decisiones/](../decisiones/):

1. ~~Calibrar físicamente la corriente por eje.~~ Vref medido en ≈0,70 V para X/Y/Z y registrado en [la prueba](../pruebas/2026-08-17-calibracion-vref-drivers-700mv.md). ⏳ Falta validar temperatura y pérdida de pasos bajo carga, especialmente en Z.
2. Integrar señal de control del K30 (PWM 24V — verificar niveles con la ficha del fabricante).
3. ~~Cablear eje Z y configurar GRBL para 3 ejes.~~ Z+ instalado en D12, homing de tres ejes y límites soft/hard activos.
4. Definir la conmutación eléctrica del cabezal intercambiable (láser ↔ fresado).
5. ~~Sistema de ventilación/refrigeración de drivers.~~ Resuelto: ventilador de 5V cableado directo al riel de 5V de la controladora, sin pasar por GRBL — ver [D-0008](../decisiones/D-0008-ventilador-drivers-5v-directo.md). Queda pendiente confirmar el consumo del ventilador contra la capacidad del regulador.
6. Protecciones: paro de emergencia, protección de sobrecarga (heredadas de v2).

## Reevaluación de drivers y controladora — 2026-08-24

La revisión técnica no encontró una razón suficiente para cambiar de controladora de inmediato. La alarma crítica observada provenía de una entrada de límite flotante susceptible a EMI, no de falta de capacidad del ATmega328P. Con 200 pasos/mm y 3000 mm/min, X/Y demandan aproximadamente **10 kHz** por eje, por debajo de los **30 kHz** estables declarados por GRBL.

Si se compran repuestos, la ruta de menor riesgo es un DRV8825 de procedencia trazable. TMC2209 es una mejora posible en suavidad y diagnóstico, pero exige confirmar corriente térmica, jumpers y modo de operación. Drivers externos DM542E requieren alimentación de al menos 18–20 V y rediseño del cableado; TMC5160/DM556E no están justificados para los NEMA 17 actuales. Comparación completa en la [ficha DRV8825](../componentes/fichas/driver-drv8825.md).

La plataforma se revisará si aparece un requisito medible: superar 30 kHz, límites independientes/autoescuadrado, más entradas de seguridad, red/SD, VFD/RS485 o expansión de ejes. Para ese escenario se prioriza **grblHAL de 32 bits sobre hardware con E/S aislada**; FluidNC queda como alternativa si WebUI, Wi‑Fi/Ethernet y SD pasan a ser requisitos.

## Relación con otros subsistemas

- Alimentación y cableado → [electrica.md](electrica.md)
- Firmware y parámetros → [control-grbl.md](control-grbl.md) y [parametros/grbl/](../parametros/grbl/)
