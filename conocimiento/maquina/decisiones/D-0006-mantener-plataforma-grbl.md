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
- ⚠️ Techo conocido: sin WiFi nativo, límite de 3 ejes, 8 bits. Si el roadmap futuro pide más (p. ej. rotativo de 4º eje), se revisará esta decisión con un nuevo ADR.
- ✅ Modelo de drivers confirmado: DRV8825 — ver [D-0007](D-0007-drivers-drv8825.md).
