# Prueba: Accuracy test del láser a 3000 mm/min y 85 % — 2026-08-17

- **Fecha**: 2026-08-17
- **Quién**: Nicolas Velasquez
- **Subsistema/tema**: láser / precisión de grabado (accuracy test)
- **Resultado global**: 🟢 OK — el patrón salió perfecto

## Objetivo

Validar la precisión de grabado del cabezal láser [Laser Tree K30](../componentes/fichas/laser-tree-k30.md) mediante un *accuracy test*, corriendo el patrón con un juego de parámetros de velocidad y potencia.

## Montaje / condiciones

- Modo láser (`$32=1`, ver [grbl-actual.yaml](../parametros/grbl/grbl-actual.yaml)).
- **Velocidad (feed)**: 3000 mm/min.
- **Potencia**: 85 %.
- **Material**: pino (el grosor no es relevante para este test).
- **Patrón / origen del accuracy test**: ⏳ PENDIENTE de anotar (software o archivo usado).

## Procedimiento y resultados

- Se ejecutó el accuracy test con los parámetros de arriba.
- **Resultado: salió perfecto** — sin desviaciones apreciables en el patrón.

## Conclusiones

- La combinación **3000 mm/min + 85 %** produce un grabado preciso en **pino**.
- Buen candidato como punto de partida para el futuro `modo-laser.yaml` en [perfiles](../parametros/perfiles/README.md).

## Acciones / implicaciones

- Trasladar estos parámetros a un perfil de material/operación (pino) cuando se creen los perfiles.

## Fuentes

- Prueba física directa por Nicolas Velasquez (fuente primaria).
