# D-0006 — Mantener la plataforma Arduino + CNC Shield + GRBL

- **Fecha**: 2026-07-04
- **Ámbito**: Máquina
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

Existen controladoras más modernas (placas de 32 bits, ESP32 tipo MKS-DLC32, FluidNC…). La línea Magia Roja ha usado Arduino + CNC Shield + GRBL desde 2021 (v1 y v2), con años de operación en producción diaria.

## Decisión

La v3 **mantiene Arduino + CNC Shield + GRBL** con los drivers de la controladora.

## Motivos

1. Plataforma **probada durante años** en producción real por este mismo equipo.
2. Conocimiento profundo acumulado: calibración de drivers, configuración `$$`, integración con LightBurn/LaserGRBL/UGS.
3. GRBL en Arduino soporta los 3 ejes que la v3 necesita (X/Y/Z).
4. Repuestos baratos y disponibles localmente.

## Consecuencias

- ✅ Riesgo técnico bajo en la fase de electrónica.
- ⚠️ Techo conocido: sin red/SD nativos, tres ejes lógicos, entradas de límites compartidas por eje y MCU de 8 bits. El slot A puede clonar un eje ([D-0016](D-0016-eje-rotatorio-clonado-a-y.md)), pero no crea un cuarto eje coordinado independiente.
- ✅ Modelo de drivers confirmado: DRV8825 — ver [D-0007](D-0007-drivers-drv8825.md).

## Revisión — 2026-08-24

La decisión se revaluó después de resolver las falsas alarmas y poner en marcha el homing de tres ejes.

### Lo que sí explica la alarma observada

La alarma no demostró una limitación de CPU ni del planificador. La causa fue eléctrica: con modo láser, D12 era la entrada Z real y estaba flotante; el EMI del K30 la disparaba. El switch Z+ en D12 y los lazos NC resolvieron el problema. Cambiar de controladora sin corregir el cableado habría trasladado la misma clase de riesgo a otro hardware.

### Capacidad de movimiento actual

GRBL declara hasta **30 kHz** de pulsos estables sobre ATmega328P. Con la configuración vigente:

- X/Y: `200 pasos/mm × 3000 mm/min ÷ 60 = 10 kHz`;
- Z: `200 pasos/mm × 2500 mm/min ÷ 60 ≈ 8.3 kHz`.

Hay margen respecto al límite publicado. Una placa de 32 bits no aumentaría por sí sola la precisión geométrica; primero dominan pasos/mm reales, rigidez, holgura, transmisión, microstepping y pérdida de pasos.

### Condiciones que sí justificarían migrar

- frecuencia STEP calculada cercana o superior a 30 kHz;
- límites min/max independientes o autoescuadrado de dos motores;
- más entradas de seguridad, probes o ejes coordinados;
- VFD/RS485, encoder o control de spindle más avanzado para fresado;
- operación autónoma por SD, Ethernet/Wi‑Fi o interfaz web;
- evidencia reproducible de inestabilidad que permanezca después de corregir alimentación, masas, EMI y USB.

### Ruta futura recomendada

Si aparece alguno de esos requisitos, priorizar **grblHAL de 32 bits en una controladora con entradas protegidas/aisladas y E/S suficientes**. Conserva el modelo GRBL y ofrece más pulsos, entradas, ejes y plugins. FluidNC/ESP32 es la alternativa cuando YAML, WebUI, red y SD sean requisitos principales; un ESP32 genérico no garantiza robustez eléctrica.

Por ahora se mantiene Arduino Uno + CNC Shield + GRBL 1.1h y se decide con pruebas, no por la antigüedad o cantidad de bits.

Fuentes consultadas **2026-08-24**:

- GRBL oficial, capacidades y límite de 30 kHz: https://github.com/gnea/grbl
- grblHAL, core y controladoras soportadas: https://github.com/grblHAL/core y https://github.com/grblHAL/Controllers
- FluidNC, firmware y configuración de máquina: https://github.com/bdring/FluidNC
- OpenBuilds BlackBox X32, ejemplo comercial grblHAL con entradas optoacopladas: https://docs.openbuilds.com/doku.php?id=docs%3Ablackbox-x32%3Astart
- Expatria Flexi-HAL, ejemplo grblHAL con E/S aislada: https://github.com/Expatria-Technologies/Flexi-HAL
