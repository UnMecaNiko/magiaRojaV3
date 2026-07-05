# Proceso de construcción — paso a paso

Esta carpeta documenta el proceso de construcción de la máquina como **pasos atómicos y ordenados**. Es el **insumo directo para generar tutoriales** (artículos, videos, guías web) en `salidas/`.

## Por qué existe

La documentación por subsistemas ([maquina/subsistemas/](../maquina/subsistemas/)) describe **cómo es** la máquina. Esta carpeta describe **cómo se construyó, en qué orden y qué se aprendió** — que es lo que un tutorial necesita. Son vistas complementarias de la misma fuente de verdad.

## Reglas

1. Un archivo por paso: `NN-titulo.md` (numerados en orden de ejecución real).
2. Usar la [plantilla de paso](../../harness/plantillas/plantilla-paso-tutorial.md). Cada paso captura: objetivo, materiales/herramientas, procedimiento, fotos (URLs externas), **errores cometidos y lecciones** — el oro de un tutorial está en los errores.
3. Documentar **mientras se hace el trabajo**, no después de memoria. Si un paso ya pasó (p. ej. la mecánica v3), reconstruirlo con lo que se recuerde y marcar lagunas con ⏳ PENDIENTE.
4. Los pasos son fuente de verdad: los tutoriales generados en `salidas/` se regeneran desde aquí.

## Estructura

```
proceso-construccion/
└── v3/            pasos del build de la versión 3
    ├── 00-contexto-y-plan.md
    ├── 01-construccion-mecanica.md      (hecha — reconstruir detalles)
    └── 02-electronica-y-electrica.md    (fase actual — documentar en vivo)
```

Los procesos de v1 y v2 están narrados en [historia/](../historia/) — si algún día se quiere un tutorial retrospectivo de ellas, se extraería de allí.
