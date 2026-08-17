# D-0016 — Eje rotatorio en el slot A clonado a Y, con conectores manuales de conmutación

- **Fecha**: 2026-08-17
- **Ámbito**: Máquina
- **Decisor**: Nicolas Velasquez
- **Estado**: ✅ Vigente
- **Relacionada con**: [D-0006](D-0006-mantener-plataforma-grbl.md) (plataforma GRBL), [D-0004](D-0004-laser-tree-k30.md) (láser K30)

## Contexto

Se quiere grabar con el K30 sobre superficies cilíndricas (vasos, botellas, etc.), lo que requiere un **eje rotatorio** que gire la pieza en lugar de mover un eje lineal. La plataforma es Arduino + CNC Shield + GRBL 1.1h (D-0006), que no tiene un cuarto eje real: el slot **A** de la shield solo puede **clonar** las señales step/dir de X, Y o Z mediante jumpers.

## Decisión

El eje rotatorio se monta en el **slot A de la CNC Shield, clonado al eje Y** (por los jumpers de la shield). La conmutación entre grabado plano y rotatorio se hace **físicamente con dos conectores** (enchufar/desenchufar a mano, **no** interruptores):

1. **Conector en el pin ENABLE del driver A** — permite habilitar/deshabilitar solo el driver A (el rotatorio) de forma independiente (los drivers de la shield comparten la línea EN global, así que se aísla el enable de A en su socket).
2. **Conector en el motor Y lineal** — permite desconectar el motor Y lineal.

Modos de uso:
- **Plano**: A-enable **desconectado** (rotatorio inactivo) + motor Y **conectado**. La señal de Y mueve solo el motor lineal.
- **Rotatorio**: A-enable **conectado** (rotatorio activo) + motor Y **desconectado**. La señal de Y mueve solo el rotatorio.

La operación se apoya en un **botón personalizado (macro) en LaserGRBL**. ⏳ PENDIENTE precisar qué envía exactamente el botón (se presume ajuste de `$101`; confirmar).

## Motivos

- Es la forma estándar de añadir rotatorio en GRBL sobre CNC Shield sin cambiar de controladora (respeta D-0006): clonar un eje lineal en A.
- Se elige **clonar Y** (no X) para reutilizar la señal de avance del grabado.
- La conmutación por **conectores** (en vez de interruptores) es más simple y barata; el costo es que el cambio plano↔rotatorio es manual y hay que recordar el orden.

## Consecuencias

- ✅ Permite grabado cilíndrico reutilizando la electrónica existente.
- ⚠️ **Los pasos/mm de Y (`$101`) cambian en modo rotatorio**: en plano `$101=200` (lineal); en rotatorio, un "mm" de Y equivale a un giro, así que `$101` debe recalcularse (pasos por grado × relación mecánica del rotatorio). Hay que cambiarlo al entrar a rotatorio y **restaurar `$101=200` al volver a plano**. El snapshot en `parametros/grbl/historico/` protege ante un cambio mal hecho. ⏳ PENDIENTE calcular el `$101` rotatorio.
- ⚠️ Riesgo operativo: si se olvida (des)conectar uno de los dos conectores, ambos motores (Y lineal y rotatorio) responden a la vez, o ninguno. Procedimiento manual a documentar.
- ⏳ PENDIENTE: definir homing/límites en modo rotatorio (el rotatorio no tiene topes), y el detalle del botón de LaserGRBL.
