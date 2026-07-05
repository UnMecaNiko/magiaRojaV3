# Perfiles de operación

Combinaciones de configuración por **modo de trabajo** de la máquina. La v3 es híbrida (láser ↔ fresado) y cada modo puede exigir configuraciones GRBL distintas (aceleraciones, `$32` laser mode, velocidades máximas).

Perfiles previstos (⏳ pendientes de crear cuando se configure la máquina):

- `modo-laser.yaml` — perfil para operar con el K30 (`$32=1`, aceleraciones altas para grabado).
- `modo-fresado.yaml` — perfil para el motor de fresado (`$32=0`, velocidades conservadoras, control de profundidad por pasadas).

Cada perfil documenta **solo los parámetros que difieren** de `../grbl/grbl-actual.yaml`, más el procedimiento de cambio de modo.
