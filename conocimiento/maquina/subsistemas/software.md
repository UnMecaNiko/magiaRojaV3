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

## Tutorial: botones de macro personalizados en LightBurn

En la máquina anterior se habían agregado botones personalizados en LightBurn (comandos G-code de un clic, ej. disparo de prueba del láser). Al revisar esta instalación no se encontraron guardados — ver "Dónde vive esta configuración" abajo. Este tutorial documenta cómo **crearlos de nuevo**, porque es un flujo bastante personalizado a la operación de esta máquina y vale la pena tenerlo en el repo en vez de reconstruirlo de memoria cada vez.

### Dónde vive esta configuración (hallazgo de la exploración)

- `C:\Program Files\LightBurn\` solo contiene el ejecutable y sus librerías — **no** guarda configuración de usuario ni botones.
- Los botones (macros) se guardan por perfil de dispositivo dentro de `prefs.ini`, en `%LOCALAPPDATA%\LightBurn\` (en este equipo: `C:\Users\DELL\AppData\Local\LightBurn\prefs.ini`), como un arreglo `"Macros": [...]` dentro del bloque del dispositivo (en esta instalación el perfil se llama `"GRBL"`).
- Se revisaron `prefs.ini` y los 29 backups fechados en `backup/prefs/` (nov. 2025 – ene. 2026): en **todos** el arreglo `Macros` está vacío. Los botones de la máquina anterior no quedaron guardados en esta instalación — hay que recrearlos desde cero. ⏳ PENDIENTE: si Nicolas recuerda los comandos exactos que tenía cada botón, anotarlos aquí para no perder ese conocimiento otra vez.

### Panel de Macros — dónde está

Va por **Window → Macros**. El panel solo aparece con un perfil de dispositivo basado en G-code seleccionado, y por defecto queda acoplado en la esquina superior derecha, detrás de la ventana Cuts/Layers.

Fuente: [Macros Window — LightBurn Documentation](https://docs.lightburnsoftware.com/2.1/Reference/MacrosWindow/) (consultada 2026-07-04).

### Procedimiento para crear un botón

1. Abrir el panel **Macros** (Window → Macros) y hacer clic en **Manage** (esquina inferior derecha).
2. En el diálogo, clic en **Add** → se abre "New Macro".
3. Llenar:
   - **Button Label**: el nombre que va a aparecer en el botón.
   - **Macro Content**: uno o más comandos G-code, uno por línea.
4. **OK** para guardar.
5. Para editar: seleccionar la macro en "Manage Macros" → **Edit**. Para borrar: **Delete**. Para reordenar: **Move Up/Down** o arrastrar.

Recomendación de la propia documentación: probar los comandos primero en la ventana **Console** antes de meterlos en un botón.

Fuente: igual que arriba.

### Ejemplo concreto: botón de "disparo de prueba" (test fire)

Útil para alinear el foco del K30 sin lanzar un trabajo completo — un pulso corto de láser a baja potencia:

```gcode
$32=0
M4
S200
G4 P0.25
M5
$32=1
```

| Línea | Qué hace |
|---|---|
| `$32=0` | Sale temporalmente del modo láser (modo CNC) solo para este pulso de prueba |
| `M4` | Enciende el láser (modo dinámico, ligado a velocidad) |
| `S200` | Fija la potencia del pulso (ajustar según escala de potencia del K30 — ⏳ PENDIENTE calibrar valor apropiado, `S200` es el ejemplo de la fuente para otro controlador) |
| `G4 P0.25` | Espera 0.25 s — duración del pulso |
| `M5` | Apaga el láser |
| `$32=1` | Vuelve a modo láser permanente |

⚠️ Este `$32=0`/`$32=1` es un toggle **dentro del macro**, distinto del `$32` permanente que se registrará en [grbl-actual.yaml](../parametros/grbl/grbl-actual.yaml) — no confundir uno con otro al leer la config de la máquina.

Fuente: [Making a Test Fire Button with LightBurn Macros](https://awesome.tech/test-fire-button-in-lightburn/) (consultada 2026-07-04).

### Para botones más avanzados

El "Custom G-code" de LightBurn expone variables como `x`/`y`/`z`, `p`/`power`, `s`/`speed`, `dwell`, `tool`, y los modificadores `|REL|`/`|ABS|`/`|RESTORE|` para cambiar temporalmente el modo de posicionamiento dentro de un macro. Fuente: [Custom GCode — LightBurn Documentation](https://docs.lightburnsoftware.com/CustomGCode.html) (consultada 2026-07-04).

## Pendientes

⏳ PENDIENTE:

1. Definir el software del flujo de fresado (UGS u otro sender; CAM para generar G-code de fresado — investigar opciones y citar).
2. Script YAML → librería de materiales LightBurn.
3. Versión de GRBL a usar y su configuración de modo láser (`$32`).
4. Recrear en LightBurn los botones de macro personalizados que tenía la máquina anterior — no quedaron guardados en esta instalación (ver tutorial arriba). Recuperar de memoria cuáles existían y qué comando exacto tenía cada uno.
