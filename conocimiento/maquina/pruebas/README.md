# Bitácora de pruebas técnicas

Registro de toda prueba realizada sobre la máquina: pruebas de movimiento, calibraciones, pruebas de corte/grabado por material, pruebas de potencia, etc.

## Reglas

1. Un archivo por prueba: `AAAA-MM-DD-titulo.md` (ej: `2026-07-15-corte-acrilico-3mm.md`).
2. Usar la [plantilla de prueba](../../../harness/plantillas/plantilla-prueba.md).
3. Si la prueba valida parámetros de un material, el YAML resultante va a [parametros/materiales/](../parametros/materiales/) con `fuente:` apuntando a la prueba.
4. Fotos/videos de la prueba → almacenamiento externo, URL en el archivo.
5. **Las pruebas fallidas también se registran** — un fracaso documentado ahorra repetirlo.

## Pruebas registradas

| Fecha | Prueba | Resultado |
|---|---|---|
| 2026-07-22 | [Diagnóstico alarma láser K30 (D12 flotante)](2026-07-22-diagnostico-alarma-laser-k30.md) | ✅ Causa raíz hallada |
| 2026-08-17 | [`$5=1` (invert limit pins) y Z flotante](2026-08-17-invert-limit-pins-z-flotante.md) | ✅ Confirmado D-0011 |
| 2026-08-17 | [Calibración Vref drivers ~700 mV](2026-08-17-calibracion-vref-drivers-700mv.md) | 🟡 Ajustado, falta validar bajo carga |
| 2026-08-17 | [Motores + finales de carrera + homing OK (switch Z en SpnEn)](2026-08-17-homing-ok-switch-z-en-spnen.md) | ✅ Éxito |
| 2026-08-17 | [Homing con Z primero (sube) y luego X/Y](2026-08-17-homing-z-primero-ok.md) | ✅ Éxito |
