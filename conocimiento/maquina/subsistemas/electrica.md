# Subsistema: Eléctrica

> **Estado: 🔧 En desarrollo** (responsable: Nicolas Velasquez)
> Última actualización: 2026-08-24

## Resumen

Alimentación, cableado y protecciones de la v3. Uno de los objetivos declarados de esta versión es **mejorar la calidad de la conexión eléctrica** respecto a versiones anteriores.

## Arquitectura de alimentación — dos rieles

| Riel | Fuente | Alimenta |
|---|---|---|
| **12 V / 10 A** | Fuente principal (mejora de v3) | Controladora, drivers, motores NEMA 17, ventilación e iluminación LED interior |
| **24 V / 5 A** | Fuente **propia del láser K30** | Exclusivamente el módulo láser |

> ⚠️ Nota de diseño (verificada contra el fabricante): el Laser Tree K30 requiere 24V/5A y **no puede** alimentarse del riel de 12V. Por eso conserva su fuente dedicada. Registrado en [D-0005](../decisiones/D-0005-fuentes-separadas.md).

## Iluminación interior

Desde el 2026-08-17, una tira LED recorre la periferia interior para iluminar toda el área de trabajo:

- alimentación: riel de **12 V**;
- mando: **segundo interruptor del panel, de izquierda a derecha**;
- estado: instalada y operativa.

> ⏳ PENDIENTE: identificar fabricante/modelo, longitud, potencia o corriente total, calibre del conductor y fusible/protección. Hasta medir el consumo no se puede calcular el margen restante de la fuente de 12 V.

## Gestión del mazo móvil

El mazo que acompaña el movimiento incluye cables hacia motores X/Z, finales de carrera y control del láser. Está fijado y protegido provisionalmente con una envoltura espiral. Se reemplazará por una **cadena portacables articulada** —también llamada oruga portacables, cadena de arrastre o *cable carrier*— porque controla la trayectoria y el radio de flexión repetitivo.

La referencia y la sección todavía no están elegidas. Antes de comprar hay que medir carrera, ubicación de puntos fijo/móvil, envolvente disponible, diámetro y peso de cada cable, radio dinámico mínimo y condiciones de polvo/viruta. Los criterios y fuentes están en la [ficha de cadena portacables](../componentes/fichas/cadena-portacables.md).

Los cables de potencia/motor y los de señal/finales deben separarse dentro de la cadena cuando la sección lo permita. Un separador plástico ayuda a ordenar, pero no sustituye cableado adecuado, apantallamiento ni alivio de tensión.

## Finales de carrera y ruido eléctrico

- Los finales X−, Y−, Y+ y Z+ trabajan en lógica **normalmente cerrada (NC)** con `$5=1`.
- Y− y Y+ comparten la entrada D10 de la CNC Shield y están cableados **en serie**: cualquiera de los dos abre el circuito y activa el límite.
- Z+ está conectado a **D12/SpnEn**, que es la entrada real de límite Z cuando GRBL usa PWM variable para el láser.
- Esta topología eliminó la entrada Z flotante y resolvió la falsa alarma asociada al EMI del K30. Ver [D-0018](../decisiones/D-0018-finales-carrera-nc-y-en-serie.md) y la [prueba](../pruebas/2026-08-17-finales-nc-y-en-serie.md).

## Objetivos de calidad eléctrica v3

⏳ PENDIENTE — definir y documentar durante el desarrollo:

1. Selección de calibres de cable por corriente (buscar tablas AWG y citar fuente).
2. Conectores de calidad (evitar empalmes; considerar ferrules, conectores aéreos tipo GX/XT, borneras).
3. ~~Gestión provisional del mazo móvil.~~ Operativa con protector espiral; queda seleccionar e instalar la cadena portacables definitiva y separar señal de potencia dentro de ella.
4. Tierra común entre fuentes para la referencia de señal del láser (verificar recomendación del fabricante). Nota (2026-07-22): el aviso "problema con la placa" que se sospechaba ligado a esto resultó tener otra causa raíz — un conflicto de pines de GRBL en modo láser (ver [D-0011](../decisiones/D-0011-fin-de-carrera-fisico-en-z.md)), no necesariamente un problema de tierra. Este punto sigue pendiente de verificar por separado, como buena práctica general.
5. Protecciones: fusibles por riel, paro de emergencia que corte ambos rieles, protección de sobrecarga.

## Lecciones heredadas

- v1: la organización tardía del cableado costó re-trabajo — en v3 el layout eléctrico se diseña **antes** de cablear.
- v2: paro de emergencia y protección de sobrecarga funcionaron bien — se mantienen.

## Pendientes de documentación

⏳ PENDIENTE: esquemático eléctrico (generar cuando el diseño esté definido; el diagrama fuente puede vivir aquí como mermaid/svg y el plano formal como salida generada).
