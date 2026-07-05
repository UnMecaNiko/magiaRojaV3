# D-0007 — Drivers DRV8825 para los tres ejes

- **Fecha**: 2026-07-04
- **Ámbito**: Máquina
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

[D-0006](D-0006-mantener-plataforma-grbl.md) dejó pendiente confirmar el modelo de driver para la v3, señalando TMC2209 (usado en v2, refrigerado) como candidato natural. La v1 usó A4988.

## Decisión

La v3 usa **drivers DRV8825** en los tres ejes (X, Y, Z), con resistencias sensoras confirmadas físicamente en **0.1 Ω** (marcado "R100" en la placa).

## Motivos

- Pinout e interfaz casi idénticos a los del A4988 (heredado de v1), lo que lo hace un "reemplazo de mayor rendimiento" según el propio fabricante — aunque con diferencias puntuales de pines y timing que no lo hacen 100% intercambiable. Fuente: [Pololu, DRV8825 Carrier](https://www.pololu.com/product/2133) (consultado 2026-07-04).
- Soporta hasta 2.2 A por fase con refrigeración adecuada y microstepping de hasta 1/32 — suficiente para el motor de 2 A del eje Z. Misma fuente.
- ⏳ PENDIENTE: registrar la razón específica de elegir DRV8825 sobre TMC2209 para v3 (¿disponibilidad, costo, stock heredado?), si aplica.

## Consecuencias

- ✅ Resuelve el pendiente de driver abierto en D-0006 y replicado en varios documentos de subsistemas/BOM.
- ⚠️ A diferencia del TMC2209 (usado en v2), el DRV8825 no tiene microstepping silencioso (StealthChop) — operación más ruidosa.
- ⚠️ Sin heatsink/ventilación activa el límite seguro es ~1.5 A por fase (fuente Pololu). Los motores de X/Y (1.7 A nominal) y sobre todo el de Z (2 A nominal) requieren refrigeración activa de los drivers — mantiene la lección heredada de v2 (ver [electronica.md](../subsistemas/electronica.md)).
- ⏳ PENDIENTE: calibración física del Vref en banco (targets calculados en [parametros/drivers/calibracion-corriente.yaml](../parametros/drivers/calibracion-corriente.yaml)); registrar como prueba una vez verificada sin pérdida de pasos ni sobrecalentamiento.
