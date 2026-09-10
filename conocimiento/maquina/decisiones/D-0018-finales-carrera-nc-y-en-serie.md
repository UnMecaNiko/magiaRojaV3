# D-0018 — Finales de carrera NC y extremos de Y en serie

- **Fecha**: 2026-08-17
- **Ámbito**: Máquina
- **Estado**: ✅ Vigente e implementada
- **Decisor**: Nicolas Velasquez
- **Relacionada con**: [D-0010](D-0010-soft-limits-apagados-hasta-fin-de-carrera-z.md), [D-0011](D-0011-fin-de-carrera-fisico-en-z.md)

## Contexto

El K30 provocaba falsas alarmas de hard limit al acoplar ruido sobre la entrada Z en D12, que estaba flotante. Además, el eje Y tiene finales en Y− y Y+, pero la CNC Shield no ofrece entradas independientes para esos dos extremos: ambos conectores están unidos a D10.

Con dos contactos NC conectados por separado entre la misma señal y GND, los contactos quedan eléctricamente en paralelo. Abrir solo uno no activa el límite porque el otro conserva el camino cerrado.

## Decisión

Todos los finales de carrera se cablean como **normalmente cerrados (NC)** y GRBL usa `$5=1`.

Los finales Y− y Y+ se conectan **en serie** como un único lazo sobre D10, de modo que cualquiera de los dos abre el circuito y activa el límite. El final Z+ se conecta a D12/SpnEn, no al terminal Z−/D11 ocupado por el PWM del láser.

## Motivos

1. Un lazo NC permanece en un estado eléctrico definido durante el funcionamiento normal y detecta también una desconexión o cable roto como condición de límite.
2. La conexión serie implementa correctamente dos contactos NC sobre una sola entrada; una conexión independiente a los headers duplicados de Y los dejaría en paralelo.
3. Z+ en D12 elimina la entrada flotante que recibía EMI del K30 y permite volver a activar hard limits.
4. La implementación fue probada con `$20=1`, `$21=1`, `$22=1` y homing de X/Y/Z; ver [prueba del 17 de agosto](../pruebas/2026-08-17-finales-nc-y-en-serie.md).

Fuentes consultadas **2026-08-24**:

- GRBL, `cpu_map.h`, mapeo de límites y cambio D11/D12 con `VARIABLE_SPINDLE`: https://github.com/gnea/grbl/blob/master/grbl/cpu_map.h
- GRBL, `limits.c`, lectura e interrupciones de límites: https://github.com/gnea/grbl/blob/master/grbl/limits.c
- GRBL issue #96, cableado NC y susceptibilidad al ruido: https://github.com/gnea/grbl/issues/96

## Consecuencias

- ✅ Cualquiera de los extremos de Y detiene/referencia el eje mediante la entrada compartida.
- ✅ Una apertura de cable o conector se presenta como límite activo en lugar de pasar inadvertida.
- ✅ D12 deja de flotar y la falsa alarma asociada al K30 queda resuelta operacionalmente.
- ⚠️ GRBL clásico sabe que se activó el eje Y, pero no distingue si fue Y− o Y+.
- ⚠️ Esta topología no permite autoescuadrado de dos motores/lados de Y; eso requeriría entradas y salidas independientes en otra configuración o controladora.
- ⏳ Falta una prueba prolongada y cuantificada de inmunidad EMI con el K30 y motores trabajando simultáneamente.
