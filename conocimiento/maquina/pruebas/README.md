# Bitácora de pruebas técnicas

Registro de toda prueba realizada sobre la máquina: pruebas de movimiento, calibraciones, pruebas de corte/grabado por material, pruebas de potencia, etc.

## Reglas

1. Un archivo por prueba: `AAAA-MM-DD-titulo.md` (ej: `2026-07-15-corte-acrilico-3mm.md`).
2. Usar la [plantilla de prueba](../../../harness/plantillas/plantilla-prueba.md).
3. Si la prueba valida parámetros de un material, el YAML resultante va a [parametros/materiales/](../parametros/materiales/) con `fuente:` apuntando a la prueba.
4. Fotos/videos de la prueba → almacenamiento externo, URL en el archivo.
5. **Las pruebas fallidas también se registran** — un fracaso documentado ahorra repetirlo.

*(Sin pruebas registradas todavía — la v3 está en fase de electrónica. Las primeras serán las de movimiento y calibración de drivers.)*
