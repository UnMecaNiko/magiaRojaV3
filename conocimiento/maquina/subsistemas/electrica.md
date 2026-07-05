# Subsistema: Eléctrica

> **Estado: 🔧 En desarrollo** (responsable: Nicolas Velasquez)
> Última actualización: 2026-07-04

## Resumen

Alimentación, cableado y protecciones de la v3. Uno de los objetivos declarados de esta versión es **mejorar la calidad de la conexión eléctrica** respecto a versiones anteriores.

## Arquitectura de alimentación — dos rieles

| Riel | Fuente | Alimenta |
|---|---|---|
| **12 V / 10 A** | Fuente principal (mejora de v3) | Controladora, drivers, motores NEMA 17, ventilación |
| **24 V / 5 A** | Fuente **propia del láser K30** | Exclusivamente el módulo láser |

> ⚠️ Nota de diseño (verificada contra el fabricante): el Laser Tree K30 requiere 24V/5A y **no puede** alimentarse del riel de 12V. Por eso conserva su fuente dedicada. Registrado en [D-0005](../decisiones/D-0005-fuentes-separadas.md).

## Objetivos de calidad eléctrica v3

⏳ PENDIENTE — definir y documentar durante el desarrollo:

1. Selección de calibres de cable por corriente (buscar tablas AWG y citar fuente).
2. Conectores de calidad (evitar empalmes; considerar ferrules, conectores aéreos tipo GX/XT, borneras).
3. Gestión de cable: cadenas portacables para ejes móviles, separación de señal vs. potencia.
4. Tierra común entre fuentes para la referencia de señal del láser (verificar recomendación del fabricante).
5. Protecciones: fusibles por riel, paro de emergencia que corte ambos rieles, protección de sobrecarga.

## Lecciones heredadas

- v1: la organización tardía del cableado costó re-trabajo — en v3 el layout eléctrico se diseña **antes** de cablear.
- v2: paro de emergencia y protección de sobrecarga funcionaron bien — se mantienen.

## Pendientes de documentación

⏳ PENDIENTE: esquemático eléctrico (generar cuando el diseño esté definido; el diagrama fuente puede vivir aquí como mermaid/svg y el plano formal como salida generada).
