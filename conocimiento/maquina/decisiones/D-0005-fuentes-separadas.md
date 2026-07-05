# D-0005 — Dos rieles de alimentación: 24V (láser) y 12V (control)

- **Fecha**: 2026-07-04
- **Ámbito**: Máquina
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez

## Contexto

La v3 mejora la fuente principal a **12V/10A**. Al investigar la ficha del Laser Tree K30 se confirmó que requiere **24V/5A** — es decir, **no puede** alimentarse del riel de 12V. El K30 incluye su propia fuente.

## Decisión

Arquitectura de **dos rieles independientes**:

| Riel | Alimenta |
|---|---|
| 12V / 10A (fuente principal) | Controladora, drivers, NEMA 17, ventilación |
| 24V / 5A (fuente del K30) | Exclusivamente el módulo láser |

## Consecuencias

- ✅ Cada subsistema opera en su voltaje nominal; el láser no compite por corriente con los motores.
- ⚠️ El paro de emergencia debe cortar **ambos** rieles.
- ⚠️ Verificar necesidad de tierra común entre rieles para la referencia de la señal PWM/TTL del láser (consultar manual del K30 al integrar).
- El diseño eléctrico documenta ambos rieles por separado en [electrica.md](../subsistemas/electrica.md).
