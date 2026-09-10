# Ficha de componente: Driver DRV8825

> Ficha investigada en internet el **2026-07-04** y ampliada el **2026-08-04** y **2026-08-24** siguiendo [la guía de investigación](../../../../harness/guias/como-investigar.md). Fuentes al final.

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
| Pulso STEP mínimo | 1.9 µs en HIGH y 1.9 µs en LOW |
| Protección térmica | Apaga los puentes H al exceder la temperatura segura y se recupera automáticamente al enfriarse; `nFAULT` pasa a LOW durante la falla |

## Notas de integración en la Magia Roja v3

- Modelo confirmado para v3 en [D-0007](../../decisiones/D-0007-drivers-drv8825.md), reemplazando el pendiente que dejó [D-0006](../../decisiones/D-0006-mantener-plataforma-grbl.md).
- Los tres ejes usan motores NEMA 17 de 1.7 A (X/Y) y 2 A (Z) — ver [ficha del motor](motor-nema17.md). Estas corrientes están cerca o por encima del límite de 1.5 A sin refrigeración, por lo que **la refrigeración activa de los drivers es obligatoria** (lección heredada de v2, ver [electronica.md](../../subsistemas/electronica.md)).
- **Medición 2026-08-17**: los tres drivers quedaron en aproximadamente **0.70 V**, equivalente a un límite aproximado de **1.4 A** en estas placas R100. La medición está realizada, pero no es todavía un objetivo validado: falta comprobar temperatura y pérdida de pasos bajo carga, especialmente en Z. Ver [prueba](../../pruebas/2026-08-17-calibracion-vref-drivers-700mv.md) y [YAML](../../parametros/drivers/calibracion-corriente.yaml).
- Microstepping elegido para los tres ejes: **1/8 (octavo de paso)**. Tabla de jumpers MODE0/1/2 y detalle en [parametros/drivers/microstepping.yaml](../../parametros/drivers/microstepping.yaml). ⏳ PENDIENTE: confirmar físicamente los jumpers en la CNC Shield.
- ⚠️ Nunca medir la corriente en la fuente de alimentación: la corriente de bobina no se corresponde con la corriente de la fuente. Medir Vref en el via marcado, o la corriente en serie con una bobina del motor.

## Diagnóstico de pérdida de pasos y aparente falla

Síntoma informado el **2026-08-04**: los motores empiezan repentinamente a perder pasos y vuelven a funcionar al sustituir el driver. Todavía no hay mediciones que identifiquen la causa.

Hipótesis, en orden práctico de comprobación:

1. **Protección térmica**: es la primera sospecha si la falla aparece después de varios minutos y el driver vuelve a funcionar cuando se enfría. Cambiarlo por uno frío puede ocultar este patrón y hacer parecer que el anterior murió. Las propuestas anteriores de 1.6 A (X/Y) y 1.8 A (Z) exigen disipador y flujo de aire real; se rebajaron como punto inicial del diagnóstico, no como valores finales.
2. **Vref demasiado alto o ajustado sin multímetro**: para las placas R100 de esta máquina, `I límite = 2 × Vref`; 0.80 V limita a 1.6 A y 0.90 V a 1.8 A. La corriente nominal del motor es un máximo, no una obligación de configurarlo al 100 %.
3. **Picos de VMOT**: Pololu advierte que el capacitor cerámico de bajo ESR del portador puede formar un circuito LC con cables de alimentación largos y superar el máximo del chip incluso usando 12 V. La **CNC Shield V3 original de Protoneer** especifica capacitores electrolíticos de **100 µF/50 V**, por lo que supera el mínimo de 47 µF recomendado por Pololu. Sin embargo, la versión/fabricante exactos de la shield v3 aún no están confirmados y las placas clon pueden cambiar u omitir componentes: verificar físicamente el valor, polaridad, soldadura y ubicación de sus capacitores antes de descartar los picos.
4. **Conector de motor flojo o manipulado con tensión**: conectar o desconectar un motor energizado puede destruir el driver. Un contacto intermitente en una bobina puede producir el mismo efecto mientras la máquina vibra.
5. **Velocidad/aceleración sin margen**: 1/8 requiere ocho veces más pulsos que paso completo y cada micropaso tiene menos par incremental. No cambia la fórmula de Vref ni daña el driver por sí mismo, pero puede hacer visible un margen de par insuficiente. Probar reduciendo temporalmente velocidad y aceleración.
6. **Pulso STEP demasiado corto**: el DRV8825 exige 1.9 µs mínimo; GRBL recomienda `$0=10` µs y no admite menos de 3 µs. ⏳ PENDIENTE: leer el `$$` real y confirmar `$0`.
7. **Modo DECAY/regulación de corriente**: el chip necesita que la corriente siga el perfil del microstepping. El modo mixto se selecciona dejando `DECAY` abierto y suele ser el punto de partida; TI ha documentado pérdidas de paso cuando el modo de decaimiento no permite seguir bien la corriente. ⏳ PENDIENTE: identificar cómo está cableado `DECAY` en estas placas clon.

### Prueba de aislamiento recomendada

> ⚠️ Apagar completamente y esperar la descarga antes de mover drivers o conectores de motor.

1. Marcar cada driver y eje. Cuando falle, apagar, dejar enfriar el driver sospechoso y volver a probarlo: si revive en frío, la protección térmica es muy probable.
2. Intercambiar dos drivers **solo con la máquina apagada**: si la falla sigue al driver, concentrarse en driver/Vref/refrigeración; si permanece en el eje, revisar motor, conector, cableado, mecánica y parámetros GRBL.
3. Confirmar disipador, ventilador girando y aire atravesando los tres drivers; no basta con que haya un ventilador dentro de la caja.
4. Medir y registrar Vref de cada placa respecto a GND. No ajustar “de oído”.
5. Verificar el capacitor de VMOT y revisar continuidad de cada par de bobina con la máquina apagada, moviendo suavemente el mazo para detectar falsos contactos.
6. Ejecutar recorridos repetidos primero con velocidad y aceleración reducidas; registrar tiempo hasta la falla, eje, Vref y si el driver se recupera al enfriar.

El protocolo y los valores que deben registrarse están en [calibracion-corriente.yaml](../../parametros/drivers/calibracion-corriente.yaml). No se debe desechar otro driver hasta distinguir protección térmica de daño permanente.

### Evaluación de la prueba a 1800 mm/min y 250 mm/s²

- En X, donde están deducidos **200 pasos/mm**, 1800 mm/min equivale a **6000 pulsos STEP/s** y, con tornillo de 8 mm/vuelta, aproximadamente **225 rpm** del motor. Esto está muy por debajo del límite de 250 kHz del DRV8825 y del orden de 30 kHz que puede generar GRBL sobre Arduino; la frecuencia lógica no debería dañar ni saturar el driver.
- La velocidad sí reduce el par disponible porque la fuerza contraelectromotriz del motor aumenta y la corriente tiene menos tiempo para alcanzar el valor objetivo. La aceleración de 250 mm/s² exige además par para alcanzar 1800 mm/min en unos **0.12 s**. Ambas pueden causar pérdida de pasos si el margen mecánico/eléctrico es bajo.
- Una velocidad o aceleración excesiva normalmente **no causa daño permanente** al DRV8825: causa pérdida de sincronismo o atasco. Puede contribuir indirectamente al calentamiento, pero un driver que queda dañado obliga a revisar primero Vref, refrigeración, picos de VMOT y conexiones intermitentes.
- ⏳ PENDIENTE: confirmar a qué eje(s) se aplicaron 1800/250 y conocer `$101`/`$102` y la transmisión de Y/Z antes de calcular sus frecuencias y rpm.

### Corriente, aceleración y calentamiento: relación correcta

El DRV8825 es un regulador de corriente en lazo abierto: **no mide la carga mecánica ni aumenta corriente cuando el motor acelera**. Vref y Rsense fijan el máximo de corriente; el indexador de microstepping determina qué fracción de ese máximo corresponde a cada bobina. El controlador intenta reproducir ese perfil tanto bajo carga como sin ella.

- **Aceleración alta** → la mecánica exige más par para acelerar la masa (`T ∝ inercia × aceleración`). Si el par disponible no alcanza, el rotor queda atrás y pierde pasos. Bajar `$120`/`$121`/`$122` es prioritario cuando la falla ocurre al arrancar, frenar, invertir dirección o pasar por esquinas.
- **Velocidad alta constante** → aunque ya no haya par de aceleración, el motor pierde par disponible por inductancia y fuerza contraelectromotriz; la corriente puede no alcanzar el objetivo antes del siguiente micropaso. Bajar `$110`/`$111`/`$112` o el `F` es prioritario cuando la falla aparece durante un tramo rápido y sostenido.
- **Calor del driver** → depende principalmente del límite de corriente fijado por Vref, las pérdidas de los MOSFET (`I²R`), el modo DECAY, la ventilación y el tiempo durante el que permanece habilitado. Reducir aceleración puede evitar pérdidas de pasos, pero no sustituye bajar Vref o mejorar refrigeración.
- **Reposo energizado** → con `$1=255`, GRBL mantiene todos los drivers habilitados indefinidamente; motores y drivers continúan disipando aun sin movimiento. ⏳ PENDIENTE: leer el `$1` real de la máquina.

Para separar velocidad de aceleración se harán dos comparaciones contra 1800 mm/min y 250 mm/s²: mantener 1800 y bajar solo aceleración; luego mantener 250 y bajar solo velocidad. Si mejora únicamente la primera, el límite dominante es par de aceleración; si mejora la segunda, domina el par a velocidad; si falla después de un tiempo parecido en todas, domina la temperatura.

### Criterio para declarar un driver dañado

No declarar daño permanente solo porque reemplazar el driver por uno frío resuelve temporalmente el movimiento. La prueba concluyente es por sustitución controlada:

1. Apagar y desconectar la máquina; dejar enfriar el sospechoso al menos 20–30 minutos.
2. Marcar driver sospechoso y driver conocido bueno. Ajustar ambos a la misma Vref baja y segura para una prueba sin carga exigente.
3. Probarlos, uno por vez y siempre manipulando con la alimentación desconectada, en **el mismo socket, eje, motor, cableado y parámetros lentos**.
4. Si el conocido bueno funciona y la falla sigue al sospechoso aun completamente frío, el driver está dañado o degradado.
5. Señales adicionales: Vref ausente/inestable o que no responde al potenciómetro, una fase sin fuerza (motor vibra pero no gira), calentamiento casi inmediato con carga normal, `nFAULT` permanentemente bajo cuando sea accesible, olor o daño visible.
6. Si el sospechoso funciona de nuevo al enfriarse, no está “muerto”: está entrando probablemente en protección térmica. Si la falla permanece en el eje al cambiar drivers, revisar antes motor, conectores, cableado, mecánica y socket de la shield.

No usar la tensión de salida de las bobinas medida con multímetro como criterio único: son señales PWM y una lectura promedio puede ser engañosa. No insistir energizando una placa que se calienta instantáneamente, pone la fuente en protección o presenta olor/humo.

### Procedimiento seguro para ajustar Vref en la CNC Shield

Herramientas: multímetro en voltaje DC, destornillador cerámico o aislado para el potenciómetro y, preferiblemente, pinza para fijar la punta negra a GND.

1. Apagar y desconectar tanto los 12 V como el USB. Esperar a que se descarguen los capacitores.
2. Confirmar orientación del DRV8825 y que las resistencias sensoras están marcadas `R100`. Cada driver se calibra individualmente.
3. Desconectar el motor del eje **solo ahora, sin alimentación**. Esto evita movimientos y elimina el riesgo de que una punta o ajuste accidental excite el motor.
4. Conectar la punta negra del multímetro a `GND` de la entrada de alimentación de motores de la shield. Seleccionar voltaje DC (rango 2 V o 20 V).
5. Colocar la punta roja en el via `VREF` o sobre el metal del potenciómetro, cuidando de no tocar componentes vecinos.
6. Energizar normalmente Arduino/shield y 12 V, sin motor conectado. Leer Vref antes de ajustar.
7. Método recomendado para evitar cortocircuitos: apagar, esperar descarga, girar el potenciómetro apenas unos grados, volver a energizar y medir. Repetir hasta el objetivo. No asumir el sentido horario porque puede variar entre clones.
8. Puntos iniciales no validados para diagnóstico: **0.65 V en X/Y** (≈1.3 A) y **0.75 V en Z** (≈1.5 A). Topes por corriente nominal: **0.85 V X/Y** y **1.00 V Z**; no alcanzarlos salvo que una prueba bajo carga lo justifique y la refrigeración sea suficiente.
9. Apagar y esperar descarga. Retirar puntas y reconectar el motor; nunca conectarlo con la shield energizada.
10. Probar primero con 600–900 mm/min y 100 mm/s². Si falta par, subir Vref en pasos de 0.05 V y repetir; detenerse en el menor valor que mueva y sostenga la carga sin perder pasos.
11. Validar durante 20–30 minutos con ventilador activo, registrando Vref, eje, carga, velocidad, aceleración y si el driver se recupera al enfriar. Después aumentar por separado aceleración y velocidad.

Detener inmediatamente si el driver se calienta en segundos, la fuente entra en protección, aparece olor/humo o Vref es inestable. No ajustar Vref “de oído” ni usando la corriente indicada por la fuente de 12 V.

## Evaluación de reemplazos — 2026-08-24

Cambiar de driver puede mejorar suavidad, resonancia, diagnóstico y margen térmico, pero no corrige holgura mecánica ni convierte la máquina en lazo cerrado. Más microsteps tampoco equivalen linealmente a más precisión: el error angular del motor, la rigidez, el husillo, el *backlash* y los pasos perdidos siguen dominando.

| Alternativa | Encaje en esta máquina | Evaluación |
|---|---|---|
| **DRV8825 Pololu o trazable** | Reemplazo casi directo; 8.2–45 V; alrededor de 1.5 A por bobina sin refrigeración en el carrier Pololu | **Primera opción de compra** si se busca confiabilidad con mínimo cambio. Exige verificar orientación, Rsense, capacitor local y ventilación. |
| **TMC2209 de fabricante reconocido** | STEP/DIR y 4.75–29 V; hasta 2 A RMS a nivel de IC, pero la corriente continua real depende del carrier y la refrigeración | **Segunda opción** si se busca mejor regulación, suavidad y diagnóstico. En CNC conviene evaluar `spreadCycle`; no asumir que jumpers/UART son intercambiables con DRV8825. |
| **Leadshine DM542E externo** | STEP/DIR optoaislado, 18–50 V, 0.7–3 A RMS; no cabe en el socket | Robusto y con antirresonancia, pero obliga a fuente de 24–48 V, gabinete/cableado externo y adaptación de señales. No funciona con el riel actual de 12 V. |
| **TMC5160** | STEP/DIR posible, pero los módulos suelen requerir SPI/configuración y una implementación térmica específica | Sobredimensionado y de mayor complejidad para los NEMA 17 actuales; no es sustitución directa. |
| **DM556E** | Driver externo de mayor corriente mínima | Generalmente sobredimensionado; puede impedir ajustar una corriente suficientemente baja para algunos NEMA 17. |

### Recomendación

1. Mantener los DRV8825 instalados mientras la prueba de 0.70 V demuestre funcionamiento térmico y bajo carga.
2. Si se necesitan repuestos, comprar primero carriers DRV8825 de procedencia trazable, no otro kit genérico.
3. Probar TMC2209 solo después de confirmar corriente útil continua, pinout, jumpers, modo de chopper y refrigeración del módulo concreto.
4. Reservar DM542E para un rediseño deliberado a 24–48 V que justifique cableado industrial y drivers externos.

Antes de decidir compra faltan: referencia, resistencia e inductancia exactas de los motores; temperatura en gabinete cerrado; frecuencia STEP máxima; comportamiento bajo carga; tensión/picos de VMOT y versión real de la CNC Shield.

## Fuentes

Consultadas **2026-07-04**:

- Página oficial del producto (Pololu): https://www.pololu.com/product/2133

Consultadas **2026-08-04**:

- Texas Instruments, *DRV8825 Stepper Motor Controller IC datasheet, rev. F* — protección térmica, `nFAULT`, temporización STEP y modos de decaimiento: https://www.ti.com/lit/ds/symlink/drv8825.pdf
- Pololu, *DRV8825 Stepper Motor Driver Carrier, High Current* — fórmula de Vref, capacidad térmica, capacitor electrolítico de 47 µF y prohibición de conectar/desconectar el motor energizado: https://www.pololu.com/product-info-merged/2133
- Protoneer, *Arduino CNC Shield V3* — BOM original con capacitores de 100 µF/50 V: https://blog.protoneer.co.nz/arduino-cnc-shield/
- GRBL, documentación oficial de `$0` — recomienda alrededor de 10 µs: https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md
- GRBL, documentación oficial de `$1`, `$110`–`$112` y `$120`–`$122` — habilitación en reposo y ajuste independiente de velocidad/aceleración: https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md
- Texas Instruments E2E, caso técnico sobre DRV8825, microstepping y modo DECAY — soporte de fabricante, no datasheet: https://e2e.ti.com/support/motor-drivers-group/motor-drivers/f/motor-drivers-forum/1396584/drv8825-motor-drivers-forum
- Texas Instruments E2E, explicación de pérdida de par con velocidad por fuerza contraelectromotriz: https://e2e.ti.com/support/motor-drivers-group/motor-drivers/f/motor-drivers-forum/178455/steppermotor-looses-torque-at-speeds-where-choppingperiod-is-short-few-chopcycles

Consultadas **2026-08-24**:

- Analog Devices, TMC2209 y datasheet: https://www.analog.com/en/products/tmc2209.html
- Analog Devices, TMC5160 y datasheet: https://www.analog.com/en/products/tmc5160.html
- Analog Devices, relación entre microstepping y precisión/par incremental: https://www.analog.com/en/resources/analog-dialogue/articles/mastering-precision-understanding-microstepping.html
- Leadshine, DM542E y manual oficial: https://www.leadshine.com/product-detail/stepper-drive/stepper/DM542E.html
- Leadshine, manual oficial DM556E: https://www.leadshine.com/upfiles/downloads/d19dd5aeb9ceb378d9a7882ab9551217_1651053026312.pdf
- Watterott, pinout/configuración TMC2209 SilentStepStick: https://learn.watterott.com/silentstepstick/pinconfig/tmc2209/
- Watterott, pinout/configuración TMC5160 SilentStepStick: https://learn.watterott.com/silentstepstick/pinconfig/tmc5160/
