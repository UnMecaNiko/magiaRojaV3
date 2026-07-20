# Plan de trabajo — fase actual

> El "qué sigue" accionable. Al completar un ítem: moverlo a [completado.md](completado.md) y anotar [changelog.md](changelog.md). Última revisión: 2026-07-04.

## Fase actual: Electrónica y eléctrica de la v3

### En curso

- [ ] Diseñar el layout eléctrico de dos rieles (12V/10A + 24V/5A del K30) **antes de cablear**

### Siguiente

- [ ] Decidir qué hacer con `HOMING_INIT_LOCK`/`HOMING_FORCE_SET_ORIGIN` heredados de la máquina anterior (`config.h`) → ver hallazgo en [control-grbl.md](../../conocimiento/maquina/subsistemas/control-grbl.md). (El eje Z fuera del ciclo de homing ya quedó decidido — [D-0009](../../conocimiento/maquina/decisiones/D-0009-z-sin-fin-de-carrera-soft-limits.md).)
- [ ] Confirmar físicamente los jumpers MODE0/1/2 (1/8 de paso) en la CNC Shield de los tres ejes → [parametros/drivers/microstepping.yaml](../../conocimiento/maquina/parametros/drivers/microstepping.yaml)
- [ ] Investigar y seleccionar conectores + calibres de cable (con fuentes de internet citadas)
- [ ] Extraer pinout PWM/TTL del manual del K30 → actualizar [ficha](../../conocimiento/maquina/componentes/fichas/laser-tree-k30.md)
- [ ] Montar controladora + cablear motores X/Y/Z
- [ ] Paro de emergencia de doble riel + protecciones

### Presupuesto

- [ ] Definir tarifas COP/hora por rol (mecánico, electricista, electrónico, programador) → hoja Tarifas de [presupuesto-v3.xlsx](../../presupuesto/presupuesto-v3.xlsx)
- [ ] 🪑 **Sesión de reconstrucción de la fase mecánica** (sentarse con Saul): detallar las horas invertidas, los procesos que se hicieron y los gastos de materiales de la mecánica ya construida → registrar en el Excel con `Estimado = Sí`
- [ ] Registrar las compras ya hechas de la v3 (K30, fuente 12V/10A…) en la hoja Materiales

### Documentación paralela (mientras se trabaja)

- [ ] Bitácora en [02-electronica-y-electrica.md](../../conocimiento/proceso-construccion/v3/02-electronica-y-electrica.md) en cada sesión de trabajo
- [ ] Capturar datos de la mecánica ya hecha (medidas, transmisión) con Saul → [01-construccion-mecanica.md](../../conocimiento/proceso-construccion/v3/01-construccion-mecanica.md)
- [ ] Medir el área de trabajo → [especificaciones.md](../../conocimiento/maquina/especificaciones.md)

## Reglas de esta lista

1. Máximo ~3 ítems "en curso" a la vez.
2. Todo ítem terminado genera su documentación (paso, prueba, decisión o ficha) antes de marcarse completo.
