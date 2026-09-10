# Prueba: finales NC y Y−/Y+ en serie — 2026-08-17

- **Fecha**: 2026-08-17
- **Quién**: Nicolas Velasquez
- **Subsistema/tema**: electrónica / control GRBL / finales de carrera / EMI
- **Resultado global**: ✅ Éxito operacional; falta cuantificar una prueba prolongada con K30

## Objetivo

Eliminar falsas alarmas de límites y hacer operativos los finales de ambos extremos de Y, teniendo en cuenta que la CNC Shield expone dos conectores por eje pero ambos conectores comparten una sola entrada del Arduino.

## Montaje / condiciones

- Arduino Uno + CNC Shield, GRBL 1.1h.
- Finales conectados en X−, Y−, Y+ y Z+.
- Todos los contactos en lógica **normalmente cerrada (NC)**; `$5=1`.
- Y− y Y+ conectados como un único lazo NC **en serie** sobre D10.
- Z+ conectado a D12/SpnEn por el intercambio D11/D12 que realiza GRBL con `VARIABLE_SPINDLE`.
- Soft limits, hard limits y homing activos: `$20=1`, `$21=1`, `$22=1`.

## Procedimiento

1. Se cambió el cableado de los finales a contactos NC.
2. Se comprobó que conectar Y− y Y+ de manera independiente a los dos headers de Y no producía la lógica esperada, porque ambos headers llegan al mismo pin.
3. Se rehízo Y como un lazo en serie: señal D10 → contacto NC Y− → contacto NC Y+ → GND.
4. Se instaló Z+ en D12/SpnEn, eliminando la entrada flotante.
5. Se activaron límites y homing y se operó la máquina.

## Resultados

- Cualquiera de los dos finales de Y abre el mismo lazo y activa la entrada Y.
- X, Y y Z quedaron disponibles para límites/homing con lógica NC.
- El homing de los tres ejes funcionó; Z se referencia primero y luego X/Y.
- La falsa alarma atribuida al ruido eléctrico dejó de presentarse después de definir D12 con el switch de Z y mantener las líneas NC cerradas en reposo.

No se registraron duración, potencia exacta del K30, número de ciclos ni mediciones eléctricas de la validación posterior. Por eso el resultado demuestra funcionamiento operacional, pero no reemplaza una prueba de inmunidad EMI de 1–2 horas con condiciones reproducibles.

## Explicación del cableado de Y

Los conectores Y− y Y+ de la shield no son entradas independientes: son puntos duplicados de la misma señal D10. Si dos contactos NC se conectan cada uno directamente entre señal y GND, quedan en paralelo y abrir uno deja al otro manteniendo el pin cerrado. En serie, abrir cualquiera interrumpe el único camino a GND y GRBL detecta el límite.

## Conclusiones y acciones

- Se adopta la topología NC y el lazo serie de Y como configuración definitiva de esta controladora; ver [D-0018](../decisiones/D-0018-finales-carrera-nc-y-en-serie.md).
- La solución mejora el comportamiento ante circuito abierto y evita entradas flotantes, pero no reemplaza separación física, cable adecuado, apantallamiento o filtrado si aparecen nuevas interferencias.
- ⏳ PENDIENTE: ejecutar 1–2 horas con motores y K30 en la condición más exigente, registrar potencia, trabajo, alarmas y continuidad del lazo.

## Fuentes

Consultadas **2026-08-24**:

- GRBL, mapeo oficial de pines Uno y cambio D11/D12 con `VARIABLE_SPINDLE`: https://github.com/gnea/grbl/blob/master/grbl/cpu_map.h
- GRBL, lectura e interrupción de entradas de límite: https://github.com/gnea/grbl/blob/master/grbl/limits.c
- GRBL, discusión técnica de cableado NC y ruido en límites: https://github.com/gnea/grbl/issues/96
- Resultado físico informado por Nicolas Velasquez el 2026-08-24 sobre el trabajo ejecutado el 2026-08-17.

## Media

_(Sin fotos o video enlazados.)_
