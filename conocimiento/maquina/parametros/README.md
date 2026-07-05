# Parámetros de la máquina

**Regla del repo: los parámetros son datos, y los datos van en YAML** (no en Markdown). Un YAML puede ser leído por un script de Python, convertirse en librería de materiales de LightBurn, alimentar una tabla web — y sigue siendo legible por humanos e IAs. Ver [D-0002](../decisiones/D-0002-yaml-para-parametros.md).

## Estructura

```
parametros/
├── materiales/          Librería de materiales — un YAML por material+espesor
│   └── <material>-<espesor>.yaml   (ej: acrilico-3mm.yaml)
├── grbl/                Configuración de la controladora
│   ├── grbl-actual.yaml     Config vigente, ANOTADA
│   ├── historico/           Snapshots fechados (dump $$ crudo + YAML)
│   └── CHANGELOG.md         Qué cambió, cuándo y POR QUÉ
└── perfiles/            Combinaciones por tarea/modo (ej: modo láser vs. modo fresado)
```

## Esquema de un material

```yaml
material: Acrílico          # nombre humano
espesor_mm: 3
maquina: magia-roja-v3
operaciones:
  - tipo: corte             # corte | grabado | marcado
    potencia_pct: 100       # % de potencia del láser
    velocidad_mm_min: 300
    pasadas: 1
    air_assist: true
    foco_mm: 40             # distancia focal usada
  - tipo: grabado
    potencia_pct: 30
    velocidad_mm_min: 3000
    pasadas: 1
notas: "Texto libre: acabado, olor, precauciones."
fuente: "conocimiento/maquina/pruebas/AAAA-MM-DD-titulo.md"   # ¡SIEMPRE! la prueba que lo respalda
validado: true              # false si es valor tentativo/copiado de internet
```

## Reglas

1. **Ningún parámetro huérfano**: el campo `fuente` enlaza la prueba que lo validó. Si viene de internet sin validar, `validado: false` y la URL en `fuente`.
2. **Nunca editar el histórico de GRBL**: los snapshots en `grbl/historico/` son inmutables; los cambios generan snapshots nuevos.
3. Los cambios de GRBL siempre se anotan en `grbl/CHANGELOG.md` con su **porqué**.
4. Git versiona todo, pero el histórico explícito permite comparar épocas sin arqueología de commits.
