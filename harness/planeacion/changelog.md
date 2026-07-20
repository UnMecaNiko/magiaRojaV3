# Changelog — cambios sobre la marcha

> Bitácora cronológica de cambios: en la máquina, en decisiones, en el repo. Grano más fino que [completado.md](completado.md) (que registra hitos). Formato: fecha + qué + por qué.

## 2026-07

### 2026-07-20
- **[software/lasergrbl]** ✅ Confirmado: la opción 1 del tutorial de Z (Grbl → Settings → pestaña Jog Control → marcar "Show Z up/down control") resolvió los botones de subir/bajar Z en LaserGRBL — no eran macros personalizadas, era la casilla nativa. Ver [software.md](../../conocimiento/maquina/subsistemas/software.md).

### 2026-07-04
- **[software/lasergrbl]** Corrección: los botones de subir/bajar Z eran de **LaserGRBL** (`C:\Program Files (x86)\LaserGRBL`), no de LightBurn como se documentó antes hoy. Reescrito el tutorial en [software.md](../../conocimiento/maquina/subsistemas/software.md): se ubicó `CustomButtons.bin` en `%APPDATA%\LaserGRBL\` (sin botones de Z, confirma que se borraron) y `StandardButtons.zbn` en la instalación; no se editó el binario a mano por riesgo de corromper los botones que sí funcionan. Se documentan dos rutas: la casilla nativa "Show Z up/down control" (Grbl→Settings→Jog Control) y, si eran macros, el G-code `$J= G91 Z[jogstep] F[jogspeed]` citado de la comunidad de LaserGRBL.
- **[repo/limpieza]** Eliminado del plan de trabajo el pendiente "confirmar drivers de la controladora" — ya resuelto por [D-0007](../../conocimiento/maquina/decisiones/D-0007-drivers-drv8825.md) (DRV8825); movido a [completado.md](completado.md).
- **[software/lightburn]** Investigado y documentado en [software.md](../../conocimiento/maquina/subsistemas/software.md) el tutorial para crear botones de macro personalizados en LightBurn (con fuentes). Se revisó `prefs.ini` y sus 29 backups en este equipo: los botones de la máquina anterior no quedaron guardados, hay que recrearlos — queda como pendiente recordar los comandos exactos.
- **[historia/v2]** Registrada la configuración `$$` de GRBL de la v2 como referencia histórica en [historia/v2-grbl-config.yaml](../../conocimiento/historia/v2-grbl-config.yaml). Se detectó una inconsistencia sin resolver: la v2 traía parámetros de Z no nulos pese a que el eje Z motorizado se documenta como novedad de la v3 — anotada como observación pendiente de aclarar con Nicolas, sin inventar la respuesta.
- **[electrónica/drivers]** Decidido microstepping de **1/8 (octavo de paso)** en los tres drivers DRV8825 (X, Y, Z). Tabla de jumpers MODE0/1/2 (fuente Pololu) y detalle en [parametros/drivers/microstepping.yaml](../../conocimiento/maquina/parametros/drivers/microstepping.yaml); falta confirmar jumpers físicamente y calcular `$100`/`$101`/`$102` cuando se conozca el avance mecánico de cada eje.
- **[electrónica/grbl]** Comparado el `config.h` heredado de una máquina anterior contra el stock de GRBL antes de subir el firmware a la v3: 3 diferencias encontradas (`HOMING_INIT_LOCK` desactivado, ciclo de homing sin eje Z, `HOMING_FORCE_SET_ORIGIN` activado). Como la v3 estrena eje Z motorizado, queda pendiente decidir si se incorpora al homing. Detalle en la bitácora del [paso 02](../../conocimiento/proceso-construccion/v3/02-electronica-y-electrica.md).
- **[repo/presupuesto]** 🔒 Creada la sección `presupuesto/` (interna, solo v3): Excel de 4 hojas (Resumen, Materiales con COP/USD/tasa de cambio, Horas por proceso y rol, Tarifas por rol) + espejo CSV en `datos/`. Nuevas reglas 10 y 11 en AGENTS.md (presupuesto confidencial; v1/v2 historia congelada).
- **[seguridad]** Anotado que el protector propio del K30 no reemplaza el domo: los reflejos difusos sobre el material son el riesgo que el domo mitiga.
- **[investigación/seguridad]** ⚠️ Resuelto el tema prioritario de protección ocular: el acrílico rojo genérico (domo v2) NO es protección certificada para 30W @ 450 nm — se requiere acrílico naranja con OD 3+ para 405–450 nm. Hallazgo con fuentes en `conocimiento/maquina/subsistemas/seguridad.md`. Decisión de material pendiente.
- **[repo]** Creado el repositorio completo: estructura de dos capas, AGENTS.md como contexto principal, CLAUDE.md como referencia.
- **[decisión]** D-0001 a D-0006 registradas (idioma, YAML, media externa, K30, dos rieles, plataforma GRBL).
- **[investigación]** Ficha Laser Tree K30 con fuentes: 30W ópticos, 450 nm, 24V/5A, air assist integrado. Detectado que la referencia recordada "tri-j30" era incorrecta.
- **[máquina]** Documentado el estado: mecánica ✅, electrónica/eléctrica 🔧 en curso.
