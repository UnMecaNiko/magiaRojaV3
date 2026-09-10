# Ficha de selección: cadena portacables del mazo móvil

> Investigación realizada el **2026-08-24** siguiendo [la guía de investigación](../../../../harness/guias/como-investigar.md). No se ha elegido fabricante, serie ni tamaño: faltan mediciones físicas.

## Identificación

El nombre genérico correcto es **cadena portacables articulada**. También se conoce como **oruga portacables**, **cadena de arrastre**, *cable carrier*, *drag chain*, *energy chain* o *cable track*. `e-chain®` es una marca de igus, no el nombre genérico.

Su función es guiar un mazo móvil por una trayectoria repetible y limitar su radio de curvatura. El protector espiral instalado actualmente agrupa y protege de abrasión, pero no controla por sí mismo el radio dinámico ni la trayectoria.

## Aplicación en la Magia Roja v3

- **Estado actual**: mazo sujeto y protegido con envoltura espiral.
- **Contenido reportado**: cables hacia motores X/Z, finales de carrera y control del láser.
- **Entorno previsto**: CNC láser con futuro fresado; considerar polvo, serrín y viruta.
- **Objetivo**: sustituir la solución provisional por una cadena mantenible, con radios y anclajes definidos.

## Datos obligatorios antes de comprar

### Movimiento y montaje

1. Carrera total del mazo y posición posible del punto fijo respecto al centro.
2. Velocidad y aceleración máximas; ciclos diarios estimados.
3. Orientación de la cadena: horizontal normal, lateral, invertida o vertical.
4. Ancho y altura disponibles durante toda la carrera.
5. Superficie de apoyo del ramal inferior, obstáculos y ubicación de anclajes.
6. Lado por el que deben abrir los travesaños para mantenimiento.

### Contenido del mazo

1. Lista de cada cable/manguera, diámetro exterior y peso por metro.
2. Radio **dinámico** mínimo publicado por el fabricante de cada cable.
3. Confirmación de que los cables admiten flexión continua en cadena portacables.
4. Dimensiones de conectores que deban pasar por la cadena.
5. Separación requerida entre potencia/motor y señales de finales/PWM.

> ⏳ PENDIENTE: levantar estas medidas en la máquina. Sin ellas no es técnicamente responsable fijar ancho interior, radio o referencia comercial.

## Criterios de dimensionamiento

- **Radio de curvatura**: el radio `R` de la cadena debe ser igual o mayor que el mayor radio dinámico requerido por el elemento más rígido del mazo. Elegir un radio mayor suele aumentar la vida útil.
- **Sección interior**: igus recomienda como referencia un mínimo de 10 % de holgura alrededor de cables eléctricos redondos. Deben poder moverse libremente sin cruzarse ni quedar comprimidos.
- **Separación**: usar divisores para cables con diámetros muy distintos, cubiertas incompatibles o funciones de potencia y señal. El divisor no sustituye apantallamiento ni puesta a tierra.
- **Carga por metro**: sumar peso de cables, mangueras y contenido, y cruzarlo con la curva de longitud autosoportada de la serie y anchura exactas.
- **Longitud**: con punto fijo centrado, `LK = S/2 + K`, donde `S` es la carrera y `K` sale de la tabla del fabricante para el radio/serie. No estimar `K` ni redondear eslabones sin esa tabla.
- **Altura de instalación**: comprobar `HF` en la ficha; puede ser mayor que `2R` por la pretensión del ramal superior.
- **Apertura**: preferir travesaños abribles por el lado accesible. Una cadena cerrada/no abrible puede obligar a desmontar conectores.
- **Alivio de tensión**: sujetar la cubierta exterior, no los conductores, normalmente en ambos extremos. Los cables no deben quedar tensos en el radio interior ni acumulados en el exterior.

## Instalación y validación

1. Ubicar, si es posible, el punto fijo cerca del centro de la carrera.
2. Alinear los anclajes con el movimiento y soportar el ramal inferior.
3. Introducir cables sin torsión y con separadores.
4. Ajustar holgura y alivio de tensión sin cargar los conectores.
5. Recorrer lentamente ambos extremos con la máquina desenergizada o en jog seguro.
6. Aumentar progresivamente velocidad/aceleración y comprobar roces, tirones, pandeo, colisiones y apertura accidental.
7. Inspeccionar periódicamente polvo/viruta, eslabones y cubiertas.

## Opciones a evaluar después de medir

- **Entorno limpio y recorrido corto**: familias abribles igus E2.1/E2 micro o Tsubaki MONO/EasyTrax.
- **Polvo y viruta de fresado**: tubo portacables cerrado, por ejemplo familias igus R2.1/E2 R100 o equivalentes Tsubaki TKA/TKK.
- **Máxima trazabilidad**: sistema premontado del fabricante con cadena, cables dinámicos, separadores, terminales y alivios coordinados.

Estas son familias de referencia, no una selección de compra. Evitar productos genéricos que no publiquen radio real, curva de carga, material, dinámica y repuestos.

## Fuentes

Consultadas **2026-08-24**:

- igus, reglas de llenado, holgura, radio y alivio de tensión: https://www.igus.com/cable-carriers/resources/energy-chains-designing-filing-com
- igus, aplicaciones autosoportadas y curvas de carga: https://www.igus.com/cable-carriers/resources/e-chain-short-travel-unsupported
- igus, cálculo de longitud: https://www.igus.com/cable-carriers/resources/e-chain-designing-calculation
- igus, selección del radio de curvatura: https://www.igus.com/company/energy-chains-select-bend-radius-cable-carrier-ca
- igus, soluciones cerradas contra suciedad y virutas: https://www.igus.es/cadenas-portacables/productos/soluciones-especiales/cadenas-portacables-contra-la-suciedad-y-las-virutas
- Tsubaki Kabelschlepp, guías oficiales de configuración: https://tsubaki-kabelschlepp.com/uploads/tx_tkg17pim/documents/pdf/Configuration-guidelines_EN.pdf
- Tsubaki Kabelschlepp, alivio de tensión: https://tsubaki-kabelschlepp.com/en-gb/products/cable-carriers/accessories/strain-relief-devices/
