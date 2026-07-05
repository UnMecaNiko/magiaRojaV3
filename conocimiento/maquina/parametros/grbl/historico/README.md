# Histórico de configuraciones GRBL

Snapshots **inmutables** de la configuración de la controladora. Nunca se editan; cada cambio genera archivos nuevos.

Por cada cambio de configuración se guardan **dos archivos con la misma fecha**:

1. `AAAA-MM-DD_dump.txt` — el dump crudo de `$$` **tal cual sale de la controladora**. Es la verdad canónica: se puede pegar de vuelta en la consola para restaurar la máquina.
2. `AAAA-MM-DD.yaml` — el mismo contenido estructurado y anotado (esquema de `../grbl-actual.yaml`), con una nota del cambio.

Si hay más de un cambio el mismo día, sufijar: `AAAA-MM-DD-2_dump.txt`.

El **porqué** de cada cambio va en [`../CHANGELOG.md`](../CHANGELOG.md).

## Cómo obtener el dump

En la consola de LightBurn / LaserGRBL / UGS, enviar `$$` y copiar la respuesta completa.
