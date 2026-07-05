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

## Tutorial: botones de subir/bajar Z en LaserGRBL

Corrección sobre una nota anterior de esta misma sesión: esto **no es de LightBurn** — son los botones de eje Z de **LaserGRBL** (`C:\Program Files (x86)\LaserGRBL`), que Nicolas borró y ahora necesita recrear.

### Dónde vive esta configuración (hallazgo de la exploración)

- `C:\Program Files (x86)\LaserGRBL\` solo tiene el ejecutable y librerías — no guarda configuración de usuario. Sí trae `StandardButtons.zbn`, un set de botones de ejemplo de fábrica, en el formato binario propio de LaserGRBL ("RemotingBase" serializer, comprimido) — no legible ni editable como texto.
- La config de usuario vive en `%APPDATA%\LaserGRBL\` (en este equipo: `C:\Users\DELL\AppData\Roaming\LaserGRBL\`). Los botones personalizados están en `CustomButtons.bin` ahí mismo, en el mismo formato binario propio.
- Se revisó `CustomButtons.bin`: hoy tiene botones de framing, foco de láser y encendido/apagado — pero **ningún botón de Z**, consistente con que se hayan borrado.
- ⚠️ No se editó `CustomButtons.bin` a mano para reinsertar los botones: es un formato binario serializado propio sin librería disponible aquí para escribirlo de forma segura. Un error de un byte arriesga corromper también los botones que sí funcionan hoy (framing, foco, láser on/off). Recrearlos desde la interfaz (abajo) toma lo mismo y no tiene ese riesgo.

### Opción 1 (la más simple — probablemente esto es lo que se borró)

Antes de crear botones personalizados: el control de Z de LaserGRBL es en realidad una función **nativa** que viene oculta por defecto, no una macro. Si "se borraron los botones de Z", lo más probable es que se haya desmarcado esta casilla:

1. Menú **Grbl → Settings**.
2. Pestaña **Jog Control**.
3. Marcar **"Show Z up/down control"**.
4. Guardar.

Esto agrega junto al panel de jog un set de controles de Z (movimiento grueso y fino) — es, de hecho, la única forma en que LaserGRBL mueve el eje Z fuera de ejecutar un archivo G-code cargado.

Fuente: [SainSmart — Introduction to CNC for a Total Novice: Setting up a Laser](https://docs.sainsmart.com/article/9t96srkawt-introduction-to-cnc-for-a-total-novice-setting-up-a-laser) (consultada 2026-07-04).

### Opción 2 — si eran botones personalizados (macros) de verdad

1. Clic derecho en el área de **botones personalizados** (parte inferior de la ventana principal) → **New**.
2. Tipo **Button** (ejecuta un bloque de G-code al hacer clic; también existen `TwoStateButton` y `PushButton` para alternar/mantener presionado).
3. Llenar **Caption** (ej. "Z+" / "Z-") y **ToolTip** opcional.
4. G-code recomendado — comando de jog oficial de GRBL (`$J=`), cancelable y que no altera el estado del parser:
   - Subir: `$J= G91 Z[jogstep] F[jogspeed]`
   - Bajar: `$J= G91 Z[0-jogstep] F[jogspeed]`

   `[jogstep]` y `[jogspeed]` son variables de LaserGRBL que toman el paso y la velocidad ya configurados en el panel de jog, para que el botón se comporte igual que el resto de controles.

   Variante alternativa vista en la comunidad (sin `$J=`, con G-code clásico):
   ```
   G91
   G0 Z[jogstep] F[jogspeed]
   G90
   ```
5. Guardar. Para editar o borrar más adelante: clic derecho sobre el botón.

Fuentes:
- [Custom buttons — LaserGRBL](https://lasergrbl.com/usage/custom-buttons/) (tipos de botón y variables `[jogstep]`/`[jogspeed]`, consultada 2026-07-04).
- [arkypita/LaserGRBL, issue #306 "Share your custom buttons Here!"](https://github.com/arkypita/LaserGRBL/issues/306) — comentarios de Arhimed-Ru (versión `$J=`) y 1estrider (versión G91/G0/G90), consultada 2026-07-04.

## Pendientes

⏳ PENDIENTE:

1. Definir el software del flujo de fresado (UGS u otro sender; CAM para generar G-code de fresado — investigar opciones y citar).
2. Script YAML → librería de materiales LightBurn.
3. Versión de GRBL a usar y su configuración de modo láser (`$32`).
4. Recrear en LaserGRBL los botones de Z (ver tutorial arriba) — probar primero la opción 1 (casilla nativa); si no era eso, crear los botones de la opción 2 y confirmar que el comportamiento (paso, velocidad, dirección) es el esperado.
