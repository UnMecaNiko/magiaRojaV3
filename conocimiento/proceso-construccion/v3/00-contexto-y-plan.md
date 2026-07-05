# Paso 00 — Contexto y plan de construcción de la v3

> **Estado**: ✅ definido | **Fecha**: 2026 (registrado 2026-07-04)

## Objetivo

Definir qué se va a construir y en qué orden, antes de cortar el primer perfil.

## Punto de partida

- La **v2 se vendió** — validación comercial de la línea.
- Se decide construir una v3 **más grande y más capaz**, aprovechando todo lo aprendido en v1 (2021–2024) y v2 (2024–2026).

## Qué será la v3

1. Área de trabajo mayor que los 400×400 mm de la v2 (medidas por cerrar).
2. **Eje Z motorizado** (NEMA 17) — primera vez en la línea.
3. **Cabezal intercambiable**: láser Laser Tree K30 (30W ópticos) ↔ motor de fresado.
4. Fuente principal de 12V/10A + fuente propia del láser (24V/5A).
5. Conexión eléctrica de mayor calidad que versiones anteriores.
6. Plataforma de control probada: Arduino + CNC Shield + GRBL.

## Plan de fases

| Fase | Contenido | Estado |
|---|---|---|
| 1. Mecánica | Estructura, ejes X/Y/Z, cabezal intercambiable | ✅ Hecha (Saul) |
| 2. Electrónica y eléctrica | Fuentes, cableado, controladora, drivers, integración K30 | 🔧 En curso (Nicolas) |
| 3. Configuración y calibración | GRBL, corrientes de drivers, pasos/mm, pruebas de movimiento | ⏳ Pendiente |
| 4. Pruebas de material | Validar parámetros de corte/grabado por material | ⏳ Pendiente |
| 5. Seguridad y acabados | Domo, paro de emergencia, extracción de humos | ⏳ Pendiente |

## Lecciones de versiones anteriores aplicadas al plan

- **v1**: la calibración de drivers y el ajuste de vibraciones fueron lo más difícil → en v3 se documentará como pasos propios (fase 3).
- **v1**: organizar la electrónica al final costó re-trabajo → en v3 el layout eléctrico se diseña antes de cablear.
- **v2**: la refrigeración activa de drivers dio estabilidad en sesiones largas → se mantiene.
