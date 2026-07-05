# Presupuesto — CNC Magia Roja v3 🔒 INTERNO

Costos reales del proyecto: materiales comprados y horas invertidas por proceso y por rol.

> **🔒 REGLA DE CONFIDENCIALIDAD**: esta carpeta es **interna**. El chatbot, la web, los artículos y todo material de cara a clientes tienen **prohibido** leer o citar esta carpeta. (Regla registrada en [AGENTS.md](../AGENTS.md).)

> **Alcance: solo la v3.** La v1 y la v2 son historia congelada — no se presupuestan ni se trabaja más sobre ellas.

## Archivos

| Archivo | Qué es |
|---|---|
| [`presupuesto-v3.xlsx`](presupuesto-v3.xlsx) | **El archivo de trabajo** — aquí se registra todo |
| [`datos/*.csv`](datos/) | Espejo en texto del Excel, para diffs de git y consumo por modelos |

## El Excel — 4 hojas

1. **Resumen** — todo automático: totales, costo total del proyecto, horas y costo por proceso y por rol. *No se edita.*
2. **Materiales** — una fila por compra. Columnas de moneda:
   - Compra en **COP**: llenar `Precio unit. (COP)` directamente.
   - Compra en **USD**: llenar `Precio unit. (USD)` y `Tasa cambio (COP/USD)` con la tasa a la que se hizo el cambio (el COP fluctúa — se registra la tasa real del día), y en `Precio unit. (COP)` poner la fórmula `=J{fila}*K{fila}`.
   - `bom_id` enlaza cada compra con [bom.yaml](../conocimiento/maquina/componentes/bom.yaml): el BOM dice *qué lleva la máquina*, esta hoja dice *cuánto costó*.
   - `Estimado = Sí` para valores reconstruidos de memoria (p. ej. la fase mecánica).
3. **Horas** — una fila por sesión de trabajo: fecha, proceso, **rol** (mecánico / electricista / electrónico / programador), quién, horas y descripción. El costo se calcula solo con la tarifa del rol.
4. **Tarifas** — tarifa COP/hora por rol. ⏳ PENDIENTE de definir (celdas en amarillo).

## Flujo de trabajo

1. Editas el **Excel** (compras y horas) — es la fuente de esta carpeta.
2. Tras cambios significativos, se regeneran los CSV de `datos/` (a mano o con skill futura) para que git tenga diffs legibles.
3. El commit incluye ambos.

## Pendientes

- ⏳ Definir tarifas por rol (hoja Tarifas).
- ⏳ **Sesión de reconstrucción de la fase mecánica** (con Saul): horas invertidas, procesos realizados y gastos de materiales — registrar con `Estimado = Sí`. (En [plan-de-trabajo.md](../harness/planeacion/plan-de-trabajo.md).)
