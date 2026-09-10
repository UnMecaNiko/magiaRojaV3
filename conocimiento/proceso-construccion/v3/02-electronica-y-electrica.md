# Paso 02 — Electrónica y eléctrica

> **Estado**: 🔧 EN CURSO — este es el paso activo del proyecto
> **Responsable**: Nicolas Velasquez
> **Fecha de inicio**: 2026-07 (aprox.)

## Objetivo

Diseñar e implementar toda la electrónica y eléctrica de la v3: alimentación de dos rieles, cableado de calidad, controladora GRBL, drivers, integración del láser K30 y del eje Z.

## Plan del paso (borrador — refinar sobre la marcha)

- [ ] Diseñar el layout eléctrico ANTES de cablear (lección v1) — dos rieles: 12V/10A y 24V/5A del K30 ([D-0005](../../maquina/decisiones/D-0005-fuentes-separadas.md)).
- [ ] Seleccionar conectores y calibres de cable (investigar en internet, citar fuentes).
- [x] Montar controladora Arduino + CNC Shield; confirmar drivers.
- [ ] Cablear motores X/Y/Z con gestión de cable para ejes móviles — cableado operativo y sujeto con protector espiral; falta sustituirlo por cadena portacables dimensionada.
- [x] Integrar señal PWM/TTL del K30 — operativa en D11; el límite Z se trasladó a D12/SpnEn por `VARIABLE_SPINDLE`.
- [ ] Paro de emergencia que corte ambos rieles + protecciones.
- [x] Ventilación/refrigeración de drivers (lección v2).

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

### 2026-08-04 — Pérdida repentina de pasos en los DRV8825

- **Síntoma informado por Nicolas**: los motores comienzan repentinamente a perder pasos; sustituir el controlador por uno nuevo parece resolverlo. No se registraron todavía Vref, eje, tiempo hasta la falla ni temperatura.
- **Conclusión provisional de la investigación**: usar 1/8 de paso no cambia el ajuste de Vref ni daña el driver por sí solo. Sí aumenta ocho veces la frecuencia de pulsos frente al paso completo y reduce el par incremental por micropaso, por lo que una velocidad/aceleración excesiva puede revelar falta de margen.
- **Primera hipótesis por comprobar**: protección térmica. El DRV8825 deshabilita sus puentes al sobrecalentarse y se recupera automáticamente al enfriarse; reemplazarlo por una placa fría puede confundirse con daño permanente. Las propuestas no validadas que había (1.6 A X/Y y 1.8 A Z) requieren disipador y flujo forzado efectivo; se sustituyeron por puntos iniciales de diagnóstico más bajos, que todavía deben validarse bajo carga.
- **Otros riesgos que se comprobarán**: Vref real, capacitor electrolítico de al menos 47 µF junto a VMOT/GND, conectores o bobinas intermitentes, manipulación del motor energizado, `$0` menor al pulso aceptado, velocidad/aceleración y modo DECAY.
- **Condiciones adicionales informadas**: pruebas a 1800 mm/min y 250 mm/s² (⏳ falta confirmar ejes). Para X, con 200 pasos/mm y tornillo de 8 mm/vuelta, esto representa 6 kHz de STEP y ~225 rpm: no se acerca al límite lógico del DRV8825, aunque velocidad y aceleración sí pueden agotar el margen de par y causar pérdidas de pasos. No suelen causar daño permanente por sí solas.
- **Aclaración sobre corriente y aceleración**: el DRV8825 no aumenta corriente en respuesta a la carga; Vref fija el límite que intenta regular durante movimiento y también en reposo mientras siga habilitado. Bajar aceleración es especialmente importante para pérdidas al arrancar, frenar o invertir, pero no es la medida principal contra calentamiento: para eso dominan Vref, refrigeración y el tiempo habilitado (`$1`; con `$1=255` permanece energizado indefinidamente). Se probarán velocidad y aceleración por separado según la matriz de [calibracion-corriente.yaml](../../maquina/parametros/drivers/calibracion-corriente.yaml).
- **Capacitor de la shield**: la CNC Shield V3 original de Protoneer lleva capacitores de 100 µF/50 V, superiores al mínimo de 47 µF recomendado por Pololu. La shield concreta de la v3 aún no tiene versión/fabricante confirmados; inspeccionar físicamente sus capacitores porque puede ser un clon con BOM diferente.
- **Protocolo pendiente**: marcar drivers, comprobar si el sospechoso revive en frío e intercambiarlo entre ejes únicamente con la máquina apagada. La ficha del [DRV8825](../../maquina/componentes/fichas/driver-drv8825.md) contiene el diagnóstico completo y [calibracion-corriente.yaml](../../maquina/parametros/drivers/calibracion-corriente.yaml) los datos que deben registrarse.

### 2026-08-17 — Iluminación, cableado móvil, límites NC y puesta en marcha

- **Iluminación del área de trabajo**: se instaló una tira LED alrededor de la periferia interior de la máquina. Se alimenta desde el riel principal de **12 V** y se enciende con el **segundo interruptor del panel, contando de izquierda a derecha**. ⏳ PENDIENTE: identificar modelo, longitud, potencia/consumo, calibre de conductor y protección eléctrica de la tira.
- **Mazo móvil**: se fijó el conjunto de cables que acompaña el movimiento y lleva conexiones hacia los motores de X y Z, finales de carrera y señal de control del láser. La protección actual es una envoltura espiral; queda funcional, pero se sustituirá por una **cadena portacables articulada** seleccionada después de medir carrera, sección del mazo, radios dinámicos y espacio disponible. Ver [ficha de selección](../../maquina/componentes/fichas/cadena-portacables.md).
- **Finales de carrera**: todos quedaron cableados como **normalmente cerrados (NC)** y GRBL se configuró con `$5=1`. En Y hay finales en **Y− y Y+**; como ambos headers corresponden a la misma entrada D10, los dos contactos NC se cablearon en **serie**. Al abrir cualquiera de los dos se interrumpe el lazo y se activa el límite.
- **Eje Z y homing**: el final Z+ quedó en D12/SpnEn y Z se incorporó al ciclo de homing. El firmware ejecuta Z primero y luego X/Y; `$20=1`, `$21=1` y `$22=1` quedaron activos. Detalle en [D-0011](../../maquina/decisiones/D-0011-fin-de-carrera-fisico-en-z.md), [D-0018](../../maquina/decisiones/D-0018-finales-carrera-nc-y-en-serie.md) y las [pruebas del 17 de agosto](../../maquina/pruebas/README.md).
- **Resultado sobre el ruido**: el cableado NC mantiene las entradas en un estado definido de baja impedancia durante el reposo; con Z conectado a D12 dejó de existir la entrada flotante que recibía EMI del K30. La máquina quedó operativa sin la falsa alarma que motivó el diagnóstico del 22 de julio. La duración y potencia exactas de la validación posterior no se registraron, por lo que queda pendiente una prueba prolongada reproducible.
- **Drivers**: los tres DRV8825 se ajustaron a aproximadamente **0,70 V de Vref**. En estas placas R100 equivale a un límite aproximado de **1,4 A**; la medición está hecha, pero falta validación térmica y bajo carga, especialmente en Z. Ver [prueba de Vref](../../maquina/pruebas/2026-08-17-calibracion-vref-drivers-700mv.md).

## Salidas esperadas de este paso

- Esquemático eléctrico → [subsistemas/electrica.md](../../maquina/subsistemas/electrica.md)
- Primera config GRBL → [parametros/grbl/](../../maquina/parametros/grbl/) (snapshot + changelog)
- Fichas de componentes nuevos → [componentes/fichas/](../../maquina/componentes/fichas/)
- Decisiones que surjan → [decisiones/](../../maquina/decisiones/)
