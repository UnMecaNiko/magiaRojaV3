# Registro de decisiones (ADR)

Cada decisión relevante — técnica de la máquina o estructural del repositorio — se registra con su contexto y su **porqué**, en formato ADR ligero. Así, meses después, nadie tiene que adivinar por qué algo es como es.

## Reglas

- Un archivo por decisión: `D-XXXX-titulo-corto.md` (numeración secuencial).
- Usar la [plantilla](../../../harness/plantillas/plantilla-decision.md).
- Las decisiones **no se borran**: si una se revierte, se crea una nueva que la reemplaza y se enlazan mutuamente.

## Índice

| ID | Decisión | Ámbito | Estado |
|---|---|---|---|
| [D-0001](D-0001-idioma-espanol.md) | Base de conocimiento en español | Repositorio | ✅ Vigente |
| [D-0002](D-0002-yaml-para-parametros.md) | YAML para parámetros, Markdown para narrativa | Repositorio | ✅ Vigente |
| [D-0003](D-0003-media-externa.md) | Media pesada fuera del repo (S3/Supabase) | Repositorio | ✅ Vigente |
| [D-0004](D-0004-laser-tree-k30.md) | Láser Laser Tree K30 para la v3 | Máquina | ✅ Vigente |
| [D-0005](D-0005-fuentes-separadas.md) | Dos rieles de alimentación (24V láser / 12V control) | Máquina | ✅ Vigente |
| [D-0006](D-0006-mantener-plataforma-grbl.md) | Mantener Arduino + CNC Shield + GRBL | Máquina | ✅ Vigente |
| [D-0007](D-0007-drivers-drv8825.md) | Drivers DRV8825 para los tres ejes | Máquina | ✅ Vigente |
| [D-0008](D-0008-ventilador-drivers-5v-directo.md) | Ventilador de drivers directo a 5V (no Cool.En/GRBL) | Máquina | ✅ Vigente |
| [D-0009](D-0009-z-sin-fin-de-carrera-soft-limits.md) | Eje Z sin fin de carrera: fuera del homing, soft limits neutralizados por $132 | Máquina | ❌ Reemplazada por D-0010 |
| [D-0010](D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md) | Soft limits apagados ($20=0) hasta instalar fin de carrera en Z | Máquina | ✅ Vigente |
| [D-0011](D-0011-fin-de-carrera-fisico-en-z.md) | Instalar fin de carrera físico en Z (Z+), cableado a D12 — resuelve alarma falsa del K30 | Máquina | ✅ Vigente |
| [D-0012](D-0012-dimensiones-generales-y-area-trabajo.md) | Dimensiones externas 500 × 500 mm y área útil 400 × 400 mm | Máquina | ♻️ Reemplazada por D-0015 (área de trabajo) |
| [D-0013](D-0013-identidad-velo-y-plan-mantenimiento.md) | Identidad VELO inc y plan de mantenimiento por seis meses | Repositorio / Comercial | ✅ Vigente |
| [D-0014](D-0014-infraestructura-vps-compartida.md) | Un solo VPS con proxy compartido Caddy para landing, n8n y un segundo sitio | Repositorio / Infraestructura | ✅ Vigente |
| [D-0015](D-0015-area-de-trabajo-500x500.md) | Área de trabajo corregida a 500 × 500 mm | Máquina | ✅ Vigente |
| [D-0016](D-0016-eje-rotatorio-clonado-a-y.md) | Eje rotatorio en slot A clonado a Y, conmutación por conectores manuales | Máquina | ✅ Vigente |
