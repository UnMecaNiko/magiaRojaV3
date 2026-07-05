# D-0003 — Media pesada fuera del repositorio

- **Fecha**: 2026-07-04
- **Ámbito**: Repositorio
- **Estado**: ✅ Vigente
- **Decisor**: Nicolas Velasquez (recomendación aceptada)

## Contexto

El proyecto generará fotos, videos y eventualmente CAD/planos. Aún no existen archivos de la v3, pero v1/v2 ya tienen media en Supabase Storage. Git maneja mal los binarios grandes (repo pesado, clones lentos, diffs inútiles).

## Decisión

El repositorio se mantiene **solo texto** (Markdown + YAML + diagramas livianos). Fotos, videos y CAD viven en almacenamiento externo (S3 o Supabase Storage, donde ya está la media de v1/v2), y en el repo se guarda **URL + descripción/caption**.

## Consecuencias

- ✅ Repo liviano, ideal para alimentar modelos y clonar rápido.
- ✅ La media de v1/v2 en Supabase ya cumple este patrón.
- Cada foto referenciada debe llevar caption descriptivo (sirve de alt-text y de contexto para IAs).
- ⏳ PENDIENTE: definir el bucket/carpeta para la media de la v3 cuando empiece a generarse.
