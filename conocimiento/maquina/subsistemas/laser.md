# Subsistema: Láser

> **Estado: 🔧 En integración**
> Última actualización: 2026-07-04

## Módulo: Laser Tree K30

El salto más grande de la v3: de los 10W ópticos de la v2 a **30W ópticos reales** (~3× la capacidad de corte). Especificaciones completas y fuentes en la [ficha del componente](../componentes/fichas/laser-tree-k30.md).

Resumen operativo:

| Parámetro | Valor |
|---|---|
| Potencia óptica | 30W (medida ~34.2W) |
| Longitud de onda | 450 nm ±10 nm (azul) |
| Diodos | 6 × 5.5W con compresión de haz |
| Foco | Fijo, 40 mm |
| Alimentación | **Fuente propia 24V / 5A** |
| Air assist | **Integrado** en el módulo |
| Refrigeración | Doble ventilador; mantener módulo <55 °C, ambiente <35 °C |

## Capacidad de corte (datos del fabricante — validar con pruebas propias)

| Material | Una pasada |
|---|---|
| Pino | 20 mm |
| Acrílico | 30 mm |
| Contrachapado | 15 mm |

> Estos valores son de marketing del fabricante. La regla del repo: **cada material se valida con pruebas propias** y los parámetros reales van a [parametros/materiales/](../parametros/materiales/) enlazando la prueba.

## Diferencias operativas vs. v2

- **Air assist integrado**: la v2 usaba bomba de aire externa; el K30 lo trae en el módulo. ⏳ PENDIENTE: evaluar si el flujo integrado basta para corte grueso o si se complementa con la bomba externa.
- **Fuente separada de 24V**: ver [electrica.md](electrica.md) y [D-0005](../decisiones/D-0005-fuentes-separadas.md).
- Mayor potencia → repensar seguridad: ⚠️ la investigación del 2026-07-04 concluyó que **el acrílico rojo genérico no es protección certificada para 450 nm** — se requiere acrílico naranja con OD especificada. Ver hallazgo completo en [seguridad.md](seguridad.md).

## Integración pendiente

⏳ PENDIENTE:

1. Conexión de señal PWM/TTL desde la CNC Shield al K30 (verificar pinout y niveles con el manual).
2. Tierra común entre riel de 12V (control) y 24V (láser) para referencia de señal.
3. Montaje en el cabezal intercambiable.
4. Pruebas de potencia por material → registrar en [pruebas/](../pruebas/).
