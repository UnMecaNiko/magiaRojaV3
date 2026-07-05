# Evolución de la línea Magia Roja

Qué cambió entre versiones y **por qué** — la narrativa del linaje. Útil para artículos, para la historia comercial y para entender las decisiones de la v3.

## Línea de tiempo

```
2021-10  ── v1: nace inspirada en tutoriales de Profe García (YouTube)
2023     ── v1 se profesionaliza: láser 80W + guardas por interés de un cliente
2024-05  ── v1 finaliza tras >2.5 años (producción >8 h/día)
2024-06  ── v2: rediseño mecánico (helicoidales), TMC2209, air assist, domo
2026     ── v2 SE VENDE → validación comercial
2026     ── v3: en desarrollo — más grande, eje Z, cabezal intercambiable, K30
```

## Tabla de evolución

| | v1 | v2 | v3 |
|---|---|---|---|
| Área de trabajo | 270×340 mm | 400×400 mm | ⏳ mayor |
| Ejes | X/Y (Y dual) | X/Y | **X/Y/Z** |
| Transmisión | Correas | Tornillo helicoidal + bujes | ⏳ por confirmar |
| Controladora | Arduino Uno + Shield V3 | GRBL board | Arduino + CNC Shield |
| Drivers | A4988 | TMC2209 refrigerados | ⏳ por confirmar |
| Láser (óptico) | ~10W (80W head) | 10W FAC + air assist externo | **30W (K30), air assist integrado** |
| Fresado | Motor rotativo | ✗ | **Cabezal intercambiable** |
| Alimentación | Única | Única | **Dos rieles (12V + 24V)** |
| Seguridad | Guardas acrílicas | Domo + paro emergencia + extracción | Hereda v2 (revalidar para 30W) |
| Destino | Producción propia | **Vendida** | En desarrollo |

## Patrones de la evolución

1. **Cada versión nace de una presión comercial real**: v1 se profesionalizó por un cliente; la v2 se construyó para producir mejor; la v3 nace porque la v2 se vendió.
2. **La mecánica da los saltos de precisión** (correas → helicoidales) **y el láser los saltos de capacidad** (10W → 30W ópticos).
3. **La plataforma de control se conserva** (GRBL desde 2021): el equipo prefiere profundizar en una plataforma conocida que perseguir novedades ([D-0006](../maquina/decisiones/D-0006-mantener-plataforma-grbl.md)).
4. **Cada versión recupera algo de la anterior**: la v3 recupera el fresado que tenía la v1 y la v2 abandonó — ahora con eje Z motorizado que lo hace viable de verdad.
