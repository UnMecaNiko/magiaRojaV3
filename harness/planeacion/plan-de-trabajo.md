# Plan de trabajo — fase actual

> El "qué sigue" accionable. Al completar un ítem: moverlo a [completado.md](completado.md) y anotar [changelog.md](changelog.md). Última revisión: 2026-08-24.

## Fase actual: Electrónica y eléctrica de la v3

### En curso

- [ ] **Validar los DRV8825 a 0,70 V bajo carga**: registrar temperatura, duración y pérdida de pasos por eje; especial atención a Z. Confirmar capacitor ≥47 µF, flujo de aire y si cualquier falla sigue al driver en frío. Protocolo en [calibracion-corriente.yaml](../../conocimiento/maquina/parametros/drivers/calibracion-corriente.yaml).
- [ ] **Medir y seleccionar la cadena portacables**: carrera, puntos de anclaje, envolvente, lista/diámetro/peso de cables y radios dinámicos. Después elegir serie, radio y sección con la [ficha de selección](../../conocimiento/maquina/componentes/fichas/cadena-portacables.md).
- [ ] **Completar el diseño eléctrico y protecciones**: documentar layout de 12 V + 24 V, consumo/protección de la tira LED, calibres, conectores, fusibles y paro de emergencia de doble riel.

### Siguiente

- [ ] Confirmar físicamente los jumpers MODE0/1/2 (1/8 de paso) en la CNC Shield de los tres ejes → [parametros/drivers/microstepping.yaml](../../conocimiento/maquina/parametros/drivers/microstepping.yaml)
- [ ] Investigar y seleccionar conectores + calibres de cable (con fuentes de internet citadas)
- [ ] Extraer pinout PWM/TTL del manual del K30 → actualizar [ficha](../../conocimiento/maquina/componentes/fichas/laser-tree-k30.md)
- [ ] Ejecutar una prueba EMI prolongada (1–2 h) con K30 y motores: registrar potencia, trabajo, ciclos y cualquier alarma → [protocolo](../../conocimiento/maquina/pruebas/2026-08-17-finales-nc-y-en-serie.md).
- [ ] Medir repetibilidad de homing (30 ciclos) y posición final por eje antes de considerar otra controladora.
- [ ] Recapturar `$$` después de `$132=80`: el último dump crudo de homing todavía muestra el valor previo 200; alinear [grbl-actual.yaml](../../conocimiento/maquina/parametros/grbl/grbl-actual.yaml) con un respaldo final restaurable.
- [ ] Reevaluar grblHAL únicamente si aparece un requisito de D-0006: >30 kHz, límites/autoescuadrado independientes, más E/S, VFD/RS485, red o SD.

### Presupuesto

- [ ] Definir tarifas COP/hora por rol (mecánico, electricista, electrónico, programador) → hoja Tarifas de [presupuesto-v3.xlsx](../../presupuesto/presupuesto-v3.xlsx)
- [ ] 🪑 **Sesión de reconstrucción de la fase mecánica** (sentarse con Saul): detallar las horas invertidas, los procesos que se hicieron y los gastos de materiales de la mecánica ya construida → registrar en el Excel con `Estimado = Sí`
- [ ] Registrar las compras ya hechas de la v3 (K30, fuente 12V/10A…) en la hoja Materiales

### Documentación paralela (mientras se trabaja)

- [ ] Bitácora en [02-electronica-y-electrica.md](../../conocimiento/proceso-construccion/v3/02-electronica-y-electrica.md) en cada sesión de trabajo
- [ ] Capturar datos de la mecánica ya hecha (medidas, transmisión) con Saul → [01-construccion-mecanica.md](../../conocimiento/proceso-construccion/v3/01-construccion-mecanica.md)

## Reglas de esta lista

1. Máximo ~3 ítems "en curso" a la vez.
2. Todo ítem terminado genera su documentación (paso, prueba, decisión o ficha) antes de marcarse completo.
