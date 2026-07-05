# Plan de trabajo — fase actual

> El "qué sigue" accionable. Al completar un ítem: moverlo a [completado.md](completado.md) y anotar [changelog.md](changelog.md). Última revisión: 2026-07-04.

## Fase actual: Electrónica y eléctrica de la v3

### En curso

- [ ] Diseñar el layout eléctrico de dos rieles (12V/10A + 24V/5A del K30) **antes de cablear**

### Siguiente

- [ ] Investigar y seleccionar conectores + calibres de cable (con fuentes de internet citadas)
- [ ] Confirmar drivers de la controladora (¿TMC2209 como la v2?) → actualizar [bom.yaml](../../conocimiento/maquina/componentes/bom.yaml) y [D-0006](../../conocimiento/maquina/decisiones/D-0006-mantener-plataforma-grbl.md)
- [ ] Extraer pinout PWM/TTL del manual del K30 → actualizar [ficha](../../conocimiento/maquina/componentes/fichas/laser-tree-k30.md)
- [ ] Montar controladora + cablear motores X/Y/Z
- [ ] Paro de emergencia de doble riel + protecciones

### Documentación paralela (mientras se trabaja)

- [ ] Bitácora en [02-electronica-y-electrica.md](../../conocimiento/proceso-construccion/v3/02-electronica-y-electrica.md) en cada sesión de trabajo
- [ ] Capturar datos de la mecánica ya hecha (medidas, transmisión) con Saul → [01-construccion-mecanica.md](../../conocimiento/proceso-construccion/v3/01-construccion-mecanica.md)
- [ ] Medir el área de trabajo → [especificaciones.md](../../conocimiento/maquina/especificaciones.md)

## Reglas de esta lista

1. Máximo ~3 ítems "en curso" a la vez.
2. Todo ítem terminado genera su documentación (paso, prueba, decisión o ficha) antes de marcarse completo.
