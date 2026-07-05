# Subsistema: Software

> Última actualización: 2026-07-04

## Stack de operación

| Software | Rol | Licencia |
|---|---|---|
| **LightBurn** | Flujo principal láser: diseño, librería de materiales, control | Comercial |
| **LaserGRBL** | Alternativa libre para láser | Gratuito |
| **UGS** (Universal G-code Sender) | Operación CNC general — candidato para el flujo de fresado | Open source |

Conexión: **USB directa** a la controladora (Arduino + CNC Shield, GRBL).

## Integración con este repositorio

- Los parámetros de corte/grabado por material viven en [parametros/materiales/](../parametros/materiales/) como YAML — **la fuente de la verdad**.
- LightBurn maneja su propia librería de materiales y exporta configuración como `.lbset`. Meta del repo: **generar la librería de LightBurn por script desde los YAML**, no al revés. (Ver [roadmap](../../../harness/planeacion/roadmap.md).)
- Backups de configuración GRBL: LightBurn puede leer/escribir los `$$`; el histórico canónico vive en [parametros/grbl/historico/](../parametros/grbl/historico/).

Fuentes sobre configuración GRBL en LightBurn (consultadas 2026-07-04):
- https://docs.lightburnsoftware.com/2.1/Guides/GRBLConfiguration/
- https://docs.lightburnsoftware.com/latest/Reference/MachineSettings/

## Pendientes

⏳ PENDIENTE:

1. Definir el software del flujo de fresado (UGS u otro sender; CAM para generar G-code de fresado — investigar opciones y citar).
2. Script YAML → librería de materiales LightBurn.
3. Versión de GRBL a usar y su configuración de modo láser (`$32`).
